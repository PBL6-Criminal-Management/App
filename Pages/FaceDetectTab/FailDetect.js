import React, { useEffect, useState } from "react";
import { View, Image, StatusBar, TouchableOpacity } from "react-native";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import { scale } from "../../Utils/constants";

const FailDetect = ({ navigation, route }) => {
    const [criminalInfo, SetCriminalInfo] = useState(null);

    useEffect(() => {
        if (route.params?.result) {
            SetCriminalInfo(route.params?.result);
        }
    }, [route.params]);

    const checkLogic = () => {};

    return (
        <View style={styles.container}>
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
                <Image
                    style={styles.avatar}
                    source={{
                        uri:
                            "data:image/png;base64," + criminalInfo?.resultFile,
                    }}
                ></Image>
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
