from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Health check endpoint
    
    Returns:
        dict: Status and version information
    """
    return {
        "status": "healthy",
        "version": "1.0.0",
        "service": "todo-api"
    }