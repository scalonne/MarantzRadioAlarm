import { StyleSheet, View } from 'react-native';
import Alarm from '../components/Alarm';

export default function AlarmScreen() {
  return (
    <View style={styles.container}>
      <Alarm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%'
  }
});