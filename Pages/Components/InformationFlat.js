import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Modal,
    Pressable,
    Image,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { CustomText } from "./CustomText.js";

const InformationFlat = (props) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [imageIndex, SetImageIndex] = useState(0);

    const convertToArrayOfObjects = (input) => {
        if (Array.isArray(input)) {
            return input;
        } else {
            return [input];
        }
    };

    return (
        Object.keys(props.listItems).length > 0 && (
            <View
                style={[
                    styles.body,
                    { paddingLeft: props.paddingLeft ? props.paddingLeft : 0 },
                ]}
            >
                {convertToArrayOfObjects(props.listItems).map((item) =>
                    Object.entries(item).map(([key, value], index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: "column",
                                    paddingBottom: 20,
                                    paddingTop: index == 0 ? 18 : 0,
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    {key}:
                                </CustomText>
                                <CustomText style={{}}>{value}</CustomText>
                            </View>
                        );
                    })
                )}
                {props.haveImages && (
                    <View>
                        <CustomText
                            style={{
                                fontFamily: "Be Vietnam bold",
                                color: "#08354F",
                            }}
                        >
                            {props.imagesFieldName}
                        </CustomText>
                        <View
                            style={{
                                marginTop: 5,
                                paddingBottom: 20,
                            }}
                        >
                            <ScrollView
                                snapToInterval={200}
                                decelerationRate={"fast"}
                                alwaysBounceHorizontal={true}
                                horizontal
                                contentContainerStyle={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {props.images.map((image, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            SetImageIndex(index);
                                            SetIsModalVisible(true);
                                        }}
                                    >
                                        <Image
                                            source={{ uri: image.url }}
                                            style={styles.image}
                                        />
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                        <Modal
                            visible={isModalVisible}
                            transparent={true}
                            onRequestClose={() => {
                                SetIsModalVisible(!isModalVisible);
                            }}
                            onBackdropPress={() => SetIsModalVisible(false)}
                        >
                            <ImageViewer
                                index={imageIndex}
                                imageUrls={props.images}
                                onClick={() => SetIsModalVisible(false)}
                                enableSwipeDown={true}
                                onSwipeDown={() => SetIsModalVisible(false)}
                            />
                        </Modal>
                    </View>
                )}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 32,
        backgroundColor: "white",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    image: {
        width: 200,
        height: 200,
        marginRight: 10,
        resizeMode: "contain",
    },
});

export default InformationFlat;
