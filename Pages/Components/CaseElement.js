import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { CustomText } from "../Components/CustomText.js";
import { caseStatus, typeOfViolation } from "../../Utils/constants.js";

const CaseElement = (props) => {
    const colorBackgroundStatusList = {
        0: "#F8D1CD",
        1: "#13d6d6",
        2: "#c8f2d9",
    };
    const colorStatusList = {
        0: "#6D1008",
        1: "#235a12",
        2: "#0d6630",
    };
    const BASE_PATH = "../../Public/";

    return (
        <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
            <View style={styles.body}>
                <View style={[styles.row, { alignItems: "center" }]}>
                    <CustomText style={styles.title}>
                        {props.item.code}
                    </CustomText>
                    <View
                        style={[
                            styles.caseStatus,
                            {
                                backgroundColor:
                                    colorBackgroundStatusList[
                                        props.item.status
                                    ],
                            },
                        ]}
                    >
                        <CustomText
                            style={{
                                color: colorStatusList[props.item.status],
                            }}
                        >
                            {caseStatus[props.item.status]}
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
                        <CustomText style={styles.title}>
                            Loại vi phạm:
                        </CustomText>
                        <CustomText>
                            {typeOfViolation[props.item.typeOfViolation]}
                        </CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>
                            Thời gian xảy ra:
                        </CustomText>
                        <CustomText>{props.item.timeTakesPlace}</CustomText>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>Tội danh:</CustomText>
                        <CustomText>{props.item.charge}</CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>Khu vực:</CustomText>
                        <CustomText>{props.item.area}</CustomText>
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
    caseStatus: {
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

export default CaseElement;
