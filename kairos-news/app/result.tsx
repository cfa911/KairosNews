import HeadKairoNews from '@/components/HeadKairoNews';
import Typewriter from '@/components/TypeWriter';
import { useLocalSearchParams } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function resultQuery() {
  const { id, query, topic, start_date, end_date, summary, articles } = useLocalSearchParams();

  const sumario = summary as string;
  const parsedArticles = articles ? JSON.parse(articles as string) : [];
  console.log('Parsed Articles:', parsedArticles);
  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <HeadKairoNews />
      <View style={{ marginTop: 20, marginHorizontal: '5%',}}>
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
      <View style={styles.container}>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={{ borderWidth: 2, backgroundColor: '#0BBF70', borderColor: '#0BBF70', borderRadius: 10, padding: 10, marginBottom: 30, marginTop: 15 }}>
            <Text style={{ fontSize: 30, color: '#000000', textAlign: 'center', fontFamily: 'Bahnschrift', }}>Sumário Gerado</Text>
          </View>
          <Typewriter
            text={sumario}
            speed={3}
            textStyle={styles.conteudo}
          />
        </ScrollView>
      </View>
      <View style={styles.container2}>
        <View style={{ borderWidth: 2, borderColor: '#077A48', borderRadius: 10, padding: 10, backgroundColor: '#077A48', marginBottom: 30, marginTop: 15 }}>
          <Text style={{ fontSize: 30, color: '#000000', textAlign: 'center', fontFamily: 'Bahnschrift', }}>Noticias Utilizadas</Text>
        </View>
        {parsedArticles.map((article: any, index: number) => (
          <View key={index} >
            <Text style={styles.link} onPress={() => Linking.openURL(article.url)}>
              <Text style={styles.unlinked}>Artigo:</Text> {article.url}
            </Text>
            <Text style={styles.conteudo}>Grau de correlação: {((1 - Number(article.distance)) * 100).toFixed(2)} %</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  )
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

  },
  container2: {
    marginHorizontal: '5%',
    minHeight: 300,
    flex: 1,
    marginBottom: 100,

  },
  titulo: { fontSize: 25, color: '#13ed8c', textAlign: 'center', fontFamily: 'Bahnschrift', },
  tituloPrompts: { fontSize: 20, color: '#ffffff', textAlign: 'center', fontFamily: 'Bahnschrift', },
  conteudo: { color: '#ffffff', fontFamily: 'Bahnschrift', fontSize: 20 },
  link: { color: '#6495ED', fontSize: 20, },
  unlinked: { color: '#ffffff', fontSize: 20, },
});