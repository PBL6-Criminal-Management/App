import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

import { CustomText } from "./CustomText.js";

const InformationFields = (props) => {
    const [isDropDown, SetIsDropDown] = useState(true);
    const onHeadPressed = () => {
        SetIsDropDown(!isDropDown);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={onHeadPressed} style={{ width: "100%" }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#384664",
                        height: 56,
                        padding: 20,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                    }}
                >
                    <CustomText
                        style={{
                            fontFamily: "Be Vietnam bold",
                            color: "white",
                            backgroundColor: "#384664",
                        }}
                    >
                        {props.title}
                    </CustomText>
                    <Image
                        source={
                            isDropDown
                                ? require("../../Public/upArrow.png")
                                : require("../../Public/downArrow.png")
                        }
                        style={{ tintColor: "white" }}
                    />
                </View>
            </Pressable>
            <View style={styles.body}>
                {Object.keys(props.listItems).map((_, index) => {
                    return (
                        isDropDown && (
                            <View
                                key={index}
                                style={{
                                    flexDirection: "column",
                                    paddingBottom: 10,
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    {Object.keys(props.listItems)[index]}:{" "}
                                </CustomText>
                                <CustomText style={{}}>
                                    {Object.values(props.listItems)[index]}
                                </CustomText>
                            </View>
                        )
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flexDirection: "column",
        width: "100%",
        paddingTop: 15,
        paddingStart: 32,
        backgroundColor: "white",
    },
});

export default InformationFields;
