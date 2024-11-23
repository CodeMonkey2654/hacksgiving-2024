from __future__ import annotations

import logging
from dotenv import load_dotenv
from typing import Annotated
import datetime
from livekit import rtc
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    WorkerOptions,
    cli,
    llm,
    AssistantFnc
)
from livekit.agents.multimodal import MultimodalAgent
from livekit.plugins import openai


load_dotenv(dotenv_path=".env.local")
logger = logging.getLogger("my-worker")
logger.setLevel(logging.INFO)

class DefaultAssistant(llm.FunctionContext):
    @llm.ai_callable()
    async def search(
        self,
        text: Annotated[str, llm.TypeInfo(description="The text to search for")],
    ):
        """Transcribe conversation text to console"""
        return "Continue conversation with the user"

async def entrypoint(ctx: JobContext):
    logger.info(f"connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    participant = await ctx.wait_for_participant()

    run_multimodal_agent(ctx, participant)

    logger.info("agent started")


def run_multimodal_agent(ctx: JobContext, participant: rtc.RemoteParticipant):
    logger.info("starting multimodal agent")

    model = openai.realtime.RealtimeModel(
        instructions=(
            "You are a voice assistant created by LiveKit. Your interface with users will be voice. "
            "You should use short and concise responses, and avoiding usage of unpronouncable punctuation. "
            "You were created as a demo to showcase the capabilities of LiveKit's agents framework, "
            "as well as the ease of development of realtime AI prototypes. You are currently running in a "
            "LiveKit Sandbox, which is an environment that allows developers to instantly deploy prototypes "
            "of their realtime AI applications to share with others."
        ),
        modalities=["audio", "text"],
    )
    assistant = MultimodalAgent(model=model)
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
