// types/auth.ts
import { User } from './user';

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // ✅ Lembre-se de adicionar esta propriedade
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  addFavorite: (elementSymbol: string) => void;
  removeFavorite: (elementSymbol: string) => void;
  updateQuizScore: (elementSymbol: string, score: number) => void;
}