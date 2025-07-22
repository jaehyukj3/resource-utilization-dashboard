"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { ResourceData } from "@/app/types/resource";

const PAGE_SIZE = 50;

export default function ResourceDataTable() {
  const [data, setData] = useState<ResourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/resource-data");
        const json = await res.json();
        setData(json?.table || []);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const currentData = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <section className="flex flex-col min-h-[300px] h-full max-h-full ">
      <div className="h-full max-h-full overflow-hidden">
        <div className="h-full max-h-full bg-white overflow-auto ">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
              데이터 불러오는 중...
            </div>
          ) : currentData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              해당 기간에 데이터가 없습니다.
            </div>
          ) : (
            <table className="min-w-full table-fixed text-sm bg-white">
              <thead className="sticky top-[-1px] z-10 bg-slate-50 text-gray-600 text-left shadow-sm">
                <tr>
                  <th className="px-2 py-2 w-40">Timestamp</th>
                  <th className="px-2 py-2 w-28">CPU</th>
                  <th className="px-2 py-2 w-32">Memory</th>
                  <th className="px-2 py-2 w-32">Storage</th>
                  <th className="px-2 py-2 w-32">Workload</th>
                  <th className="px-2 py-2 w-36">Allocation</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {currentData.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-100">
                    <td className="px-2 py-1 whitespace-nowrap">
                      {format(parseISO(row.timestamp), "yyyy-MM-dd HH:mm")}
                    </td>
                    <td className="px-2 py-1">
                      {row.cpu_utilization.toFixed(1)}%
                    </td>
                    <td className="px-2 py-1">
                      {row.memory_usage.toFixed(1)}%
                    </td>
                    <td className="px-2 py-1">
                      {row.storage_usage.toFixed(1)}%
                    </td>
                    <td className="px-2 py-1">{row.workload.toFixed(1)}%</td>
                    <td className="px-2 py-1">
                      {row.resource_allocation.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-3 text-sm text-gray-700 h-[54px]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ◀ 이전
          </button>
          <span>
            페이지 {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            다음 ▶
          </button>
        </div>
      )}
    </section>
  );
}
