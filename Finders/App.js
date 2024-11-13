import React from 'react';
import { SafeAreaView } from 'react-native';
import styles from "./components/styles/styles.js";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator.js';
import { GlobalProvider } from './globalcontext/GlobalContext.js';



const App = () => {
  return (
    <GlobalProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </GlobalProvider>
  );
};

export default App;