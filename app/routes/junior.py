"""
Junior Routes
Handles endpoints for legal junior assistant (AI assistant).
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any

from app.schemas.query_schema import JuniorRequest, JuniorResponse
from app.controllers.junior_controller import JuniorController
from fastapi import Header
from app.core.logger import logger

router = APIRouter(prefix="/junior", tags=["Legal Junior Assistant"])


@router.post("/chat", response_model=JuniorResponse)
async def chat_with_junior(
    request: JuniorRequest,
    x_api_key: str = Header(..., alias="X-API-Key")
):
    """
    Chat with the legal junior assistant.
    
    Args:
        request: Junior request data
        current_user: Current authenticated user
        
    Returns:
        JuniorResponse with the answer
    """
    # Use API key for authentication - default user_id for now
    user_id = 1
    logger.info(f"Junior chat request from user {user_id}")
    
    try:
        result = await JuniorController.process_question(request, user_id)
        return result
    except Exception as e:
        logger.error(f"Error processing junior request: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process request"
        )


@router.get("/conversation/{conversation_id}", response_model=Dict[str, Any])
async def get_conversation(
    conversation_id: str,
    x_api_key: str = Header(..., alias="X-API-Key")
):
    """
    Get the conversation history for a specific conversation.
    
    Args:
        conversation_id: The unique conversation identifier
        current_user: Current authenticated user
        
    Returns:
        Dictionary containing conversation history
    """
    # Use API key for authentication - default user_id for now
    user_id = 1
    logger.info(f"Fetching conversation {conversation_id} for user {user_id}")
    
    try:
        result = await JuniorController.get_conversation_history(conversation_id, user_id)
        return result
    except Exception as e:
        logger.error(f"Error fetching conversation: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch conversation"
        )

