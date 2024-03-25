import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

const Details = () => {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.31.135.90\:3000/accidents');
        const data = await response.json();

        // Check if 'accidents' array is not empty before setting state
        if (Array.isArray(data) && data.length > 0) {
          setAccidents(data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Group accidents by ID for SectionList
  const groupedAccidents = accidents.reduce((acc, accident) => {
    const id = accident.id;
    if (!acc[id]) {
      acc[id] = { title: `ID: ${id}`, data: [] };
    }
    acc[id].data.push(accident);
    return acc;
  }, {});

  const sections = Object.values(groupedAccidents);

  return (
    <View>
      <Text style={styles.sectionTitle}>Recently Hazards Occurred</Text>
      <View  style={styles.data}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>Latitude: {item.latitude}</Text>
            <Text style={styles.itemText}>Longitude: {item.longitude}</Text>
            <Text style={styles.itemText}>Type: {item.type}</Text>
            <Text style={styles.itemText}>Hazard Level: {item.hazardLevel}</Text>
            <Text style={styles.itemText}>Date: {item.date}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
            
          </View>
        )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#301934',
    color: 'white',
    padding: 20,
  },
  sectionHeader: {
    padding: 10,
   
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  
  },
  itemContainer: {
    marginBottom: 30,
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
  itemText:{
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    
  },
  data: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 40,
    elevation: 3, 
    
  },
});

export default Details;
