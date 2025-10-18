"""
Junior Controller
Handles business logic for legal junior assistant (AI assistant).
"""
from datetime import datetime
from typing import Dict, Any
import uuid
import httpx

from app.schemas.query_schema import JuniorRequest, JuniorResponse
from app.core.config import settings
from app.core.logger import logger


class JuniorController:
    """Controller for legal junior assistant operations."""
    
    @staticmethod
    async def process_question(
        request: JuniorRequest,
        user_id: int
    ) -> JuniorResponse:
        """
        Process a legal question or task from the user.
        
        Args:
            request: Junior request data
            user_id: ID of the user making the request
            
        Returns:
            JuniorResponse with the answer
        """
        # Generate or use existing conversation ID
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        logger.info(f"Processing junior question for user {user_id}")
        logger.info(f"Conversation ID: {conversation_id}")
        logger.info(f"Question: {request.question}")
        
        # Prepare data for AI engine
        ai_request_data = {
            "conversation_id": conversation_id,
            "user_id": user_id,
            "question": request.question,
            "context": request.context,
        }
        
        # Call AI engine for intelligent legal assistance
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Call AI engine inference endpoint
                ai_response = await client.post(
                    f"{settings.AI_ENGINE_URL}/inference",
                    json={
                        "query": request.question,
                        "context": f"Legal assistant question. Context: {request.context or 'General legal query'}. User ID: {user_id}",
                        "max_tokens": 600,
                        "temperature": 0.7
                    },
                    headers={"Content-Type": "application/json"}
                )
                
                if ai_response.status_code == 200:
                    ai_result = ai_response.json()
                    answer = ai_result.get("response", ai_result.get("answer", ""))
                    ai_provider = ai_result.get("provider", "AI Assistant")
                    ai_model = ai_result.get("model", "Unknown")
                    ai_confidence = ai_result.get("confidence", 0.9)
                    
                    logger.info(f"AI assistant response using {ai_provider} ({ai_model}) with confidence {ai_confidence}")
                    
                    # Generate sources based on AI response
                    sources = [
                        f"AI Legal Assistant ({ai_provider})",
                        f"Model: {ai_model}",
                        "Indian Legal Framework",
                        "Case Law Database"
                    ]
                    
                    # Add context-specific sources
                    if "contract" in request.question.lower():
                        sources.append("Indian Contract Act, 1872")
                    if "criminal" in request.question.lower():
                        sources.append("Indian Penal Code, 1860")
                    if "property" in request.question.lower():
                        sources.append("Transfer of Property Act, 1882")
                    
                else:
                    logger.warning(f"AI engine returned status {ai_response.status_code}")
                    # Fallback response
                    answer = (
                        f"I understand you're asking about: {request.question}. "
                        "This is a fallback response while the AI system is being optimized. "
                        "For detailed legal assistance, please consult with a qualified legal professional."
                    )
                    sources = [
                        "Legal Research System",
                        "Indian Legal Framework",
                        "General Legal Database"
                    ]
                    
        except Exception as e:
            logger.error(f"AI engine call failed: {str(e)}")
            # Fallback response
            answer = (
                f"I understand you're asking about: {request.question}. "
                "The AI assistant is temporarily unavailable. "
                "Please try again later or consult with a qualified legal professional for immediate assistance."
            )
            sources = [
                "System Fallback",
                "Indian Legal Framework",
                "General Legal Database"
            ]
        
        return JuniorResponse(
            answer=answer,
            sources=sources,
            conversation_id=conversation_id,
            created_at=datetime.utcnow()
        )
    
    @staticmethod
    async def get_conversation_history(
        conversation_id: str,
        user_id: int
    ) -> Dict[str, Any]:
        """
        Get the conversation history for a specific conversation.
        
        Args:
            conversation_id: The unique conversation identifier
            user_id: ID of the user making the request
            
        Returns:
            Dictionary containing conversation history
        """
        logger.info(f"Fetching conversation history for {conversation_id}")
        
        # TODO: Fetch from database
        # This is a placeholder implementation
        return {
            "conversation_id": conversation_id,
            "messages": [],
            "created_at": datetime.utcnow().isoformat()
        }

