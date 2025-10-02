"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  favorites: string[];
  toggleFavorite: (elementSymbol: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação de login - na prática, faria uma requisição à API
    const userData = { id: '1', email, name: 'Usuário' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulação de registro
    const userData = { id: '1', email, name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const toggleFavorite = (elementSymbol: string) => {
    if (!user) return;
    
    setFavorites(prev => {
      const newFavorites = prev.includes(elementSymbol)
        ? prev.filter(fav => fav !== elementSymbol)
        : [...prev, elementSymbol];
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}