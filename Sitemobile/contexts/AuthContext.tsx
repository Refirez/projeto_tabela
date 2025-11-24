// contexts/AuthContext.tsx - ATUALIZADO
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContextData } from '../types/auth';
import { User } from '../types/user';

const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  updateQuizScore: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const STORAGE_KEY = '@periodic_table_user';

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar dados do usuário');
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserToStorage = async (userData: User | null) => {
    try {
      if (userData) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar dados do usuário');
      console.error('Error saving user:', error);
    }
  };

  // ✅ AGORA RECEBE OS DADOS REAIS DO USUÁRIO
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Verifica se existe um usuário com este email
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.email === email) {
          setUser(parsedUser);
          await saveUserToStorage(parsedUser);
        } else {
          throw new Error('Usuário não encontrado');
        }
      } else {
        throw new Error('Nenhum usuário cadastrado');
      }
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha incorretos');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ CADASTRO COM DADOS REAIS
  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name, // ✅ NOME REAL DO USUÁRIO
        favorites: [],
        quizScores: {}
      };
      setUser(newUser);
      await saveUserToStorage(newUser);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha no cadastro');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    saveUserToStorage(null);
  };

  const addFavorite = (elementSymbol: string) => {
    if (user && !user.favorites.includes(elementSymbol)) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, elementSymbol]
      };
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
    }
  };

  const removeFavorite = (elementSymbol: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: user.favorites.filter(fav => fav !== elementSymbol)
      };
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
    }
  };

  const updateQuizScore = (elementSymbol: string, score: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        quizScores: {
          ...user.quizScores,
          [elementSymbol]: {
            score,
            completed: true,
            timestamp: new Date()
          }
        }
      };
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
    }
  };

  const value: AuthContextData = {
    user,
    isAuthenticated: !!user,
    loading,
    signIn,
    signUp,
    signOut,
    addFavorite,
    removeFavorite,
    updateQuizScore
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
