import React, { useEffect, useState } from "react";
import { View, Image, StatusBar, TouchableOpacity, Modal } from "react-native";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import { scale } from "../../Utils/constants";
import ImageViewer from "react-native-image-zoom-viewer";

const FailDetect = ({ navigation, route }) => {
    const [criminalInfo, SetCriminalInfo] = useState(null);
    const [isModalVisible, SetIsModalVisible] = useState(false);

    useEffect(() => {
        if (route.params?.result) {
            SetCriminalInfo(route.params?.result);
        }
    }, [route.params]);

    const checkLogic = () => {};

    return (
        <View style={[styles.container, { backgroundColor: "#F1F2F2" }]}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <View
                style={[styles.content, { bottom: 440, alignItems: "center" }]}
            >
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        style={styles.backContainer}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require("../../Public/back.png")}
                            style={styles.backBtn}
                        />
                    </TouchableOpacity>
                    <CustomText
                        style={{
                            fontFamily: "Be Vietnam bold",
                            color: "black",
                            fontSize: 20 * scale,
                        }}
                    >
                        Kết quả
                    </CustomText>
                </View>
                <TouchableOpacity onPress={() => SetIsModalVisible(true)}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri:
                                "data:image/png;base64," +
                                criminalInfo?.resultFile,
                        }}
                    ></Image>
                </TouchableOpacity>
                {criminalInfo != null && (
                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            SetIsModalVisible(!isModalVisible);
                        }}
                        onBackdropPress={() => SetIsModalVisible(false)}
                    >
                        <ImageViewer
                            imageUrls={[
                                {
                                    url:
                                        "data:image/png;base64," +
                                        criminalInfo?.resultFile,
                                },
                            ]}
                            renderIndicator={() => {}}
                            onClick={() => SetIsModalVisible(false)}
                            enableSwipeDown={true}
                            onSwipeDown={() => SetIsModalVisible(false)}
                        />
                    </Modal>
                )}
                <CustomText style={styles.name}>Không xác định</CustomText>
                <CustomText style={[styles.note, { marginTop: 20 }]}>
                    Chúng tôi không tìm thấy bất kỳ tội phạm nào trong cơ sở dữ
                    liệu khớp với đối tượng bạn cung cấp! Có thể ảnh bạn chụp bị
                    mờ hoặc bị che khuất, hãy thử một tấm ảnh khác!
                </CustomText>
            </View>
        </View>
    );
};
export default FailDetect;
