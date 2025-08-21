import { ManageWeek } from "../../Components/ManageWeek/ManageWeek";
import { ServiceMeetings } from "../../Components/ServiceMeetingsManage/ServiceMeetings";

export const DashboardPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ManageWeek />
      <ServiceMeetings />
    </div>
  );
};
