import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { CustomText } from "./CustomText.js";
import { scale, textInputDefaultSize } from "../../Utils/constants.js";

const TextBox = (props) => {
    const handleKeyPress = (e) => {
        // Check if the key pressed is 'Enter'
        if (e.nativeEvent.key === "Enter") {
            // Prevent the default newline behavior
            e.preventDefault();

            // Manually update the text value without adding a new line
            props.setValue((prevText) => prevText + "\n");
        }
    };

    const handleChangeText = (newText) => {
        // Handle text changes
        props.setValue(newText);
    };
    return (
        <View
            style={[
                {
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 20,
                    marginHorizontal: 20,
                    alignSelf: "stretch",
                },
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
            <TextInput
                style={[
                    styles.input,
                    { height: props.height ? props.height : 50 },
                ]}
                placeholder={props.title}
                multiline={props.multiline}
                value={props.value}
                onChangeText={handleChangeText}
                onKeyPress={handleKeyPress}
            ></TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 250,
        paddingTop: 10,
        fontSize: textInputDefaultSize * scale,
        color: "#5C5D60",
        opacity: 1,
    },
});

export default TextBox;
