import React, { useState } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import Stopwatch from './stopwatch';
import StopwatchMobile2 from './stopwatchMobile2';

const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
]

const a = [0, 1, 2, 3]

const redNumbers = [1, 3, 6, 8, 9, 11, 14]

const Game = () => {

    const [winState, setWinState] = useState(false)
    const [moves, setMoves] = useState(0)
    const [NumbersState, setNumbersState] = useState(matrix);
    const [stopwatchRunning, setStopwatchRunning] = useState(false);

    const getNumberToDisplay = (r: number, c: number) => {
        return NumbersState[r][c]
    };

    const handleStartStopClick = () => {
        setStopwatchRunning(!stopwatchRunning);
    };

    function swap(r: number, c: number) {
        const copy = NumbersState.map(subarray => [...subarray]);

        if (c - 1 >= 0 && getNumberToDisplay(r, c - 1) === 0) {
            copy[r][c - 1] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }
        else if (c + 1 < 4 && getNumberToDisplay(r, c + 1) === 0) {
            copy[r][c + 1] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }
        else if (r + 1 < 4 && getNumberToDisplay(r + 1, c) === 0) {
            copy[r + 1][c] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }
        else if (r - 1 >= 0 && getNumberToDisplay(r - 1, c) === 0) {
            copy[r - 1][c] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }

        let check = true
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (copy[i][j] !== matrix[i][j]) {
                    check = false
                }
            }
        }

        if (check) {
            console.log('hai vinto ')
            setWinState(true)
            handleStartStopClick()
        }
    }

    function swap2() {
        setWinState(false)
        setMoves(0)
        handleStartStopClick()

        const copy = NumbersState.map(subarray => [...subarray]);

        for (let i = 0; i < 10000; i++) {
            let random1 = Math.floor(Math.random() * 4)
            let random2 = Math.floor(Math.random() * 4)

            let r = random1
            let c = random2

            if (c - 1 >= 0 && copy[r][c - 1] === 0) {
                copy[r][c - 1] = copy[r][c]
                copy[r][c] = 0
            }
            else if (c + 1 < 4 && copy[r][c + 1] === 0) {
                copy[r][c + 1] = copy[r][c]
                copy[r][c] = 0
            }
            else if (r + 1 < 4 && copy[r + 1][c] === 0) {
                copy[r + 1][c] = copy[r][c]
                copy[r][c] = 0
            }
            else if (r - 1 >= 0 && copy[r - 1][c] === 0) {
                copy[r - 1][c] = copy[r][c]
                copy[r][c] = 0
            }
        }
        setNumbersState(copy)
    }

    return (
        <>
            <Text style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center' }}>15</Text>
            {winState && <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'red', textAlign: 'center' }}>Hai vinto!</Text>}
            <Pressable onPress={() => swap2()}>
                <View style={styles.shuffleButton}>
                    <Text style={styles.shuffleButtonText}>New Game</Text>
                </View>
            </Pressable>

            <Text style={styles.infoDisplay}> moves:{moves} </Text>

            <StopwatchMobile2 isRunning={stopwatchRunning} startAndStop={handleStartStopClick} />

            {/* <Pressable onPress={handleStartStopClick}>
                <Text style={styles.infoDisplay}>START&STOP</Text>
            </Pressable> */}

            <View style={styles.container}>
                {a.map((r, k1) => {
                    return (
                        <View key={'r' + k1} style={styles.middleColumn} >
                            {a.map((c, k2) => {
                                return (
                                    <Pressable key={'c2' + k2} onPress={() => swap(r, c)}>
                                        <View style={[styles.button]} >
                                            {getNumberToDisplay(r, c) === 0 ? (
                                                <View style={[styles.blackButton]} />
                                            ) : (
                                                <>
                                                    <Text style={
                                                        redNumbers.includes(getNumberToDisplay(r, c)) ?
                                                            styles.redButton :
                                                            styles.whiteText
                                                    }>
                                                        {getNumberToDisplay(r, c)}
                                                    </Text>
                                                </>
                                            )}
                                        </View>
                                    </Pressable >
                                )
                            })}
                        </View>
                    )
                })}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 40,
    },
    middleColumn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    redButton: {
        width: 80,
        height: 80,
        backgroundColor: 'red',
        borderWidth: 2,
        borderColor: 'black',
        // borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
        // textAlign : 'center',

    },
    blackButton: {
        width: 80,
        height: 80,
        backgroundColor: 'black',
        // borderWidth: 1.75,
        borderColor: 'black',
        // borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shuffleButton: {
        backgroundColor: 'grey',
        padding: 10,
        marginBottom: 20,
    },
    shuffleButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    whiteText: {
        color: 'black',
    },
    blackText: {
        color: 'black',
    },
    infoDisplay: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Game;
