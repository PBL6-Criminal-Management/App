import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { CustomText } from "./CustomText.js";

const DropDown = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <View
            style={[
                {
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                    alignItems: "flex-start",
                    marginBottom: 20,
                },
                Platform.OS === "ios" && { zIndex: 10 },
            ]}
        >
            <CustomText
                style={{
                    fontFamily: "Be Vietnam bold",
                    color: "#53B6ED",
                }}
            >
                {props.title}
            </CustomText>
            <DropDownPicker
                open={open}
                value={props.value}
                items={props.items}
                setOpen={setOpen}
                setValue={props.setValue}
                setItems={props.setItems}
                multiple={true}
                mode="BADGE"
                badgeDotColors={[
                    "#e76f51",
                    "#00b4d8",
                    "#e9c46a",
                    "#e76f51",
                    "#8ac926",
                    "#00b4d8",
                    "#e9c46a",
                ]}
                placeholder={props.placeholder}
                placeholderStyle={{
                    color: "#BFC0C1",
                }}
                containerStyle={{ width: "67%" /*width: 300*/ }}
                listMode="SCROLLVIEW"
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default DropDown;
