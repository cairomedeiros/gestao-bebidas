import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SalesScreen from './screens/SalesScreen';
import InventoryScreen from './screens/InventoryScreen';
import RevenueScreen from './screens/RevenueScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sales" component={SalesScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Revenue" component={RevenueScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
