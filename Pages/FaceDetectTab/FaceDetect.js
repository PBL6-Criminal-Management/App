import React, { useContext, useState, useEffect } from "react";
import { Image, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../Context/AuthContext.js";
import { CustomText } from "../Components/CustomText.js";
import { API_URL } from "../../Utils/constants.js";
import styles from "./style.js";

const FaceDetect = ({ navigation, route }) => {
    const { userInfo } = useContext(AuthContext);

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

    const [isLoading, SetIsLoading] = useState(false);
    const [type, SetType] = useState(CameraType.back);
    const [flashMode, SetFlashMode] = useState(FlashMode.off);
    const [image, SetImage] = useState(null);

    const toggleCameraFlash = () => {
        SetFlashMode((current) =>
            current === FlashMode.off ? FlashMode.torch : FlashMode.off
        );
    };

    const detectImage = () => {
        SetIsLoading(true);
        const formData = new FormData();
        formData.append("CriminalImage", image);

        if (userInfo != null)
            fetch(API_URL + "v1/facedetect/detect", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: formData, // body data type must match "Content-Type" header
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.succeeded) {
                        if (res.messages !== null && res.messages.length > 0) {
                            res.messages.forEach((message) => {
                                Toast.show({
                                    type: "info",
                                    text1: message,
                                });
                            });
                            SetIsLoading(false);
                            return;
                        }
                        if (res.data.canPredict)
                            navigation.navigate(
                                "SuccessDetect",
                                (params = {
                                    result: res.data,
                                })
                            );
                        else
                            navigation.navigate(
                                "FailDetect",
                                (params = {
                                    result: res.data,
                                })
                            );
                    } else {
                        Toast.show({
                            type: "info",
                            text1: res.messages != null ? res.messages : res,
                        });
                    }
                    SetIsLoading(false);
                })
                .catch((e) => {
                    console.log(`login error: ${e}`);
                    SetIsLoading(false);
                    Toast.show({
                        type: "error",
                        text1: "Có lỗi xảy ra (lỗi server)",
                    });
                });
        else {
            Toast.show({
                type: "error",
                text1: "Không có quyền truy cập",
            });
            SetIsLoading(false);
        }
    };

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
                {isLoading && (
                    <View style={styles.waitingCircle}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    source={{ uri: image?.uri }}
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
            <Toast />
        </View>
    );
};
export default FaceDetect;
