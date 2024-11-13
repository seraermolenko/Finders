import React, { useContext, useCallback } from 'react';
import { SafeAreaView, Text, Pressable } from 'react-native';
import { ScrollView, View } from 'react-native-web';
import Posting from '../components/Posting.js';
import styles from "../components/styles/styles.js";
import { GlobalContext } from '../globalcontext/GlobalContext.js';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const { postings, setNeedsFetchPostings, isFetchingPostings, isLoggingIn, userToken, logout } = useContext(GlobalContext);

  useFocusEffect(
    useCallback(() => {
      setNeedsFetchPostings(true);
    }, [setNeedsFetchPostings])
  );

  if (isLoggingIn || isFetchingPostings || !userToken) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.postingsView}>
        <SafeAreaView style={styles.subContainer}>
          {postings.length === 0 ? (
            <Text>No postings available.</Text> // Handle empty state
          ) : (
            postings.map((posting, index) => (
              <Posting userId={userToken} postingObject={posting} key={index} />
            ))
          )}
        </SafeAreaView>
      </ScrollView>
      <View style={styles.logoutButtonContainer}>
        <Pressable onPress={logout} style={[styles.button, { borderColor: '#000000' }]}>
          <Text style={styles.buttonLabel}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
