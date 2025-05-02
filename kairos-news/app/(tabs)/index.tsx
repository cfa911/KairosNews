import { View, Text, StyleSheet, TextInput, Keyboard, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import FadeInView from '@/components/FadeInView';
import Typewriter from '@/components/TypeWriter';
import DropDownPicker, { SelectList } from 'react-native-dropdown-select-list';
import React from 'react';

export default function TabOneScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Filtros Avançados" onPress={() => {
            setShowSecondButton(true);
          }} />
          {showSecondButton && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Escolher Data" onPress={() => {
              }} />
   <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
            </View>

          )}
        </View>
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
    marginBottom: 30
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
  },
  button: {
  }
});