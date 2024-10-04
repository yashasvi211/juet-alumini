import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Sample data for events
const eventsData = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for an immersive tech conference featuring the latest in technology and innovation.',
    date: '2024-10-15',
    time: '10:00 AM - 5:00 PM',
    imageUrl: 'https://vaave.s3.amazonaws.com/event_photos/851f5ac9941d720844d143ed9cfcf60a_6660f89b0c533b1e907a1821644c8b73.png',
  },
  {
    id: '2',
    title: 'Networking Night',
    description: 'An evening dedicated to networking with industry professionals and alumni.',
    date: '2024-11-10',
    time: '6:00 PM - 9:00 PM',
    imageUrl: 'https://example.com/image2.jpg',
  },
  {
    id: '3',
    title: 'Workshop on AI',
    description: 'Hands-on workshop to dive deep into Artificial Intelligence technologies.',
    date: '2024-12-05',
    time: '2:00 PM - 4:00 PM',
    imageUrl: 'https://example.com/image3.jpg',
  },
  // Add more events as needed
];

const EventsScreen = () => {
  const renderEventItem = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <Text style={styles.description}>
        Discover upcoming events that connect alumni and enhance your professional journey.
      </Text>
      <FlatList
        data={eventsData}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventList}
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  eventList: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  eventDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default EventsScreen;
