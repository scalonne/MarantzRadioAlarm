import React from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useMarantz } from '../providers/MarantzProvider';
import { RadioItemType } from '../types/RadioItemType';
import RadioButton from '../components/RadioButton';

const radioStations: RadioItemType[] = [
  { id: 1, name: 'France Inter', url: 'http://direct.fipradio.fr/live/fip-hifi.aac', icon: 'http://direct.fipradio.fr/live/fip-hifi.aac' },
  { id: 2, name: 'France Culture', url: 'http://direct.franceculture.fr/live/franceculture-hifi.aac', icon: 'https://via.placeholder.com/50' },
  { id: 3, name: 'FIP', url: 'http://direct.fipradio.fr/live/fip-hifi.aac', icon: '' },
];

export default function RadiosScreen() {
  const marantz = useMarantz();

  const radioOnPress = (radio: RadioItemType) => {
    console.log("radio onpress: " + radio.url);
    marantz.setSelectedRadioUrl(radio.url);
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
        {radioStations.map((o, index) => (
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