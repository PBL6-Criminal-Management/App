import React, { useState, useEffect, useContext } from "react";
import {
    View,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../Context/AuthContext.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import Toast from "react-native-toast-message";
import {
    API_URL,
    caseStatus,
    typeOfViolation,
    wantedType,
} from "../../Utils/constants.js";
import InformationFields from "../Components/InformationFields.js";
import { toastConfig } from "../Components/ToastConfig.js";
const CaseDetail = ({ navigation, route }) => {
    const { refreshToken } = useContext(AuthContext);

    const [basicInformation, SetBasicInformation] = useState({});
    const [victimInformation, SetVictimInformation] = useState({});
    const [criminalInformation, SetCriminalInformation] = useState({});
    const [investigatorInformation, SetInvestigatorInformation] = useState({});
    const [witnessInformation, SetWitnessInformation] = useState({});
    const [titleInfo, SetTitleInfo] = useState(null);
    const [evidencesInformation, SetEvidencesInformation] = useState({});
    const [wantedInformation, SetWantedInformation] = useState({});
    const [isLoading, SetIsLoading] = useState(false);

    const colorStatusList = {
        0: "#6D1008",
        1: "#235a12",
        2: "#0d6630",
    };
    const colorBackgroundStatusList = {
        0: "#F8D1CD",
        1: "#13d6d6",
        2: "#c8f2d9",
    };

    useEffect(() => {
        if (route.params?.caseId) {
            getCaseByIdFromAPI(route.params?.caseId);
        }
    }, [route.params]);
    const getCaseByIdFromAPI = async (caseId) => {
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
            API_URL + `v1/case/${caseId}`,
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
                        code: route.params?.code,
                        status: res.data.status,
                    });
                    caseImages = res.data.caseImages
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
                        "Thời gian xảy ra": res.data.startDate,
                        "Địa điểm xảy ra": res.data.area,
                        "Tội danh": res.data.charge,
                        "Loại vi phạm":
                            typeOfViolation[res.data.typeOfViolation],
                        "Thời gian kết thúc": res.data.endDate,
                        "Mô tả": res.data.description,
                        images: {
                            items: caseImages,
                            title: "Danh sánh hình ảnh của vụ án",
                        },
                    });
                    if (
                        res.data.victims != null &&
                        res.data.victims.length > 0
                    ) {
                        const victims = res.data.victims;
                        if (victims.length > 1) {
                            victimInfo = victims.map((v) => ({
                                "Họ và tên": v.name,
                                "Giới tính": v.gender ? "Nam" : "Nữ",
                                "Ngày tháng năm sinh": v.birthday,
                                "Số điện thoại": v.phoneNumber,
                                "Địa chỉ thường trú": v.address,
                                "CCCD/CMND": v.citizenId,
                                "Lời khai": v.testimony,
                            }));
                        } else {
                            const v = victims[0];
                            victimInfo = {
                                "Họ và tên": v.name,
                                "Giới tính": v.gender ? "Nam" : "Nữ",
                                "Ngày tháng năm sinh": v.birthday,
                                "Số điện thoại": v.phoneNumber,
                                "Địa chỉ thường trú": v.address,
                                "CCCD/CMND": v.citizenId,
                                "Lời khai": v.testimony,
                            };
                        }
                        SetVictimInformation(victimInfo);
                    }
                    if (
                        res.data.criminals != null &&
                        res.data.criminals.length > 0
                    ) {
                        const criminals = res.data.criminals;
                        if (criminals.length > 1) {
                            criminalInfo = criminals.map((c) => ({
                                "Họ và tên": c.name,
                                "Tên khác": c.anotherName,
                                "Ngày tháng năm sinh": c.birthday,
                                "Giới tính": c.gender ? "Nam" : "Nữ",
                                "CMND/CCCD": c.citizenId,
                                "Dân tộc": c.ethnicity,
                                "Quốc tịch": c.nationality,
                                "Quê quán": c.homeTown,
                                "Chỗ ở hiện tại": c.currentAccommodation,
                                "Tội danh": c.charge,
                                "Lý do phạm tội": c.reason,
                                "Vũ khí": c.weapon,
                                "Loại vi phạm":
                                    typeOfViolation[c.typeOfViolation],
                                "Lời khai": c.testimony,
                            }));
                        } else {
                            const c = criminals[0];
                            criminalInfo = {
                                "Họ và tên": c.name,
                                "Tên khác": c.anotherName,
                                "Ngày tháng năm sinh": c.birthday,
                                "Giới tính": c.gender ? "Nam" : "Nữ",
                                "CMND/CCCD": c.citizenId,
                                "Dân tộc": c.ethnicity,
                                "Quốc tịch": c.nationality,
                                "Quê quán": c.homeTown,
                                "Chỗ ở hiện tại": c.currentAccommodation,
                                "Tội danh": c.charge,
                                "Lý do phạm tội": c.reason,
                                "Vũ khí": c.weapon,
                                "Loại vi phạm":
                                    typeOfViolation[c.typeOfViolation],
                                "Lời khai": c.testimony,
                            };
                        }

                        SetCriminalInformation(criminalInfo);
                    }
                    if (
                        res.data.investigators != null &&
                        res.data.investigators.length > 0
                    ) {
                        const investigators = res.data.investigators;
                        if (investigators.length > 1) {
                            investigatorInfo = investigators.map((i) => ({
                                "Họ và tên": i.name,
                                "Ngày tháng năm sinh": i.birthday,
                                "Giới tính": i.gender ? "Nam" : "Nữ",
                                "Số điện thoại": i.phoneNumber,
                                "Địa chỉ thường trú": i.address,
                            }));
                        } else {
                            const i = investigators[0];
                            investigatorInfo = {
                                "Họ và tên": i.name,
                                "Ngày tháng năm sinh": i.birthday,
                                "Giới tính": i.gender ? "Nam" : "Nữ",
                                "Số điện thoại": i.phoneNumber,
                                "Địa chỉ thường trú": i.address,
                            };
                        }
                        SetInvestigatorInformation(investigatorInfo);
                    }
                    if (
                        res.data.witnesses != null &&
                        res.data.witnesses.length > 0
                    ) {
                        const witnesses = res.data.witnesses;
                        if (witnesses.length > 1) {
                            witnessInfo = witnesses.map((w) => ({
                                "Họ và tên": w.name,
                                "Số điện thoại": w.phoneNumber,
                                "CCCD/CMND": w.citizenId,
                                "Địa chỉ thường trú": w.address,
                                "Ngày cho lời khai": w.date,
                                "Lời khai": w.testimony,
                            }));
                        } else {
                            const w = witnesses[0];
                            witnessInfo = {
                                "Họ và tên": w.name,
                                "Số điện thoại": w.phoneNumber,
                                "CCCD/CMND": w.citizenId,
                                "Địa chỉ thường trú": w.address,
                                "Ngày cho lời khai": w.date,
                                "Lời khai": w.testimony,
                            };
                        }
                        SetWitnessInformation(witnessInfo);
                    }
                    if (
                        res.data.wantedCriminalResponse != null &&
                        res.data.wantedCriminalResponse.length > 0
                    ) {
                        const wantedCriminalResponse =
                            res.data.wantedCriminalResponse;
                        if (wantedCriminalResponse.length > 1) {
                            wantedCriminalResponseInfo =
                                wantedCriminalResponse.map((w) => ({
                                    "Id tội phạm": w.criminalId,
                                    "Hoạt động hiện tại": w.currentActivity,
                                    "Loại truy nã": wantedType[w.wantedType],
                                    "Số ra quyết định": w.wantedDecisionNo,
                                    "Ngày ra quyết định": w.wantedDecisionDay,
                                    "Đơn vị ra quyết định":
                                        w.decisionMakingUnit,
                                }));
                        } else {
                            const w = wantedCriminalResponse[0];
                            wantedCriminalResponseInfo = {
                                "Id tội phạm": w.criminalId,
                                "Hoạt động hiện tại": w.currentActivity,
                                "Loại truy nã": wantedType[w.wantedType],
                                "Số ra quyết định": w.wantedDecisionNo,
                                "Ngày ra quyết định": w.wantedDecisionDay,
                                "Đơn vị ra quyết định": w.decisionMakingUnit,
                            };
                        }
                        SetWantedInformation(wantedCriminalResponseInfo);
                    }
                    if (
                        res.data.evidences != null &&
                        res.data.evidences.length > 0
                    ) {
                        const evidences = res.data.evidences;
                        if (evidences.length > 1) {
                            evidencesInfo = evidences.map((e) => {
                                images =
                                    e.evidenceImages.length > 0
                                        ? e.evidenceImages
                                              .filter(
                                                  (ci) =>
                                                      ci.fileUrl != "" &&
                                                      ci.fileUrl != null &&
                                                      ci.fileUrl != undefined
                                              )
                                              .map((ci) => ({
                                                  url: ci.fileUrl,
                                              }))
                                        : null;
                                return {
                                    Tên: e.name,
                                    "Mô tả": e.description,
                                    images: {
                                        items: images,
                                        title: "Ảnh vật chứng",
                                    },
                                };
                            });
                        } else {
                            const e = evidences[0];
                            images =
                                e.evidenceImages.length > 0
                                    ? e.evidenceImages
                                          .filter(
                                              (ci) =>
                                                  ci.fileUrl != "" &&
                                                  ci.fileUrl != null &&
                                                  ci.fileUrl != undefined
                                          )
                                          .map((ci) => ({
                                              url: ci.fileUrl,
                                          }))
                                    : null;
                            evidencesInfo = {
                                Tên: e.name,
                                "Mô tả": e.description,
                                images: {
                                    items: images,
                                    title: "Ảnh vật chứng",
                                },
                            };
                        }
                        SetEvidencesInformation(evidencesInfo);
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
            {isLoading && (
                <View style={styles.waitingCircle}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
            <View style={[styles.head, { height: 230 }]}></View>
            <View
                style={[styles.content, { bottom: 290, alignItems: "center" }]}
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
                <TouchableOpacity
                    style={styles.reloadContainer}
                    onPress={() => {
                        if (route.params?.caseId)
                            getCaseByIdFromAPI(route.params?.caseId);
                    }}
                >
                    <Image
                        source={require("../../Public/sync.png")}
                        style={styles.reloadBtn}
                    />
                </TouchableOpacity>
                <CustomText style={styles.title}>{titleInfo?.name}</CustomText>
                <View
                    style={{
                        height: 146,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                    }}
                >
                    <CustomText style={styles.note}>
                        {titleInfo?.code}
                    </CustomText>
                    <View
                        style={{
                            backgroundColor:
                                colorBackgroundStatusList[titleInfo?.status],
                            height: 40,
                            borderRadius: 5,
                            color: "white",
                            padding: 5,
                            paddingHorizontal: 10,
                            overflow: "hidden",
                            justifyContent: "center",
                        }}
                    >
                        <CustomText
                            style={{
                                color: colorStatusList[titleInfo?.status],
                            }}
                        >
                            {caseStatus[titleInfo?.status]}
                        </CustomText>
                    </View>
                </View>
                <View style={{ width: "100%" }}>
                    <ScrollView style={styles.scroll}>
                        <InformationFields
                            title="Thông tin cơ bản"
                            listItems={basicInformation}
                        />
                        <InformationFields
                            title="Thông tin nạn nhân"
                            listItems={victimInformation}
                        />
                        <InformationFields
                            title="Thông tin tội phạm"
                            listItems={criminalInformation}
                        />
                        <InformationFields
                            title="Thông tin nhân chứng"
                            listItems={witnessInformation}
                        />
                        <InformationFields
                            title="Thông tin vật chứng"
                            listItems={evidencesInformation}
                        />
                        <InformationFields
                            title="Danh sách tội phạm truy nã"
                            listItems={wantedInformation}
                        />
                        <InformationFields
                            title="Thông tin điều tra viên"
                            listItems={investigatorInformation}
                        />
                    </ScrollView>
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default CaseDetail;
