import React from 'react';
import Login from './Screens/Login';
import SignupPage from './Screens/Signup';
import Home from './Screens/Home';
import Connected from './Screens/connected';
import Dashboard from './Screens/Dashboard';
import Details from './Screens/details';
import Feedback from './Screens/feedback';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name="Login" component={Login} />
        <Stack.Screen  name="Signup" component={SignupPage} />
        <Stack.Screen  name="Home" component={Home} />
        <Stack.Screen  name="Connected" component={Connected} />
        <Stack.Screen  name="Dashboard" component={Dashboard} />
        <Stack.Screen  name="Details" component={Details} />
        <Stack.Screen  name="Feedback" component={Feedback} />
        
      </Stack.Navigator>

  
    </NavigationContainer>
  );
}
