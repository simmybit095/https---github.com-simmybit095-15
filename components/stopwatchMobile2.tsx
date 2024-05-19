import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface StopwatchProps {
    isRunning: boolean;
    startAndStop: () => void;
}

const StopwatchMobile2: React.FC<StopwatchProps> = ({ isRunning, startAndStop }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000); 
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    const startAndStopButton = () => {
        startAndStop(); // Chiamata alla funzione startAndStop ricevuta dalle props
    };

    const reset = () => {
        setTime(0);
    };

    return (
        <View>
            <Text style={styles.info}>
                {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:{milliseconds.toString().padStart(2, "0")}
            </Text>
            <View style={styles.buttonContainer}>
                <Pressable onPress={startAndStopButton} style={styles.button}>
                    <Text style={styles.info}>{isRunning ? "Stop" : "Start"}</Text>
                </Pressable>
                <Pressable onPress={reset} style={styles.button}>
                    <Text style={styles.info}>Reset</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        margin: 10,
        color : 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: 'grey',
        borderRadius: 20,
        
    },
});

export default StopwatchMobile2;
