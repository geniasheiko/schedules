import { supabase } from "@/utils/supabase/supabase";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const MeetingsFieldsServiceApi = createApi({
  reducerPath: "MeetingsFieldsServiceApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ServiceSchedule"],

  endpoints: (build) => ({
    //получаем расписание
    getMeetingsFieldsService: build.query<any[], void>({
      async queryFn() {
        const { data, error } = await supabase
          .from("service_overseer_schedule")
          .select("*")
          .order("date", { ascending: true });

        if (error) return { error };
        return { data };
      },
      providesTags: ["ServiceSchedule"],
    }),

    //добавление записи
    addEntry: build.mutation<
      any,
      {
        date: string;
        day_of_week: string;
        adres: string;
        speaker: string;
        time: string;
      }
    >({
      async queryFn(entry) {
        const { error } = await supabase
          .from("service_overseer_schedule")
          .insert([entry]);

        if (error) return { error };
        return { data: true };
      },
      invalidatesTags: ["ServiceSchedule"],
    }),
    //Удаление записи
    deleteEntry: build.mutation<any, string>({
      async queryFn(id) {
        const { error } = await supabase
          .from("service_overseer_schedule")
          .delete()
          .eq("id", id);

        if (error) return { error };
        return { data: true };
      },
      invalidatesTags: ["ServiceSchedule"],
    }),
  }),
});

export const {
  useGetMeetingsFieldsServiceQuery,
  useAddEntryMutation,
  useDeleteEntryMutation,
} = MeetingsFieldsServiceApi;
