import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

export function Amplifier() {
  return (
    <View style={styles.container}>
      <Button title="OnOff" />
    </View>
  );
}

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