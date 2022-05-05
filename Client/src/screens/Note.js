import { useState, useRef, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  LogBox,
  TouchableOpacity
} from 'react-native'
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import FoundationIcons from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from "react-redux";

import ShareButton from '../components/ShareButton'
import ChangeBackgroundButton from '../components/ChangeBackgroundButton'
import ThreeDotButton from '../components/ThreeDotButton'
import ShareFormModal from '../components/ShareFormModal'
import DropDownOfThreeDot from '../components/DropDownOfThreeDot'
import BackButton from '../components/BackButton'
import CompleteButton from '../components/CompleteButton'
import {
  createNewNote,
  updateNote,
  expulsionNote,
} from "../redux/reducers/Note";
import ChangeBackgroundModal from '../components/ChangeBackgroundModal'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const screen = Dimensions.get('window')
const mapStateToProps = (state) => ({
  theme: state.note.theme
});
const mapActionToProps = {
  createNewNote,
  updateNote,
  expulsionNote,
};

function Note({ navigation, route, createNewNote, updateNote, expulsionNote, theme }) {
  const note = route.params.item;
  const isNew = route.params.isNew;
  const folderName = route.params.folderName;
  const [isOpen, setIsOpen] = useState(false);
  const [proFocus, setProFocus] = useState({
    height: screen.height - Constants.statusBarHeight - 80,
    bottom: -40,
    isDisableButton: false
  });
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [recording, setRecording] = useState();
  const richText = useRef();
  const editorView = useRef();
  const [isOpenModalChangeBackground, setIsOpenModalChangeBackground] = useState(false)
  const [actionsToolbar, setActionsToolbar] = useState([
    actions.insertImage,
    "insertVoice",
    "launchCamera",
    "draw",
    'editText',
  ])

  const handleNoteTitleChange = (noteTitle) => {
    setNoteTitle(noteTitle);
  };
  const handleNoteContentChange = (noteContent) => {
    setNoteContent(noteContent);
  };
  const handlePressFolderIcon = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };
  const handlePressChangeBackgroundIcon = () => {
    setIsOpenModalChangeBackground(!isOpenModalChangeBackground)
  };
  const handlePressComplete = () => {
    richText.current.dismissKeyboard()
  }
  const handlePressDraw = () => {
    navigation.navigate('Draw', {
      handleOK,
      handleEmpty
    })
  }
  const handleOK = (signature) => {
    richText.current.insertImage(signature, 'border: 1px solid #ddd;')
    navigation.goBack()
  }
  const handleEmpty = () => {
    navigation.goBack()
  }
  const handleBackPress = () => {
    if (!isNew) {
      if (noteContent === "" && noteTitle === "") expulsionNote(note.id);
      else updateNote({ ...note, title: noteTitle, content: noteContent });
    } else if (noteTitle !== "" || noteContent !== "") {
      createNewNote({ ...note, title: noteTitle, content: noteContent });
    }
    navigation.goBack();
  };
  const handlePressAddImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      presentationStyle: 0, //tránh bị out
      base64: true,
    });
    if (!result.cancelled) {
      richText.current.insertImage("data:image/png;base64," + result.base64);
    }
  });
  const handleLaunchCamera = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        presentationStyle: 0,
        base64: true,
      });
      if (!result.cancelled) {
        richText.current.insertImage("data:image/png;base64," + result.base64);
      }
    } else {
      throw new Error("Location permission not granted");
    }
  });
  const handleInsertVoice = useCallback(async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  });
  const handleStopRecording = useCallback(async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    richText.current.insertHTML(
      `
      <div>
        <audio controls>
          <source src='data:audio/mp4;base64,${base64}' type='audio/mp4'/>
        </audio>
      </div>
    `
    );
  });
  const handlePressEditText = () => {
    setActionsToolbar([
      'close',
      actions.setBold,
      actions.setItalic,
      actions.setUnderline,
      actions.heading1,
      actions.code,
      actions.insertBulletsList,
      actions.insertOrderedList,
      actions.blockquote,
      actions.line,
      actions.setSubscript,
      actions.setSuperscript,
      actions.alignLeft,
      actions.alignCenter,
      actions.alignRight,
    ])
  }
  const handleCloseTextTool = () => {
    setActionsToolbar([
      actions.insertImage,
      "insertVoice",
      "launchCamera",
      "draw",
      'editText',
    ])
  }

  return (
    <View style={styles.container(theme)}>
      <View style={styles.backButton(theme)}>
        <BackButton iconColor={theme.text} onBackPress={handleBackPress} />
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.folderName(theme)}>{folderName}</Text>
        </TouchableOpacity>
      </View>
      <ChangeBackgroundModal isOpen={isOpenModalChangeBackground} onClosed={() => setIsOpenModalChangeBackground(false)}/>
      <DropDownOfThreeDot
        isOpen={isOpenDropDown}
        setIsOpen={() => handlePressFolderIcon()}
      />
      <ShareFormModal isOpen={isOpen} isClosed={() => setIsOpen(false)} />
      <View style={styles.headerIcon(theme)}>
        <ShareButton
          iconColor={theme.text}
          style={styles.shareButton(theme)}
          handlePress={() => setIsOpen(!isOpen)}
          isDisable={proFocus.isDisableButton}
        />
        <ChangeBackgroundButton
          iconColor={theme.text}
          style={styles.changeBackgroundButton(theme)}
          onButtonChangeBackground={handlePressChangeBackgroundIcon}
          isDisable={proFocus.isDisableButton}
        />
        <ThreeDotButton
          iconColor={theme.text}
          style={styles.threeDotButton(theme)}
          onButtonPress={handlePressFolderIcon}
          isDisable={proFocus.isDisableButton}
        />
        <CompleteButton
          onButtonPress={handlePressComplete}
          style={{display: proFocus.isDisableButton === false ? 'none' : 'flex',  backgroundColor: theme.background,
          color: theme.text}}
        />
      </View>
      <TextInput
        placeholder="Write title..."
        placeholderTextColor={theme.text}
        value={noteTitle}
        onChangeText={handleNoteTitleChange}
        style={styles.titleNote(theme)}
      />
      <View style={{}}>
        <RichToolbar
          editor={richText}
          actions={actionsToolbar}
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>H1</Text>
            ),
            insertVoice: ({ tintColor }) =>
              recording ? (
                <FontAwesomeIcons
                  name="stop-circle"
                  size={25}
                  color={tintColor}
                />
              ) : (
                <FoundationIcons name="record" size={25} color={tintColor} />
              ),
            launchCamera: ({ tintColor }) => (
              <FontAwesomeIcons name="camera" size={20} color={tintColor} />
            ),
            draw: ({ tintColor }) => (
              <MaterialCommunityIcons name='draw' size={25} color={tintColor} />
            ),
            editText: ({ tintColor }) => (
              <Ionicons name='text' size={25} color={tintColor} />
            ),
            close: ({ tintColor }) => (
              <Ionicons name='close' size={25} color={tintColor} />
            )
          }}
          style={[styles.richToolBar(theme), { bottom: proFocus.bottom }]}
          onPressAddImage={handlePressAddImage}
          insertVoice={recording ? handleStopRecording : handleInsertVoice}
          launchCamera={handleLaunchCamera}
          draw={handlePressDraw}
          editText={handlePressEditText}
          close={handleCloseTextTool}
        />
        <ScrollView
          style={[styles.editorView(theme), { height: proFocus.height }]}
          ref={editorView}
          onContentSizeChange={() =>
            editorView.current.scrollToEnd({ animated: true })
          }
        >
          <RichEditor
            ref={richText}
            initialContentHTML={noteContent}
            onChange={(text) => {
              handleNoteContentChange(text);
            }}
            editorStyle={{ backgroundColor: theme.background,
              color: theme.text, }}
            placeholder="Type something here..."
            placeholderTextColor={theme.text}
            style={styles.richEditor}
            onFocus={() => {
              setProFocus({
                height: screen.height - Constants.statusBarHeight - 80 - 248,
                bottom: -36,
                isDisableButton: true
              });
            }}
            onBlur={() => {
              setProFocus({
                height: screen.height - Constants.statusBarHeight - 80,
                bottom: -40,
                isDisableButton: false
              });
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
    flex: 1,
    paddingHorizontal: 5,
  }),
  headerIcon: theme =>  ({
    backgroundColor: theme.background,
    color: theme.text,
    flexDirection: 'row',
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    right: 6,
    alignItems: 'center',
  }),
  shareButton:theme => ({
    backgroundColor: theme.background,
    color: theme.text,
    paddingHorizontal: 10,
  }),
  changeBackgroundButton: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
    paddingHorizontal: 10,
  }),
  threeDotButton: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
  }),
  titleNote: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
    marginTop: Constants.statusBarHeight + 50,
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 10
  }),
  noteContent: {},
  editorView: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
  }),
  backButton: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center'
  }),
  richToolBar: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
    position: 'absolute',
    zIndex: 1,
    width: '100%'
    // borderColor: 'pink',
    // borderWidth: 1
  }),
  richEditor: {
    // borderColor: 'green',
    // borderWidth: 1
  },
  folderName: theme => ({
    backgroundColor: theme.background,
    color: theme.text,
    fontSize: 16
  })
})

export default connect(mapStateToProps, mapActionToProps)(Note);