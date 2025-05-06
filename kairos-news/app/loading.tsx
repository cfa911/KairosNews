import FadeInView from '@/components/FadeInView';
import HeadKairoNews from '@/components/HeadKairoNews';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { checkJobStatus } from '@/utils/api'; // Make sure this matches your API utility

export default function Loading() {
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState('Recolhendo noticias...');
  const [pollingCount, setPollingCount] = useState(0);
  return (
    <View style={{ flex: 1 }}>
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
      </View>
    </View>
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
    fontSize: 18,
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