import React, { useEffect } from "react";
import { View, Animated, Easing } from "react-native";

const ScanAnimation = ({ imageHeight }) => {
    const translateY = new Animated.Value(0);

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: imageHeight, // Adjust the value based on your image height
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: -1 }
        ).start();
    };

    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
            }}
        >
            <Animated.View
                style={{
                    height: 4,
                    width: "90%",
                    backgroundColor: "red", // Adjust color as needed
                    position: "absolute",
                    top: 0,
                    transform: [{ translateY }],
                }}
            />
        </View>
    );
};

export default ScanAnimation;
