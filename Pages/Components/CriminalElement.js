import React from "react";
import { View, StyleSheet } from "react-native";

import { CustomText } from "../Components/CustomText.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { criminalStatus } from "../../Utils/constants.js";

const CriminalElement = (props) => {
    const colorList = {
        0: "#648c11",
        1: "#FBC778",
        2: "#FC0808",
        3: "#d2691e",
        4: "#63036C",
        5: "green",
    };
    const BASE_PATH = "../../Public/";

    return (
        <TouchableOpacity
            style={[styles.container]}
            // onPress={props.onPress}
        >
            <View style={styles.body}>
                <View style={[styles.row, { alignItems: "center" }]}>
                    <CustomText style={styles.title}>
                        {props.item.name}
                    </CustomText>
                    <View
                        style={[
                            styles.criminalStatus,
                            {
                                backgroundColor: colorList[props.item.status],
                            },
                        ]}
                    >
                        <CustomText style={{ color: "white" }}>
                            {criminalStatus[props.item.status]}
                        </CustomText>
                    </View>
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
                        <CustomText style={styles.title}>Năm sinh:</CustomText>
                        <CustomText>{props.item.yearOfBirth}</CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>
                            Hộ khẩu thường trú:
                        </CustomText>
                        <CustomText>{props.item.permanentResidence}</CustomText>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>Tội danh:</CustomText>
                        <CustomText>{props.item.charge}</CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>
                            Phạm tội gần nhất:
                        </CustomText>
                        <CustomText>
                            {props.item.dateOfMostRecentCrime}
                        </CustomText>
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
        padding: 8,
        borderRadius: 17,
        // borderColor: "gray",
        // borderWidth: 0.5,
        width: "98%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
    },
    criminalStatus: {
        height: 40,
        borderRadius: 5,
        color: "white",
        padding: 5,
        paddingHorizontal: 10,
        overflow: "hidden",
        justifyContent: "center",
    },
    body: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
    },
    field: {
        flexDirection: "column",
        width: "50%",
    },
    title: {
        fontFamily: "Be Vietnam bold",
        color: "#08354F",
    },
});

export default CriminalElement;
