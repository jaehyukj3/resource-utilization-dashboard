import type { ChangeIndicator } from "@/app/types/dashboard";

type Props = {
  indicators: ChangeIndicator[];
};

export function ChangeIndicatorCard({ indicators }: Props) {
  return (
    <section className="bg-neutral-50 rounded-md shadow-sm p-4 flex flex-col w-full h-full max-h-full">
      <h2 className="text-base md:text-lg text-center md:text-left font-bold text-indigo-600 mb-4">
        리소스 변화 추이
      </h2>

      <div className="flex flex-col compact:flex-row wide:flex-col flex-wrap justify-center gap-6 md:gap-4 items-stretch">
        {indicators.map((indicator) => {
          const color =
            indicator.status === "up"
              ? "text-green-600"
              : indicator.status === "down"
                ? "text-red-500"
                : "text-gray-500";

          const iconClass =
            indicator.status === "up"
              ? "fas fa-arrow-up"
              : indicator.status === "down"
                ? "fas fa-arrow-down"
                : "fas fa-minus";

          const label =
            indicator.status === "up"
              ? "상승"
              : indicator.status === "down"
                ? "하락"
                : "유지";

          return (
            <div
              key={indicator.metric}
              className="bg-slate-50 border border-slate-200 px-5 py-6 md:px-4 lg:px-2 lg:py-1 rounded-md flex flex-col justify-between items-start w-full
                compact:w-[calc((100%-48px)/3)]
                md:w-[calc((100%-32px)/3)]
                wide:w-full
                wide:min-h-[0px]
                wide:h-20"
            >
              <div className="text-sm text-gray-500">{indicator.metric}</div>

              <div
                className={`flex items-center gap-1 font-bold whitespace-nowrap text-lg wide:text-base wide:mt-1 ${color}`}
              >
                <i className={`${iconClass} text-base ${color}`} />
                <span>{indicator.change_pct.toFixed(2)}%</span>
              </div>

              <div className="text-xs text-gray-400 mt-auto">
                상태: <span className={color}>{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
