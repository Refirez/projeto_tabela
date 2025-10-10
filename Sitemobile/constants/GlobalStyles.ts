import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const useGlobalStyles = () => {
  const theme = useTheme();
  
  return StyleSheet.create({
    // Estilos de tabela
    tableContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    table: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      overflow: 'hidden',
    },
    tableHeader: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      color: theme.colors.text,
      fontSize: 16,
    },
    tableRow: {
      flexDirection: 'row',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    tableCell: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 14,
    },
    // Estilos gerais
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
    },
  });
};