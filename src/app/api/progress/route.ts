import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { path_id, lesson_id, completed } = await req.json();

    if (!path_id || !lesson_id) {
      return NextResponse.json({ error: "Path ID and Lesson ID are required" }, { status: 400 });
    }

    const { data: progress, error } = await supabase
      .from("lesson_progress")
      .upsert({
        user_id: user.id,
        path_id,
        lesson_id,
        completed,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id, path_id, lesson_id" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Update Progress Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update progress" },
      { status: 500 }
    );
  }
}
