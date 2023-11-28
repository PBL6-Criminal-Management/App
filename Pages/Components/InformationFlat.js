import React from "react";
import { View, StyleSheet } from "react-native";

import { CustomText } from "./CustomText.js";

const InformationFlat = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {Object.keys(props.listItems).map((_, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                flexDirection: "column",
                                paddingBottom: 15,
                            }}
                        >
                            <CustomText
                                style={{
                                    fontFamily: "Be Vietnam bold",
                                    color: "#08354F",
                                }}
                            >
                                {Object.keys(props.listItems)[index]}:{" "}
                            </CustomText>
                            <CustomText style={{}}>
                                {Object.values(props.listItems)[index]}
                            </CustomText>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flexDirection: "column",
        width: "100%",
        backgroundColor: "white",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
});

export default InformationFlat;
