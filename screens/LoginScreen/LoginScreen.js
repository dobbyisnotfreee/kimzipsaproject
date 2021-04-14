import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Button, Image, Input} from "react-native-elements";
import {auth} from "../../firebase";
import styles from "./styles";
const BLUE = "#428AF8"
const WHITE = "#FFFFFF"
const YELLOW = "#FFD400"
const GRAY = "#D3D3D3"

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((e) => alert(e));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("상담목록")
            }
        })
        return unsubscribe;
    }, [])

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View>
                <StatusBar style="light"/>
                <Image source={{
                    uri: "https://play-lh.googleusercontent.com/n_MUpLeUVpolupsn5mA-PuIircKZvpA4j6VkpdKHP1aotpuiDdqY7CCS8r5rvfB7yNo",

                }} style={{width: 200, height: 200}}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={{ paddingLeft: 5 }} placeholderTextColor={GRAY} color={WHITE} selectionColor={BLUE}
                placeholder="이메일" autoFocus type="email"
                       value={email} onChangeText={(text) => setEmail(text)}/>
                <TextInput style={{ paddingLeft: 5 }} placeholderTextColor={GRAY} color={WHITE} selectionColor={BLUE} placeholder="비밀번호" secureTextEntry type="password" onSubmitEditing={signIn}
                       value={password} onChangeText={(text) => setPassword(text)}/>

            </View>




            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.text}> 로그인 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("회원가입")} >
                <Text style={styles.text}> 회원가입 </Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

