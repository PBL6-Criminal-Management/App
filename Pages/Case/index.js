import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { CustomText } from "../Components/CustomText.js";

const { width, height } = Dimensions.get("window");

export default function ZoomCameraScreen() {
    const cameraRef = useRef(null);

    const [zoom, setZoom] = useState(0);
    const [lastZoom, setLastZoom] = useState(0);

    const baseScale = 1;
    const [lastScale, setLastScale] = useState(1);

    const [isZoomingEnded, setIsZoomingEnded] = useState(false);

    //call function while zooming
    const handleZoomEvent = (event) => {
        const newScale = event.nativeEvent.scale;
        const denta = newScale - lastScale;
        const zoomDelta = denta >= 0 ? denta / 10 : denta / 3;
        // console.log(denta >= 0 ? "phóng to" : "phóng nhỏ", "zoom Delta", zoomDelta);

        const newZoom = Math.max(0, Math.min(lastZoom + zoomDelta, 1));
        setZoom(newZoom);
        // console.log("last zoom", lastZoom, "new zoom", newZoom);
    };

    //call function when release your hand from the screen
    const handleZoomEnd = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setLastZoom(zoom);
            setLastScale(baseScale);
            if (zoom == 0) setIsZoomingEnded(false);
            else setIsZoomingEnded(true);
        }
    };

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity
                onPress={() => {
                    setZoom(0);
                    setLastZoom(0);
                    setIsZoomingEnded(false);
                }}
                style={styles.zoomResetButton}
            >
                <CustomText style={styles.zoomResetText}>
                    Đặt lại tỷ lệ
                </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
                // onPress={async () => {
                //     if (checkLogic())
                //         SetMessage(
                //             await login(username, password, isRememberLogin)
                //         );
                // }}
                style={styles.btnLogin}
            >
                <CustomText style={styles.txtLogin}>Đăng nhập</CustomText>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    center: {
        // flex: 4,
    },
    cameraContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    camera: {
        flex: 0.5,
    },
    zoomResetButton: {
        marginTop: 200,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        // width: "50%",
        width: 100,
        borderWidth: 1,
        backgroundColor: "white",
    },
    zoomResetText: {
        fontSize: 16,
        color: "#000",
    },
    btnLogin: {
        borderRadius: 5,
        backgroundColor: "#152259",
        // width: 246,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
    },
    txtLogin: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
