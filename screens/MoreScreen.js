import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon, ListItem, Switch } from 'react-native-elements'

const MoreScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'More'
    })
  }, [navigation])
  const list = [
    {
      title: 'Library',
      icon: 'library-books',
      type: 'material-icons',
      color: '#254767',
      clickAction: () => {
        navigation.navigate('More', {screen: 'Library' })
      }
    },
    {
      title: 'Feedback',
      icon: 'envelope-o',
      type: 'font-awesome',
      color: '#fe725b'
    },
    {
      title: 'Night mode',
      icon: 'nightlight-round',
      type: 'material-icons',
      color: '#922bef'
  
    }
  ]
  return (
    <View>
      {
        list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={() => item.clickAction()}>
            <Icon name={item.icon} type={item?.type} reverse color={item.color}/>
            <ListItem.Content>

              {(i === list?.length - 1) ? (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <ListItem.Title>{item.title}</ListItem.Title>
                <Switch
                // value={checked}
                // onValueChange={(value) => setChecked(value)}
                />
              </View>
              )
                : <ListItem.Title>{item.title}</ListItem.Title>
              }
            </ListItem.Content>
            {(i < list?.length - 1) && <ListItem.Chevron />}
          </ListItem>
        ))
      }
    </View>
  )
}

export default MoreScreen