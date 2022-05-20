import { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Pressable } from "react-native";
import CheckBox from "react-native-check-box";
import Ionicons from "react-native-vector-icons/Ionicons";
import { textDecorationColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { handleCheck, handleUnCheck } from "../redux/reducers/Todo";
import NewTodoModal from "./NewTodoModal";
const mapActionToProps = {
  handleCheck,
  handleUnCheck
};
const mapStateToProps = (state) => ({
});

function TodoListItem({
  style,
  onTodoListItemPress,
  info,
  type,
  handleCheck,
  handleUnCheck
}) {
  const shrinkTextLonger35Char = (text) => {
    if (text.length < 35) {
      return text;
    } else {
      return text.substring(0, 35) + "...";
    }
  };

  const handleCheckBox = () => {
    if (isSelected) {
      handleUnCheck(info.id)
    } else {
      handleCheck(info.id)
    }
    setSelection(!isSelected);
  }
  const [isSelected, setSelection] = useState(type === "todoListComplete");
  return (
    <View style={style}>
      <Pressable style={styles.container} onPress={onTodoListItemPress}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={[styles.checkbox]}
            checkBoxColor={isSelected ? "gray" : "black"}
            onClick={() => handleCheckBox()}
            isChecked={isSelected}
          />
          <View style={{marginTop: 4}}>
            {type === "todoList" ? (
              <Text style={styles.title}>
                {shrinkTextLonger35Char(info.content)}
              </Text>
            ) : (
              <Text
                style={[
                  styles.title,
                  {
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    color: "gray",
                  },
                ]}
              >
                {shrinkTextLonger35Char(info.content)}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    // width: "80%",
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    // marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  icon: {
    margin: 10,
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 5,
    marginTop: 24,
    flex: 8,
  },
  count: {
    fontSize: 20,
    color: "#B9B9B9",
    marginTop: 28,
    flex: 1,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapActionToProps)(TodoListItem);