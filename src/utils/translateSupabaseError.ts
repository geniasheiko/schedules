// utils/translateSupabaseError.ts

export function translateSupabaseError(message: string): string {
  const errorMessages: Record<string, string> = {
    "Invalid login credentials": "Неправильний email або пароль",
    "Email not confirmed": "Електронна пошта не підтверджена",
    "User already registered": "Користувач вже зареєстрований",
    "User not found": "Такого користувача не знайдено",
    "Password should be at least 6 characters": "Пароль має містити щонайменше 6 символів",
    "Email rate limit exceeded": "Забагато спроб входу. Спробуйте пізніше",
  };

  return errorMessages[message] || "Сталася помилка. Спробуйте ще раз.";
}
