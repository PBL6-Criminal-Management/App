import { StyleSheet } from "react-native";
import color from "../../Contains/color";
import { scale } from "../../Utils/constants";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F2F2",
    },
    head: {
        backgroundColor: "#152259",
    },
    btnLogout: {
        position: "absolute",
        right: 20,
        paddingBottom: 15,
        paddingLeft: 10,
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
        borderWidth: 2,
        borderRadius: 100,
        borderColor: "white",
    },
    content: {
        position: "absolute",
        top: 50,
        width: "100%",
        paddingHorizontal: 15,
    },
    name: {
        fontFamily: "Be Vietnam bold",
        fontSize: 20 * scale,
        opacity: 1,
        color: "white",
    },
    note: {
        fontSize: 15 * scale,
        opacity: 1,
        color: "white",
    },
    body: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        marginBottom: 10,
        paddingBottom: 20,
    },
    title: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        paddingBottom: 20,
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
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 310,
    },
    modalHead: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
    },
    iconCancel: {
        position: "absolute",
        left: 10,
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
    modalContent: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    btnAgree: {
        width: 200,
        height: 56,
        backgroundColor: "#152259",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    btnConfirm: {
        width: 130,
        height: 56,
        backgroundColor: "#FF495F",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    btnCancel: {
        width: 130,
        height: 56,
        backgroundColor: "#F1F1F1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    scroll: {},
});

export default styles;
