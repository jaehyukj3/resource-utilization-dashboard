import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

const RPC_MAP: Record<string, string> = {
  hour_of_day: "get_hourly_avg",
  month_day: "get_avg_by_day",
  day_index: "get_weekday_avg",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const group = searchParams.get("group");

  const rpcFunction = RPC_MAP[group ?? "hour_of_day"];
  if (!rpcFunction) {
    return Response.json({ error: "Invalid group parameter" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc(rpcFunction);

  if (error || !data) {
    console.error(`RPC ${rpcFunction} failed:`, error?.message);
    return Response.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }

  return Response.json({ chart: data });
}