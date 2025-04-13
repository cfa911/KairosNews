import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';
import { TypeAnimation } from 'react-type-animation';

export default function resultQuery() {
  const [query, setQuery,] = useState('');
  const [topic, setTopic] = useState('');
  useEffect(() => {
    const loadQuery = async () => {
      const name = await AsyncStorage.getItem('query');
      if (name) setQuery(name);
    };
    loadQuery();
  }, []);

  useEffect(() => {
    const loadTopic = async () => {
      const name = await AsyncStorage.getItem('topic');
      if (name) setTopic(name);
    };
    loadTopic();
  }, []);


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Sumário Criado para a noticia "{query}" e topico "{topic}"</Text>
      </View>
      <View>
        <TypeAnimation
          sequence={[
            'Backstreet Boys: cinco Backstreet Men a cantar as mesmas coisas que cantavam aos vinte anos, a encetar as mesmas coreografias, sempre com cuidado para que a voz não se finde ou a anca salte para fora. Nos final dos anos 90, difícil era não ver a cara de cada um dos backstreet Boys escarrapachada à nossa frente: em painéis publicitários, em posters de revistas para jovens, na MTV. Lembra-se daquela altura em que a cueca de fora era uma símbolo de estilo, com a sensualidade à mistura? Ligava-se a rádio e lá estavam eles; ia-se a uma festa de fim de ano do liceu. Lá estavam eles; pedia-se o discman do amigo emprestado. lá estavam eles, bonitos, cheirosos, as vozes a debitar canções românticas e xaroposas, R&B de fazer saltitar as hormonas de milhões atrás de milhões de millenials adolescentes.', // Types 'One'
            1000,
            () => {
              console.log('Sequence completed');
            },
          ]}
          speed={100}
          wrapper="span"
          cursor={false}
          repeat={1}
          style={{ marginTop: 30, color: '#ffffff', fontFamily: 'Bahnschrift', width: '60vw', fontSize: '1.6rem' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap', backgroundColor: '#101218', padding: 10
  },
  titulo: { fontSize: '3rem', color: '#ffffff' },
});