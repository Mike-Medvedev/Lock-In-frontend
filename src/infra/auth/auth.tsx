import { supabase } from "@/src/setupClient";
import React, { useEffect, useState } from "react";
import { Alert, AppState } from "react-native";
import { Button, Input, Label, View, YStack } from "tamagui";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
    return () => subscription.remove();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View padding="$4" marginTop="$6" maxWidth={400} alignSelf="center">
      <YStack gap="$4">
        <YStack gap="$2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            onChangeText={setEmail}
            placeholder="email@address.com"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
        </YStack>
        <YStack gap="$2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            autoComplete="password"
          />
        </YStack>
        <YStack gap="$2" marginTop="$2">
          <Button onPress={signInWithEmail} disabled={loading} theme="active">
            Sign in
          </Button>
          <Button
            onPress={signUpWithEmail}
            disabled={loading}
            variant="outlined"
          >
            Sign up
          </Button>
        </YStack>
      </YStack>
    </View>
  );
}
