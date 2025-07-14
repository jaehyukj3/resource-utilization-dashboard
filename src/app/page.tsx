// 예: app/dashboard/page.tsx (서버 컴포넌트)
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: resources, error } = await supabase
    .from("resources")
    .select("*")
    .order("date_only", { ascending: false })
    .order("hour_of_day", { ascending: false })
    .limit(10);


  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  return (
    <div className="mx-auto text-center max-w-3xl p-4">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        🚀 대시보드 시작
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Tailwind + SCSS 템플릿이 성공적으로 적용됐습니다.
      </p>
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition mb-8">
        첫 컴포넌트 가기 →
      </button>
      <h2 className="text-2xl font-semibold mb-2">🔥 최근 리소스 스냅샷</h2>
      {Array.isArray(resources) && resources.length > 0 ? (
        <ul>
          {resources.map((r) => (
            <li key={r.id}>
              {r.date_only} | {r.hour_of_day}시 | CPU: {r.cpu_utilization}%
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">데이터가 없습니다</p>
      )}
    </div>
  );
}
