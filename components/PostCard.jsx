    import React from 'react';
    import { View, Text, Image, StyleSheet } from 'react-native';

    const PostCard = ({ post }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: post.userImage }} style={styles.userImage} />
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{post.userName}</Text>
                        <Text style={styles.userAbout}>{post.userAbout}</Text>
                    </View>
                </View>
                <Text style={styles.postText}>{post.text}</Text>
                {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
                <Text style={styles.postDate}>{post.date}</Text>
            </View>
        );
    };

    // Styles for the PostCard component
    const styles = StyleSheet.create({
        cardContainer: {
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 2,
            marginVertical: 5, // Reduced margin for closer cards
            padding: 10,
            overflow: 'hidden',
        },
        userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
        },
        userImage: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
        },
        userDetails: {
            flex: 1,
        },
        userName: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        userAbout: {
            fontSize: 14,
            color: '#555',
        },
        postText: {
            fontSize: 14,
            marginVertical: 5,
        },
        postImage: {
            width: '100%',
            height: 200,
            borderRadius: 5,
            marginVertical: 10,
            resizeMode: 'cover',
        },
        postDate: {
            fontSize: 12,
            color: '#999',
            alignSelf: 'flex-end',
        },
    });

    export default PostCard;
