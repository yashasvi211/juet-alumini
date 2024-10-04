import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ProfileScreen = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.29.144:5000/user-profile/1'); // Replace with your IP address
                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!userProfile) {
        return (
            <View style={styles.errorContainer}>
                <Text>Profile not found.</Text>
            </View>
        );
    }

    // Check if contact details exist
    const hasContactDetails = userProfile.facebook || userProfile.twitter || userProfile.linkedin || userProfile.github;

    // Check if there are any professional experiences
    const hasProfessionalDetails = userProfile.experiences && userProfile.experiences.length > 0;

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.profileContainer}>
                <View style={styles.profilePictureContainer}>
                    <Image
                        source={{ uri: userProfile.imageUrl || "https://via.placeholder.com/100" }} 
                        style={styles.profilePicture}
                    />
                </View>
                <View style={styles.profileDetails}>
                    {userProfile.first_name && userProfile.last_name && (
                        <Text style={styles.name}>{`${userProfile.first_name} ${userProfile.last_name}`}</Text>
                    )}
                    {userProfile.course && userProfile.branch && (
                        <Text style={styles.degree}>{`${userProfile.course}, ${userProfile.branch}`}</Text>
                    )}
                </View>

                {/* Personal Information */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    {userProfile.first_name && <Text style={styles.detailText}>{`First Name: ${userProfile.first_name}`}</Text>}
                    {userProfile.last_name && <Text style={styles.detailText}>{`Last Name: ${userProfile.last_name}`}</Text>}
                    {userProfile.course && <Text style={styles.detailText}>{`Degree: ${userProfile.course}`}</Text>}
                    {userProfile.branch && <Text style={styles.detailText}>{`Branch: ${userProfile.branch}`}</Text>}
                    {userProfile.roll_number && <Text style={styles.detailText}>{`Roll No: ${userProfile.roll_number}`}</Text>}
                </View>

                {/* Conditionally render Contact Details */}
                {hasContactDetails && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.sectionTitle}>Contact Details</Text>
                        {userProfile.facebook && <Text style={styles.detailText}>{`Facebook: ${userProfile.facebook}`}</Text>}
                        {userProfile.twitter && <Text style={styles.detailText}>{`Twitter: ${userProfile.twitter}`}</Text>}
                        {userProfile.linkedin && <Text style={styles.detailText}>{`LinkedIn: ${userProfile.linkedin}`}</Text>}
                        {userProfile.github && <Text style={styles.detailText}>{`GitHub: ${userProfile.github}`}</Text>}
                    </View>
                )}

                {/* Conditionally render Professional Details */}
                {hasProfessionalDetails ? (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.sectionTitle}>Professional Details</Text>
                        {userProfile.experiences.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                {exp.company_name && <Text style={styles.detailText}>{`Company: ${exp.company_name}`}</Text>}
                                {exp.role && <Text style={styles.detailText}>{`Role: ${exp.role}`}</Text>}
                                {exp.job_function && <Text style={styles.detailText}>{`Job Function: ${exp.job_function}`}</Text>}
                                {exp.from_date && <Text style={styles.detailText}>{`From: ${exp.from_date}`}</Text>}
                                {exp.to_date ? (
                                    <Text style={styles.detailText}>{`To: ${exp.to_date}`}</Text>
                                ) : (
                                    <Text style={styles.detailText}>{`To: Present`}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.sectionTitle}>Professional Details</Text>
                        <Text style={styles.detailText}>No professional information available.</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    profilePictureContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
    },
    profileDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    degree: {
        fontSize: 16,
        marginBottom: 4,
    },
    detailsContainer: {
        width: '100%',
        maxWidth: 800,
        padding: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
    },
    experienceItem: {
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileScreen;
