import { View, Text, StyleSheet, Image } from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

import SettingButton from '../components/SettingButton'
import SearchBar from '../components/SearchBar'
import CheckButton from '../components/CheckButton'
import DropDown from '../components/DropDown'
import FolderListItem from '../components/FolderListItem'
import DeleteButton from '../components/DeleteButton'

const folderCount = 1;

function Home() {

  const renderItem = (data, rowMap) => (
    <SwipeRow
      rightOpenValue={-80}
      leftOpenValue={0}
      disableRightSwipe={true}
    >
      <DeleteButton style={styles.deleteButton} />
      <FolderListItem style={styles.folderListItem}/>
    </SwipeRow>
  )

  const keyExtractor = (item) => item.id

  return (
    <View style={styles.container}>  
      <SettingButton style={styles.settingButton} />
      <View style={styles.headerIcon}>
        <DropDown style={styles.folderButton} />
        <CheckButton style={styles.checkButton} />
      </View>
      <SearchBar style={styles.searchBar} />
      {folderCount === 0 ? 
      <View>
        <Image 
          source={
            require('../public/emptyNote.png')
          }
          style={styles.emptyNoteImage}
        />
        <Text style={{textAlign: 'center'}}>Không có ghi chú nào ở đây</Text>
      </View>
      : 
      <SwipeListView 
        data={[{id: 0, folderTitle: 'Tiêu đề 1'}, {id: 1, noteTitle: 'Tiêu đề 2',}]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    }
    </View>
  )
}

// height: 667
// width: 375

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingHorizontal: 25
  },
  settingButton: {
    position: 'absolute',
    top: 20,
    right: 12,
  },
  headerIcon: {
    flexDirection: 'row',
    position: 'absolute',
    top: 32,
    left: 150,
  },
  searchBar: {
    marginTop: 100,
  },
  folderButton: {
    paddingHorizontal: 8
  },
  checkButton: {
    paddingHorizontal: 8
  },
  emptyNoteImage: {
    width: 211,
    height: 173,
    marginTop: 100,
    marginLeft: 80
  },
  deleteButton: {
    alignItems: 'flex-end',
    marginTop: 23,
    justifyContent: 'center'
  },
  folderListItem: {
    marginTop: 20
  }
})

export default Home