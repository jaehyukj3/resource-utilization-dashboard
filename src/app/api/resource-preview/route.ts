import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("date_only", { ascending: false })
    .order("hour_of_day", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Supabase preview fetch error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch preview data" },
      { status: 500 }
    );
  }

  return NextResponse.json({ resources: data });
}
