import React, {useLayoutEffect, useState} from 'react';
import {Button, View} from "react-native";
import {Icon, Input} from "react-native-elements";
import {db} from "../../firebase";
import styles from "./styles";


const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    const createChat = async () => {
        await db.collection("chats")
            .add({
                chatName: input,
            }).then(() => {
                navigation.goBack();
            }).catch((error) => alert(error));
    }

    useLayoutEffect( () => {
        navigation.setOptions({
            title:"상담 및 문의",
            headerBackTitle: "",
        })
    }, [navigation])


    return (
        <View style={styles.container}>
     <Input placeholder="상담제목을 입력해주세요"
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />
            }
            />

            <Button disabled={!input} onPress={createChat} title="상담하기" />
        </View>
    );
};

export default AddChatScreen;

