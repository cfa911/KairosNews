import { View, Text, StyleSheet, TextInput, Keyboard, Image, Button,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import FadeInView from '@/components/FadeInView';
import Typewriter from '@/components/TypeWriter';
import React from 'react';
import { postData } from '@/utils/api.js'; // Adjust the import path as necessary

export default function TabOneScreen() {
  const [showSecondButton, setShowSecondButton] = useState(false);

  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const result = await postData(query, topic, '17-07-1998', '20-12-2025');
    if (result.success) {
      router.push({
        pathname: '/loading',
        params: { id: result.data.id }  // Pass ID to loading screen
      });
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 0.8, justifyContent: 'flex-end', alignItems: 'center' }}>
        <FadeInView style={styles.title}>
          <Text style={styles.kairo}>Kairos<Text style={styles.news}>News</Text></Text>
        </FadeInView>
      </View>

      <View style={styles.searchContainer} >
        <TextInput
          style={styles.searchBar}
          placeholder="De que se vai informar hoje?"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          autoFocus
        />
        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View  style={{ flex: 2 ,justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Filtros Avançados" color= '#13ed8c'  onPress={() => {
              setShowSecondButton(true);
            }} />
          </View>
          <View style={{ flex: 1 }}>
          {showSecondButton && (
            <FadeInView style={{ flex: 1, flexDirection: 'row',alignItems: 'stretch'  }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Button title="Escolha uma Data" onPress={() => {
              }} />
              </View>
              <View>
              <Button title="Insira um topico" onPress={() => {
              }} />
              </View>
            </FadeInView>
          )}
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typewriter speed={20} textStyle={styles.nota} text={"   Exprimente adicionar filtros para uma pesquisa mais minuciosa   "} />
        </View>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#101218'

  },
  title: {
    margin: 30,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: '10%',

  },
  searchBar: {
    borderWidth: 2,
    borderColor: '#cce',
    padding: 10,
    borderRadius: 23,
    color: '#ccc',
    backgroundColor: '#3f4454',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center'

  },
  kairo: {
    color: '#13ed8c',
    fontSize: 70,
    fontWeight: '600',
    fontFamily: 'Bahnschrift',
    textAlign: 'center'
  },
  news: {
    color: '#ffffff',
    fontSize: 70,
    fontFamily: 'Bahnschrift'
  },
  nota: {
    color: '#e2dd03',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Bahnschrift',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
  }
});