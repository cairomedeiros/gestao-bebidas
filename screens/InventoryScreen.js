import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InventoryScreen = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const savedSales = await AsyncStorage.getItem('sales');
        const sales = savedSales ? JSON.parse(savedSales) : [];
        setInventory(sales);
      } catch (error) {
        console.error('Erro ao carregar o inventário:', error);
      }
    };

    loadInventory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventário</Text>
      <FlatList
        data={inventory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Produto: {item.product}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <Text>Preço: {item.price}</Text>
            <Text>Data: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});

export default InventoryScreen;
