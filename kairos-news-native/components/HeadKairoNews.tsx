import { StyleSheet, View } from "react-native";
import KairosNewsTitle from "./KairosNewsTitle";


const HeadKairoNews = () => {
  return (
    <View style={styles.container}>
      <KairosNewsTitle/>
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