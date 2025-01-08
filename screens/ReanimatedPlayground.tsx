import React from 'react';
import { StyleSheet, Button, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring, withTiming, withSequence, withDecay, withRepeat, Easing, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ReanimatedPlayground() {
  const width = useSharedValue(100);
  const windowWidth = Dimensions.get('window').width;
  const translateX = useSharedValue<number>(0);
  var isExpending = true;
  const steps = 50;

  const handlePress = () => {

    if ((isExpending && width.value > windowWidth) || (!isExpending && width.value <= steps))
      isExpending = !isExpending;

    var n = (isExpending ? steps : -steps);
    width.value = withTiming(width.value + n, { duration: 400 });
    translateX.value = withSpring(translateX.value + n);
  };

  const animatedStyles = useAnimatedStyle(() => {
    var n = (isExpending ? steps : -steps);

    return (
      {
        transform: [{ translateX: withSpring((translateX.value + n) / 2) }],
      })
  });

  const svgPress = () => {
    //r.value += r.value >= 100 ? -10 : 10;
    // r.value = withSequence(
    //   // start from -OFFSET
    //   withTiming(r.value - OFFSET, { duration: TIME / 2 }),
    //   // shake between -OFFSET and OFFSET 5 times
    //   withRepeat(withTiming(r.value + OFFSET, { duration: TIME }), 5, true),
    //   // go back to 0 at the end
    //   withTiming(r.value, { duration: TIME / 2 })
    // );
    //pressed.value ? '#FFE04B' : '#B58DF1',
  }

  const OFFSET = 3;
  const TIME = 250;
  const r = useSharedValue(50);
  const pressed = useSharedValue<boolean>(false);

  const animatedProps = useAnimatedProps(() => ({
    //r: withTiming(r.value, { duration: 500, easing: Easing.inOut(Easing.quad), }),
    r: withSequence(
      // start from -OFFSET
      withTiming(r.value - OFFSET, { duration: TIME / 2 }),
      // shake between -OFFSET and OFFSET 5 times
      withRepeat(withTiming(r.value + OFFSET, { duration: TIME }), 1, true),
      // go back to 0 at the end
      withTiming(r.value, { duration: TIME / 2 })
    ),
    backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
  }));
  const SIZE = 120;
  const BOUNDARY_OFFSET = 50;
  const offset = useSharedValue<number>(0);
  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
      // offset.value = withSpring(0);
      // pressed.value = false;
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [
          -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ]
      });
    });

  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
  }));

  return (
    <View style={styles.container}>
      <Text>Radios</Text>
      <Animated.View
        style={[
          {
            width,
            height: 100,
            backgroundColor: 'violet',
            borderRadius: 20,
          }, animatedStyles]}
      />
      <Button onPress={handlePress} title="Click me" />
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.circle, animatedStyles2]}>
              {/* <Svg style={styles.svg}>
                <AnimatedCircle cx="50%"
                  cy="50%"
                  fill="#b58df1" r={r}
                  animatedProps={animatedProps}
                  onPress={svgPress} />
              </Svg> */}
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
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
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 50,
  },
  svg: {
    flex: 1,
    height: 250,
    width: 250,
    backgroundColor: "purple"
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
    backgroundColor: "green"
  },
});