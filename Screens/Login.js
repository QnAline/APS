import { useState,useEffect} from 'react';
import { StyleSheet, Alert,Text,TextInput,TouchableOpacity, View,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'



export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  checkLoginStatus();
}, [navigation]);

   const handleLogin = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      if (username === user.email && password === user.password) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } else {
      Alert.alert('Error', 'User not found. Please register.');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/aps.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.login} onPress={handleLogin}>
      <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>New to the app</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#301934',
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor:'white',
    marginBottom: 16,
    width: 150,
    paddingLeft: 8,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 120,
    color: 'white',
  },
  loginButton: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 100, 
    height: 100,
    borderRadius: 50, 
    marginBottom: 60,
    marginTop: 100,
    marginLeft: 150,
},
login: {
  backgroundColor: 'white',
  padding: 10,
  marginLeft: 140,
  marginTop: 40,
  marginBottom: 40,
  borderRadius: 5,
  width: 120,
  
},
loginText:{
  color: 'black',
  textAlign: 'center',
},
signText:{
  color: 'white',
  textAlign: 'center',
},
signup: {
  backgroundColor: 'teal',
  padding: 10,
  margin: 10,
  borderRadius: 5,
  width: 120,
},
 buttonContainer: {
 flexDirection: 'row', 
 marginLeft: 50,
},

forgot: {
  padding: 10,
  margin: 10,
  borderRadius: 5,
},
forgotText: {
  color: 'white',
  textAlign: 'center',
},
});
