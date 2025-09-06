import type { User } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase/supabase";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { login, logout } from "./model/authSlice";

//то, что возвращает АPI на фронте
type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
//то, что возвращает АPI на фронте
type AuthResponseData = {
  user: User | null;
  isAdmin: boolean;
  error: null | { name: string; message: string };
};

type LoginData = { email: string; password: string };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // --- LOGIN ---
    login: builder.mutation<AuthResponseData, LoginData>({
      async queryFn({ email, password }) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: {
                  user: null,
                  isAdmin: false,
                  error: { name: error.name, message: error.message },
                },
              },
            };
          }

          let isAdmin = false;
          if (data.user) {
            const { data: adminData } = await supabase
              .from("admins")
              .select("id")
              .eq("id", data.user.id)
              // .single();
              .maybeSingle();
            isAdmin = !!adminData;
          }

          return { data: { user: data.user, isAdmin, error: null } };
        } catch (e) {
          const ownError = {
            name: e instanceof Error ? e.name : "UnknownError",
            message: e instanceof Error ? e.message : String(e),
          };
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: { user: null, isAdmin: false, error: ownError },
            },
          };
        }
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        // моментально синхронизируем кеш getCurrentUser после успешного логина
        try {
          const { data } = await queryFulfilled;
          dispatch(
            authApi.util.updateQueryData(
              "getCurrentUser",
              undefined,
              (draft) => {
                draft.user = data.user;
                draft.isAdmin = data.isAdmin;
                draft.error = null;
              }
            )
          );
          if (data.user) {
            // Диспатчим экшен login при входе
            dispatch(login(data.user.id));
          }
        } catch {}
      },
    }),

    // --- LOGOUT ---
    logout: builder.mutation<{ success: boolean }, void>({
      async queryFn() {
        try {
          const { error } = await supabase.auth.signOut();
          return { data: { success: !error } };
        } catch {
          return { data: { success: false } };
        }
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        dispatch(logout()); // Диспатчим экшен logout при выходе
      },
    }),

    // --- REGISTER ---
    registerUser: builder.mutation<AuthResponseData, UserData>({
      async queryFn(userData) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
              data: {
                first_name: userData.first_name,
                last_name: userData.last_name,
              },
            },
          });

          if (error) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                data: {
                  user: null,
                  isAdmin: false,
                  error: { name: error.name, message: error.message },
                },
              },
            };
          }
          return { data: { user: data.user, isAdmin: false, error: null } };
        } catch (e) {
          const ownError = {
            name: e instanceof Error ? e.name : "UnknownError",
            message: e instanceof Error ? e.message : String(e),
          };
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: { user: null, isAdmin: false, error: ownError },
            },
          };
        }
      },
    }),

    // --- GET CURRENT USER + подписка на изменения сессии ---
    getCurrentUser: builder.query<AuthResponseData, void>({
      async queryFn() {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            const { data: adminData } = await supabase
              .from("admins")
              .select("id")
              .eq("id", user.id)
              // .single();
              .maybeSingle();

            const isAdmin = !!adminData;
            return { data: { user, isAdmin, error: null } };
          }

          return { data: { user: null, isAdmin: false, error: null } };
        } catch (e) {
          const ownError = {
            name: e instanceof Error ? e.name : "UnknownError",
            message: e instanceof Error ? e.message : String(e),
          };
          return { data: { user: null, isAdmin: false, error: ownError } };
        }
      },

      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          await cacheDataLoaded;

          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
              let isAdmin = false;

              if (session?.user) {
                const { data: adminData } = await supabase
                  .from("admins")
                  .select("id")
                  .eq("id", session.user.id)
                  // .single();
                  .maybeSingle();
                isAdmin = !!adminData;
              }

              dispatch(
                authApi.util.updateQueryData(
                  "getCurrentUser",
                  undefined,
                  (draft) => {
                    draft.user = session?.user || null;
                    draft.isAdmin = isAdmin;
                  }
                )
              );
            }
          });

          await cacheEntryRemoved;
          subscription?.unsubscribe();
        } catch {
          // silent fail
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useRegisterUserMutation,
  useLogoutMutation,
} = authApi;
