import { View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import SearchBar from '../components/SearchBar'
import NoteListItem from '../components/NoteListItem'
import BackButton from '../components/BackButton'

function RecycleBin ({ navigation }) {

  const handleBackPress = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress}/>
      <Text style={styles.header}>Thùng rác</Text>
      <Text style={styles.note}>Các ghi chú được giữ trong thùng rác trong 30 ngày trước khi bị xóa vĩnh viễn</Text>
      <SearchBar style={styles.searchBar} />
      <NoteListItem style={styles.noteListItem}/>
      <NoteListItem style={styles.noteListItem}/>
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
    marginTop: Constants.statusBarHeight + 50
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
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 15
  },
  noteListItem: {
    marginTop: 20
  }
})

export default RecycleBin