import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useStore } from "../hooks/useAlarmStore";
import { useShallow } from "zustand/react/shallow";

export default function AndroidTimePicker() {
    const [alarmTime, setAlarmTime] = useStore(useShallow((state) => [state.alarmTime, state.setAlarmTime]));

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            //setDate(selectedDate);
            //setAlarmTime({ hours: selectedDate.getHours(), minutes: selectedDate.getMinutes() });
        }
    };

    const showTimepicker = () => {
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmTime.hours, alarmTime.minutes )

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
                <Text>{String(alarmTime.hours).padStart(2, "0") + ":" + String(alarmTime.minutes).padStart(2, "0")}</Text>
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