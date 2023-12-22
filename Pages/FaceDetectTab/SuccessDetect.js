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
import { criminalStatus, wantedType } from "../../Utils/constants.js";
import { scale } from "../../Utils/constants";
import InformationFields from "../Components/InformationFields.js";

const SuccessDetect = ({ navigation, route }) => {
    const [SeeMore, SetSeeMore] = useState(false);
    const [IsFoundCriminal, SetIsFoundCriminal] = useState(false);
    const [criminalInfo, SetCriminalInfo] = useState(null);
    const [basicInformation, SetBasicInformation] = useState(null);
    const [moreInformation, SetMoreInformation] = useState(null);
    const [wantedInformation, SetWantedInformation] = useState({});

    useEffect(() => {
        if (route.params?.result) {
            SetCriminalInfo(route.params?.result);
            SetIsFoundCriminal(route.params?.result.foundCriminal != null);
        }
    }, [route.params]);

    useEffect(() => {
        if (criminalInfo != null && criminalInfo.foundCriminal != null) {
            criminalImages = criminalInfo.foundCriminal.criminalImages
                .filter(
                    (ci) =>
                        ci.fileUrl != "" &&
                        ci.fileUrl != null &&
                        ci.fileUrl != undefined
                )
                .map((ci) => ({
                    url: ci.fileUrl,
                }));

            SetBasicInformation({
                "Họ và tên": criminalInfo.foundCriminal.name,
                "Tên khác": criminalInfo.foundCriminal.anotherName,
                "Ngày sinh": criminalInfo.foundCriminal.birthday,
                "Giới tính": criminalInfo.foundCriminal.gender ? "Nam" : "Nữ",
                "Số điện thoại": criminalInfo.foundCriminal.phoneNumber,
                "Quê quán": criminalInfo.foundCriminal.homeTown,
                "Quốc tịch": criminalInfo.foundCriminal.nationality,
                "Dân tộc": criminalInfo.foundCriminal.ethnicity,
                "Tôn giáo": criminalInfo.foundCriminal.religion,
                "CCCD/CMND": criminalInfo.foundCriminal.citizenId,
                "Nghề nghiệp, nơi làm việc":
                    criminalInfo.foundCriminal.careerAndWorkplace,
                "Nơi ĐKTT": criminalInfo.foundCriminal.permanentResidence,
                "Chỗ ở hiện tại":
                    criminalInfo.foundCriminal.currentAccommodation,
                "Họ và tên cha": criminalInfo.foundCriminal.fatherName,
                "Ngày sinh cha": criminalInfo.foundCriminal.fatherBirthday,
                "CCCD/CMND cha": criminalInfo.foundCriminal.fatherCitizenId,
                "Họ và tên mẹ": criminalInfo.foundCriminal.motherName,
                "Ngày sinh mẹ": criminalInfo.foundCriminal.motherBirthday,
                "CCCD/CMND mẹ": criminalInfo.foundCriminal.motherCitizenId,
                "Đặc điểm nhận dạng":
                    criminalInfo.foundCriminal.characteristics,
                images: {
                    items: criminalImages,
                    title: "Danh sách ảnh tội phạm",
                },
            });
            SetMoreInformation({
                "Tình trạng": criminalStatus[criminalInfo.foundCriminal.status],
                "Mức độ nguy hiểm": criminalInfo.foundCriminal.dangerousLevel,
                "Vụ án liên quan": criminalInfo.foundCriminal.relatedCases,
                "Tội danh gần nhất": criminalInfo.foundCriminal.charge,
                "Ngày phạm tội gần nhất":
                    criminalInfo.foundCriminal.dateOfMostRecentCrime,
                "Ngày được thả": criminalInfo.foundCriminal.releaseDate,
                "Thông tin xuất, nhập cảnh":
                    criminalInfo.foundCriminal.entryAndExitInformation,
                "Tài khoản ngân hàng": criminalInfo.foundCriminal.bankAccount,
                "Tài khoản game": criminalInfo.foundCriminal.gameAccount,
                Facebook: criminalInfo.foundCriminal.facebook,
                Zalo: criminalInfo.foundCriminal.zalo,
                "Mạng xã hội khác":
                    criminalInfo.foundCriminal.otherSocialNetworks,
                "Model điện thoại": criminalInfo.foundCriminal.phoneModel,
                "Nghiên cứu": criminalInfo.foundCriminal.research,
                "Bố trí tiếp cận": criminalInfo.foundCriminal.approachArrange,
                "Thông tin khác": criminalInfo.foundCriminal.otherInformation,
            });
            if (criminalInfo.foundCriminal.wantedCriminals.length > 0) {
                wantedCount = {
                    "Số lần truy nã":
                        criminalInfo.foundCriminal.wantedCriminals.length,
                };
                if (criminalInfo.foundCriminal.wantedCriminals.length > 1) {
                    wantedInfor = [wantedCount].concat(
                        criminalInfo.foundCriminal.wantedCriminals.map(
                            (w, index) => ({
                                [`Lần ${index + 1}:\nTội danh truy nã`]:
                                    w.charge,
                                "Vụ án": w.caseId,
                                "Hoạt động hiện tại": w.currentActivity,
                                "Loại truy nã": wantedType[w.wantedType],
                                "Số ra quyết định": w.wantedDecisionNo,
                                "Ngày ra quyết định": w.wantedDecisionDay,
                                "Đơn vị ra quyết định": w.decisionMakingUnit,
                            })
                        )
                    );
                } else {
                    var w = criminalInfo.foundCriminal.wantedCriminals[0];
                    wantedInfor = {
                        ...wantedCount,
                        "Tội danh truy nã": w.charge,
                        "Vụ án": w.caseId,
                        "Hoạt động hiện tại": w.currentActivity,
                        "Loại truy nã": wantedType[w.wantedType],
                        "Số ra quyết định": w.wantedDecisionNo,
                        "Ngày ra quyết định": w.wantedDecisionDay,
                        "Đơn vị ra quyết định": w.decisionMakingUnit,
                    };
                }
                SetWantedInformation(wantedInfor);
            }
        }
    }, [criminalInfo]);

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
                style={[
                    styles.content,
                    {
                        bottom: 440,
                        alignItems: "center",
                    },
                ]}
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
                <View
                    style={[
                        styles.body,
                        {
                            backgroundColor: "#F1F2F2",
                        },
                    ]}
                >
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
                            <InformationFields
                                title={"Thông tin cơ bản"}
                                listItems={basicInformation}
                            />
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
                            {SeeMore && (
                                <>
                                    <InformationFields
                                        title={"Thông tin thêm"}
                                        listItems={moreInformation}
                                    />
                                    <InformationFields
                                        title={"Thông tin truy nã"}
                                        listItems={wantedInformation}
                                    />
                                </>
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
