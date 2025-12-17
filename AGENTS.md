# AGENTS.md

## Purpose
This project uses **Spec-Driven Development (SDD)** where no code is written until specifications are complete and approved.

All AI agents must follow: **Specify → Plan → Tasks → Implement**

## Agent Rules

1. ❌ Never generate code without a referenced Task ID
2. ❌ Never modify architecture without updating `speckit.plan`
3. ❌ Never propose features without updating `speckit.specify`
4. ❌ Never change principles without updating `speckit.constitution`
5. ✅ Every code file must link to Task and Spec sections

## Spec-Kit Workflow

### 1. Constitution (WHY)
- File: `specs/constitution.md`
- Defines architecture values, security, performance
- Check before proposing solutions

### 2. Specify (WHAT)
- File: `specs/features/*.md`
- User journeys, requirements, acceptance criteria
- Request clarification if missing requirements

### 3. Plan (HOW)
- File: `specs/*.md`
- Component breakdown, APIs, architecture
- Generated from Specify file

### 4. Tasks (BREAKDOWN)
- File: `.claude/commands/*.md`
- Atomic, testable work units
- Must have: Task ID, description, preconditions, outputs

### 5. Implement (CODE)
- Reference Task IDs in code
- Follow Plan exactly
- Stop if underspecified

## Agent Behavior

### When generating code: