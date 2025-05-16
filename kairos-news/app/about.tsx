import HeadKairoNews from '@/components/HeadKairoNews';
import VideoScreen from '@/components/VideoScreen';
import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutPage() {

  const staff = [
    {
      name: 'Christopher Abreu',
      image: require('../assets/images/chris_front.jpg'),
      linkedin: 'https://www.linkedin.com/in/christopher-fernandes-de-abreu-1762b614b/',
    },
    {
      name: 'Quintino Fernandes',
      image: require('../assets/images/quintino_front.jpg'),
      linkedin: 'https://www.linkedin.com/in/quintinofernandes/',
    },
    {
      name: 'Francisco Alves',
      image: require('../assets/images/francisco_front.jpg'),
      linkedin: 'https://www.linkedin.com/in/franciscomalves/',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <HeadKairoNews />
      <View style={styles.content}>
        <Text style={styles.title}>Sobre o Kairos News</Text>
        <Text style={styles.text}>
          Bem-vindo ao Kairos News! A nossa missão é fornecer-lhe as notícias mais recentes e relevantes, adaptadas aos seus interesses.
          Quer esteja à procura de atualizações sobre ciência, desporto, saúde ou eventos globais, o Kairos News tem tudo o que precisa.
        </Text>
        <Text style={styles.text}>
          A nossa plataforma utiliza tecnologia avançada para selecionar notícias de fontes confiáveis, garantindo que se mantenha informado com informações precisas e oportunas.
        </Text>
        <Text style={styles.text}>
          Obrigado por escolher o Kairos News como a sua fonte de confiança para se manter atualizado. Estamos comprometidos em oferecer a melhor experiência aos nossos utilizadores.
        </Text>
      </View>
      <View style={styles.staffSection}>
        <Text style={styles.staffTitle}>A Nossa Equipa</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.staffScroll}>
          {staff.map((member, index) => (
            <View key={index} style={styles.staffBubble}>
              <Image source={member.image} style={styles.staffImage} />
              <Text style={styles.staffName}>{member.name}</Text>
              <Pressable
                onPress={() => Linking.openURL(member.linkedin)}
                style={styles.linkedinButton}
                accessibilityLabel={`Abrir LinkedIn de ${member.name}`}
              >
                <Image
                  source={require('../assets/images/linkedin.png')}
                  style={styles.linkedinLogo}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
      <VideoScreen />
      <View style={styles.content}>
        <Text style={styles.text}>
          Video disponivel também no YouTube:  <Text style={styles.link} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=tpki-VO5VB4&feature=youtu.be')}>
            https://www.youtube.com/watch?v=tpki-VO5VB4&feature=youtu.be</Text>
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Repositorios e links uteis</Text>
        <Text style={styles.text}>
          Repositorio GitHub de Fronted:  <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/cfa911/KairosNews')}>
            https://github.com/cfa911/KairosNews</Text>
        </Text>
        <Text style={styles.text}>
          Repositorio GitHub de Backend:  <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/0edon/KairosNews')}>
            https://github.com/0edon/KairosNews</Text>
        </Text>
        <Text style={styles.text}>
          Repositorio de Dataset utilizado:  <Text style={styles.link} onPress={() => Linking.openURL('https://huggingface.co/datasets/0edon/KairosNews')}>
            https://huggingface.co/datasets/0edon/KairosNews</Text>
        </Text>
        <Text style={styles.text}>
          Documento sobre o projeto:  <Text style={styles.link} onPress={() => Linking.openURL('https://archive.org/details/final_20250514')}>
            https://archive.org/details/final_20250514</Text>
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101218',
  },
  content: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#13ed8c',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Bahnschrift',
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 24,
    fontFamily: 'Bahnschrift',

  },
  staffSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  staffTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#13ed8c',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Bahnschrift',
  },
  staffScroll: {
    flexDirection: 'row',
  },
  staffBubble: {
    alignItems: 'center',
    marginRight: 15,
  },
  link: { color: '#6495ED' },
  staffImage: {
    width: 125,
    height: 125,
    borderRadius: 125,
    marginBottom: 5,
  },
  linkedinLogo: {
    width: 28,
    height: 28,
  },
  linkedinButton: {
    marginTop: 5,
    alignItems: 'center',
  },
  staffName: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Bahnschrift',
  },
});