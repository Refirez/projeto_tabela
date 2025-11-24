import { useAuth } from '@/hooks/useAuth'; // ✅ Importar o hook
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const ELEMENT_SYMBOLS = ['H', 'He', 'Li', 'C', 'O', 'N', 'Fe', 'Au', 'Ag', 'Cu'];

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [isNavigating, setIsNavigating] = useState(false);
  
  // ✅ MOVER useAuth para DENTRO do componente (após todas as declarações de hooks)
  const { isAuthenticated, user } = useAuth();

  // Função para resetar animações
  const resetAnimations = useCallback(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Reset quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      resetAnimations();
      return () => {
        // Cleanup opcional quando a tela perde foco
      };
    }, [resetAnimations])
  );

  // Animação inicial na montagem
  useEffect(() => {
    resetAnimations();
  }, [resetAnimations]);

    // No seu app/index.tsx - linha 79
const handleExplore = () => {
  if (isNavigating) return;
  
  console.log('🔘 Botão "Explorar Elementos" clicado');
  console.log('🔐 Status de autenticação:', isAuthenticated);
  console.log('👤 Usuário atual:', user);
  
  setIsNavigating(true);
  Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: -50,
      duration: 300,
      useNativeDriver: true,
    })
  ]).start(() => {
    console.log('🎯 Iniciando navegação...');
    
    if (isAuthenticated) {
      console.log('➡️ Navegando para: /(app)/(tabs)/tabela');
      router.push("/(app)/(tabs)/tabela");
    } else {
      console.log('➡️ Navegando para: /(auth)/sign-in');
      router.push("/(auth)/sign-in");
    }
    setIsNavigating(false);
  });
};
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3c72', '#2a5298']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Partículas de fundo */}
      <View style={styles.particles}>
        {ELEMENT_SYMBOLS.map((symbol, index) => (
          <Text 
            key={index}
            style={[
              styles.particle,
              { 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                transform: [{ scale: Math.random() * 0.5 + 0.5 }]
              }
            ]}
          >
            {symbol}
          </Text>
        ))}
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Logo/Título */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>⚗️</Text>
          <Text style={styles.mainTitle}>Tabela Periódica</Text>
          <Text style={styles.tagline}>Interativa</Text>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Explore os {""}
            <Text style={styles.highlight}>118 elementos</Text>
            {""} que formam a base de toda a matéria no universo. Uma experiência educativa e divertida.
          </Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, isNavigating && styles.buttonDisabled]}
            onPress={handleExplore}
            disabled={isNavigating}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>
                {isNavigating ? 'Carregando...' : 'Explorar Elementos'}
              </Text>
              <Text style={styles.buttonIcon}>🧪</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* ✅ Mostrar status de autenticação (opcional) */}
          {isAuthenticated && (
            <Text style={styles.welcomeText}>
              Bem-vindo, {user?.name}!
            </Text>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Períodos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Grupos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Famílias</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 40,
    maxWidth: 300,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  highlight: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  actionsContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  welcomeText: {
    color: '#90EE90',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 16,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});