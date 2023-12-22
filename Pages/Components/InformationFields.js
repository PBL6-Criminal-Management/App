import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

import { CustomText } from "./CustomText.js";
import InformationFlat from "./InformationFlat.js";

const InformationFields = (props) => {
    const [isDropDown, SetIsDropDown] = useState(true);

    const onHeadPressed = () => {
        SetIsDropDown(!isDropDown);
    };
    return (
        Object.keys(props.listItems).length > 0 && (
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
                {isDropDown && (
                    <InformationFlat
                        listItems={props.listItems}
                        paddingHorizontal={20}
                        firstTopPadding={20}
                    />
                )}
            </View>
        )
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
