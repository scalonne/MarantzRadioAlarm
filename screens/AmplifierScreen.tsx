import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

function AmplifierScreen() {
  return (
    <View style={styles.container}>
      <Button title="OnOff" />
    </View>
  );
}

export default AmplifierScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
});