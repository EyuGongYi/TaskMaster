import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function Settings() {
  return (
    <View>
        <Text>Settings</Text>
        <Pressable onPress={() =>console.log("hi")}>
            <Text>Logout</Text>
        </Pressable>
    </View>
  )
}