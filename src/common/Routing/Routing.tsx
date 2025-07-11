import { Routes, Route } from "react-router-dom";
import { SchedulePage } from "../../Components/SchedulePage/SchedulePage";
import { LifeMinistryPage } from "../../pages/LifeMinistryPage/LifeMinistryPage";
import { ProtectedRoute } from "../ProtectedRoute";
import { DashboardPage } from "../../pages/LifeMinistryPage/DashboardPage/DashboardPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";


export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<SchedulePage />} />
            <Route path="/life-ministry" element={<LifeMinistryPage />} />
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