import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NoteListItem from './src/components/NoteListItem'
import AddNewNoteButton from './src/components/AddNewNoteButton'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NoteListItem />
      <AddNewNoteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
