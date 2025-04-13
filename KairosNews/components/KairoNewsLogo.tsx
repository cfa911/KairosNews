import { Text, StyleSheet,View } from 'react-native'



const KairosNewsLogo = (fontS: ChildNode) => {

  return (
    <View>
      <Text style={styles.kairo}>Kairos<Text style={styles.news}>News</Text></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  kairo: {
    color: '#13ed8c',
    fontWeight: '600',
    fontFamily: 'Bahnschrift',
    fontSize: this.fontS
  },
  news: {
    color: '#ffffff',
    fontFamily: 'Bahnschrift'
  }

})

export default KairosNewsLogo;