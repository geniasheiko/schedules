import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../utils/supabase/supabase";


export type ProtactedRouteProps = {
    children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtactedRouteProps) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setAuthorized(true)
            } else {
                navigate("/admin/login")
            }
            setLoading(false)
        })
    }, [])

    if (loading) return <p>Завантаження</p>

    return authorized ? <>{children}</> : null;
}