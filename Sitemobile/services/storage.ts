// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user'; // ✅ Importar do arquivo correto

export const StorageService = {
  async saveUser(user: User) {
    await AsyncStorage.setItem('@user', JSON.stringify(user));
  },
  
  async getUser(): Promise<User | null> {
    const user = await AsyncStorage.getItem('@user');
    return user ? JSON.parse(user) : null;
  },
  
  async clearUser() {
    await AsyncStorage.removeItem('@user');
  }
};