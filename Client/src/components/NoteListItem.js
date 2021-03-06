import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import DateTime from "./DateTime";

export default function NoteListItem({ style, onNoteListItemPress, info }) {
  // const getNoteTitle = (noteContent) => {
  //   if (!noteContent || noteContent.length <= 30) {
  //     return noteContent;
  //   }
  //   return noteContent.slice(0, 30) + "...";
  // };

   const getNoteTitle = (noteContent) => {
     const regex =
       /(<\w+>)+([-/:;()&@"\.,?!'₫1234567890aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+)/;
     const match = regex.exec(noteContent);
     if (match !== null) {
       return match[match.length - 1];
     }
   };

  return (
    <View style={style}>
      <Pressable style={styles.container} onPress={onNoteListItemPress}>
        {info.title ? (
          <Text style={styles.title}>{info.title}</Text>
        ) : (
          <></>
        )}
        {info.content ? (
          <Text style={styles.content}>{getNoteTitle(info.content)}</Text>
        ) : (
          <></>
        )}
        <DateTime style={styles.time} time={info.lastEdit}/>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 86
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
  },
  content: {
    fontSize: 18,
    marginBottom: 5,
    opacity: 0.7,
  },
  time: {
    color: "#B9B9B9",
  },
});
