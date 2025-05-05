import DateRangeModal from '@/components/DateRangeModal';
import FadeInView from '@/components/FadeInView';
import SelectionModal from '@/components/SelectionModal';
import Typewriter from '@/components/TypeWriter';
import { cancelRequests, postData } from '@/utils/api.js'; // Adjust the import path as necessary
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function TabOneScreen() {
  const [showSecondButton, setShowSecondButton] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisible, setSelectedVisible] = useState(false);


  const [dateRange, setDateRange] = useState({
    startDate: '2020/01',
    endDate: '2024/12'
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
        <View style={{ flex: 1, }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Filtros Avançados" color='#13ed8c' onPress={() => {
              setShowSecondButton(true);
            }} />
          </View>
          <View style={{ flex: 1 }}>
            <FadeInView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} start={showSecondButton} initialOpacity={0} >
              <View style={{ flex: 1 ,justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Inserir Datas" disabled={!showSecondButton} onPress={() => {
                  setModalVisible(true)
                }} />
              </View>
              <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Insira um topico" disabled={!showSecondButton} onPress={() => {
                  setSelectedVisible(true)
                }} />
              </View>
            </FadeInView>

          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typewriter speed={20} textStyle={styles.nota} text={"Exprimente adicionar filtros para uma pesquisa mais minuciosa   "} />
        </View>
        <View >
          <DateRangeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onDateSelect={(range) => setDateRange(range)}
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
              'Estilo de Vida e Lazer', 'Arte e Cultura','Desporto','Ciencia', 'Crime', 
              'Conflitos e Desastres',  
              'Saúde', 'Economia e Sociedade', 
            ]}
          />
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