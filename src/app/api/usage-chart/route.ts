import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resources")
    .select("timestamp, cpu_utilization, memory_usage, storage_usage")
    .order("timestamp", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return new Response("서버 처리 중 오류", { status: 500 });
  }

  if (!data) {
    return new Response("리소스 사용률 없음", { status: 404 });
  }

  return Response.json(data);
}
