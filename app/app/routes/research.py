"""
Research Routes
Handles endpoints for legal research requests.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List

from app.schemas.query_schema import ResearchRequest, ResearchResponse
from app.controllers.research_controller import ResearchController
from fastapi import Header
from app.core.logger import logger

router = APIRouter(prefix="/research", tags=["Legal Research"])


@router.post("/", response_model=ResearchResponse)
async def perform_research(
    request: ResearchRequest,
    x_api_key: str = Header(..., alias="X-API-Key")
):
    """
    Perform legal research based on the query.
    
    Args:
        request: Research request data
        current_user: Current authenticated user
        
    Returns:
        ResearchResponse with research results
    """
    # Use API key for authentication - default user_id for now
    user_id = 1
    logger.info(f"Research request from user {user_id}")
    
    try:
        result = await ResearchController.perform_research(request, user_id)
        return result
    except Exception as e:
        logger.error(f"Error performing research: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to perform legal research"
        )


@router.get("/history", response_model=List[Dict[str, Any]])
async def get_research_history(
    limit: int = 10,
    x_api_key: str = Header(..., alias="X-API-Key")
):
    """
    Get research history for the current user.
    
    Args:
        limit: Maximum number of records to return
        current_user: Current authenticated user
        
    Returns:
        List of research history records
    """
    # Use API key for authentication - default user_id for now
    user_id = 1
    logger.info(f"Fetching research history for user {user_id}")
    
    try:
        history = await ResearchController.get_research_history(user_id, limit)
        return history
    except Exception as e:
        logger.error(f"Error fetching research history: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch research history"
        )

