import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen/AddChatScreen";
import ChatScreen from "./screens/ChatScreen/ChatScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle:{ backgroundColor: 'black' },
  headerTitleStyle: {color: "white", textAlign: "center", flex:1},
  headerTintColor: "white",
}


export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
    <Stack.Screen name="로그인" component={LoginScreen}/>
    <Stack.Screen name="회원가입"  component={RegisterScreen}/>
    <Stack.Screen name="상담목록"  component={HomeScreen}/>
    <Stack.Screen name="AddChat"  component={AddChatScreen}/>
    <Stack.Screen name="Chat"  component={ChatScreen}/>




  </Stack.Navigator>
</NavigationContainer>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
