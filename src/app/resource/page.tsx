import ResourceDataTable from "../components/Tables/ResourceDataTable";

export default async function DashboardPage() {
  return (
    <div className="h-full w-full flex flex-col  max-h-full md:max-h-full">
      <h1 className="md:text-xl lg:text-3xl text-lg font-bold text-indigo-600 text-center mb-6">
        🚀 리소스 테이블
      </h1>
      <div className="flex-1 overflow-hidden h-full max-h-full md:max-h-full">
        <ResourceDataTable />
      </div>
    </div>
  );
}
