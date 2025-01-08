import React from 'react';
import { StyleSheet, Switch, View, Text } from 'react-native';
import AndroidTimePicker from './AndroidTimePicker';
import DayButton from './DayButton';
import { useAlarm } from '../providers/AlarmProvider';
import { AlarmDayType } from '../types/AlarmDayType';

export default function Alarm() {
    const alarm = useAlarm();

    function onDayClick(day: AlarmDayType) {
        alarm.dayChanged({ ...day, isActive: !day.isActive });
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftPanel}>
                <View style={styles.time}>
                    <AndroidTimePicker />
                </View>
                <View style={styles.days}>
                    {
                        alarm.days.map((day, index) => (
                            <DayButton
                                key={index}
                                label={day.label[0]}
                                selectedDefault={day.isActive}
                                onClick={() => onDayClick(day)} />
                        ))
                    }
                </View>
                <View style={styles.radio}>
                    <Text>
                        {
                            alarm.radio ? alarm.radio.name : "double click on a radio to set it as alarm"
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.rightPanel}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={alarm.isActive ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={alarm.isActiveChanged}
                    value={alarm.isActive}
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