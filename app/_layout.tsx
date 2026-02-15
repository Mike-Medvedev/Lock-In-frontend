import { Stack } from "expo-router";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://744b6c854264b6261aac5aa75d208a51@o4510432959070208.ingest.us.sentry.io/4510891705171968',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  return <Stack />;
});