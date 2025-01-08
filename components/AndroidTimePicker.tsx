import { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAlarm } from '../providers/AlarmProvider';

export default function AndroidTimePicker() {
    const now = new Date();
    const alarm = useAlarm();
    const [date, setDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarm.time.hours, alarm.time.minutes ));

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            alarm.timeChanged({ hours: selectedDate.getHours(), minutes: selectedDate.getMinutes() });
        }
    };

    const showTimepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'time',
            is24Hour: true,
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={showTimepicker}
                style={[
                    styles.item,
                    //{ position: 'absolute', left: -100, top: 50 },
                ]}>
                <Text>{String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        //flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
        //width: '100%',
        //height: '100%',
    },
    item: {
        //width: 100,
        //height: 100,
        //margin: 10,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 42,
        padding: 12,
    },
});