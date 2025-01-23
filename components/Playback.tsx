import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useAlarmStore';
import { MarantzController } from '../services/MarantzController';
import { useShallow } from 'zustand/react/shallow';

export function Playback() {
  const station = useStore(useShallow((state) => state.selectedStation));
  const marantzController = MarantzController.getInstance();

  // useEffect(() => {
  //   context.radio.station.subscribeOnChange((newValue) => {
  //     setStation(newValue);
  //   });
  // }, []);

  const play = () => {
    if (station) {
      marantzController.play(station.streamUri);
    }
  };

  const stop = () => {
    marantzController.stop();
  }

  const volumeUp = () => {
    marantzController.volumUp();
  }

  const volumDown = () => {
    marantzController.volumDown();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={play}
          style={[
            styles.button,
            //{ position: 'absolute', left: -100, top: 50 },
          ]}>
          <Entypo name="controller-play" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={stop}
          style={[styles.button]}>
          <Entypo name="controller-stop" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={volumeUp}
          style={[styles.button]}>
          <Entypo name="arrow-up" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={volumDown}
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