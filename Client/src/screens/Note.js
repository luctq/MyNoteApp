import React from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import * as ImagePicker from 'expo-image-picker'

import ShareButton from '../components/ShareButton'
import ChangeBackgroundButton from '../components/ChangeBackgroundButton'
import ThreeDotButton from '../components/ThreeDotButton'
import ShareFormModal from '../components/ShareFormModal'

function Note () {

  const [isOpen, setIsOpen] = React.useState(false)
  const [noteTitle, setNoteTitle] = React.useState('Ghi chu 1')
  const [noteContent, setNoteContent] = React.useState('')
  const [isFocusContent, setIsFocusContent] = React.useState(false)
  const [heightEditor, setHeightEditor] = React.useState(520)

  const richText = React.useRef()
  const  editorView = React.useRef()

  const handleNoteTitleChange = (noteTitle) => {
    setNoteTitle(noteTitle)
  }

  const handleNoteContentChange = (noteContent) => {
    setNoteContent(noteContent)
  }

  const handlePressAddImage = 
    React.useCallback(async() => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        presentationStyle: 0, //tránh bị out
        base64: true
      });
      if (!result.cancelled) {
        richText.current.insertImage('data:image/png;base64, ' + result.base64)
      }
    })

  return (
    <View style={styles.container}>
      <ShareFormModal isOpen={isOpen} isClosed={() => setIsOpen(false)}/>
      <View style={styles.headerIcon}>
        <ShareButton style={styles.shareButton} handlePress={() => setIsOpen(!isOpen)}/>
        <ChangeBackgroundButton style={styles.changeBackgroundButton}/>
        <ThreeDotButton style={styles.threeDotButton}/>
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
          actions={[actions.insertImage,  actions.keyboard, actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList, actions.insertOrderedList,]}
          iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
          style={{backgroundColor: '#f7f7f7'}}
          onPressAddImage={handlePressAddImage}
        />
        <ScrollView 
          style={[styles.editorView, { height: heightEditor }]} 
          ref={editorView} 
          onContentSizeChange={() => editorView.current.scrollToEnd({ animated: true})}>
          <RichEditor
            ref={richText}
            initialContentHTML={noteContent}
            onChange={ text => {
              handleNoteContentChange(text)
            }}
            editorStyle={{backgroundColor: '#f7f7f7'}}
            placeholder="Type something here..."
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
    paddingHorizontal: 25
  },
  headerIcon: {
    flexDirection: 'row',
    position: 'absolute',
    top: 25,
    right: 12,
  },
  shareButton: {
    paddingHorizontal: 10
  },
  changeBackgroundButton: {
    paddingHorizontal: 10
  },
  threeDotButton: {
    paddingHorizontal: 10
  },
  titleNote: {
    marginTop: 60,
    fontSize: 22,
    fontWeight: 'bold'
  },
  noteContent: {

  },
  editorView: {
    // borderColor: 'green', 
    // borderWidth: 2, 
  }
})

export default Note