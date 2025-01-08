import React, { useState } from 'react';
import { StyleSheet, Switch, Button, Text, View } from 'react-native';
import Animated, { runOnJS, useSharedValue, withSpring, withTiming, withSequence, withDecay, withRepeat, Easing, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function DayButton({ label, selectedDefault, onClick }: { label: string, selectedDefault: boolean, onClick: { (): void } }) {
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

    const tap = Gesture.Tap()
        .onBegin(() => {
            //selected.value = !selected.value;
        })
        .onFinalize((event) => {
            selected.value = !selected.value;
            offset.value = withSpring(0);
            //pressed.value = false;
            runOnJS(onClick)();
        });

    return (
        <View style={styles.container}>
            <GestureDetector gesture={tap}>
                <Animated.View style={[styles.button, animatedStyles]}>
                    <Text>{label}</Text>
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
    button: {
        //height: '40%',
        width: '60%',
        borderRadius: 10,
        backgroundColor: "green",
        alignItems: 'center',
    },

});