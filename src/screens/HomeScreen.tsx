import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../.././types'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>15game</Text>
            <View style={styles.myButton}>
                <TouchableOpacity style={styles.myButton} onPress={() => navigation.navigate('Puzzle15')}>
                    <Text style={{color : 'white', fontWeight : 'bold',fontSize : 20}}>nuova partita</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.myButton}>
                <TouchableOpacity style={styles.myButton} onPress={() => navigation.navigate('APIList')}>
                    <Text style={{color : 'white', fontWeight : 'bold',fontSize : 20}}>classifica</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'black'
    },
    title: {
        fontSize: 50,
        marginBottom: 20,
        fontWeight : 'bold',
        color : 'white'
    },
    text : {
        fontWeight : 'bold'
    },
    myButton: {
        margin: 20,
        borderRadius: 25,
        backgroundColor: 'red',
        
    }
});


export default HomeScreen;