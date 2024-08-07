import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Bebidas</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Registrar Venda"
          onPress={() => navigation.navigate('Sales')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Verificar Estoque"
          onPress={() => navigation.navigate('Inventory')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Verificar Faturamento"
          onPress={() => navigation.navigate('Revenue')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 12,
  },
});

export default HomeScreen;
