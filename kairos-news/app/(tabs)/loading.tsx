import FadeInView from '@/components/FadeInView';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { fetchResults,cancelRequests  } from '../../utils/api';



export default function Loading() {
  const router = useRouter();
  const { id, query, topic, dateInterval } = useLocalSearchParams();
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeoutReached(true);
      setError('Request timeout - taking longer than expected');
      cancelRequests();
    }, 30000); // 30 seconds timeout

    const loadData = async () => {
      try {
        const result = await fetchResults(id);
        clearTimeout(timeoutId);

        if (result.success && 'data' in result) {
          router.push({
            pathname: '/result',
            params: {
              data: JSON.stringify(result.data),
              query: query,
              topic: topic,
              dateInterval: dateInterval
            }
          });
        } else {
          setError(result.error || 'Failed to load results');
        }
      } catch (err) {
        clearTimeout(timeoutId);
        setError(err instanceof Error ? err.message : 'Network request failed');
      }
    };

    loadData();

    return () => {
      clearTimeout(timeoutId);
      cancelRequests();
    };
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>⚠️ Error</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return <View style={styles.container}>
    <ActivityIndicator size={100} color="#13ed8c" />
    <View style={{ marginTop: 20 }}>
      <FadeInView duration={2000} cycle={true}>
        <Text style={styles.text}>Recolhendo noticias...</Text>
      </FadeInView>
    </View>
  </View>;


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  infoBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#2d2d3a',
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#3d3d4a',
  },
  infoText: {
    color: '#a0a0a0',
    marginBottom: 5,
    fontSize: 14,
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

// Export Loading as a named export
export { Loading };