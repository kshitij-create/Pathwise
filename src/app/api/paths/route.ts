import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: paths, error } = await supabase
      .from("learning_paths")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(paths);
  } catch (error) {
    console.error("Fetch Paths Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch paths" },
      { status: 500 }
    );
  }
}
