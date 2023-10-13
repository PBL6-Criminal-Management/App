import React, { useState, useReducer } from "react";
import {
    Button,
    Image,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { CustomText } from "../Components/CustomText.js";
import Slider from "@react-native-community/slider";
import { API_URL } from "../../Utils/constants.js";
import styles from "./style.js";

const whiteBlcProps = [
    { id: "auto", property: "Auto" },
    { id: "sunny", property: "Sunny" },
    { id: "cloudy", property: "Cloudy" },
    { id: "shadow", property: "Shadow" },
    { id: "incandescent", property: "Incandescent" },
    { id: "fluorescent", property: "Fluorescent" },
];

const initialState = {
    whbalance: "auto",
    zoomValue: 0,
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case "@type/WH_BALANCE":
            return { ...state, whbalance: action.payload };
        case "@type/ZOOM":
            return {
                ...state,
                zoomValue: action.payload,
            };
        default:
            return { ...state };
    }
}

const FaceDetect = ({ navigation }) => {
    const [type, SetType] = useState(CameraType.back);
    const [flashMode, SetFlashMode] = useState(FlashMode.off);
    const [permission, RequestPermission] = Camera.useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [selectedId, SetSelectedId] = useState(0);

    // Use Reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    const { whbalance, zoomValue } = state;

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <CustomText style={{ textAlign: "center" }}>
                    Chúng tôi cần bạn cung cấp quyền để truy cập camera
                </CustomText>
                <Button onPress={RequestPermission} title="Cấp quyền" />
            </View>
        );
    }

    function toggleCameraType() {
        SetType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }
    function toggleCameraFlash() {
        SetFlashMode((current) =>
            current === FlashMode.off ? FlashMode.torch : FlashMode.off
        );
    }

    const takePhoto = async () => {
        if (cameraRef) {
            const photoData = await cameraRef.takePictureAsync();
            setPhoto(photoData.uri);
        }
    };

    const zoomEffect = (value) => {
        dispatch({
            type: "@type/ZOOM",
            payload: value,
        });
    };

    const handleWhiteBalance = (index, value) => {
        SetSelectedId(index);
        if (value.length > 0) {
            dispatch({
                type: "@type/WH_BALANCE",
                payload: value,
            });
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
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require("../../Public/cancel.png")} />
                </TouchableOpacity>
            </View>
            <View style={styles.centerImage}>
                <Camera
                    zoom={zoomValue}
                    whiteBalance={whbalance}
                    style={styles.camera}
                    type={type}
                    flashMode={flashMode}
                    ref={(ref) => setCameraRef(ref)}
                >
                    <View
                        style={{
                            position: "absolute",
                            bottom: 10,
                        }}
                    >
                        <Slider
                            onValueChange={zoomEffect}
                            style={{
                                width: 300,
                            }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                        />
                    </View>
                </Camera>
            </View>
            <View style={styles.foot}>
                <View style={styles.headFoot}>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "column",
                        }}
                    >
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {whiteBlcProps.map((wb, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        onPress={() =>
                                            handleWhiteBalance(index, wb.id)
                                        }
                                        key={wb.id}
                                    >
                                        <View style={{ padding: 10 }}>
                                            <CustomText
                                                style={{
                                                    color:
                                                        index == selectedId
                                                            ? "yellow"
                                                            : "white",
                                                }}
                                            >
                                                {wb.property}
                                            </CustomText>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.bodyFoot}>
                    <TouchableOpacity style={styles.btnSelectImage}>
                        <Image
                            source={
                                photo != null
                                    ? { uri: photo }
                                    : require("../../Public/Fonts/selectImage.png")
                            }
                            style={{
                                width: 45,
                                height: 45,
                                borderWidth: 1,
                                borderColor: "white",
                            }}
                        />
                        <CustomText
                            style={{
                                position: "absolute",
                                bottom: -20,
                                left: -14,
                                width: 100,
                                color: "white",
                            }}
                        >
                            Chọn ảnh
                        </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnTakePhoto}
                        onPress={takePhoto}
                    >
                        <View
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 100,
                                backgroundColor: "#C4C4C4",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: "white",
                                }}
                            ></View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnFlipCamera}
                        onPress={toggleCameraType}
                    >
                        <Image
                            source={require("../../Public/flip.png")}
                            style={{
                                width: 50,
                                height: 45,
                            }}
                        />
                        <CustomText
                            style={{
                                position: "absolute",
                                bottom: -20,
                                left: -23,
                                width: 100,
                                color: "white",
                            }}
                        >
                            Đảo camera
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default FaceDetect;
