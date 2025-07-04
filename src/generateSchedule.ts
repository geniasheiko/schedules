//Это скрипт запускается только один раз в ручную, командой 
import 'dotenv/config'  //автоматически подгружает .env файл в process.env
import { supabase } from './utils/supabase/supabase';



const scheduleTimes: Record<string, Record<string, string[]>> =  {
   Понеділок: {
    "Стебницьке кільце": ["09:30", "12:00", "13:00", "14:00", "15:00", "16:00"],
  },
  Вівторок: {
    "Європа": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  Середа: {
    "Рукавічка": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    "Стебницьке кільце": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  },
  Четвер: {
   "Парк": ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  Пятниця: {
   "Стебницьке кільце": ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  Субота: {
    "Рукавічка": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    "Європа": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  },
  Неділя: {
   "Злата": ["13:00", "14:00", "15:00", "16:00", "17:00"],
  },
}



async function generateSchedule() {
  const slotsToInsert = []

console.log("⚙️ Скрипт запущен");

for (const [day, locations] of Object.entries(scheduleTimes)) {
    for (const [location, times] of Object.entries(locations)) {
      for (const time of times) {
        for (let i = 1; i <= 2; i++) {
          slotsToInsert.push({
            day_of_week: day,
            slot_time: time,
            location: location,
            capacity: 2,
            is_booked: false,
            booked_person_name: null,
          })
        }
      }
    }
  }
// Вставляет все слоты в таблицу schedules через Supabase
  const { data, error } = await supabase.from("schedules").insert(slotsToInsert)

  // Логирование результата
  if (error) {
    console.error("Ошибка вставки:", error)
  } else {
    console.log("Данные успешно добавлены:", data)
  }
}


generateSchedule()
