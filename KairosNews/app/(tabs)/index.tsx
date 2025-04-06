import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function KairosNews() {
  return (
    <View style={styles.container}>
      <Text style={styles.white}>Kairos<Text style={styles.text}>News</Text></Text>


    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'column',
    },
    text:{
      color: '#13ed8c',
      fontFamily: 'Bahnschrift'

    },
    white:{
      color: '#ffffff',
      fontFamily: 'Bahnschrift'

    }git config --global user.email "you@example.com"
})