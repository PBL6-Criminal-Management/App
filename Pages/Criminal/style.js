import { StyleSheet } from "react-native";
import color from "../../Contains/color";
import { scale } from "../../Utils/constants";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f2f2",
    },
    head: {
        backgroundColor: "#152259",
    },
    backContainer: {
        position: "absolute",
        left: 20,
        paddingRight: 5,
        paddingBottom: 5,
    },
    backBtn: {
        width: 25,
        height: 25,
        tintColor: "white",
    },
    avatar: {
        width: 180,
        height: 180,
        marginBottom: 20,
        borderRadius: 100,
        alignSelf: "center",
        resizeMode: "stretch",
    },
    content: {
        position: "absolute",
        top: 50,
        width: "100%",
        paddingHorizontal: 15,
    },
    title: {
        fontFamily: "Be Vietnam bold",
        fontSize: 22 * scale,
        opacity: 1,
        color: "white",
    },
    note: {
        fontSize: 17 * scale,
        opacity: 1,
        color: "yellow",
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
        flexDirection: "row",
        height: 50,
        backgroundColor: "#DFE0E2",
        color: "black",
        width: "65%",
        borderRadius: 5,
        paddingStart: 10,
        alignItems: "center",
        gap: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
    btnFilter: {
        flexGrow: 1, //fill the remaining space.
        flexDirection: "row",
        backgroundColor: "#DFE0E2",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 20,
        height: "70%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHead: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        marginBottom: 10,
    },
    btnCancel: {
        padding: 5,
    },
    modalTitle: {
        fontSize: 15 * scale,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 15 * scale,
    },
    btnAgree: {
        width: 200,
        height: 56,
        backgroundColor: "#152259",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 10,
    },
    body: {
        marginTop: 30,
    },
    waitingCircle: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    scroll: { height: "100%" },
});

export default styles;
