import React from "react";
import { View, ActivityIndicator } from "react-native";

const Splash = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#06bcee",
            }}
        >
            <ActivityIndicator size="large" color="green" />
        </View>
    );
};

export default Splash;
