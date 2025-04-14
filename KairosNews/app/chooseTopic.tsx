import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SectionGrid } from 'react-native-super-grid';
import { useRouter } from 'expo-router';

export default function SecondStep() {
    const [items, setItems] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' },
        { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' },
        { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' },
        { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
    ]);
    const [query, setQuery,] = useState('');
    const [topic, setTopic] = useState('');
    const router = useRouter();


    useEffect(() => {
        const loadQuery = async () => {
            const name = await AsyncStorage.getItem('query');
            if (name) setQuery(name);
        };
        loadQuery();
    }, []);

    const handleSubmit = async () => {
        if (!topic.trim()) return;
        await AsyncStorage.setItem('topic', topic.trim());
        router.push('/result'); // Navigate to /home
    };


    return (
        <View style={styles.container}>
            <SectionGrid
                itemDimension={300}
                // staticDimension={300}
                // fixed
                // spacing={20}
                sections={[
                    {
                        title: 'Qual é tópico que deseja face a  "' + { query }.query + '"',
                        data: items.slice(0, 20),
                    }
                ]}
                style={styles.gridView}
                renderItem={({ item }) => (

                    <Pressable onPressIn={() => {
                        setTopic(item.code)
                    }}
                        style={({ pressed }) => [{
                            opacity: pressed ? 0.7 : 1.0,
                        }, styles.itemContainer, { backgroundColor: item.code }]} onPressOut={() => handleSubmit()} >
                        <View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemCode}>{item.code}</Text>
                        </View>
                    </Pressable>

                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#101218', },
    text: { fontSize: 24, color: '#ffffff' },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    sectionHeader: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        alignItems: 'center',
        backgroundColor: '#636e72',
        color: 'white',
        padding: 10,
    },
});