import React from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import AlarmsScreen from './AlarmsScreen';
import AmplifierScreen from './AmplifierScreen';
import PlaybackScreen from './PlaybackScreen';
import RadiosScreen from './RadiosScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlarmProvider } from '../providers/AlarmProvider';

function HomeScreen() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.amplifier}>
        <AmplifierScreen />
      </View>
      <View style={styles.alarmContainer}>
        <AlarmProvider>
          <View style={styles.alarm}>
            <AlarmsScreen />
          </View>
          <View style={styles.radios}>
            <RadiosScreen />
          </View>
        </AlarmProvider>
      </View>
      <View style={styles.playback}>
        <PlaybackScreen />
      </View>
    </GestureHandlerRootView>
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
    width: '100%'
  },
  radios: {
    flex: 5,
    width: '100%'
  },
  playback: {
    flex: 1,
  }
});