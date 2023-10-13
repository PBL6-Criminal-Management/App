import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
    head: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30,
        justifyContent: "center",
        gap: 40,
        backgroundColor: "black",
    },
    btnLight: {
        padding: 5,
    },
    title: {
        fontFamily: "Be Vietnam bold",
        color: "white",
        fontSize: 20,
        opacity: 1,
    },
    btnCancel: {
        padding: 5,
    },
    centerImage: {
        flex: 4,
        justifyContent: "center",
        borderWidth: 1,
    },
    camera: {
        flex: 1,
        alignItems: "center",
    },
    foot: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
    },
    headFoot: {},
    bodyFoot: {
        flexDirection: "row",
        alignItems: "center",
        gap: 60,
    },
    btnSelectImage: {},
    btnTakePhoto: {},
    btnFlipCamera: {},
});

export default styles;
