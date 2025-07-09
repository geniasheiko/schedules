import { useState } from "react"
import { supabase } from "../../../utils/supabase/supabase"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
     email: z.string().email("Невірний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
})

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

const navigate = useNavigate()

const {register,
    handleSubmit,
    formState: { errors },
} = useForm<LoginFormData>({
   resolver: zodResolver(loginSchema),
})

const onSabmit = (data: LoginFormData) => {
     setError(null);

     supabase.auth
     .signInWithPassword({
        email: data.email, 
        password: data.password})
     .then(({error}) => {
        if(error) {
            setError(error.message);
        } else {
            navigate("/admin/dashboard");
        }
     })
     .catch((err) => {
        setError(err.message || "Помилoчка")
     })
}
return (
    <div>
      <h2>Вхід</h2>
        <form onSubmit={handleSubmit(onSabmit)}>
         <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Пароль"
          {...register("password")}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

        <button type="submit">Увійти</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );

}