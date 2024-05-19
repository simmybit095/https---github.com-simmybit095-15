import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import useUserList from '../hooks/useUserList';
import { type User } from '../src/models/results';
import UserDetails from './UserDetails';

type APIListNavigationProp = StackNavigationProp<RootStackParamList, 'APIList'>;

const APIList = () => {
    const { page, list, setNextPage, setPrevPage } = useUserList();
    const navigation = useNavigation<APIListNavigationProp>();
    const [selectedUser, setSelectedUser] = useState<User>();
    const itemsPerPage = 10; 
    const initialRank = 1000; 

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>15 rank</Text>

            <View style={styles.buttonContainer}>
                <Button title="⬅" onPress={setPrevPage} />
                <Button title={page.toString()} disabled />
                <Button title="➡" onPress={setNextPage} />
            </View>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id.value ?? item.login.uuid}
                renderItem={({ item, index }) => {
                    const globalIndex = (page - 1) * itemsPerPage + index;
                    const rank = initialRank  -  globalIndex ;

                    return (
                        <TouchableOpacity
                        onPress={() => navigation.navigate("UserDetails", { user: item })}
                        >
                            <View style={styles.listItem}>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.text}>pos: {globalIndex+ 1}</Text>
                                    <Text style={[styles.text]}>rank: {rank}</Text>

                                </View>
                                <Image source={{ uri: item.picture.thumbnail }} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            {selectedUser && <UserDetails user={selectedUser} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", 
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 28,
        width: '95%', 
        padding: 16,
        borderWidth: 1, // Aggiunge il bordo
        borderColor: 'black', // Imposta il colore del bordo a nero
    },
    infoContainer: {
        flex: 1,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
});

export default APIList;
