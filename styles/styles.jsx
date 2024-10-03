import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  indicator: {
    position: 'absolute',
    bottom: 60, // Align with the tab bar
    height: 4,
    width: `${100 / 5}%`, // Width for each tab
    backgroundColor: '#0A66C2', // LinkedIn blue color
    borderRadius: 2, // Slightly rounded corners for the indicator
  },
  iconContainer: {
    alignItems: 'center', // Centering icon and label
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
