import HeadKairoNews from '@/components/HeadKairoNews';
import { checkJobStatus } from '@/utils/api';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function resultQuery() {


  const { id, query, topic, start_date, end_date,response } = useLocalSearchParams();
  console.log('response:', response);
  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <HeadKairoNews />
      <View style={{ marginTop: 20, marginHorizontal: '5%', flex: 1, }}>
        <View style={{ borderWidth: 2, borderColor: '#13ed8c', borderRadius: 10, padding: 10, backgroundColor: '#13ed8c', marginBottom: 30, marginTop: 15 }}>
          <Text style={{ fontSize: 30, color: '#000000', textAlign: 'center', fontFamily: 'Bahnschrift', }}>Valores da Pesquisa</Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titulo}>Noticia pesquisada:  </Text>
              <Text style={styles.tituloPrompts}>"{query}" </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titulo}>Topico:  </Text>
              <Text style={styles.tituloPrompts}>"{topic}"</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.titulo}>Data: </Text>
              <Text style={styles.tituloPrompts}>"{start_date} / {end_date}"</Text>

            </View>
          </View>
        </View>
      </View>
      <View>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={{ borderWidth: 2, backgroundColor: '#0BBF70', borderColor: '#0BBF70', borderRadius: 10, padding: 10, marginBottom: 30, marginTop: 15 }}>
            <Text style={{ fontSize: 30, color: '#000000', textAlign: 'center', fontFamily: 'Bahnschrift', }}>Sumário Gerado</Text>
          </View>
          {/* <Typewriter
            text={summary}
            speed={3}
            textStyle={styles.conteudo}
          /> */}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <View style={{ borderWidth: 2, borderColor: '#077A48', borderRadius: 10, padding: 10, backgroundColor: '#077A48', marginBottom: 30, marginTop: 15 }}>
          <Text style={{ fontSize: 30, color: '#000000', textAlign: 'center', fontFamily: 'Bahnschrift', }}>Noticias Utilizadas</Text>
        </View>
        {/* {sourcesArray.map((source: string, index: number) => (
          <Text
            key={index}
            style={{ color: '#13ed8c', fontSize: 18, marginBottom: 10, textDecorationLine: 'underline' }}
            onPress={() => {
              if (source.startsWith('http')) {
                Linking.openURL(source);
              }
            }}
          >
            {source}
          </Text> */}

      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#101218',
  },
  container: {
    marginHorizontal: '5%',
    minHeight: 300,
    flex: 1,

  },
  titulo: { fontSize: 25, color: '#13ed8c', textAlign: 'center', fontFamily: 'Bahnschrift', },
  tituloPrompts: { fontSize: 20, color: '#ffffff', textAlign: 'center', fontFamily: 'Bahnschrift', },
  conteudo: { color: '#ffffff', fontFamily: 'Bahnschrift', fontSize: 20 },
});