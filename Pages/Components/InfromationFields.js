import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import Checkbox from "expo-checkbox";

import { CustomText } from "./CustomText.js";

const FilterFields = (props) => {
    const [listItemsChecked, SetListItemsChecked] = useState([]);
    const [isDropDown, SetIsDropDown] = useState(true);
    const onHeadPressed = () => {
        SetIsDropDown(!isDropDown);
    };
    const onCheck = (isChecked, checkedValue) => {
        if (isChecked) SetListItemsChecked([...listItemsChecked, checkedValue]);
        else
            SetListItemsChecked(
                listItemsChecked.filter((item) => item != checkedValue)
            );
    };
    //set in useEffect to ensure that listItemChecked done re-render
    useEffect(() => {
        props.SetListItemsChecked(listItemsChecked);
    }, [listItemsChecked]);

    return (
        <View style={styles.container}>
            <Pressable onPress={onHeadPressed}>
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        // overflow: "visible",
                    }}
                >
                    <CustomText
                        style={{
                            width: "70%",
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
                        // style={{tintColor: 'red'}}
                    />
                </View>
            </Pressable>
            {props.listItems.map((item, index) => {
                const [isChecked, SetIsChecked] = useState(false);
                const onPress = () => {
                    SetIsChecked(!isChecked);
                    onCheck(!isChecked, item);
                };

                return (
                    isDropDown && (
                        <View key={index} style={styles.item} onPress={onPress}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    {item.field}
                                </CustomText>
                                <CustomText style={{}}>{item.value}</CustomText>
                            </View>
                        </View>
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
