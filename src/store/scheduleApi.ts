import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ScheduleSlot } from "../types/schedule";

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SUPABASE_URL + "/rest/v1",
    prepareHeaders: (headers) => {
      // headers.set('apikey', import.meta.env.VITE_SUPABASE_ANON_KEY);//!!
      headers.set(
        "Authorization",
        "Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}"
      ); //!!
      //    const token = supabase.auth.getSession().data.session?.access_token;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      // headers.set('apikey', import.meta.env.VITE_SUPABASE_ANON_KEY);
      return headers;
    },
  }),
  tagTypes: ["Schedule"],
  endpoints: (builder) => ({
    getSchedules: builder.query<ScheduleSlot[], void>({
      query: () => ({
        url: "schedules",
        params: { select: "*" },
      }),
      providesTags: ["Schedule"],
    }),
    bookSlot: builder.mutation<void, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `schedules?id=eq.${id}`,
        method: "PATCH",
        body: { booked_person_name: name, is_booked: true },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Schedule"],
    }),
    deleteSlot: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `schedules?id=eq.${id}`,
        method: "PATCH",
        body: { booked_person_name: null, is_booked: false },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Schedule"],
    }),
    deleteOldestWeek: builder.mutation<void, void>({
      query: () => ({
        url: "/rpc/delete_oldest_week",
        method: "POST",
      }),
      invalidatesTags: ["Schedule"],
    }),
    addNewWeek: builder.mutation<void, void>({
      query: () => ({
        url: "/rpc/add_new_week",
        method: "POST",
      }),
      invalidatesTags: ["Schedule"],
    }),
    restoreWeekFromBackup: builder.mutation<void, void>({
      query: () => ({
        url: "/rpc/restore_week_from_backup",
        method: "POST",
      }),
      invalidatesTags: ["Schedule"],
    }),

    //     shiftOldestWeek: builder.mutation<void, void>({
    //   query: () => ({
    //     url: '/rpc/shift_oldest_week',
    //     method: 'POST',
    //   }),
    //   invalidatesTags:['Schedule']
    // }),
  }),
});

export const {
  useGetSchedulesQuery,
  useBookSlotMutation,
  useDeleteSlotMutation,
  useDeleteOldestWeekMutation,
  useAddNewWeekMutation,
  useRestoreWeekFromBackupMutation,
  //useShiftOldestWeekMutation
} = scheduleApi;
