export type ScheduleSlot = {
  id: string;
  day_of_week: string;
  slot_time: string;
  capacity: number;
  is_booked?: boolean;
  booked_person_name: string | null;
  week_start: string;
  slot_date: string;
  location: string
};