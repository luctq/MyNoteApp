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

import BackButton from "../components/BackButton";

export default function Settings({ navigation }) {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress} />
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
          <Text style={styles.setting}>Đăng nhập</Text>
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
