import React from 'react';
import { StyleSheet, Switch, View, Text } from 'react-native';
import AndroidTimePicker from './AndroidTimePicker';
import DayButton from './DayButton';
import { useStore } from '../hooks/useAlarmStore';
import { useShallow } from 'zustand/react/shallow';

export default function Alarm() {
    const [alarmIsActive, setAlarmIsActive] = useStore(useShallow((state) => [state.alarmIsActive, state.setAlarmIsActive]));
    const [days, setDays] = useStore(useShallow((state) => [state.alarmDays, state.setAlarmDays]));
    const station = useStore(useShallow((state) => state.alarmRadio));

    function onDayClick(index: number) {
        days[index] = !days[index];
        //setDays(days);
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftPanel}>
                <View style={styles.time}>
                    <AndroidTimePicker />
                </View>
                <View style={styles.days}>
                    {
                        days.map((active, index) => (
                            <DayButton
                                key={index}
                                label={index.toString()}
                                selectedDefault={active}
                                onClick={() => onDayClick(index)} />
                        ))
                    }
                </View>
                <View style={styles.radio}>
                    <Text>
                        {
                            station?.name ?? "double click on a radio to set it as alarm"
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.rightPanel}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={alarmIsActive ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setAlarmIsActive}
                    value={alarmIsActive}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    leftPanel: {
        flex: 6,
        alignItems: 'center',
    },
    time: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
    },
    days: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    radio: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
    },
    rightPanel: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});