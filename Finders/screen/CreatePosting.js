import React, { useContext } from 'react';
import { Pressable, SafeAreaView, TextInput, Text } from 'react-native';
import { View } from 'react-native-web';
import { uploadPosting } from '../apis/apiCalls.js';
import styles from "../components/styles/styles.js";
import { GlobalContext } from '../globalcontext/GlobalContext.js';



export default function CreatePosting({ navigation }) {
  [postingTitle, onChangePostingTitle] = React.useState('');
  [postingDesc, onChangePostingDesc] = React.useState('');
  const { userToken } = useContext(GlobalContext);

  async function createNewPosting(userId, { title, content }) {
    const posting = {
      title: title,
      content: content
    };
    try {
      await uploadPosting(userId, posting);
      console.log('Posting created successfully:', posting);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error creating posting:', error);
      Alert.alert('Error', 'There was an issue creating the posting. Please try again.');
    }
  }

  return (
    <SafeAreaView style={styles.subContainer}>
      <TextInput
        id="postingTitle"
        style={styles.textBox}
        onChangeText={onChangePostingTitle}
        value={postingTitle}
        placeholder="Project Title"
        multiline
      />
      <TextInput
        id="postingDesc"
        style={styles.contextInput}
        onChangeText={onChangePostingDesc}
        value={postingDesc}
        placeholder="Please provide a short description of your project and what skills you require from applicants..."
        multiline
      />
      <View style={[styles.buttonContainer, { width: 200, height: 100 }]}>
        <Pressable style={styles.button} onPress={() => { createNewPosting(userToken, { title: postingTitle, content: postingDesc }) }}>
          <Text>Make It Public!</Text>
        </Pressable>
      </View>
    </SafeAreaView >
  );
}
