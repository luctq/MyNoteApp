import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState} from 'react';
import DateTime from './DateTime';

export default function NoteListItem({ style, onNoteListItemPress }) {

  const [title, setTitle] = useState("Tiêu đề");
  const [content, setContent] = useState("Nội dung ...")

  return (
    <View style={style}>
      <Pressable 
        style={styles.container}
        onPress={onNoteListItemPress}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <DateTime style={styles.time}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    // width: "80%",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 5,
    // marginTop: 20,
    maxHeight: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
  },
  content: {
    fontSize: 18,
    marginBottom: 5,
  },
  time: {
    color: "#B9B9B9",
  },
});