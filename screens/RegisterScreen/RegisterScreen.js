import React, {useLayoutEffect, useState} from 'react';
import {Button, Input, Text} from "react-native-elements";
import {KeyboardAvoidingView, ScrollView, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {auth} from "../../firebase";
import styles from "./styles";


const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "",
        });
    }, [navigation])


    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2020%2F07%2Fdiseny-postponed-avatar-2-mulan-starwars-trilogy-covid-19-tw.jpg?w=960&cbr=1&q=90&fit=max"
                })
            })
            .catch((error) => alert(error.message))

    };

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom: 50}}>
                김집사 회원가입하기
            </Text>

            <KeyboardAvoidingView behavior="padding" >
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="이름"
                        autofocus
                        type="text"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <Input
                        placeholder="이메일"
                        type="email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        placeholder="비밀번호"
                        type="password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Input
                        placeholder="프로필사진"
                        type="text"
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        onSubmitEditing={register}
                    />
                </View>
                <Button
                    containerStyle={styles.button}
                    raised
                    onPress={register}
                    title="회원가입"
                />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default RegisterScreen;


