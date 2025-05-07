import DateRangeModal from '@/components/DateRangeModal';
import FadeInView from '@/components/FadeInView';
import SelectionModal from '@/components/SelectionModal';
import Typewriter from '@/components/TypeWriter';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { checkJobStatus, createJob } from '@/utils/api';
import { linkTo } from 'expo-router/build/global-state/routing';

export default function TabOneScreen() {
  const [showSecondButton, setShowSecondButton] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVisible, setSelectedVisible] = useState(false);

  const { response: initialResponse } = useLocalSearchParams();
  const [dateRange, setDateRange] = useState({
    start_date: '2020-01',
    end_date: '2024-12'
  });


  const formattedStart = `${dateRange.start_date}-01`;
  const [endYear, endMonth] = dateRange.end_date.split('-').map(Number);
  const lastDay = new Date(endYear, endMonth, 0).getDate();
  const formattedEnd = `${dateRange.end_date}-${lastDay}`;
  const lowerCaseTopic = topic.toLowerCase();

const navigateToResult = async (id: any) => {
  try {

  
    let response = await checkJobStatus(id);
    console.log('Response Final Data:', response.result.articles);
    if (response.status === 'completed' && response.result.articles.length > 0) {
      console.log('Job completed successfully:', response.result);
      router.push({
        pathname: '/result',
        params: {
          id: response.id, // Assuming the response contains an `id` field
          query: query,
          topic: lowerCaseTopic,
          start_date: formattedStart,
          end_date: formattedEnd,
          response: response, // Pass the response as a string
          summary: response.result.summary, // Assuming the response contains a `result` field
          articles: JSON.stringify(response.result.articles),
        },
      });
    } else if (response.status === 'failed' || response.result.articles.length == 0) {
      console.error('Job failed:', response.error);
      router.push({
        pathname: '/result',
        params: {
          id: response.id, // Assuming the response contains an `id` field
          query: query,
          topic: lowerCaseTopic,
          start_date: formattedStart,
          end_date: formattedEnd,
          response: response, // Pass the response as a string
          summary: 'Ocorreu um erro ao processar a pesquisa. Por favor, tente novamente mais tarde.',
          articles: null, // Assuming the response contains a `result` field
        },
      });

    } else {
      console.log('Job status:', response.status);
      response = await checkJobStatus(id);
      navigateToResult(id);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }

}




  const handleSubmit = async () => {
    if (!query.trim()) {
      Alert.alert('Erro', 'Por favor, insira uma pesquisa.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the request data
      const requestData = {
        query: query,
        topic: lowerCaseTopic || null,
        start_date: formattedStart,
        end_date: formattedEnd
      };

      // Send the request to your FastAPI backend
      router.navigate('/loading');
      const response = await createJob(requestData);
      // Use the parsed data (example: logging it)
      console.log('Response Data:', response);
      navigateToResult(response.id); // Pass the job ID to the result page


    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a pesquisa. Por favor, tente novamente.');
    }
    setIsSubmitting(false);
  }



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
          <Pressable onPress={() => linkTo('https://arquivo.pt/')}>
            <Image
              source={require('../assets/images/arquivo.png')}
              style={{ width: 230, resizeMode: 'contain' }}
            />
          </Pressable>
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
          <Typewriter speed={20} textStyle={styles.nota} text={"Experimente adicionar filtros para uma pesquisa mais minuciosa. Além disso as noticias são primariamente relevantes a 2020-2023"} />
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
              'Estilo de Vida e Lazer', 'Arte e Cultura', 'Desporto', 'Ciência e Tecnologia', 'Crime',
              'Conflitos e Desastres',
              'Saúde', 'Economia e Sociedade', 'Política',
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