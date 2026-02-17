import Auth from "@/src/infra/auth/auth";
import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui, TamaguiProvider } from "tamagui";

const config = createTamagui(defaultConfig);

export default function Index() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Auth />
    </TamaguiProvider>
  );
}
