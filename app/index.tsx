import { useCommitments } from "@/src/client/hooks/useCommitments";
import * as Sentry from "@sentry/react-native";
import { defaultConfig } from "@tamagui/config/v5";
import { Button, createTamagui, TamaguiProvider, Text, View } from "tamagui";

const config = createTamagui(defaultConfig);

export default function Index() {
  const { data } = useCommitments();
  return (
    <TamaguiProvider config={config} defaultTheme="light">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            {data?.data ? `${data.data.length} commitments` : "Loading..."}
          </Text>
          <Button
            onPress={() => {
              Sentry.captureException(new Error("First error"));
            }}
          >
            Try!
          </Button>
        </View>
    </TamaguiProvider>
  );
}
