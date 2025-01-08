import { StyleSheet, Button, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useMarantz } from '../providers/MarantzProvider';

export default function PlaybackScreen() {
  const marantz = useMarantz();

  const handlePlay = () => {
    if (marantz.selectedRadioUrl) {
      marantz.controller.play(marantz.selectedRadioUrl); // Joue la radio sélectionnée
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handlePlay}
          style={[
            styles.button,
            //{ position: 'absolute', left: -100, top: 50 },
          ]}>
          <Entypo name="controller-play" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => marantz.controller.stop()}
          style={[styles.button]}>
          <Entypo name="controller-stop" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => marantz.controller.volumUp()}
          style={[styles.button]}>
          <Entypo name="arrow-up" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => marantz.controller.volumDown()}
          style={[styles.button]}>
          <Entypo name="arrow-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    margin: 10
  },
  buttonContainer: {
    backgroundColor: 'pink',

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',

    // margin: 10,
    // width: 70,
    // height: 70,
    borderRadius: 35,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});