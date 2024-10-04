import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserList = ({ users, onSelectUser }) => {
    return (
        <View style={styles.userListContainer}>
            {users.map(user => (
                <TouchableOpacity key={user.id} onPress={() => onSelectUser(user)}>
                    <View style={styles.userContainer}>
                        <Text style={styles.userName}>{user.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    userListContainer: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    userContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    userName: {
        fontSize: 18,
    },
});

export default UserList;
