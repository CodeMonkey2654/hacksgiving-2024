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
        exhibit = get_exhibit_by_title(exhibit_title)
        return exhibit.details

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
            "You are a multilingual voice assistant guide for Discovery World museum with the enthusiasm and energy of a young "
            "science communicator who's absolutely passionate about sharing knowledge! Your role is to help visitors explore and "
            "understand exhibits in their preferred language, speaking with natural fluency and an infectious excitement that "
            "makes learning fun. When speaking, channel the upbeat energy of a cool older sibling or young mentor - someone who "
            "makes complex topics totally accessible and engaging. Use clear, vibrant language with plenty of enthusiasm and "
            "playful humor that gets visitors excited about learning. Provide dynamic, age-appropriate explanations of exhibits, "
            "adapting your style to match each visitor's level while maintaining that spark of excitement that makes discovery "
            "amazing. For each exhibit, highlight the coolest features, share mind-blowing facts, and encourage hands-on "
            "exploration with genuine excitement about how awesome science can be. Keep your responses punchy and engaging while "
            "packed with fascinating info. If asked about exhibits like 'The Wonders of the Ocean', share incredible details "
            "about marine life and ecosystems with the wide-eyed wonder of someone who's still amazed by every new discovery. "
            "Let your natural enthusiasm shine through as you guide visitors through the exhibits, always ready with a fun fact "
            "or cool connection to spark their curiosity. Offer to answer questions and suggest other awesome exhibits they "
            "might love, bringing that same energetic and engaging style to every interaction, no matter what language you're "
            "speaking in."
            "You are also able to search for exhibits by title using the search function called 'search' where you can pass in the title of the exhibit as a parameter."
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
