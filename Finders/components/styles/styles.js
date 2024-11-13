import { useContext } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', // Use camelCase and remove quotes
    flexDirection: 'row', // Correct camelCase and use double quotes
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  headerButtonContainer: {
    flexDirection: 'row', // Correct camelCase and use double quotes
    justifyContent: 'space-around',
    width: 300
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 100, // Numerical values should not have quotes
    height: 50,
    marginHorizontal: 20, // Adjusted shorthand margin for React Native
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  textBoxButtonContainer: {
    width: 75,
    height: 'flex',
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#ff0000',
    position: 'relative',
    left: 400,
  },
  logoutButtonContainer: {
    width: 100,
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#ff0000',
    position: 'relative',
  },
  postingsView: {
    flex: 1,
    marginHorizontal: 20, // React Native uses marginHorizontal for horizontal margins
  },
  textBox: {
    height: 'flex',
    width: 500,
    margin: 10,
    borderWidth: 3,
    borderColor: '#ff0000',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    fontSize: 15,
  },
  button: {
    borderRadius: 10,
    width: '100%', // Percentage values should be in double quotes
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#ff0000',
    backgroundColor: '#ffffff', // Remove space before the colon
  },
  title: {
    height: 'flex',
    textAlign: 'center',
    fontSize: 17,
  },
  contextInput: {
    height: 600,
    width: 500,
    margin: 10,
    borderWidth: 3,
    borderColor: '#ff0000',
    backgroundColor: '#ffffff',
    padding: 20,
    fontSize: 15,
  },
  text: {
    fontSize: 15,
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
  },
});

export default styles;
