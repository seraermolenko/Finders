import React, { useContext } from 'react';
import { View, Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import styles from "../components/styles/styles.js";
import { GlobalContext } from '../globalcontext/GlobalContext.js';
import { signin } from '../apis/apiCalls.js';


export default function SignInScreen({ navigation }) {
  const { login } = useContext(GlobalContext);
  [username, setUsername] = React.useState('');
  [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const response = await signin(username, password);
      const userToken = response.id;
      console.log(userToken);
      if (userToken != 'Invalid username or password') {
        console.log("User token received:", userToken);
        login(userToken);
      } else {
        console.error("Login failed: No token returned.");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonLabel}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView >
  );
}