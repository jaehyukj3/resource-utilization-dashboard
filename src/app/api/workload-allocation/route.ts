import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_workload_allocation_ranges");

  if (error || !data) {
    console.error("get_workload_allocation_ranges RPC failed:", error?.message);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  return Response.json({ data });
}
