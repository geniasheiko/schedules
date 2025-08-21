import { Routes, Route } from "react-router-dom";
import { SchedulePage } from "../../Components/SchedulePage/SchedulePage";
import { MeetingsPage } from "../../pages/MeetingsPage/MeetingsPage";
import { ListsPage } from "../../pages/ListsPage/ListsPage";
import { MeetingsFieldServicePage } from "../../pages/MeetingsFieldServicePage/MeetingsFieldServicePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardPage } from "../../pages/DashboardPage/DashboardPage";


export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<SchedulePage />} />
            <Route path="/meetings" element={<MeetingsPage />} />
            <Route path="/meetings-for-field-service" element={<MeetingsFieldServicePage isAdmin={true} />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}