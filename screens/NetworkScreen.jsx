import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const NetworkScreen = () => {
    const [alumniData, setAlumniData] = useState([]); // State to store alumni data
    const [loading, setLoading] = useState(true); // State to manage loading state

    // Fetch alumni data from the server when the component mounts
    useEffect(() => {
        const fetchAlumniData = async () => {
            try {
                const response = await fetch('http://192.168.29.144:5000/network'); // Replace with your actual server URL
                const data = await response.json();
                setAlumniData(data); // Set the fetched data to state
                setLoading(false); // Stop loading
            } catch (error) {
                console.error('Error fetching alumni data:', error);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchAlumniData(); // Call the fetch function
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.alumniContainer}>
            {/* Alumni Image */}
            <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }} style={styles.alumniImage} />


            {/* Alumni Information */}
            <View style={styles.alumniInfo}>
                <Text style={styles.alumniName}>{item.name}</Text>
                <Text style={styles.alumniAbout}>{item.about}</Text>
            </View>

            {/* Alumni Year on the Right */}
            <View style={styles.alumniYearContainer}>
                <Text style={styles.alumniYear}>{item.year}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screenContainer}>
            <FlatList
                data={alumniData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()} // Ensure the ID is a string
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}  // Hide the scroll indicator
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    listContainer: {
        paddingBottom: 20,
    },
    alumniContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align items with space between
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    alumniImage: {
        width: 50,
        height: 50,
        borderRadius: 25, // Makes the image circular
        marginRight: 15,
    },
    alumniInfo: {
        flex: 1,
    },
    alumniName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    alumniAbout: {
        fontSize: 14,
        color: '#555',
    },
    alumniYearContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
    alumniYear: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NetworkScreen;
