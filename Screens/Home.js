
import { View,Image ,StyleSheet,Text, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const navigation = useNavigation();
    return (
     
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.dash}>DASHBOARD</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Connected')}>
        <Image
          source={require('../assets/Enable.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      
    </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        backgroundColor: '#301934',
        color: 'white',
      },
    text:{
        color: 'white',
      },
    image: {
        width: 100, 
        height: 100,
        borderRadius: 50, 
        marginBottom: 0,
        marginTop: 450,
        marginLeft: 150,               
      },
     dash:{
        color:'white',
        backgroundColor:'teal',
        padding:7,
        textAlign: 'center',
        width: '30%',
        marginTop:30,


     },
     feedback:{
      color:'white',
      backgroundColor:'teal',
      padding:12,
      textAlign: 'center',
      width: '100%',
      marginTop:115.5,
      marginBottom: 0,
     }
});
 
export default Home;