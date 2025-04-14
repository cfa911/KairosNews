import { View, Text, StyleSheet, TextInput, Keyboard, Image } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react'
import FadeInView from '@/components/FadeInView';
import Typewriter from '@/components/TypeWriter';

export default function TabOneScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!query.trim()) return;
    await AsyncStorage.setItem('query', query.trim());
    Keyboard.dismiss();
    router.push('/chooseTopic'); // Navigate to /home
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
        {/* <TypeAnimation
          sequence={[
            300,
            'Atenção que a informação disponivel é apenas relevante a 2022!', // Types 'One'
            1000,
            'Insira o input acima e em seguida escolha o topico na pagina seguinte', // Types 'One'
            2000,
            'Atenção que a informação disponivel é apenas relevante a 2022!', // Types 'One'
            1000,

            // Waits 1s
            () => {
              console.log('Sequence completed');
            },
          ]}
          speed={70}
          cursor={false}
          repeat={1}
          style={{ marginTop: 30, color: '#ffffff', fontFamily: 'Bahnschrift' }}
        /> */}
        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typewriter speed={20} textStyle={styles.nota} text={"   Banco de dados apenas relevante ao ano 2022   "} />

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
    marginBottom:  30
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: '10%',

  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#cce',
    padding: 12,
    borderRadius: 5,
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
  }
});