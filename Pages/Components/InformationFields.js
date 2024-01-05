import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

import { CustomText } from "./CustomText.js";

const InformationFields = ({ item, isShow, onHeadPressed }) => {
    const [isDropDown, SetIsDropDown] = useState(true);
    useEffect(() => {
        if (isShow !== null && isShow !== undefined) SetIsDropDown(isShow);
    }, [isShow]);

    return (
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
                    borderBottomLeftRadius: !isDropDown ? 5 : 0,
                    borderBottomRightRadius: !isDropDown ? 5 : 0,
                }}
            >
                <CustomText
                    style={{
                        fontFamily: "Be Vietnam bold",
                        color: "white",
                        backgroundColor: "#384664",
                        height: 20,
                    }}
                >
                    {item.title}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
});

export default InformationFields;
