import React from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import { Amplifier } from '../components/Amplifier';
import { Playback } from '../components/Playback';
import { RadioViewer } from '../components/RadioViewer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlarmProvider } from '../providers/AlarmProvider';
import Alarm from '../components/Alarm';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.amplifier}>
        <Amplifier />
      </View>
      <View style={styles.alarmContainer}>
        <AlarmProvider>
          <View style={styles.alarm}>
            <Alarm />
          </View>
          <View style={styles.radios}>
            <RadioViewer />
          </View>
        </AlarmProvider>
      </View>
      <View style={styles.playback}>
        <Playback />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  amplifier: {
    flex: 1,
  },
  alarmContainer: {
    flex: 7,
    width: '100%'
  },
  alarm: {
    flex: 2,
    width: '100%',
    backgroundColor: 'gray',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  radios: {
    flex: 5,
    width: '100%'
  },
  playback: {
    flex: 1,
  }
});