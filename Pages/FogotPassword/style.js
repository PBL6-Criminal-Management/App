import { StyleSheet } from "react-native";
import { scale, textInputDefaultSize } from "../../Utils/constants";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#152259",
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
    form: {
        flex: 0.8,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 50,
    },
    head: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 260,
        // borderWidth: 1,
        marginBottom: 55,
    },
    backContainer: {
        position: "absolute",
        top: 30,
        left: 20,
        paddingRight: 5,
        paddingBottom: 5,
    },
    backBtn: {
        width: 25,
        height: 25,
    },
    title: {
        fontSize: 45 * scale,
        fontFamily: "Inter",
        fontStyle: "normal",
        color: "#152259",
        opacity: 1,
        textAlign: "center",
        textAlignVertical: "center",
    },
    subtitle: {
        fontFamily: "Be Vietnam italic",
        fontSize: 15 * scale,
        height: 20,
        alignSelf: "flex-end",
    },
    body: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 18,
        gap: 14,
    },
    textInput: {
        alignItems: "center",
        flexDirection: "row",
    },
    error: {
        color: "red",
        fontWeight: "bold",
        marginTop: 5,
        alignSelf: "flex-start",
    },
    input: {
        height: 50,
        flexBasis: 1,
        flexGrow: 1,
        borderWidth: 1,
        borderColor: "#43BDD4",
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        fontSize: textInputDefaultSize * scale,
        color: "#5C5D60",
        opacity: 1,
    },
    icon: {
        position: "absolute",
        right: 7,
        padding: 5,
    },
    btnLogin: {
        borderRadius: 5,
        backgroundColor: "#152259",
        width: 246,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
    },
    txtLogin: {
        color: "white",
        fontSize: 18 * scale,
        fontWeight: "bold",
    },
    foot: {
        position: "absolute",
        bottom: 40,
        width: "100%",
    },
    footContent: {
        alignItems: "center",
    },
});

export default styles;
