// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  favorites: string[];
  quizScores: {
    [elementSymbol: string]: {
      score: number;
      completed: boolean;
      timestamp: Date;
    }
  };
}