import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [tinNumber, setTinNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleSignUp = async () => {
        try {
          
          if (!email || !password || !plateNumber || !tinNumber || !phoneNumber) {
            console.error('Error during signup: Please fill in all the required fields.');
            return;
          }
          else{
           
            const user = { email, password, plateNumber, tinNumber, phoneNumber };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            console.log('Signup:', user);
            navigation.navigate('Login');
          }
         
        } catch (error) {
          console.error('Error during signup:', error);
        }
      };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Plate Number"
        placeholderTextColor="white"
        onChangeText={setPlateNumber}
        value={plateNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="TIN Number"
        placeholderTextColor="white"
        onChangeText={setTinNumber}
        value={tinNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        placeholderTextColor="white"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <TouchableOpacity style={styles.signup} onPress={handleSignUp}>
        <Text style={styles.signText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#301934',
    color: 'white',
    paddingTop: 40,
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginBottom: 16,
    width: 150,
    paddingLeft: 8,
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 120,
    color: 'white',
  },
  signText: {
    color: 'white',
    textAlign: 'center',
  },
  signup: {
    backgroundColor: 'teal',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 120,
    marginTop: 30,
    marginLeft: 130,
  },
});

export default SignupPage;
