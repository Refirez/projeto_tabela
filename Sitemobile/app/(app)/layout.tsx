// app/(app)/layout.tsx - CORRETO
import { useAuth } from '@/hooks/useAuth'; // ✅ Importações NO TOPO
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // Ou um componente de loading
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}