import React from 'react';
import { StyleSheet, Switch, View, Text } from 'react-native';
import AndroidTimePicker from './AndroidTimePicker';
import DayButton from './DayButton';
import { AlarmDayType } from '../types/AlarmDayType';
import { useAlarmContext } from '../providers/AlarmProvider';

export default function Alarm() {
    const context = useAlarmContext();
    
    function onDayClick(day: AlarmDayType) {
        context.dayChanged({ ...day, isActive: !day.isActive });
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftPanel}>
                <View style={styles.time}>
                    <AndroidTimePicker />
                </View>
                <View style={styles.days}>
                    {
                        context.days.map((day, index) => (
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
                            context.radio ? context.radio.name : "double click on a radio to set it as alarm"
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.rightPanel}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={context.isActive ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={context.isActiveChanged}
                    value={context.isActive}
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