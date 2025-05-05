import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import HeadKairoNews from '@/components/HeadKairoNews';

export default function AboutPage() {
  const staff = [
    { name: 'Christopher Abreu', image: require('../assets/images/icon.png') },
    { name: 'Quintino Fernandes', image: require('../assets/images/icon.png') },
    { name: 'Francisco Alves', image: require('../assets/images/icon.png') },
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
            </View>
          ))}
        </ScrollView>
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
    marginTop: 20,
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
  staffImage: {
    width: 125,
    height: 125,
    borderRadius: 125,
    marginBottom: 5,
  },
  staffName: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Bahnschrift',
  },
});