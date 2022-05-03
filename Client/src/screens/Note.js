import { useState, useRef, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions
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
import { connect } from "react-redux";
import ShareButton from '../components/ShareButton'
import ChangeBackgroundButton from '../components/ChangeBackgroundButton'
import ThreeDotButton from '../components/ThreeDotButton'
import ShareFormModal from '../components/ShareFormModal'
import DropDownOfThreeDot from '../components/DropDownOfThreeDot'
import BackButton from '../components/BackButton'
import {
  createNewNote,
  updateNote,
  expulsionNote,
} from "../redux/reducers/Note";
import ChangeBackgroundModal from '../components/ChangeBackgroundModal'
const screen = Dimensions.get('window')

const mapStateToProps = (state) => ({
});

const mapActionToProps = {
  createNewNote,
  updateNote,
  expulsionNote,
};

function Note({ navigation, route, createNewNote, updateNote, expulsionNote }) {
  const note = route.params.item;
  const isNew = route.params.isNew;
  const [isOpen, setIsOpen] = useState(false);
  const [proFocus, setProFocus] = useState({
    height: screen.height - Constants.statusBarHeight - 80,
    bottom: -40,
  });
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [recording, setRecording] = useState();
  const richText = useRef();
  const editorView = useRef();
  const [isOpenModalChangeBackground, setIsOpenModalChangeBackground] = useState(false)
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
  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress} />
      <ChangeBackgroundModal isOpen={isOpenModalChangeBackground} onClosed={() => setIsOpenModalChangeBackground(false)}/>
      <DropDownOfThreeDot
        isOpen={isOpenDropDown}
        setIsOpen={() => handlePressFolderIcon()}
      />
      <ShareFormModal isOpen={isOpen} isClosed={() => setIsOpen(false)} />
      <View style={styles.headerIcon}>
        <ShareButton
          style={styles.shareButton}
          handlePress={() => setIsOpen(!isOpen)}
          isDisable={isDisableButton}
        />
        <ChangeBackgroundButton
          style={styles.changeBackgroundButton}
          onButtonChangeBackground={handlePressChangeBackgroundIcon}
          isDisable={isDisableButton}
        />
        <ThreeDotButton
          onButtonPress={handlePressFolderIcon}
          isDisable={isDisableButton}
        />
      </View>
      <TextInput
        placeholder="Write title..."
        value={noteTitle}
        onChangeText={handleNoteTitleChange}
        style={styles.titleNote}
      />
      <View style={{}}>
        <RichToolbar
          editor={richText}
          actions={[
            actions.insertImage,
            "insertVoice",
            "launchCamera",
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
          }}
          style={[styles.richToolBar, { bottom: proFocus.bottom }]}
          onPressAddImage={handlePressAddImage}
          insertVoice={recording ? handleStopRecording : handleInsertVoice}
          launchCamera={handleLaunchCamera}
        />
        <ScrollView
          style={[styles.editorView, { height: proFocus.height }]}
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
            editorStyle={{ backgroundColor: "#f7f7f7" }}
            placeholder="Type something here..."
            style={styles.richEditor}
            onFocus={() => {
              setProFocus({
                height: screen.height - Constants.statusBarHeight - 80 - 248,
                bottom: -36,
              });
              setIsDisableButton(true);
            }}
            onBlur={() => {
              setProFocus({
                height: screen.height - Constants.statusBarHeight - 80,
                bottom: -40,
              });
              setIsDisableButton(false);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    paddingHorizontal: 25,
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
    // borderColor: 'red',
    // borderWidth: 1
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 15
  },
  richToolBar: {
    backgroundColor: '#f7f7f7', 
    position: 'absolute',
    zIndex: 1,
    // borderColor: 'pink',
    // borderWidth: 1
  },
  richEditor: {
    // borderColor: 'green',
    // borderWidth: 1
  },
})

export default connect(mapStateToProps, mapActionToProps)(Note);
