import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Connected = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [time, setTime] = useState(new Date(Date.UTC(2024, 0, 1)));
  const [redirectTimer, setRedirectTimer] = useState(5);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => new Date(prevTime.getTime() + 1000));
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isFocused]);

  useEffect(() => {
    if (redirectTimer === 0) {
      clearInterval(intervalRef.current);
      navigation.navigate('Dashboard');
    }
  }, [redirectTimer, navigation]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.dash}>DASHBOARD</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/aps.png')} style={styles.imageconnected} />
        <Text style={styles.connected}>Connected</Text>
        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>
            {formatTime(time.getUTCHours())}:{formatTime(time.getMinutes())}:{formatTime(time.getSeconds())}
          </Text>
        </View>
        <Image source={require('../assets/Enable.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#301934',
    color: 'white',
  },
  text: {
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 0,
    marginTop: 150,
    marginLeft: 150,
  },
  dash: {
    color: 'white',
    backgroundColor: 'teal',
    padding: 7,
    textAlign: 'center',
    width: '30%',
    marginTop: 30,
  },
  imageconnected: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 60,
    marginTop: 100,
    marginLeft: 150,
  },
  connected: {
    color: 'white',
    fontSize: 20,
    marginLeft: 155,
  },
  clockText: {
    color: 'white',
    fontSize: 24,
  },
  clockContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});


export default Connected;
