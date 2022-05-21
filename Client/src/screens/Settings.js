import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux'
import { useState } from "react";
import FlashMessage from 'react-native-flash-message'

import BackButton from "../components/BackButton";
import DropDownOfSync from "../components/DropDownOfSync";
import { logout, resetStatus, uploadData, downloadData } from '../redux/reducers/Auth'

function Settings({ navigation, auth, logout, resetStatus, uploadData, downloadData, folders, notes }) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)

  const settingRefMes = React.useRef()

  React.useEffect(() => {
    if (auth.status === 0) {
      settingRefMes.current.showMessage({
        message: auth.mes,
        type: 'danger',
        duration: 2000
      })
    }
  }, [auth.status, auth.randomNumber])

  React.useEffect(() => {
    return () => {
      resetStatus()
    }
  }, [])

  const handleBackPress = () => {
    navigation.goBack();
  }
  const handleLoginPress = () => {
    if (auth.isLogin) {
      handleToggleDropDown()
    } else {
      resetStatus()
      navigation.navigate("Login");
    }
  }
  const handleToggleDropDown = () => {
    setIsOpenDropDown(!isOpenDropDown)
  }
  const handleLogout = () => {
    logout()
  }
  const handleUploadData = () => {
    resetStatus()
    uploadData(folders, notes)
  }
  const handleDownloadData = () => {
    resetStatus()
    downloadData()
  }

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress} />
      <DropDownOfSync 
        isOpen={isOpenDropDown} 
        setIsOpen={handleToggleDropDown} 
        onLogoutPress={handleLogout} 
        onUploadPress={handleUploadData}
        onDownloadPress={handleDownloadData}
        isCloseLoading={auth.status === 1 ? true : false}
      />
      <Text style={styles.header}>Ghi chú</Text>
      <View>
        <Text style={styles.title}>PHONG CÁCH</Text>
        <View style={styles.settingRow}>
          <Text style={styles.setting}>Cỡ chữ</Text>
          <Text style={{ flex: 3, opacity: 0.5 }}>Vừa</Text>
          <MaterialCommunityIcons
            name="menu-swap-outline"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.setting}>Sắp xếp</Text>
          <Text style={{ flex: 3, opacity: 0.5 }}>Theo ngày chỉnh sửa</Text>
          <MaterialCommunityIcons
            name="menu-swap-outline"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </View>
      </View>
      <View>
        <Text style={styles.title}>ĐỒNG BỘ HÓA</Text>
        <TouchableOpacity onPress={handleLoginPress} style={styles.settingRow}>
          <Text style={styles.setting}>{auth.isLogin ? auth.username : 'Đăng nhập'}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>NHẮC NHỞ</Text>
        <View style={styles.settingRow}>
          <View style={{ flex: 4 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Nhắc nhở ưu tiên cao
            </Text>
            <Text style={{ fontStyle: "italic", fontSize: 15, opacity: 0.5 }}>
              Phát âm thanh ngay cả khi im lặng hoặc chế độ Không làm phiền bật
            </Text>
          </View>
          <MaterialCommunityIcons
            name="toggle-switch-off-outline"
            size={60}
            color="#000"
            style={styles.icon}
          />
          {/* <MaterialCommunityIcons name="toggle-switch" size={30} color="#000" /> */}
        </View>
      </View>
      <View>
        <Text style={styles.title}>KHÁC</Text>
        <Pressable style={styles.settingRow}>
          <Text style={styles.setting}>Chính sách riêng tư</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </Pressable>
        <Pressable style={styles.settingRow}>
          <Text style={styles.setting}>Về chúng tôi</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </Pressable>
      </View>
      <FlashMessage position='top' ref={settingRefMes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#f7f7f7",
    fontFamily: "Nunito",
  },
  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 5,
    left: 6,
  },
  header: {
    fontSize: 35,
    fontWeight: "400",
    marginTop: Constants.statusBarHeight + 50,
  },
  title: {
    fontSize: 15,
    color: "#000000",
    opacity: 0.5,
    fontWeight: "300",
    marginTop: 35,
  },
  settingRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  setting: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 10,
  },
  icon: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  folders: state.folder.folderList,
  notes: state.note.noteList,
})

const mapActionToProps = {
  logout,
  resetStatus,
  uploadData,
  downloadData
}

export default connect(mapStateToProps, mapActionToProps)(Settings)