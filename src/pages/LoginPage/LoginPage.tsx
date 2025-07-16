import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../../utils/supabase/supabase";
import { translateSupabaseError } from "../../utils/translateSupabaseError";
import { UniversalButton } from "../../Components/Buttons/UniversalButton/UniversalButton";


const loginSchema = z.object({
  email: z.string().email("Невірний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {

  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const { register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

  })

  const onSabmit = (data: LoginFormData) => {
    setError(null);

    supabase.auth
      .signInWithPassword({
        email: data.email,
        password: data.password
      })
      .then(({ error }) => {
        if (error) {
          const translatedMessage = translateSupabaseError(error.message);
          setError(translatedMessage);
        } else {
          if (data.rememberMe) {
            localStorage.setItem("rememberedEmail", data.email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
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

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"} // 👁 переключение
            placeholder="Пароль"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? "Сховати" : "Показати"}
          </button>
        </div>
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        <label>
          <input type="checkbox" {...register("rememberMe")} />
          Запам’ятати мене
        </label>

        <UniversalButton type="submit">Увійти</UniversalButton>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};