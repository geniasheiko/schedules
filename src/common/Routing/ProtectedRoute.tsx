import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../features/auth/supabaseAuth";

export type ProtactedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtactedRouteProps) => {
  // const navigate = useNavigate()
  // const [loading, setLoading] = useState(true)
  // const [authorized, setAuthorized] = useState(false)
  const { data, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <p>Завантаження...</p>;
  }
  if (!data?.user) {
    return <Navigate to="/admin/login" replace />;
  }
  if (!data.isAdmin) {
    return <p>У вас немає прав доступу 🚫</p>;
  }
  // useEffect(() => {
  //     supabase.auth.getUser().then(({ data: { user } }) => {
  //         if (user) {
  //             setAuthorized(true)
  //         } else {
  //             navigate("/admin/login")
  //         }
  //         setLoading(false)
  //     })
  // }, [])

  // if (loading) return <p>Завантаження</p>

  // return authorized ? <>{children}</> : null;
  return <>{children}</>;
};
