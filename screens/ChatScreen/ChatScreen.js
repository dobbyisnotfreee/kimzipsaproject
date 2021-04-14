import React, {useLayoutEffect, useState} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, ScrollView,
    StatusBar,
    Text, TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import {Avatar} from "react-native-elements";
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import {auth, db} from "../../firebase";
import firebase from "firebase";
import styles from "./styles";


const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Avatar
                        rounded
                        source={{
                            uri: messages [0]?.data.photoURL ||
                                "https://cdn.imweb.me/upload/S2020040723e5ae52f73a7/a17d7ddf38e2c.png",
                        }}/>
                    <Text style={{color: "white", marginLeft: 10, fontWeight: "700"}}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>

                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })
        setInput("");
    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
        return unsubscribe;
    }, [route])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                  style={styles.container}
                                  keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 15}}>
                            {messages.map(({id, data}) => {
                                return data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }
                                            }
                                            bottom={-15}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}/>
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                        <Text style={styles.recieverName}>{data.displayName}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }
                                            }
                                            bottom={-15}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}/>
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <View style={{
                            flexDirection: "row",
                            height: 50,
                            alignItems: "center",
                        }}>
                            <TextInput
                                placeholder="메세지"
                                style={{
                                    flex: 3,
                                    height: 50,
                                    borderWidth: 1,
                                    paddingLeft:20,
                                    borderColor: "#ffd400",

                                }}
                                value={input}
                                onSubmitEditing={() => {
                                    if (input) sendMessage();
                                }}
                                onChangeText={(text) => setInput(text)}/>

                            <TouchableOpacity onPress={() => {
                                if (input) sendMessage();
                            }} activeOpacity={0.5}>
                                <Ionicons name="send" size={30} color="#2B68E6"/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

export default ChatScreen;



