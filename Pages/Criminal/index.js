import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { LocalAuthentication } from "expo";

// Toggle flashlight
const toggleFlashlight = async () => {
    try {
        const brightness = await LocalAuthentication.getSystemBrightnessAsync();

        if (brightness !== 1) {
            LocalAuthentication.setSystemBrightnessAsync(1);
        } else {
            LocalAuthentication.setSystemBrightnessAsync(0);
        }
    } catch (error) {
        console.log(error);
    }
};

export default function App() {
    return (
        <View style={styles.container}>
            <Button
                title={"Turn On"}
                onPress={toggleFlashlight}
                // color={flashlightOn ? "red" : "green"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
