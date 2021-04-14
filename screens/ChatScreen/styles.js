import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight:15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    reciverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    reciverName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },

    footer: {
        flexDirection: "row",
       height: 100,
        alignItems: "center",
    },
    textInput: {

    }
});

export default styles;
