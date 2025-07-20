import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_change_indicators");

  if (error || !data) {
    console.error("get_change_indicators RPC failed:", error?.message);
    return Response.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

  return Response.json({ data: data });
}
