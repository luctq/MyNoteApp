import { useState, useRef, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native'
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

import ShareButton from '../components/ShareButton'
import ChangeBackgroundButton from '../components/ChangeBackgroundButton'
import ThreeDotButton from '../components/ThreeDotButton'
import ShareFormModal from '../components/ShareFormModal'
import DropDownOfThreeDot from '../components/DropDownOfThreeDot'
import BackButton from '../components/BackButton'


function Note({ navigation }) {

  const [isOpen, setIsOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState('Ghi chu 1')
  const [noteContent, setNoteContent] = useState('')
  const [heightEditor, setHeightEditor] = useState(520)
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)
  const richText = useRef()
  const editorView = useRef()

  const handleNoteTitleChange = (noteTitle) => {
    setNoteTitle(noteTitle)
  }
  const handleNoteContentChange = (noteContent) => {
    setNoteContent(noteContent)
  }
  const handlePressFolderIcon = () => {
    setIsOpenDropDown(!isOpenDropDown)
  }
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handlePressAddImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      presentationStyle: 0, //tránh bị out
      base64: true,
    })
    if (!result.cancelled) {
      richText.current.insertImage('data:image/pngbase64, ' + result.base64)
    }
  })

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress}/>
      <DropDownOfThreeDot
        isOpen={isOpenDropDown}
        setIsOpen={() => handlePressFolderIcon()}
      />
      <ShareFormModal isOpen={isOpen} isClosed={() => setIsOpen(false)} />
      <View style={styles.headerIcon}>
        <ShareButton
          style={styles.shareButton}
          handlePress={() => setIsOpen(!isOpen)}
        />
        <ChangeBackgroundButton style={styles.changeBackgroundButton} />
        <ThreeDotButton onButtonPress={handlePressFolderIcon} />
      </View>
      <TextInput
        placeholder='Write title...'
        value={noteTitle}
        onChangeText={handleNoteTitleChange}
        style={styles.titleNote}
      />
      <View>
        <RichToolbar
          editor={richText}
          actions={[
            actions.insertImage,
            actions.keyboard,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
            actions.insertBulletsList,
            actions.insertOrderedList,
          ]}
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>H1</Text>
            ),
          }}
          style={{ backgroundColor: '#f7f7f7' }}
          onPressAddImage={handlePressAddImage}
        />
        <ScrollView
          style={[styles.editorView, { height: heightEditor }]}
          ref={editorView}
          onContentSizeChange={() =>
            editorView.current.scrollToEnd({ animated: true })
          }
        >
          <RichEditor
            ref={richText}
            initialContentHTML={noteContent}
            onChange={(text) => {
              handleNoteContentChange(text)
            }}
            editorStyle={{ backgroundColor: '#f7f7f7' }}
            placeholder='Type something here...'
            // style={{ borderColor: 'red', borderWidth: 1 }}
            onFocus={() => setHeightEditor(320)}
            onBlur={() => setHeightEditor(520)}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingHorizontal: 25,
    // marginTop: 10,
  },
  headerIcon: {
    flexDirection: 'row',
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    right: 15,
  },
  shareButton: {
    paddingHorizontal: 10,
  },
  changeBackgroundButton: {
    paddingHorizontal: 10,
  },
  threeDotButton: {},
  titleNote: {
    marginTop: Constants.statusBarHeight + 50,
    fontSize: 22,
    fontWeight: 'bold',
  },
  noteContent: {},
  editorView: {
    // borderColor: 'green',
    // borderWidth: 2,
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 15
  },
})

export default Note
