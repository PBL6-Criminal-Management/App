import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { CustomText } from "../Components/CustomText.js";
import { reportStatus } from "../../Utils/constants.js";

const NotificationElement = (props) => {
    const colorList = {
        0: "#FC0808",
        1: "#FBC778",
        2: "green"
    };
    return (
        <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
            <View style={styles.body}>
                <View style={[styles.row, { alignItems: "center" }]}>
                    <CustomText style={styles.title}>
                        Tên : {props.item.reporterName}
                    </CustomText>
                    <View
                        style={[
                            styles.reportStatus,
                            {
                                backgroundColor: colorList[props.item.status],
                            },
                        ]}
                    >
                        <CustomText style={{ color: "white" }}>
                            {reportStatus[props.item.status]}
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
                        <CustomText style={styles.title}>Thời gian gửi:</CustomText>
                        <CustomText>{props.item.sendingTime}</CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>
                            Địa chỉ:
                        </CustomText>
                        <CustomText>{props.item.reporterAddress}</CustomText>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>Số điện thoại:</CustomText>
                        <CustomText>{props.item.reporterPhone}</CustomText>
                    </View>
                    <View style={styles.field}>
                        <CustomText style={styles.title}>
                            Email:
                        </CustomText>
                        <CustomText>{props.item.reporterEmail}</CustomText>
                    </View>
                </View>
                <View style={styles.fullRow}>
                    <View style={styles.fullField}>
                        <CustomText style={styles.title}>Nội dung:</CustomText>
                        <CustomText>{props.item.content}</CustomText>
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
    reportStatus: {
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
    fullRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    fullField: {
        flexDirection: "column",
        width: "100%",
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

export default NotificationElement;
