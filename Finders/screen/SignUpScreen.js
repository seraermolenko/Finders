import React, { useContext } from 'react';
import { View, Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import styles from "../components/styles/styles.js";
import { Alert } from 'react-native';
import { signup } from '../apis/apiCalls.js';
import { GlobalContext } from '../globalcontext/GlobalContext.js';

export default function SignUpScreen({ navigation }) {
  [username, setUsername] = React.useState('');
  [password, setPassword] = React.useState('');
  [confirmPass, setConfirmPass] = React.useState('');
  const { login } = useContext(GlobalContext);

  const handleSignUp = async () => {
    if (password !== confirmPass) {
      console.log("Passwords do not match.");
      return;
    }

    try {
      const userToken = await signup(username, password);

      if (userToken) {
        console.log("User signed up successfully:", userToken);

        login(userToken);
      } else {
        console.log('Error', 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      console.log('Error', 'An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.subContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.textBox}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.textBox}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPass}
          onChangeText={setConfirmPass}
          style={styles.textBox}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonLabel}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView >
  );
}