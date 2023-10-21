import { StyleSheet } from "react-native";
import color from "../../Contains/color";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    head: {
        height: 240,
        backgroundColor: "#152259",
    },
    content: {
        alignSelf: "center",
        position: "absolute",
        top: 50,
        bottom: 250,
        width: "100%",
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: "Be Vietnam bold",
        fontSize: 22,
        opacity: 1,
        color: "white",
    },
    search: {
        opacity: 1,
        flexDirection: "row",
        gap: 10,
        backgroundColor: "white",
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
    },
    input: {
        height: 50,
        backgroundColor: "#DFE0E2",
        color: "black",
        width: "65%",
        borderRadius: 5,
        padding: 10,
        paddingStart: 35,
        justifyContent: "center",
    },
    icon: {
        position: "absolute",
        left: 10,
        width: 20,
        height: 20,
    },
    btnFilter: {
        flexGrow: 1, //fill the remaining space.
        backgroundColor: "#DFE0E2",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingStart: 20,
    },
    body: {
        marginTop: 30,
    },
    scroll: {},
});

export default styles;
