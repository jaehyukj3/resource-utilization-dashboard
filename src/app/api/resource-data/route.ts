import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resources")
    .select(
      "timestamp, cpu_utilization, memory_usage, storage_usage, workload, resource_allocation"
    )
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return new Response("서버 처리 중 오류", { status: 500 });
  }

  return Response.json({ table: data || [] });
}
