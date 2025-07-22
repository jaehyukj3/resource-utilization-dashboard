import type { ResourcePreview } from "@/app/types/resource-preview";
import { createClient } from "@/utils/supabase/server";

export async function getResourcePreview(): Promise<ResourcePreview[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("date_only", { ascending: false })
    .order("hour_of_day", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Supabase preview fetch error:", error.message);
    return [];
  }

  return data ?? [];
}
