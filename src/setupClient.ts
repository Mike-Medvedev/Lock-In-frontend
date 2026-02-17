import { createClient } from "@supabase/supabase-js";
import { client } from "./client/client.gen";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL ?? "",
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

client.setConfig({
  auth: async () => {
    const result = await supabase.auth.signInWithPassword({
      email: process.env.EXPO_PUBLIC_TEST_USER_EMAIL!,
      password: process.env.EXPO_PUBLIC_TEST_USER_PASSWORD!,
    });

    return result.data.session?.access_token;
  },
});
