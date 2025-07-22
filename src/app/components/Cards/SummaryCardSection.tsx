// SummaryCardSection.tsx
import styles from "@/app/styles/components/cards/SummaryCardSection.module.scss";
import { Summary } from "@/app/types/dashboard";

const cardInfo = [
  {
    label: "CPU 평균",
    key: "avg_cpu_utilization",
    iconClass: "fas fa-microchip",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "메모리 평균",
    key: "avg_memory_usage",
    iconClass: "fas fa-memory",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "디스크 평균",
    key: "avg_storage_usage",
    iconClass: "fas fa-hdd",
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "평균 워크로드",
    key: "avg_workload",
    iconClass: "fas fa-tasks",
    color: "bg-violet-50 text-violet-600",
  },
];

type Props = {
  summary: Summary[];
};

export default function SummaryCardSection({ summary }: Props) {
  return (
    <section className="grid grid-cols-1 compact:grid-cols-2 gap-5">
      {summary.map((item, idx) =>
        cardInfo.map(({ label, key, iconClass, color }) => {
          const [bgColor, textColor] = color.split(" ");
          return (
            <div
              key={key + idx}
              className={`${bgColor} rounded-xl shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] p-5 flex flex-col justify-between h-[110px]`}
            >
              <div
                className={`flex items-center gap-2 text-sm ${textColor} mb-2`}
              >
                <i
                  className={`${iconClass} text-base sm:text-lg ${styles.summaryCardSectionIcon}`}
                />
                <span className="font-medium">{label}</span>
              </div>
              <p className="text-xl lg:text-3xl font-bold text-gray-800">
                {item[key]?.toFixed(1) ?? "—"}%
              </p>
            </div>
          );
        })
      )}
    </section>
  );
}
