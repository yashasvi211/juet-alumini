import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import UserList from '../components/UserList'; // Import UserList component
import Message from '../components/Message'; // Import Message component

// Sample users
const users = [
    { id: '1', name: 'Alisha Sen' },
    { id: '2', name: 'Rahul Vyas' },
    { id: '3', name: 'Sneha Mehta' },
    // Add more users as needed
];

const MessagesScreen = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]); // Store messages for the selected user
    const [inputMessage, setInputMessage] = useState(''); // Store the message input

    const sendMessage = () => {
        if (inputMessage.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: Date.now().toString(), text: inputMessage, isSentByUser: true },
            ]);
            setInputMessage(''); // Clear input after sending
        }
    };

    const deleteMessage = (messageId) => {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));
    };

    return (
        <KeyboardAvoidingView
            style={styles.screenContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Show user list if no user is selected */}
            {selectedUser === null ? (
                <UserList users={users} onSelectUser={setSelectedUser} />
            ) : (
                <View style={styles.messagesContainer}>
                    <Text style={styles.selectedUser}>Chatting with: {selectedUser.name}</Text>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <Message
                                message={item}
                                isSentByUser={item.isSentByUser}
                                onDelete={() => deleteMessage(item.id)}
                            />
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.messageList}
                    />
                    {/* Input field and send button */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={inputMessage}
                            onChangeText={setInputMessage}
                            placeholder="Type a message"
                        />
                        <Button title="Send" onPress={sendMessage} />
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    messagesContainer: {
        flex: 1,
        padding: 20,
    },
    selectedUser: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messageList: {
        flexGrow: 1,
        justifyContent: 'flex-end', // Stick messages to the bottom
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
    },
});

export default MessagesScreen;
