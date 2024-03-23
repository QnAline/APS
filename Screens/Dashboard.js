import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import DrawerLayout from 'react-native-drawer-layout-polyfill'; 
import { Foundation } from '@expo/vector-icons';

const Dashboard = () => {
  const [accidents, setAccidents] = useState([]);
  const [remainingTime, setRemainingTime] = useState(5);
  const [timerExpired, setTimerExpired] = useState(false);
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const openDrawer = () => {
    drawerRef.current && drawerRef.current.openDrawer();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    drawerRef.current && drawerRef.current.closeDrawer();
    setDrawerOpen(false);
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.43.149:3000/accidents/1');
      const data = await response.json();

      if (data.hazardLevel === 'high') {
        playHighSound();
        const dataArray = [data];
        setAccidents(dataArray);
        startTimer();
      } else if (data.hazardLevel === 'moderate') {
        playModerateSound();
        const dataArray = [data];
        setAccidents(dataArray);
      } else {
        playLowSound();
        const dataArray = [data];
        setAccidents(dataArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const startTimer = async () => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          setTimerExpired(true);
          clearInterval(timerInterval);
          playAlertSound();
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  };

  const playAlertSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/brakes.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  };

  const playHighSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Collision.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  };

  const playModerateSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/moderate.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  };

  const playLowSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/safe.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  };

const DrawerContent = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Text style={styles.drawerItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Details')}>
        <Text style={styles.drawerItem}>Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Feedback')}>
        <Text style={styles.drawerItem}>Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};
  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      drawerType="front"
      drawerBackgroundColor="white"
      renderNavigationView={() => (
        <View style={{ flex: 1, backgroundColor: '#fff',width: 220,textAlign:'center' }}>
         
          <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Text style={ styles.stack }> HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
          <Text style={ styles.stack }>DASHBOARD </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Feedback')}>
          <Text style={ styles.stack }> FEEDBACKS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Details')}>
          <Text style={ styles.stack }> RECENTLY</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={openDrawer} style={styles.more}>
          <Foundation name="indent-more" size={34} color="white" />
        </TouchableOpacity>

        {accidents.length > 0 && (
          <>
            {accidents[0].hazardLevel === 'high' && (
              <>
                <View style={styles.warning}>
                  <Ionicons name="warning" size={54} color="red" />
                  <Text style={styles.warningText}>Collision detected</Text>
                </View>

                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {accidents.map((accident, index) => (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: accident.latitude,
                        longitude: accident.longitude,
                      }}
                      title={`Accident ${index + 1}`}
                      description="Accident details here"
                    />
                  ))}
                </MapView>

                {timerExpired ? (
                  <View style={styles.alert}>
                   <View style={styles.break}>
                    <MaterialCommunityIcons
                      name="car-brake-alert"
                      size={94}
                      color="blue"
                    />
                   </View>
                    <Text style={styles.alertText}>Brake triggered!</Text>
                  </View>
                ) : (
                  <Text style={styles.Timer}>
                    Time remaining: {remainingTime} seconds
                  </Text>
                )}
                
              </>
            )}

            {accidents[0].hazardLevel === 'moderate' && (
              <>
                <View style={styles.moderateWarning}>
                  <Ionicons name="alert" size={54} color="#F6D776" />
                  <Text style={styles.moderateWarningText}>Moderate hazard</Text>
                </View>

                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {accidents.map((accident, index) => (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: accident.latitude,
                        longitude: accident.longitude,
                      }}
                      title={`Accident ${index + 1}`}
                      description="Accident details here"
                    />
                  ))}
                </MapView>

                <View style={styles.notify}>
                  <Ionicons name="notifications" size={104} color="#F6D776" />
                </View>
                <Text style={styles.notifyText}>
                  {' '}
                  Slow down before automatic breaks triggered
                </Text>
                
              </>
            )}
            {accidents[0].hazardLevel === 'low' && (
              <>
                <View style={styles.lowWarning}>
                  <Entypo name="notification" size={54} color="green" />
                  <Text style={styles.lowWarningText}>Low potential hazard </Text>
                </View>

                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {accidents.map((accident, index) => (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: accident.latitude,
                        longitude: accident.longitude,
                      }}
                      title={`Accident ${index + 1}`}
                      description="Accident details here"
                    />
                  ))}
                </MapView>

                <View style={styles.notify}>
                  <Ionicons name="notifications" size={54} color="green" />
                </View>
                <Text style={styles.notifyTextLow}> Road Is Safe</Text>
              </>
            )}
          </>
        )}
      </View>
    </DrawerLayout>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'white',
  },
  dash: {
    color: 'white',
    backgroundColor: 'teal',
    padding: 7,
    textAlign: 'center',
    width: '30%',
    marginTop: 30,
  },
  map: {
    
    marginLeft: 20,
    marginTop: 30,
    width: "90%",
    height: 300,
  },
  warningText: {
    color: 'red',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
  },
  warning: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  Timer: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginLeft: 25,
    marginBottom: 235,
  },
  alertText: {
    color: 'blue',
    fontSize: 18,
    marginLeft: 0,
  },
  alert: {
    marginTop: 40,
    marginLeft: 120,
  },
 break:{
   marginLeft: 10,
},
  moderateWarning: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  lowWarning:{
    flexDirection: 'row',
    marginLeft: 30,
    marginBottom:10,
    marginTop: 40,
  },
  moderateWarningText: {
    color: '#F6D776',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  lowWarningText:{
    color: 'green',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
  },
  notify:{

    marginTop: 40,
    marginLeft: 125,
  },
  notifyText:{
    marginLeft: 25,
    fontSize: 15,
    color:'#F6D776',
    fontWeight: 'bold',
  },
  notifyTextLow:{
    marginLeft: 110,
    fontSize: 15,
    color:'green',
    fontWeight: 'bold',
  },
  recently:{
    marginTop: 12,
    marginBottom:0,
    backgroundColor:'#301934',
    color: 'white',
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
  recentlymoderate:{
    marginTop: 112,
    marginBottom:0,
    backgroundColor:'#301934',
    color: 'white',
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
  recentlylow:{
    marginTop: 50,
    marginBottom:0,
    backgroundColor:'#301934',
    color: 'white',
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
more:{

marginBottom: 10,
backgroundColor:'#301934',
padding: 10,

textAlign: 'center',
},
stack:{
  backgroundColor:'#301934',
  marginBottom: 10,
  color:'white',
  padding: 10,
}
});

export default Dashboard;
