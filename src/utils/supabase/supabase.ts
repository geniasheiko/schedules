import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 
typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL
? import.meta.env.VITE_SUPABASE_URL // Для Vite используем import.meta.env
: process.env.VITE_SUPABASE_URL

//Применялось единожды, чтобы зангрузить таблицы
// const supabaseUrl = process.env.VITE_SUPABASE_URL
// const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY


const supabaseAnonKey = 
typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY
? import.meta.env.VITE_SUPABASE_ANON_KEY  // Для Vite используем import.meta.env
    : process.env.VITE_SUPABASE_ANON_KEY

// Убедитесь, что переменные окружения загружены
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);