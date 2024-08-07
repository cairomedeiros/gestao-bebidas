import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SalesScreen = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const saveSale = async () => {
    try {
      const sale = {
        product,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        date: new Date().toISOString(),
      };
      const existingSales = await AsyncStorage.getItem('sales');
      const sales = existingSales ? JSON.parse(existingSales) : [];
      sales.push(sale);
      await AsyncStorage.setItem('sales', JSON.stringify(sales));
      alert('Venda registrada com sucesso!');
      setProduct('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Erro ao salvar a venda:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Produto</Text>
      <TextInput
        style={styles.input}
        value={product}
        onChangeText={setProduct}
      />
      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Salvar Venda" onPress={saveSale} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
});

export default SalesScreen;
