import { ServiceMeetings } from "../../Components/ServiceMeetingsManage/ServiceMeetings";
import styles from "./DashboardPage.module.css";

export const DashboardPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.Wrapper}>
        <h1>Панель адміністратора</h1>
        <ServiceMeetings />
      </div>
    </div>
  );
};
