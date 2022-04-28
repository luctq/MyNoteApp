import { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

import SettingButton from '../components/SettingButton'
import SearchBar from '../components/SearchBar'
import CheckButton from '../components/CheckButton'
import FolderListItem from '../components/FolderListItem'
import DeleteButton from '../components/DeleteButton'
import DropDownOfFolder from '../components/DropDownOfFolder'
import AntIcons from 'react-native-vector-icons/AntDesign'

const folderCount = 1


function Home({ navigation }) {

  const [isOpenDropDown, setIsOpenDropDown] = useState(false)

  const handlePressFolderIcon = () => {
    setIsOpenDropDown(!isOpenDropDown)
  }
  const handleSettingPress = () => {
    navigation.navigate('Settings')
  }
  const handleRecycleBinPress = () => {
    navigation.navigate('RecycleBin')
  }
  const handleFolderListItemPress = () => {
    navigation.navigate('Folder')
  }
  const renderItem = (data, rowMap) => (
    <SwipeRow 
      rightOpenValue={-80} 
      leftOpenValue={0} 
      disableRightSwipe={true}
      style={styles.folderRow}
    >
      <DeleteButton style={styles.deleteButton} />
      <FolderListItem 
        style={styles.folderListItem} 
        onFolderListItemPress={handleFolderListItemPress}
      />
    </SwipeRow>
  )
  const keyExtractor = (item) => item.id

  return (
    <View style={styles.container}>
      <DropDownOfFolder 
        isOpen={isOpenDropDown} 
        setIsOpen={() => handlePressFolderIcon()}
        onRecycleBinPress={handleRecycleBinPress}
      />
      <SettingButton 
        style={styles.settingButton} 
        onSettingPress={handleSettingPress} 
      />
      <View style={styles.headerIcon}>
        <TouchableOpacity onPress={() => handlePressFolderIcon()}>
          <AntIcons name='folderopen' size={25} color='#000' />
        </TouchableOpacity>
        <CheckButton style={styles.checkButton} />
      </View>
      <SearchBar style={styles.searchBar} />
      {folderCount === 0 ? (
        <View>
          <Image
            source={require('../public/emptyNote.png')}
            style={styles.emptyNoteImage}
          />
          <Text style={{ textAlign: 'center' }}>
            Không có ghi chú nào ở đây
          </Text>
        </View>
      ) : (
        <SwipeListView
          data={[
            { id: 0, folderTitle: 'Tiêu đề 1' },
            { id: 1, noteTitle: 'Tiêu đề 2' },
          ]}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
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
    paddingHorizontal: 25,
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
    paddingHorizontal: 8,
  },
  checkButton: {
    paddingHorizontal: 8,
  },
  emptyNoteImage: {
    width: 211,
    height: 173,
    marginTop: 100,
    marginLeft: 80,
  },
  deleteButton: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  folderListItem: {
    
  },
  folderRow: {
    marginTop: 20,
  }
})

export default Home
