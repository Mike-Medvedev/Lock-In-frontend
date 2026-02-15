import * as Sentry from "@sentry/react-native";
import { defaultConfig } from "@tamagui/config/v5";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, createTamagui, TamaguiProvider, Text, View } from "tamagui";

const config = createTamagui(defaultConfig);

const queryClient = new QueryClient();

const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function Index() {
  return (
    // <StripeProvider
    //   publishableKey={publishableKey!}
    //   merchantIdentifier="merchant.identifier" // required for Apple Pay
    //   urlScheme="lockinfrontend" // required for 3D Secure and bank redirects
    // >
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="light">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Edit app/index.tsx to edit this screen.</Text>
          <Button
            onPress={() => {
              Sentry.captureException(new Error("First error"));
            }}
          >
            Try!
          </Button>
        </View>
      </TamaguiProvider>
    </QueryClientProvider>
    // </StripeProvider>
  );
}
