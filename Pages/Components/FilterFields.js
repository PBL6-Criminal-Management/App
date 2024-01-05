import React, { useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import Checkbox from "expo-checkbox";

import { CustomText } from "./CustomText.js";

const FilterFields = (props) => {
    const [isDropDown, SetIsDropDown] = useState(true);
    const onHeadPressed = () => {
        SetIsDropDown(!isDropDown);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.item} onPress={onHeadPressed}>
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                    }}
                >
                    <CustomText
                        style={{
                            width: "70%",
                            fontFamily: "Be Vietnam bold",
                            color: "#53B6ED",
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
                        style={{ tintColor: "#53B6ED" }}
                    />
                </View>
                <View
                    style={{
                        height: 1,
                        borderWidth: 1,
                        borderColor: "#DFE0E2",
                    }}
                ></View>
            </Pressable>
            {Object.entries(props.listItems).map(([key, value]) => {
                const [count, SetCount] = useState(0);
                const onPress = () => {
                    SetCount((prevCount) => {
                        if (prevCount === 0) {
                            props.setListChecked([...props.listChecked, key]);
                            return 1;
                        } else {
                            props.setListChecked(
                                props.listChecked.filter((s) => s !== key)
                            );
                            return 0;
                        }
                    });
                };

                return (
                    isDropDown && (
                        <Pressable
                            key={key}
                            style={styles.item}
                            onPress={() => onPress()}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                }}
                            >
                                <CustomText
                                    style={{
                                        width: "67%",
                                        fontFamily: "Be Vietnam bold",
                                    }}
                                >
                                    {value}
                                </CustomText>
                                <Checkbox
                                    value={props.listChecked.includes(key)}
                                    onValueChange={() => onPress()}
                                    color={
                                        props.listChecked.includes(key)
                                            ? "#53B6ED"
                                            : "#DFE0E2"
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    height: 1,
                                    borderWidth: 1,
                                    borderColor: "#DFE0E2",
                                }}
                            ></View>
                        </Pressable>
                    )
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 20,
    },
    item: {
        flexDirection: "column",
        gap: 10,
        paddingTop: 10,
    },
});

export default FilterFields;
