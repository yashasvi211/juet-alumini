import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Carousel from '../components/Carousel';
import PostCard from '../components/PostCard'; // Import your PostCard component

const HomeScreen = () => {
    const items = [
        require('../assets/carousel_img/1.png'),
        require('../assets/carousel_img/8.jpg'), // 868*446
        require('../assets/carousel_img/3.png'),
    ];

    // Sample post data with images
    const posts = [
        {
            id: '1',
            userName: 'Aarav Sharma',
            userImage: 'https://via.placeholder.com/100',
            userAbout: 'Software Engineer at Tech Corp',
            text: 'Excited to announce my new project!',
            image: 'https://via.placeholder.com/600x300', // Image in the post
            date: '2024-10-03 10:00 AM',
        },
        {
            id: '2',
            userName: 'Vivaan Singh',
            userImage: 'https://via.placeholder.com/100',
            userAbout: 'Product Manager at Innovate LLC',
            text: 'Check out our latest product launch!',
            image: 'https://via.placeholder.com/600x300', // Image in the post
            date: '2024-10-02 02:15 PM',
        },
        {
            id: '3',
            userName: 'Ayaan Gupta',
            userImage: 'https://via.placeholder.com/100',
            userAbout: 'Data Scientist at Analytics Co.',
            text: 'Had a great time at the conference yesterday!',
            image: 'https://via.placeholder.com/600x300', // Image in the post
            date: '2024-10-01 08:30 AM',
        },
    ];

    // Sort posts by date in descending order
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const renderPostCard = ({ item }) => (
        <PostCard post={item} />
    );

    return (
        <View style={styles.screenContainer}>
            <Carousel items={items} />
            <FlatList
                data={sortedPosts}
                renderItem={renderPostCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Added background color
    },
    listContainer: {
        paddingBottom: 20, // Slight padding at the bottom
    },
});

export default HomeScreen;
