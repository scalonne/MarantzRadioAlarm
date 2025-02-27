import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { StationType } from '../types/StationType';
import RadioButton from './RadioButton';
import { useStore } from '../hooks/useAlarmStore';
import { useShallow } from 'zustand/react/shallow';

export function RadioViewer() {
  const [stations, setStations] = useStore(useShallow((state) => [state.stations, state.setStations]));
  const [station, setStation] = useStore(useShallow((state) => [state.selectedStation, state.setSelectedStation]));

  // useEffect(() => {
  //   context.radio.station.value = station;
  // }, [station]);

  const stationOnClick = (newStation: StationType) => {
    console.log("stationOnClick: " + newStation.name);
    setStation(newStation);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}
        horizontal
        bounces
        centerContent
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
      >
        {stations.map((o, index) => (
          <RadioButton key={index} radio={o} selected={station?.uid === o.uid} onClick={() => stationOnClick(o)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scrollView: {
    backgroundColor: 'pink',
    width: '100%',
  },
  item: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});