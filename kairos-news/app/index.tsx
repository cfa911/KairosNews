import DateRangeModal from '@/components/DateRangeModal';
import FadeInView from '@/components/FadeInView';
import SelectionModal from '@/components/SelectionModal';
import Typewriter from '@/components/TypeWriter';
import { cancelRequests, postData } from '@/utils/api.js'; // Adjust the import path as necessary
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, Image, Pressable } from 'react-native';

export default function TabOneScreen() {
  const [showSecondButton, setShowSecondButton] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisible, setSelectedVisible] = useState(false);


  const [dateRange, setDateRange] = useState({
    start_date: '2020-01',
    end_date: '2024-12'
  });

  // Clean up pending requests when component unmounts
  useEffect(() => {
    return () => cancelRequests();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await postData(query, topic, dateRange.startDate, dateRange.endDate);

      if (result.success && 'data' in result) {
        router.push({
          pathname: '/loading',
          params: {
            id: result.data.id,
            query: query,
            topic: topic,
            dateInterval: `${dateRange.startDate} to ${dateRange.endDate}`
          }
        });
      } else {
        Alert.alert('Submission Error', 'error' in result ? result.error : 'Failed to submit data');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Could not connect to the server');
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <View style={styles.mainContainer}>
      {/* Add the About button */}
      <View>
        <View style={{ alignItems: 'flex-end', marginVertical: 15, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable onPress={() => router.push('/about')}>
            <Text style={{ color: '#13ed8c', fontSize: 30, fontWeight: 600, fontFamily: 'Bahnschrift', }}>Sobre</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'flex-end', flex: 0.4, justifyContent: 'flex-end' }}>
          <Image
            source={require('../assets/images/arquivo.png')}
            style={{ width: 230, resizeMode: 'contain', }}
          />
        </View>
      </View>
      <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
        <FadeInView style={styles.title}>
          <Text style={styles.kairo}>Kairos<Text style={styles.news}>News</Text></Text>
        </FadeInView>
      </View>
      <View style={styles.searchContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[styles.searchBar, { flex: 1 }]}
            placeholder="De que se vai informar hoje?"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            autoFocus
          />
          <Pressable onPress={handleSubmit} disabled={isSubmitting}>
            <View style={{ marginLeft: 10, backgroundColor: '#13ed8c', padding: 12, paddingVertical: 3, paddingBottom: 5, borderRadius: 50 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ffffff' }}>{'>'}</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ flex: 1, }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Filtros Avançados" color='#13ed8c' onPress={() => {
              setShowSecondButton(true);
            }} />
          </View>
          <View style={{ flex: 1 }}>
            <FadeInView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} start={showSecondButton} initialOpacity={0} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Inserir Datas" color={'#077A48'} disabled={!showSecondButton} onPress={() => {
                  setModalVisible(true)
                }} />
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Insira um topico" color={'#077A48'} disabled={!showSecondButton} onPress={() => {
                  setSelectedVisible(true)
                }} />
              </View>
            </FadeInView>

          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typewriter speed={20} textStyle={styles.nota} text={"Exprimente adicionar filtros para uma pesquisa mais minuciosa. Além disso as noticias são primariamente relevantes a 2020-2023"} />
        </View>
        <View >
          <DateRangeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onDateSelect={(range) => setDateRange({ start_date: range.startDate, end_date: range.endDate })}
          />
        </View>
        <View >
          <SelectionModal
            visible={selectedVisible}
            onClose={() => setSelectedVisible(false)}
            onSelect={(selected) => {
              setTopic(selected);
            }}
            title="Selecione um tópico"
            options={[
              'Estilo de Vida e Lazer', 'Arte e Cultura', 'Desporto', 'Ciencia', 'Crime',
              'Conflitos e Desastres',
              'Saúde', 'Economia e Sociedade',
            ]}
          />
        </View>
        <View style={{ alignItems: 'stretch', flex: 1, justifyContent: 'flex-end', width: '100%' }}>
          <Image
            source={require('../assets/images/footer.png')}
            style={{ width: '100%', height: '60%', resizeMode: 'contain' }}
          />
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#101218'

  },
  title: {
    marginBottom: 20,
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
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Bahnschrift',
    textAlign: 'center',
    marginBottom: 30,
  },
});