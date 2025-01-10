import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useAppContext } from '../App';
import { useEffect, useState } from 'react';

export function Playback() {
  var context = useAppContext();
  var [station, setStation] = useState(context.radio.station.value);

  useEffect(() => {
    context.radio.station.subscribeOnChange((newValue) => {
      setStation(newValue);
    });
  }, []);

  const handlePlay = () => {
    if (station) {
      context.amplifierController.play(station.url);
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
          onPress={() => context.amplifierController.stop()}
          style={[styles.button]}>
          <Entypo name="controller-stop" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => context.amplifierController.volumUp()}
          style={[styles.button]}>
          <Entypo name="arrow-up" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => context.amplifierController.volumDown()}
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