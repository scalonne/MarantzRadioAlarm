import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { StationType } from '../types/StationType';
import RadioButton from './RadioButton';
import { useAppContext } from '../App';

export function RadioViewer() {
  const context = useAppContext();

  const [stations, setStations] = useState(context.radio.stations.value);
  const [station, setStation] = useState(context.radio.station.value);

  const radioOnPress = (radio: StationType) => {
    console.log("radio onpress: " + radio.url);
    setStation(radio);
    context.radio.station.value = radio;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}
        horizontal
        bounces
        centerContent
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
      //snapToInterval={120} // Taille d’un item + margin
      //decelerationRate="fast"
      >
        {stations.map((o, index) => (
          <RadioButton key={index} radio={o} selectedDefault={false} onClick={() => radioOnPress(o)} />
          // <View key={index} style={styles.item}>
          //   <TouchableOpacity
          //     onPress={() => radioOnPress(o)}
          //     style={[
          //       styles.item,
          //     ]}>
          //     <Text>{o.name}</Text>
          //   </TouchableOpacity>
          // </View>
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