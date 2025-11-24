// app/(auth)/_layout.tsx (se você tiver)
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ title: 'Login' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Criar Conta' }} />
    </Stack>
  );
}