// app/(app)/(tabs)/profile.tsx
import { useAuth } from '@/hooks/useAuth'; // ✅ Corrigir importação
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  // ✅ Adicionar tipagem para os quizzes
  const userQuizzes = user ? Object.entries(user.quizScores || {}) as [string, any][] : [];

  const handleSignOut = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: signOut }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header do Perfil */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.favorites?.length || 0}</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userQuizzes.length}</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {userQuizzes.length > 0 
              ? Math.round(userQuizzes.reduce((acc, [_, quiz]) => acc + (quiz.score || 0), 0) / userQuizzes.length)
              : 0
            }%
          </Text>
          <Text style={styles.statLabel}>Média</Text>
        </View>
      </View>

      {/* Elementos Favoritos */}
      {user?.favorites && user.favorites.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elementos Favoritos</Text>
          <View style={styles.favoritesGrid}>
            {user.favorites.map((symbol) => (
              <View key={symbol} style={styles.favoriteChip}>
                <Text style={styles.favoriteText}>{symbol}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Histórico de Quizzes */}
      {userQuizzes.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Quizzes</Text>
          {userQuizzes.map(([symbol, quiz]) => (
            <View key={symbol} style={styles.quizItem}>
              <View style={styles.quizInfo}>
                <Text style={styles.quizElement}>Elemento: {symbol}</Text>
                <Text style={styles.quizScore}>Pontuação: {quiz.score}%</Text>
                <Text style={styles.quizDate}>
                  Realizado em: {new Date(quiz.timestamp).toLocaleDateString('pt-BR')}
                </Text>
              </View>
              <View style={[
                styles.quizStatus,
                { backgroundColor: quiz.score >= 70 ? '#10b981' : '#ef4444' }
              ]}>
                <Text style={styles.quizStatusText}>
                  {quiz.score >= 70 ? 'Aprovado' : 'Reprovado'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Botão Sair */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  favoriteChip: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  favoriteText: {
    color: '#1e40af',
    fontWeight: '600',
    fontSize: 14,
  },
  quizItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  quizInfo: {
    flex: 1,
  },
  quizElement: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  quizScore: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  quizDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  quizStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quizStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  signOutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});