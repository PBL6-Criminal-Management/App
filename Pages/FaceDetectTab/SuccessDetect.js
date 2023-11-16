import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Image,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import InformationFlat from "../Components/InformationFlat.js";

const SuccessDetect = ({ navigation, route }) => {
    const [SeeMore, SetSeeMore] = useState(false);
    const [IsFoundCriminal, SetIsFoundCriminal] = useState(false);
    const [criminalInfo, SetCriminalInfo] = useState(null);
    const [basicInformation, SetBasicInformation] = useState(null);
    const [moreInformation, SetMoreInformation] = useState(null);

    useEffect(() => {
        if (route.params?.result) {
            SetCriminalInfo(route.params?.result);
            SetIsFoundCriminal(route.params?.result.foundCriminal != null);
        }
    }, [route.params]);

    useEffect(() => {
        if (criminalInfo != null && criminalInfo.foundCriminal != null) {
            SetBasicInformation({
                "Họ và tên": criminalInfo.foundCriminal.name,
                "Ngày sinh": criminalInfo.foundCriminal.birthday,
                "Giới tính": criminalInfo.foundCriminal.gender ? "Nam" : "Nữ",
                "Nghề nghiệp, nơi làm việc":
                    criminalInfo.foundCriminal.careerAndWorkplace,
                "Nơi ĐKTT": criminalInfo.foundCriminal.permanentResidence,
                "Tình trạng": criminalInfo.foundCriminal.status,
                "Mức độ nguy hiểm": criminalInfo.foundCriminal.dangerousLevel,
                "Tội danh": criminalInfo.foundCriminal.charge,
            });
            SetMoreInformation({
                "Số điện thoại": criminalInfo.foundCriminal.phoneNumber,
                "Quê quán": criminalInfo.foundCriminal.homeTown,
                "Quốc tịch": criminalInfo.foundCriminal.nationality,
                "Dân tộc": criminalInfo.foundCriminal.ethnicity,
                "Tôn giáo": criminalInfo.foundCriminal.religion,
                "CMND/CCCD": criminalInfo.foundCriminal.cmnd_cccd,
                "Nơi cư trú hiện tại":
                    criminalInfo.foundCriminal.currentAccommodation,
                "Vụ án liên quan": criminalInfo.foundCriminal.relatedCases,
                "Hoạt động hiện tại":
                    criminalInfo.foundCriminal.currentActivity,
            });
        }
    }, [criminalInfo]);

    const checkLogic = () => {};

    return (
        <View style={styles.container}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar barStyle="light-content" />
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
                            fontSize: 20,
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
                <CustomText style={styles.name}>
                    {IsFoundCriminal
                        ? criminalInfo?.foundCriminal.name
                        : "Không tìm thấy tên"}
                </CustomText>
                <CustomText style={styles.note}>
                    Mức độ khớp:{" "}
                    <CustomText style={{ color: "#3ED54D" }}>
                        {criminalInfo?.detectConfidence + " %"}
                    </CustomText>
                </CustomText>
                <View style={styles.body}>
                    <View style={styles.informationTitle}>
                        <CustomText
                            style={{
                                fontFamily: "Be Vietnam bold",
                                color: "#08354F",
                                marginBottom: 10,
                            }}
                        >
                            Thông tin cá nhân
                        </CustomText>
                    </View>
                    {IsFoundCriminal && basicInformation != null ? (
                        <ScrollView
                            showsVerticalScrollIndicator={true}
                            persistentScrollbar={true}
                        >
                            <InformationFlat listItems={basicInformation} />
                            {!SeeMore && (
                                <CustomText
                                    style={{
                                        color: "#53B6ED",
                                        textDecorationLine: "underline",
                                        alignSelf: "center",
                                    }}
                                    onPress={() => SetSeeMore(true)}
                                >
                                    Xem thêm
                                </CustomText>
                            )}
                            {SeeMore && moreInformation != null && (
                                <InformationFlat listItems={moreInformation} />
                            )}
                        </ScrollView>
                    ) : (
                        <CustomText style={{ alignSelf: "center" }}>
                            Không tìm thấy thông tin tội phạm này trong cơ sở dữ
                            liệu! Có lẽ thông tin đó đã bị xoá!
                        </CustomText>
                    )}
                </View>
            </View>
        </View>
    );
};
export default SuccessDetect;
