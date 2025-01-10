import React, { useState } from 'react';
import { StyleSheet, Switch, Button, Text, View } from 'react-native';
import Animated, { runOnJS, useSharedValue, withSpring, withTiming, withSequence, withDecay, withRepeat, Easing, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { RadioItemType } from '../types/RadioItemType';
import { useAlarmContext } from '../providers/AlarmProvider';

export default function RadioButton({ radio, selectedDefault, onClick }: { radio: RadioItemType, selectedDefault: boolean, onClick: { (): void } }) {
    const context = useAlarmContext();
    const offset = useSharedValue<number>(0);
    const selected = useSharedValue<boolean>(selectedDefault);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value },
            { scale: withTiming(selected.value ? 1.2 : 1) },
        ],
        //backgroundColor: selected.value ? '#FFE04B' : '#b58df1',
        backgroundColor: selected.value ? 'green' : 'red',
    }));

    const singleTap = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            runOnJS(onClick)();
        });

    const doubleTap = Gesture.Tap()
        .maxDuration(250)
        .numberOfTaps(2)
        .onStart(() => {
            runOnJS(context.radioChanged)(radio);
        });

    return (
        <View style={styles.container}>
            <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
                <Animated.View style={[styles.button, animatedStyles]}>
                    <Text>{radio.name}</Text>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        flex: 5,
        backgroundColor: 'yellow',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    // section: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    circle2: {
        //height: '40%',
        //width: '60%',
        //borderRadius: 10,
        backgroundColor: "green",
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 100,
        margin: 10,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
});