import { StyleSheet, Text, View, Modal, Button } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

const ModalCustom = ({ modalVisible, setModalVisible, children }) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection:'row',
              justifyContent: 'flex-end'
            }}
          >
            <Icon
              raised
              name='times'
              type='font-awesome'
              color='black'
              onPress={() => setModalVisible(false)}
              size={20}
            />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default ModalCustom

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
    justifyContent: 'flex-end',
  },
  container: {
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20
  }
})