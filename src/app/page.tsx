import Link from "next/link";
import { getResourcePreview } from "./lib/resource-preview";
import { ResourcePreview } from "./types/resource-preview";

export async function generateMetadata() {
  return {
    title: "🚀 대시보드 시작",
    description:
      "리소스 데이터를 시각화한 대시보드 프로젝트 시작 페이지입니다.",
    openGraph: {
      title: "🚀 대시보드 시작",
      description:
        "리소스 데이터를 시각화한 대시보드 프로젝트 시작 페이지입니다.",
      url: "https://resource-utilization-dashboard.vercel.app",
      siteName: "Resource Nextjs",
      locale: "ko-KR",
      type: "website",
    },
  };
}

export default async function Page() {
  const resources: ResourcePreview[] = await getResourcePreview();

  return (
    <div className="mx-auto text-center max-w-3xl p-4">
      <h1 className="text-xl md:text-4xl font-bold text-indigo-600 mb-4">
        🚀 대시보드 시작
      </h1>
      <p className="text-gray-700 text-base md:text-lg mb-6 break-keep">
        리소스 데이터를 시각화한 대시보드 프로젝트입니다.
      </p>
      <div className="flex justify-center items-center flex-col md:flex-row gap-4 mb-8">
        <Link href="/dashboard" className="w-[170px]">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition w-[170px]">
            Dashboard 가기 →
          </button>
        </Link>
        <Link href="/resource" className="w-[170px]">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition w-[170px]">
            Resource 가기 →
          </button>
        </Link>
      </div>

      <h2 className="text-lg md:text-2xl font-semibold mb-2">
        🔥 최근 리소스 스냅샷
      </h2>
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
