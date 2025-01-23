import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Amplifier } from '../components/Amplifier';
import { Playback } from '../components/Playback';
import { RadioViewer } from '../components/RadioViewer';
import { NotificationsProvider } from '../providers/NotificationsProvider';
import Alarm from '../components/Alarm';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.amplifier}>
        <Amplifier />
      </View>
      <View style={styles.alarmContainer}>
        <NotificationsProvider>
          <View style={styles.alarm}>
            <Alarm />
          </View>
          <View style={styles.radios}>
            <RadioViewer />
          </View>
        </NotificationsProvider>
      </View>
      <View style={styles.playback}>
        <Playback />
      </View>
    </View>
  );
}

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