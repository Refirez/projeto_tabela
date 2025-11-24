// app/(app)/(tabs)/index.tsx
import { useAuth } from '@/hooks/useAuth'; // ✅ Corrigir importação
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuth();

  // ✅ Adicionar tipagem para os quizzes
  const userQuizzes = user ? Object.entries(user.quizScores || {}) as [string, any][] : [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo{user?.name ? `, ${user.name}` : ''}!</Text>
        <Text style={styles.subtitle}>Sua jornada na tabela periódica</Text>
      </View>

      {/* Estatísticas Rápidas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user?.favorites?.length || 0}</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userQuizzes.length}</Text>
          <Text style={styles.statLabel}>Quizzes Feitos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {userQuizzes.length > 0 
              ? Math.round(userQuizzes.reduce((acc, [_, quiz]) => acc + (quiz.score || 0), 0) / userQuizzes.length)
              : 0
            }%
          </Text>
          <Text style={styles.statLabel}>Pontuação Média</Text>
        </View>
      </View>

      {/* Ações Rápidas */}
      <View style={styles.actionsContainer}>
        <Link href="/(app)/(tabs)/tabela" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📊 Explorar Tabela</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/(app)/(tabs)/profile" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>👤 Meu Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Quizzes Recentes */}
      {userQuizzes.length > 0 && (
        <View style={styles.quizzesContainer}>
          <Text style={styles.sectionTitle}>Quizzes Recentes</Text>
          {userQuizzes.slice(0, 5).map(([symbol, quiz]) => (
            <View key={symbol} style={styles.quizItem}>
              <Text style={styles.quizSymbol}>{symbol}</Text>
              <Text style={styles.quizScore}>{quiz.score}%</Text>
              <Text style={styles.quizDate}>
                {new Date(quiz.timestamp).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Elementos Favoritos */}
      {user?.favorites && user.favorites.length > 0 && (
        <View style={styles.favoritesContainer}>
          <Text style={styles.sectionTitle}>Elementos Favoritos</Text>
          <View style={styles.favoritesGrid}>
            {user.favorites.slice(0, 6).map((symbol) => (
              <View key={symbol} style={styles.favoriteItem}>
                <Text style={styles.favoriteSymbol}>{symbol}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#1e40af',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#dbeafe',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  quizzesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  quizItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quizSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  quizScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  quizDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  favoritesContainer: {
    padding: 16,
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  favoriteItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  favoriteSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },
});