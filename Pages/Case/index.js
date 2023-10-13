import React, { useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

const ZoomableCamera = () => {
    const cameraRef = useRef(null);

    const handleZoomIn = async () => {
        if (cameraRef.current) {
            const { zoom, canZoom } = await cameraRef.current.getZoomAsync();
            if (canZoom) {
                const newZoom = Math.min(zoom + 0.1, 1);
                cameraRef.current.setZoomAsync(newZoom);
            }
        }
    };

    const handleZoomOut = async () => {
        if (cameraRef.current) {
            const { zoom, canZoom } = await cameraRef.current.getZoomAsync();
            if (canZoom) {
                const newZoom = Math.max(zoom - 0.1, 0);
                cameraRef.current.setZoomAsync(newZoom);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                ref={cameraRef}
                type={Camera.Constants.Type.back}
                zoom={1}
            />

            <View style={styles.zoomButtonsContainer}>
                <TouchableOpacity
                    onPress={handleZoomIn}
                    style={styles.zoomButton}
                >
                    <Text style={styles.zoomButtonText}>Zoom In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleZoomOut}
                    style={styles.zoomButton}
                >
                    <Text style={styles.zoomButtonText}>Zoom Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    zoomButtonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    zoomButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#007AFF",
        marginHorizontal: 10,
        borderRadius: 5,
    },
    zoomButtonText: {
        color: "white",
        fontSize: 16,
    },
});

export default ZoomableCamera;
