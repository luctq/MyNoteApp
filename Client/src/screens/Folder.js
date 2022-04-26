import { View, Text, StyleSheet } from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

import SearchBar from '../components/SearchBar'
import NoteListItem from '../components/NoteListItem'
import AddNewNoteButton from '../components/AddNewNoteButton'
import DeleteButton from '../components/DeleteButton'

function Folder () {

  const renderItem = (data, rowMap) => (
    <SwipeRow
      rightOpenValue={-80}
      leftOpenValue={0}
      disableRightSwipe={true}
    >
      <DeleteButton style={styles.deleteButton} />
      <NoteListItem style={styles.noteListItem}/>
    </SwipeRow>
  )

  const keyExtractor = (item) => item.id

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thư mục</Text>
      <SearchBar style={styles.searchBar} />
      <SwipeListView 
        data={[{id: 0, noteTitle: 'Tiêu đề 1', noteContent: 'Nội dung...'}, {id: 1, noteTitle: 'Tiêu đề 2', noteContent: 'Nội dung...'}]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <AddNewNoteButton style={styles.addNewNoteButton}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingHorizontal: 25
  },
  header: {
    fontSize: 35,
    fontWeight: '400', 
    marginTop: 40
  },
  note: {
    fontSize: 15,
    fontWeight: '300',
    color: '#FF9900',
    backgroundColor: '#FFF9EF',
    borderRadius: 27,
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
    marginTop: 10
  },
  searchBar: {
    marginTop: 20
  },
  addNewNoteButton: {
    position: 'absolute',
    bottom: 58,
    right: 25
  },
  deleteButton: {
    alignItems: 'flex-end',
    marginTop: 23,
    justifyContent: 'center'
  },
  noteListItem: {
    marginTop: 20
  }
})

export default Folder