import { Routes, Route } from "react-router-dom";
import { SchedulePage } from "../../Components/SchedulePage/SchedulePage";
import { LifeMinistryPage } from "../../pages/LifeMinistryPage/LifeMinistryPage";
import { PublicTalkWatchtowerPage } from "../../pages/PublicTalkWatchtowerPage/PublicTalkWatchtowerPage";
import { ListsPage } from "../../pages/ListsPage/ListsPage";
import { MeetingsFieldServicePage } from "../../pages/MeetingsFieldServicePage/MeetingsFieldServicePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardPage } from "../../pages/DashboardPage/DashboardPage";


export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<SchedulePage />} />
            <Route path="/life-and-ministry" element={<LifeMinistryPage />} />
            <Route path="/public-talk-watchtower" element={<PublicTalkWatchtowerPage />} />
            <Route path="/meetings-for-field-service" element={<MeetingsFieldServicePage />} />
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