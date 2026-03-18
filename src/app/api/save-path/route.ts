import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, data } = await req.json();

    if (!topic || !data) {
      return NextResponse.json({ error: "Topic and data are required" }, { status: 400 });
    }

    const { data: savedPath, error } = await supabase
      .from("learning_paths")
      .upsert({
        user_id: user.id,
        topic,
        data,
      }, { onConflict: "user_id, topic" }) // Optional: allow one path per topic per user
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(savedPath);
  } catch (error) {
    console.error("Save Path Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save path" },
      { status: 500 }
    );
  }
}
