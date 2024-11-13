import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native-web';
import styles from "./components/styles/styles.js";
import Home from "./screen/Home.js";
import CreatePosting from './screen/CreatePosting.js';
import SignInScreen from './screen/SignInScreen.js';
import SignUpScreen from './screen/SignUpScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalContext } from './globalcontext/GlobalContext.js';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { userToken, isLoading, logout } = useContext(GlobalContext);

  if (isLoading) return null;

  return (
    <Stack.Navigator>
      {userToken ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={styles.headerButtonContainer}>
                  <Pressable onPress={() => navigation.navigate('Upload')} style={[styles.button, { borderColor: '#000000' }]}>
                    <Text style={styles.buttonLabel}>Create New Project Posting</Text>
                  </Pressable>
                </View>
              ),

              headerStyle: { backgroundColor: '#f00' },
              title: 'Finder',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 30,
                color: '#ffffff'
              }
            })}
          />
          <Stack.Screen
            name="Upload"
            component={CreatePosting}
            options={{
              headerStyle: { backgroundColor: '#f00' },
              title: 'Finder',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 30,
                color: '#fff'
              }
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={styles.headerButtonContainer}>
                  <Pressable onPress={() => navigation.navigate('SignUp')} style={[styles.button, { borderColor: '#000000' }]}>
                    <Text style={styles.buttonLabel}>Sign Up</Text>
                  </Pressable>
                </View>
              ),
              headerStyle: { backgroundColor: '#f00' },
              title: 'Finder',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 30,
                color: '#ffffff'
              }
            })}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={styles.headerButtonContainer}>
                  <Pressable onPress={() => navigation.navigate('SignIn')} style={[styles.button, { borderColor: '#000000' }]}>
                    <Text style={styles.buttonLabel}>Sign In</Text>
                  </Pressable>
                </View>
              ),
              headerStyle: { backgroundColor: '#f00' },
              title: 'Finder',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 30,
                color: '#ffffff'
              }
            })}
          />
        </>
      )
      }
    </Stack.Navigator >
  );
}
