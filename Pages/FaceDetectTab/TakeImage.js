import React, { useState, useReducer, useEffect, useRef } from "react";
import {
    Image,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { CustomText } from "../Components/CustomText.js";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
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
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "@type/WH_BALANCE":
            return { ...state, whbalance: action.payload };
        default:
            return { ...state };
    }
};

const TakeImage = ({ navigation, route }) => {
    const cameraRef = useRef();
    const [hasCameraPermission, SetHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, SetHasMediaLibraryPermission] =
        useState();

    const [type, SetType] = useState(CameraType.back);
    const [flashMode, SetFlashMode] = useState(FlashMode.off);

    // Use Reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    const { whbalance } = state;

    const [zoom, SetZoom] = useState(0);
    const [lastZoom, SetLastZoom] = useState(0);

    const baseScale = 1;
    const [lastScale, SetLastScale] = useState(1);

    const [isZoomingEnded, SetIsZoomingEnded] = useState(false);

    const [photo, SetPhoto] = useState(null);
    const [selectedId, SetSelectedId] = useState(0);

    useEffect(() => {
        (async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();
            SetHasCameraPermission(cameraPermission.status === "granted");
            SetHasMediaLibraryPermission(
                mediaLibraryPermission.status === "granted"
            );
        })();
    }, []);

    useEffect(() => {
        if (route.params?.flashMode) {
            SetFlashMode(route.params?.flashMode);
        }
        SetIsZoomingEnded(false);
    }, [route.params]);

    const toggleCameraType = () => {
        SetType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    };
    const toggleCameraFlash = () => {
        SetFlashMode((current) =>
            current === FlashMode.off ? FlashMode.torch : FlashMode.off
        );
    };

    const takePhoto = async () => {
        if (cameraRef) {
            const photoData = await cameraRef.current.takePictureAsync();

            if (hasMediaLibraryPermission) {
                SetPhoto(photoData.uri);
                MediaLibrary.saveToLibraryAsync(photoData.uri);
            }
            goToFaceDetectPage(photoData.uri);
        }
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

    //call function while zooming
    const handleZoomEvent = (event) => {
        const newScale = event.nativeEvent.scale;
        const denta = newScale - lastScale;
        const zoomDelta = denta >= 0 ? denta / 10 : denta / 3;
        // console.log(denta >= 0 ? "phóng to" : "phóng nhỏ", "zoom Delta", zoomDelta);

        const newZoom = Math.max(0, Math.min(lastZoom + zoomDelta, 1));
        SetZoom(newZoom);
        // console.log("last zoom", lastZoom, "new zoom", newZoom);
    };

    //call function when release your hand from the screen
    const handleZoomEnd = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            SetLastZoom(zoom);
            SetLastScale(baseScale);
            if (zoom == 0) SetIsZoomingEnded(false);
            else SetIsZoomingEnded(true);
        }
    };

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], //An array with two entries `[x, y]` specifying the aspect ratio to maintain if the user is
            // allowed to edit the image (by passing `allowsEditing: true`). This is only applicable on
            // Android, since on iOS the crop rectangle is always a square.
            quality: 1,
        });
        if (!result.canceled) {
            goToFaceDetectPage(result.assets[0].uri);
        }
    };

    const goToFaceDetectPage = (image) => {
        navigation.navigate(
            "FaceDetect",
            (params = {
                type: type,
                flashMode: flashMode,
                image: {
                    uri: image,
                    type: "image/jpeg",
                    name: "photo.jpg",
                },
            })
        );
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

    if (hasCameraPermission === undefined)
        return (
            <CustomText>
                Not permission to access your camera... Please change app
                permission in settings of device
            </CustomText>
        );
    else
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
                    <CustomText style={styles.title}>
                        Nhận diện tội phạm
                    </CustomText>
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={require("../../Public/cancel.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.centerImage}>
                    <PinchGestureHandler
                        onGestureEvent={handleZoomEvent}
                        onHandlerStateChange={handleZoomEnd}
                    >
                        <Camera
                            style={styles.camera}
                            zoom={zoom}
                            whiteBalance={whbalance}
                            type={type}
                            flashMode={flashMode}
                            ref={cameraRef}
                        />
                    </PinchGestureHandler>

                    {isZoomingEnded && (
                        <View
                            style={{
                                position: "absolute",
                                width: "100%",
                                bottom: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    SetZoom(0);
                                    SetLastZoom(0);
                                    SetIsZoomingEnded(false);
                                }}
                                style={styles.zoomResetButton}
                            >
                                <CustomText style={styles.zoomResetText}>
                                    Đặt lại tỷ lệ
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    )}
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
                    <View style={[styles.bodyFoot, { gap: 60 }]}>
                        <TouchableOpacity
                            style={styles.btnSelectImage}
                            onPress={() => chooseImage()}
                        >
                            <Image
                                source={
                                    photo != null
                                        ? { uri: photo }
                                        : require("../../Public/selectImage.png")
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
export default TakeImage;
