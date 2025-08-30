import { supabase } from "./supabase"; // путь к твоему клиенту supabase

const test = async () => {
  const { data, error } = await supabase.from("schedules").select("*");
  console.log("Data:", data);
  console.log("Error:", error);
};

test();
