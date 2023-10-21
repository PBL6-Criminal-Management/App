import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { CustomText } from "../Components/CustomText.js";
import { API_URL } from "../../Utils/constants.js";
import styles from "./style.js";

const FaceDetect = ({ navigation, route }) => {
    useEffect(() => {
        if (route.params?.type) {
            SetType(route.params?.type);
        }
        if (route.params?.flashMode) {
            SetFlashMode(route.params?.flashMode);
        }
        if (route.params?.image) {
            SetImage(route.params?.image);
        }
    }, [route.params]);

    const [type, SetType] = useState(CameraType.back);
    const [flashMode, SetFlashMode] = useState(FlashMode.off);
    const [image, SetImage] = useState(null);

    const toggleCameraFlash = () => {
        SetFlashMode((current) =>
            current === FlashMode.off ? FlashMode.torch : FlashMode.off
        );
    };

    const detectImage = () => {};

    // fetch(API_URL+'getImage')
    //     .then(response => response.blob())
    //     .then(blob => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(blob);
    //         reader.onloadend = () => {
    //             const base64data = reader.result;
    //             // setImage(base64data);
    //         };
    //     });

    return (
        <View style={styles.container}>
            <Camera type={type} flashMode={flashMode} />
            <View style={styles.head}>
                <TouchableOpacity
                    style={styles.btnLight}
                    onPress={toggleCameraFlash}
                >
                    <Image
                        source={
                            flashMode === FlashMode.off
                                ? require("../../Public/lightOff.png")
                                : require("../../Public/lightOn.png")
                        }
                    />
                </TouchableOpacity>
                <CustomText style={styles.title}>Nhận diện tội phạm</CustomText>
                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Image source={require("../../Public/cancel.png")} />
                </TouchableOpacity>
            </View>
            <View style={styles.centerImage}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    source={{ uri: image }}
                />
            </View>
            <View style={[styles.foot, { justifyContent: "center" }]}>
                <View style={[styles.bodyFoot, { gap: 100 }]}>
                    <TouchableOpacity
                        style={styles.btnDetectImage}
                        onPress={() => detectImage()}
                    >
                        <Image
                            source={require("../../Public/confirm.png")}
                            style={{
                                width: 65,
                                height: 65,
                                resizeMode: "stretch",
                            }}
                        />
                        <CustomText
                            style={{
                                color: "white",
                            }}
                        >
                            Nhận diện
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnFlipCamera}
                        onPress={() =>
                            navigation.navigate({
                                name: "TakeImage",
                                params: { flashMode: flashMode },
                                merge: true,
                            })
                        }
                    >
                        <Image
                            source={require("../../Public/reSelect.png")}
                            style={{
                                width: 65,
                                height: 65,
                            }}
                        />
                        <CustomText
                            style={{
                                color: "white",
                            }}
                        >
                            Đổi ảnh
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default FaceDetect;
