import React, { useState } from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity,Alert } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase('feedback.db');

const Feedback = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const navigation= useNavigation();

  const saveFeedback = () => {
    if (!email || !phone || !message) {
        alert('Please fill in all the fields before sending feedback.');
        return;
      }
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Feedbacks (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, phone TEXT, message TEXT);',
        []
      );
      tx.executeSql(
        'INSERT INTO Feedbacks (email, phone, message) VALUES (?, ?, ?);',
        [email, phone, message],
        (_, results) => {
            if (results.rowsAffected > 0) {
                Alert.alert('Success', 'Feedback sent successfully!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      
                      navigation.navigate('Home'); // Replace 'Home' with the name of your home screen
                    },
                  },
                ]);
              } else {
                console.warn('Failed to save feedback.');
                Alert.alert('Error', 'Failed to send feedback. Please try again.');
              } 
        }
      );
    });
  };

  return (
    <View style={styles.FeedbackContainer}> 
    <Text style={styles.feedback} >GIVE US FEEDBACK</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="white"
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        placeholder="Your Message"
        placeholderTextColor="white"
        style={styles.input}
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      <TouchableOpacity style={styles.signup} onPress={saveFeedback}>
        <Text style={styles.signText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
    FeedbackContainer:{
        flex: 1,
        backgroundColor: '#301934',
        color: 'white',
        paddingTop: 100,

    },
    feedback:{
        color: 'white',
        marginLeft: 120,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
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
        marginTop: 15,
        color: 'white',
       
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
      signText: {
        color: 'white',
        textAlign: 'center',
      },
});
