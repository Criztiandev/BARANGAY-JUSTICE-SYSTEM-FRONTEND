import TotalCaseBarChart from "@/common/components/organism/chart/case/total-case-bar-chart";
import UnsettledCasePieChart from "@/common/components/organism/chart/case/unsettled-case-pie-chart";

const UserDashboard = () => {
  return (
    <div className="container mx-auto">
      <div>Monday, 12th January 2025</div>
      <div className="my-4">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold">Hello, Autumn</span>
          <span className="text-sm text-muted-foreground">
            How can I help you today?
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[auto_35%] gap-4">
        <TotalCaseBarChart />
        <UnsettledCasePieChart />
      </div>

      <div className="mt-4">{/* <RecentCaseTable /> */}</div>
    </div>
  );
};

export default UserDashboard;
