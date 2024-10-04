// Message.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Message = ({ message, isSentByUser, onDelete }) => {
    return (
        <View style={[styles.messageContainer, isSentByUser ? styles.sent : styles.received]}>
            <Text style={styles.messageText}>{message.text}</Text>
            {/* Delete Button */}
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    sent: {
        backgroundColor: '#d1e7dd', // Light green for sent messages
        alignSelf: 'flex-end',
    },
    received: {
        backgroundColor: '#f8d7da', // Light red for received messages
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    deleteButton: {
        marginTop: 5,
    },
    deleteButtonText: {
        color: '#ff0000', // Red for delete button
        fontSize: 14,
    },
});

export default Message;
