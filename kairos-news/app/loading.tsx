import FadeInView from '@/components/FadeInView';
import HeadKairoNews from '@/components/HeadKairoNews';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Loading() {
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState('Recolhendo noticias...');
  const [pollingCount, setPollingCount] = useState(0);
  const params = useLocalSearchParams();
  const fadeKey = Array.isArray(params.key) ? params.key.join('-') : params.key || 'default';

  useEffect(() => {
    const messages = [
      'Recolhendo noticias...',
      'Recolhendo noticias...',
      'Processando dados...',
      'Processando dados...',
      'Quase pronto...',
      'Quase pronto...',
      'Quase pronto...',
      'Quase pronto...',

    ];
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 5000); // Change text every 4 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <FadeInView key={fadeKey} duration={1000} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#101218' }}>
          <HeadKairoNews />
        </View>
        <View style={styles.container}>
          <Text style={styles.errorText}>⚠️ Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.push({ pathname: '/' })}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </FadeInView>
    );
  }


  return (
    <FadeInView key={fadeKey} duration={1000} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#101218' }}>
        <HeadKairoNews />
      </View>
      <View style={[styles.container, { justifyContent: 'flex-start', flex: 1, alignItems: 'center' }]}>
        <ActivityIndicator size={100} color="#13ed8c" />
        <View style={{ marginTop: 20 }}>
          <FadeInView duration={2000} cycle={true}>
            <Text style={styles.text}>{loadingText}</Text>
          </FadeInView>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.loadingText}>Pode ter de aguardar até 5 minutos...</Text>
        </View>
      </View>

    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101218',
  },
  text: {
    color: '#ffffff',
    fontSize: 30,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 32,
    color: '#ffffff',
  },
  errorText: {
    fontSize: 24,
    color: '#ff6b6b',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#13ed8c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});