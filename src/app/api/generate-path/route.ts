import { NextResponse } from "next/server";
import { generateLearningPath } from "@/lib/ai/groq";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const path = await generateLearningPath(topic);

    return NextResponse.json(path);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate path" },
      { status: 500 }
    );
  }
}
