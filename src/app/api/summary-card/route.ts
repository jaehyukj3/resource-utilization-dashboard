import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_summary_metrics");

  if (error || !data) {
    console.error("get_summary_metrics RPC failed:", error?.message);
    return Response.json(
      { error: "Failed to fetch summary data" },
      { status: 500 }
    );
  }

  return Response.json({ summary: data });
}
