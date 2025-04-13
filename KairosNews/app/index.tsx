import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { TypeAnimation } from 'react-type-animation';



const KairosNews = () => {

  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!query.trim()) return;
    await AsyncStorage.setItem('query', query.trim());
    Keyboard.dismiss();
    router.push('/second-step'); // Navigate to /home
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.title}>
        <Text style={styles.kairo}>Kairos<Text style={styles.news}>News</Text></Text>
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
        <TypeAnimation
      sequence={[
        300,
        'Atenção que a informação disponivel é apenas relevante a 2022!', // Types 'One'
        1000,
        'Insira o input acima e em seguida escolha o topico na pagina seguinte', // Types 'One'
        2000,

         // Waits 1s
        () => {
          console.log('Sequence completed');
        },
      ]}
      speed={70}
      wrapper="span"
      cursor={false}
      repeat={1}
      style={{ marginTop: 30,color: '#ffffff',fontFamily:'Bahnschrift'}}
    />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#101218'

  },
  title: {
    display: 'flex',
    flex: 0.5,
    flexDirection: 'column-reverse',
    marginBottom:'2em'
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
    color:'#ccc',
    backgroundColor:'#3f4454',
    fontSize: '1.2em',
    fontWeight:'400',
    textAlign:'center'

  },
  kairosNews:{
    fontSize: '4.2rem',
    textAlign: 'center'
  },
  kairo: {
    color: '#13ed8c',
    fontSize: '4.2rem',
    fontWeight: '600',
    fontFamily: 'Bahnschrift',
    textAlign: 'center'
  },
  news: {
    color: '#ffffff',
    fontSize: '4.2rem',
    fontFamily: 'Bahnschrift'
  }
})





export default KairosNews;