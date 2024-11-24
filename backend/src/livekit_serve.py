from __future__ import annotations

import logging
from dotenv import load_dotenv
from typing import Annotated
from livekit import rtc
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    WorkerOptions,
    cli,
    llm,
)
from livekit.agents.multimodal import MultimodalAgent
from livekit.plugins import openai
from database.crud import get_exhibit_by_title
from database.database import SessionLocal

load_dotenv(dotenv_path="../.env")
logger = logging.getLogger("my-worker")
logger.setLevel(logging.INFO)

class ExhibitAssistant(llm.FunctionContext):
    @llm.ai_callable()
    async def search(
        self,
        exhibit_title: Annotated[str, llm.TypeInfo(description="The title of the exhibit to search for")],
    ):
        """This is a function that will search for an exhibit by title and return the details of the exhibit"""
        db = SessionLocal()
        try:
            exhibit = get_exhibit_by_title(db, exhibit_title)
            return str(exhibit.details) if exhibit else ""
        finally:
            db.close()

async def entrypoint(ctx: JobContext):
    logger.info(f"connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    participant = await ctx.wait_for_participant()

    run_multimodal_agent(ctx, participant)

    logger.info("agent started")


def run_multimodal_agent(ctx: JobContext, participant: rtc.RemoteParticipant):
    language = ctx.room.name.split("__")[0]
    complexity = ctx.room.name.split("__")[1]
    top_interest = ctx.room.name.split("__")[2]
    logger.info("starting multimodal agent")
    model = openai.realtime.RealtimeModel(
        instructions=(
            f"You are a multilingual voice assistant guide for Discovery World museum. You will communicate in the language "
            f"{language} unless the visitor speaks to you in a different language, in which case you should switch to that "
            f"language. Your communication complexity should match level {complexity} (0-100), where 0 represents simple "
            f"language suitable for young children and 100 represents advanced academic discourse. You should particularly "
            f"emphasize and connect to the visitor's top interest field of {top_interest}. Maintain enthusiasm and engagement "
            f"while adjusting your vocabulary, sentence structure, and concept explanations to match complexity level "
            f"{complexity}. For example, at complexity level 20, use simple sentences and basic vocabulary, while at level "
            f"90, you can discuss advanced theoretical concepts and use field-specific terminology. Always prioritize making "
            f"connections between exhibits and {top_interest}. You can search for detailed exhibit information using the "
            f"'search' function by passing in the exhibit title as a parameter. Remember to maintain natural fluency in "
            f"{language} while adapting your communication style to match both complexity level {complexity} and the "
            f"visitor's primary interest in {top_interest}."
        ),
        modalities=["audio", "text"],
    )
    fnc_ctx = ExhibitAssistant()
    assistant = MultimodalAgent(model=model, fnc_ctx=fnc_ctx)
    assistant.start(ctx.room, participant)

    session = model.sessions[0]
    session.conversation.item.create(
        llm.ChatMessage(
            role="assistant",
            content="Please begin the interaction with the user in a manner consistent with your instructions.",
        )
    )
    session.response.create()


if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
        )
    )
