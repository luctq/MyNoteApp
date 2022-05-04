import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Signature from 'react-native-signature-canvas'
import Constants from 'expo-constants'

const style = `
  .m-signature-pad--footer
  .button {
    background-color: red;
    color: #FFF;
    font-size: 18px;
  }
  .m-signature-pad {
    height: 400px;
  }
`

function Draw ({ navigation, route }) {

  const { handleOK, handleEmpty } = route.params

  return (
    <View style={styles.container}>
      <Signature
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText="Bảng vẽ tay"
        clearText="Xóa"
        confirmText="Xong"
        webStyle={style}
        style={styles.draw}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  draw: {
    
  }
})

export default Draw
