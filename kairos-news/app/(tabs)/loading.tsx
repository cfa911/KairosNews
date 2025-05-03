import FadeInView from '@/components/FadeInView';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchResults } from '../../utils/api';



export default function Loading() {
  const { id } = useLocalSearchParams();  // Get ID from URL params
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchResults(id);
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
    };
    loadData();
  }, [id]);

  if (error) return <View style={styles.container}>
  <ActivityIndicator size={100} color="#13ed8c" />
  <View style={{ marginTop: 20 }}>
    <FadeInView duration={2000} cycle ={true}>
      <Text style={styles.text}>Recolhendo noticias...</Text>
    </FadeInView>
  </View>
</View>;
  if (!data) return <ActivityIndicator size="large" />;

    return (
      <View style={styles.container}>
        <ActivityIndicator size={100} color="#13ed8c" />
        <View style={{ marginTop: 20 }}>
          <FadeInView duration={2000} cycle ={true}>
            <Text style={styles.text}>Recolhendo noticias...</Text>
          </FadeInView>
        </View>
      </View>
    );
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
});

// Export Loading as a named export
export { Loading };