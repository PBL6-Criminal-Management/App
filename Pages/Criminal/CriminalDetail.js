import React, { useState, useEffect, useContext } from "react";
import {
    View,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../Context/AuthContext.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import Toast from "react-native-toast-message";
import { API_URL, criminalStatus, wantedType } from "../../Utils/constants.js";
import InformationFields from "../Components/InformationFields.js";
import { toastConfig } from "../Components/ToastConfig.js";

const CriminalDetail = ({ navigation, route }) => {
    const { refreshToken } = useContext(AuthContext);

    const [basicInformation, SetBasicInformation] = useState({});
    const [criminalInformation, SetCriminalInformation] = useState({});
    const [wantedInformation, SetWantedInformation] = useState({});
    const [titleInfo, SetTitleInfo] = useState(null);
    const [, SetIsLoading] = useState(false);

    useEffect(() => {
        if (route.params?.criminalId) {
            getCriminalByIdFromAPI(route.params?.criminalId);
        }
    }, [route.params]);

    const getCriminalByIdFromAPI = async (criminalId) => {
        SetIsLoading(true);
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
            SetIsLoading(false);
            return;
        }

        fetch(
            //&PageNumber=1&PageSize=10
            API_URL + `v1/criminal/${criminalId}`,
            {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${result.data}`,
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
            }
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.succeeded) {
                    SetTitleInfo({
                        image: res.data.avatarLink,
                        name: res.data.name,
                        charge: res.data.charge,
                    });
                    criminalImages = res.data.criminalImages
                        .filter(
                            (ci) =>
                                ci.fileUrl != "" &&
                                ci.fileUrl != null &&
                                ci.fileUrl != undefined
                        )
                        .map((ci) => ({
                            url: ci.fileUrl,
                        }))
                    SetBasicInformation({
                        "Họ và tên": res.data.name,
                        "Tên khác": res.data.anotherName,
                        "Ngày sinh": res.data.birthday,
                        "Giới tính": res.data.gender ? "Nam" : "Nữ",
                        "Số điện thoại": res.data.phoneNumber,
                        "Quê quán": res.data.homeTown,
                        "Quốc tịch": res.data.nationality,
                        "Dân tộc": res.data.ethnicity,
                        "Tôn giáo": res.data.religion,
                        "CCCD/CMND": res.data.citizenId,
                        "Nghề nghiệp, nơi làm việc":
                            res.data.careerAndWorkplace,
                        "Nơi ĐKTT": res.data.permanentResidence,
                        "Chỗ ở hiện tại": res.data.currentAccommodation,
                        "Họ và tên cha": res.data.fatherName,
                        "Ngày sinh cha": res.data.fatherBirthday,
                        "CCCD/CMND cha": res.data.fatherCitizenId,
                        "Họ và tên mẹ": res.data.motherName,
                        "Ngày sinh mẹ": res.data.motherBirthday,
                        "CCCD/CMND mẹ": res.data.motherCitizenId,
                        "Đặc điểm nhận dạng": res.data.characteristics,
                        images: {
                            items: criminalImages,
                            title: "Hình ảnh tội phạm"
                        }
                    });
                    SetCriminalInformation({
                        "Tình trạng": criminalStatus[res.data.status],
                        "Mức độ nguy hiểm": res.data.dangerousLevel,
                        "Vụ án liên quan": res.data.relatedCases,
                        "Tội danh gần nhất": res.data.charge,
                        "Ngày phạm tội gần nhất":
                            res.data.dateOfMostRecentCrime,
                        "Ngày được thả": res.data.releaseDate,
                        "Thông tin xuất, nhập cảnh":
                            res.data.entryAndExitInformation,
                        "Tài khoản ngân hàng": res.data.bankAccount,
                        "Tài khoản game": res.data.gameAccount,
                        Facebook: res.data.facebook,
                        Zalo: res.data.zalo,
                        "Mạng xã hội khác": res.data.otherSocialNetworks,
                        "Model điện thoại": res.data.phoneModel,
                        "Nghiên cứu": res.data.research,
                        "Bố trí tiếp cận": res.data.approachArrange,
                        "Thông tin khác": res.data.otherInformation,
                    });
                    if (res.data.wantedCriminals.length > 0) {
                        wantedCount = {
                            "Số lần truy nã": res.data.wantedCriminals.length,
                        };
                        if (res.data.wantedCriminals.length > 1) {
                            wantedInfor = [wantedCount].concat(
                                res.data.wantedCriminals.map((w, index) => ({
                                    [`Lần ${index + 1}:\nTội danh truy nã`]:
                                        w.charge,
                                    "Vụ án": w.caseId,
                                    "Hoạt động hiện tại": w.currentActivity,
                                    "Loại truy nã": wantedType[w.wantedType],
                                    "Số ra quyết định": w.wantedDecisionNo,
                                    "Ngày ra quyết định": w.wantedDecisionDay,
                                    "Đơn vị ra quyết định":
                                        w.decisionMakingUnit,
                                }))
                            );
                        } else {
                            var w = res.data.wantedCriminals[0];
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
                } else {
                    console.log(res);
                    Toast.show({
                        type: "info",
                        text1:
                            res.messages != null
                                ? res.messages
                                : res.title
                                    ? res.title
                                    : res,
                    });
                }
                SetIsLoading(false);
            })
            .catch((e) => {
                console.log(`login error: ${e}`);
                Toast.show({
                    type: "error",
                    text1: "Có lỗi xảy ra: " + e,
                });
                SetIsLoading(false);
            });
    };

    return (
        <View style={[styles.container, { backgroundColor: "#F1F2F2" }]}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <View style={[styles.head, { height: 350 }]}></View>
            <View
                style={[styles.content, { bottom: 400, alignItems: "center" }]}
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
                <Image
                    style={styles.avatar}
                    source={{ uri: titleInfo?.image }}
                ></Image>
                <CustomText style={styles.title}>{titleInfo?.name}</CustomText>
                <CustomText style={styles.note}>
                    Tội danh gần nhất: {titleInfo?.charge}
                </CustomText>
                <View style={{ marginTop: 26, width: "100%" }}>
                    <ScrollView style={styles.scroll}>
                        <InformationFields
                            title="Thông tin cơ bản"
                            listItems={basicInformation}
                        />
                        <InformationFields
                            title="Thông tin tội phạm"
                            listItems={criminalInformation}
                        />
                        <InformationFields
                            title="Lịch sử truy nã"
                            listItems={wantedInformation}
                        />
                    </ScrollView>
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default CriminalDetail;
