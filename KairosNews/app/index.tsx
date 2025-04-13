import { View, Text, StyleSheet } from 'react-native'
import { SearchBar } from '@rneui/themed';
import React, { useState } from 'react'
import { Link } from 'expo-router'

type SearchBarComponentProps = {};

const KairosNews: React.FunctionComponent<SearchBarComponentProps> = () => {

  const [search, setSearch] = useState("");

  const updateSearch = (search: React.SetStateAction<string>) => {
    setSearch(search);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.title}>
        <Text style={styles.kairo}>Kairos<Text style={styles.news}>News</Text></Text>
        {/* <Link style={styles.white} href="/explore">Explore</Link> */}
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="De que se vai informar hoje?"
          onChangeText={updateSearch}
          round
          value={search}
          containerStyle={styles.searchBar}
        />
        <Text style={{ color: '#ffffff' }}>Atenção que a informação disponivel é apenas relevante a 2022</Text>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#101218'

  },
  title: {
    display: 'flex',
    flex: 0.5,
    flexDirection: 'column-reverse',
  },
  kairo: {
    color: '#13ed8c',
    fontSize: '4.2rem',
    fontWeight: '600',
    fontFamily: 'Bahnschrift',
    textAlign: 'center'

  },
  news: {
    color: '#ffffff',
    fontSize: '4.2rem',
    fontFamily: 'Bahnschrift'
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: '15%',

  },
  searchBar: {
    backgroundColor: '#101218',
    border: 0,
  }
})


export default KairosNews;