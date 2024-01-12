import { StyleSheet } from "react-native";
import { scale } from "../../Utils/constants";
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
    waitingCircle: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    imageOverlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10,
        ...StyleSheet.absoluteFill,
    },
    btnLight: {
        padding: 5,
    },
    title: {
        fontFamily: "Be Vietnam bold",
        color: "white",
        fontSize: 20 * scale,
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
    backContainer: {
        position: "absolute",
        left: 5,
        paddingRight: 5,
        paddingVertical: 5,
    },
    backBtn: {
        width: 25,
        height: 25,
    },
    content: {
        position: "absolute",
        top: 50,
        width: "100%",
        paddingHorizontal: 15,
    },
    avatar: {
        width: 260,
        height: 270,
        marginBottom: 20,
        borderRadius: 34,
    },
    name: {
        color: "red",
        fontFamily: "Be Vietnam bold",
    },
    note: {
        // color: "red",
        fontFamily: "Be Vietnam italic",
    },
    body: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#BDBDBD",
        paddingBottom: 10,
        paddingHorizontal: 10,
        marginTop: 20,
        // borderWidth: 1,
    },
    informationTitle: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;
