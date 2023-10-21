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
    },
    camera: {
        flex: 1,
    },
    zoomResetButton: {
        width: 150,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "center",
        overflow: "hidden",
        backgroundColor: "white",
    },
    zoomResetText: {
        color: "black",
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
    },
    btnDetectImage: {
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
    },
    btnTakePhoto: {},
    btnFlipCamera: {
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
    },
});

export default styles;
