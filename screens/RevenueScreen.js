import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RevenueScreen = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const loadRevenue = async () => {
      try {
        const savedSales = await AsyncStorage.getItem('sales');
        const sales = savedSales ? JSON.parse(savedSales) : [];

        // Calculate monthly revenue
        const revenueByMonth = sales.reduce((acc, sale) => {
          const date = new Date(sale.date);
          const month = date.getMonth() + 1; // getMonth is zero-based
          const year = date.getFullYear();
          const monthYear = `${month}-${year}`;

          if (!acc[monthYear]) {
            acc[monthYear] = 0;
          }
          acc[monthYear] += sale.price * sale.quantity;

          return acc;
        }, {});

        // Convert to array for FlatList
        const revenueArray = Object.keys(revenueByMonth).map(monthYear => ({
          monthYear,
          total: revenueByMonth[monthYear],
        }));

        setMonthlyRevenue(revenueArray);
      } catch (error) {
        console.error('Erro ao carregar o faturamento:', error);
      }
    };

    loadRevenue();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faturamento Mensal</Text>
      <FlatList
        data={monthlyRevenue}
        keyExtractor={(item) => item.monthYear}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Mês/Ano: {item.monthYear}</Text>
            <Text>Total: R${item.total.toFixed(2)}</Text>
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

export default RevenueScreen;
