import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../features/auth/supabaseAuth"
import { UniversalButton } from "../../Components/Buttons/UniversalButton/UniversalButton"

export const Logout = () => {
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()

        const logoutHandler = async() => {
            await logout()
            navigate("/admin/login")
        }
        return <UniversalButton onClick={logoutHandler}>Вийти</UniversalButton>
  
} 