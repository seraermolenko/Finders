import { Text, Pressable } from 'react-native';
import styles from './styles/styles.js';
import { View } from 'react-native-web';
import { GlobalContext } from '../globalcontext/GlobalContext.js';
import { useContext, useState, useEffect } from 'react';
import { deletePosting } from '../apis/apiCalls.js';

export default function Posting({ userId, postingObject }) {
  const { content, id, title, user, username, date_posted } = postingObject;
  const { setNeedsFetchPostings } = useContext(GlobalContext);

  const handleDelete = async () => {
    Boolean(userId === user)
    try {
      const postingId = id;
      await deletePosting(userId, postingId)
      setNeedsFetchPostings(true);
    } catch (error) {
      console.error("Error deleting posting:", error);
    }
  }

  const dateFormatter = (dateString) => {
    console.log(dateString);
    const date = new Date(dateString);
    console.log(date);

    // Get the components
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and ensure two digits
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getUTCFullYear()); // Get last two digits of the year
    console.log(day, month, year);

    // Format as DD/MM/YY
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate; // Output: DD/MM/YYYY
  }

  const date = dateFormatter(date_posted);

  return (
    <View style={styles.textBox}>
      {userId.toString() === user.toString() && (
        <View style={styles.textBoxButtonContainer}>
          <Pressable onPress={handleDelete} style={[styles.button, { borderColor: '#ffffff' }]}>
            <Text>Delete</Text>
          </Pressable>
        </View>
      )}
      <Text style={styles.title}>
        <b>{title}</b> by {username} on {date}
      </Text>
      <Text style={styles.text}>
        {'\n'}
        {content}
      </Text>
    </View>
  );
}

