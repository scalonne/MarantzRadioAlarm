import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Button, Text, View, ImageBackground } from 'react-native';
import Animated, { runOnJS, useSharedValue, withSpring, withTiming, withSequence, withDecay, withRepeat, Easing, useAnimatedProps, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StationType } from '../types/StationType';
import { useAlarmContext } from '../providers/AlarmProvider';

export default function RadioButton({ radio, selected, onClick }: { radio: StationType, selected: boolean, onClick: { (): void } }) {
    const context = useAlarmContext();
    const offset = useSharedValue<number>(0);
    const backgroundColor = useSharedValue(0);

    useEffect(() => {
        backgroundColor.value = selected ? 1 : 0;// 'green' : 'red';
    }, [selected]);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value },
                { scale: withTiming(selected ? 1.2 : 1) },
            ],
            //backgroundColor: backgroundColor.value,
            //backgroundColor: interpolateColor(
            //    backgroundColor.value,
            //    [0, 1],
            //    ["rgba(255, 255, 255, 0.5)", "rgba(0, 128, 0, 0.8)"],
            //    //["red", "green"] // Rouge par défaut, Vert si sélectionné
            //),
        }
    }, [selected]);

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

    console.log('radio.icon: ' + radio.icon);

    return (
        <View style={styles.container}>
            <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
                <Animated.View style={[styles.button, animatedStyles]}>
                    <ImageBackground
                        source={{ uri: radio.icon }}
                        style={styles.imageBackground}
                        resizeMode="cover">
                        {/* <Text style={styles.text}>
                            {radio.name}
                        </Text> */}
                    </ImageBackground>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    text: {
        fontWeight: "bold",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        //borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        textAlign: "center",
    },
});