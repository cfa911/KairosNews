import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';


export default function KairosNewsTitle() {
  const navigation = useRouter();

  const onPress = () => {
    navigation.push({ pathname: '/' }); // Replace 'Home' with the name of your index route
  };

  return (
    <TouchableHighlight onPress={onPress}>
      <Text style={styles.kairo}>Kairos<Text style={styles.news}>News</Text></Text>
    </TouchableHighlight >
  )

}
const styles = StyleSheet.create({
  kairo: {
    color: '#13ed8c',
    fontSize: 45,
    fontWeight: '600',
    fontFamily: 'Bahnschrift',
    textAlign: 'left'
  },
  news: {
    color: '#ffffff',
    fontSize: 45,
    fontFamily: 'Bahnschrift'
  },
});

