import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";

import { CustomText } from "./CustomText.js";
import { scale, textInputDefaultSize } from "../../Utils/constants.js";

const RadioFields = (props) => {
    const [isDropDown, SetIsDropDown] = useState(true);
    const [listValues, SetListValues] = useState([]);
    const onHeadPressed = () => {
        SetIsDropDown(!isDropDown);
    };

    useEffect(() => {
        if (props.listItems) {
            SetListValues(
                Object.entries(props.listItems).map(([key, value], index) => {
                    return {
                        id: index,
                        label: value,
                        value: key,
                        containerStyle: {
                            flexDirection: "row-reverse",
                            justifyContent: "space-between",
                        },
                        labelStyle: {
                            fontFamily: "Be Vietnam bold",
                            fontSize: scale * textInputDefaultSize,
                            color: "#5C5D60",
                            opacity: 1,
                            width: "67%",
                            marginLeft: 0,
                        },
                        borderColor: "#DFE0E2",
                        color: "#53B6ED",
                    };
                })
            );
        }
    }, [props]);

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

            {isDropDown &&
                listValues.map((button) => (
                    <View key={button.id}>
                        <RadioButton
                            {...button}
                            key={button.id}
                            selected={button.id === props.value}
                            onPress={() => {
                                if (button.id !== props.value && props.setValue)
                                    props.setValue(button.id);
                            }}
                        />
                        <View
                            style={{
                                height: 1,
                                borderWidth: 1,
                                borderColor: "#DFE0E2",
                                width: 240,
                                alignSelf: "center",
                            }}
                        ></View>
                    </View>
                ))}
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
        paddingBottom: 10,
    },
    item: {
        flexDirection: "column",
        gap: 10,
    },
});

export default RadioFields;
