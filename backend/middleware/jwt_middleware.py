from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth import decode_access_token

security = HTTPBearer()


async def verify_jwt(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> str:
    """
    Verify JWT token and return user_id
    
    Raises:
        HTTPException: If token is invalid or expired
    
    Returns:
        str: User ID from token
    """
    token = credentials.credentials
    
    try:
        payload = decode_access_token(token)
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing user ID"
            )
        
        return user_id
    
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )


def verify_user_access(token_user_id: str, url_user_id: str) -> None:
    """
    Verify that the user from token matches the URL user_id
    
    Args:
        token_user_id: User ID from JWT token
        url_user_id: User ID from URL path
    
    Raises:
        HTTPException: If user IDs don't match
    """
    if token_user_id != url_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this user's data"
        )