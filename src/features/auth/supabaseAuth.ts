import type { User } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase/supabase";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";


type UserData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};
// тип возвращаемого значения: объект пользователя или ошибка
type ResponseData = {
    user: User | null;
    error: OwnError |null;
};

type OwnError = {
  name: string;
  message: string;
};

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery:fakeBaseQuery(),
    endpoints:(builder) => ({
         registerUser: builder.mutation<ResponseData, UserData>({
async queryFn(userData) {
        try {
          const { email, password, first_name, last_name } = userData;

          const { data: signUpData, error } = await supabase.auth.signUp(
            {
              email,
              password,
              options: {
                data: {
                  first_name,
                  last_name,
                },
              },
            }
          );

          if (error) {
            return { data: { user: null, error } };
          } else {
            return { data: { user: signUpData.user, error: null } };
          }
        } catch (e) {
          const ownError: OwnError = {
            name: e instanceof Error ? e.name : "UnknownError",
            message: e instanceof Error ? e.message : String(e),
          };
          return { data: { user: null, error: ownError } };
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
  

