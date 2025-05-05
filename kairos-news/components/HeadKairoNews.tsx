import { StyleSheet, View, Image } from "react-native";
import KairosNewsTitle from "./KairosNewsTitle";


const HeadKairoNews = () => {
  return (
    <View style={styles.container}>
      <View>
        <KairosNewsTitle />
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end',flex: 1,marginBottom: 5 }}>
        <Image
          source={require('../assets/images/arquivo.png')}
          style={{ width: 150, height: 50, resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#13ed8c',
    borderBottomWidth: 2,
    backgroundColor: '#000000',
    paddingTop: 25,
    paddingBottom: 5,
  },
});
export default HeadKairoNews;