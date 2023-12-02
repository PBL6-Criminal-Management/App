import React from "react";
import { View, StyleSheet } from "react-native";

import { CustomText } from "../Components/CustomText.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { criminalStatus } from "../../Utils/constants.js";

const CriminalElement = (props) => {
    const colorList = {
        0: "#FBC778",
        1: "#FC0808",
        2: "#63036C",
    };
    const BASE_PATH = "../../Public/";

    return (
        <TouchableOpacity
            style={[
                styles.container,
                // { borderTopColor: colorList[props.item.criminalStatus] },
            ]}
            // onPress={props.onPress}
        >
            <View style={styles.body}>
                <View style={styles.row}>
                    <CustomText style={styles.title}>
                        {/* {criminalStatus[props.item.name]} */}
                        Nguyễn Thế Đăng Hoan
                    </CustomText>
                    <CustomText
                        style={[
                            styles.criminalStatus,
                            {
                                backgroundColor:
                                    // colorList[props.item.criminalStatus],
                                    "#FBC778",
                            },
                        ]}
                    >
                        {/* {criminalStatus[props.item.criminalStatus]} */}
                        Đang ngồi tù
                    </CustomText>
                </View>
                <View
                    style={{
                        height: 1,
                        borderWidth: 1,
                        borderColor: "#DFE0E2",
                    }}
                ></View>
                <View style={styles.row}>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>Ngày sinh:</CustomText>
                        <CustomText>03/02/2002</CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>
                            Hộ khẩu thường trú:
                        </CustomText>
                        <CustomText>
                            K123 đườn
                            {/* g Tôn Đản, Hoà Phát, Cẩm Lệ, TP Đà Nẵng */}
                        </CustomText>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>Tội danh:</CustomText>
                        <CustomText>
                            Tội cướp giật
                            {/* tài sản và buôn bán hàng cấm */}
                        </CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>
                            Phạm tội gần nhất:
                        </CustomText>
                        <CustomText>24/11/2022</CustomText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        // borderStyle: 'dashed',
        borderColor: "gray",
        borderWidth: 0.2,
        borderRadius: 17,
        padding: 8,
    },
    criminalStatus: {
        // position: "absolute",
        // top: 10,
        // right: 10,
        borderRadius: 5,
        color: "white",
        padding: 5,
        overflow: "hidden",
    },
    body: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
    },
    row: {
        flexDirection: "row",
        gap: 30,
        justifyContent: "space-between",
        alignItems: "center",
    },
    field: {
        flexDirection: "column",
        paddingBottom: 15,
    },
    title: {
        fontFamily: "Be Vietnam bold",
        color: "#08354F",
    },
    image: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderRadius: 100,
        alignSelf: "center",
        resizeMode: "stretch",
    },
    textContainer: {
        flex: 1,
    },
    content: {
        paddingLeft: 20,
    },
    foot: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
});

export default CriminalElement;
