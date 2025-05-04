import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Typewriter from '@/components/TypeWriter';

export default function resultQuery() {


  const { id, query, topic, dateInterval } = useLocalSearchParams();
  console.log({ id, query, topic });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Prompt de entrada: "{query}" </Text>
        <Text style={styles.titulo}>Topico de escolha: "{topic}" </Text>
        <Text style={styles.titulo}>Intervalo temporal: "{dateInterval}" </Text>
      </View>
      <View>
        <Typewriter
          text = {'Backstreet Boys: cinco Backstreet Men a cantar as mesmas coisas que cantavam aos vinte anos, a encetar as mesmas coreografias, sempre com cuidado para que a voz não se finde ou a anca salte para fora. Nos final dos anos 90, difícil era não ver a cara de cada um dos backstreet Boys escarrapachada à nossa frente: em painéis publicitários, em posters de revistas para jovens, na MTV. Lembra-se daquela altura em que a cueca de fora era uma símbolo de estilo, com a sensualidade à mistura? Ligava-se a rádio e lá estavam eles; ia-se a uma festa de fim de ano do liceu. Lá estavam eles; pedia-se o discman do amigo emprestado. lá estavam eles, bonitos, cheirosos, as vozes a debitar canções românticas e xaroposas, R&B de fazer saltitar as hormonas de milhões atrás de milhões de millenials adolescentes.'}
          speed={20}
          textStyle={styles.conteudo}
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
  titulo: { fontSize: 30, color: '#ffffff' },
  conteudo: {  color: '#ffffff', fontFamily: 'Bahnschrift', fontSize: 20},
});