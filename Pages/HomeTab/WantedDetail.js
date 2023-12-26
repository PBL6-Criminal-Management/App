import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { AuthContext } from "../../Context/AuthContext.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import Toast from "react-native-toast-message";
import { API_URL, criminalStatus, wantedType } from "../../Utils/constants.js";
import { toastConfig } from "../Components/ToastConfig.js";
import CustomStickyView from "../Components/CustomStickyView.js";

const WantedDetail = ({ navigation, route }) => {
    const { refreshToken } = useContext(AuthContext);

    const [basicInformation, SetBasicInformation] = useState({});
    const [criminalInformation, SetCriminalInformation] = useState({});
    const [wantedInformation, SetWantedInformation] = useState({});
    const [titleInfo, SetTitleInfo] = useState(null);
    const [isLoading, SetIsLoading] = useState(false);

    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [fromScreen, SetFromScreen] = useState(null);

    const [criminalId, SetCriminalId] = useState(null);
    // const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (route.params?.criminalId) {
            SetCriminalId(route.params?.criminalId);
            getCriminalByIdFromAPI(route.params?.criminalId);
        }
        if (route.params?.fromScreen) {
            SetFromScreen(route.params?.fromScreen);
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
                        }));
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
                            title: "Danh sách ảnh tội phạm",
                        },
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
                        wantedInfor =
                            res.data.wantedCriminals[
                                res.data.wantedCriminals.length - 1
                            ];
                        SetWantedInformation({
                            "Tội danh truy nã": wantedInfor.charge,
                            "Vụ án": wantedInfor.caseId,
                            "Hoạt động hiện tại": wantedInfor.currentActivity,
                            "Loại truy nã": wantedType[wantedInfor.wantedType],
                            "Số ra quyết định": wantedInfor.wantedDecisionNo,
                            "Ngày ra quyết định": wantedInfor.wantedDecisionDay,
                            "Đơn vị ra quyết định":
                                wantedInfor.decisionMakingUnit,
                        });
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
                <TouchableOpacity
                    style={styles.reloadContainer}
                    onPress={() => {
                        if (route.params?.criminalId)
                            getCriminalByIdFromAPI(route.params?.criminalId);
                    }}
                >
                    <Image
                        source={require("../../Public/sync.png")}
                        style={styles.reloadBtn}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetIsModalVisible(true)}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: titleInfo?.image }}
                    ></Image>
                </TouchableOpacity>
                {titleInfo != null && (
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
                                    url: titleInfo?.image,
                                },
                            ]}
                            renderIndicator={() => {}}
                            onClick={() => SetIsModalVisible(false)}
                            enableSwipeDown={true}
                            onSwipeDown={() => SetIsModalVisible(false)}
                        />
                    </Modal>
                )}
                <CustomText style={styles.title}>{titleInfo?.name}</CustomText>
                <CustomText style={styles.note}>
                    Tội danh gần nhất: {titleInfo?.charge}
                </CustomText>
                <View style={{ marginTop: 26, width: "100%" }}>
                    <CustomStickyView
                        style={styles.scroll}
                        data={[
                            {
                                title: "Thông tin cơ bản",
                                listItems: basicInformation,
                            },
                            {
                                title: "Thông tin tội phạm",
                                listItems: criminalInformation,
                            },
                            {
                                title: "Thông tin truy nã",
                                listItems: wantedInformation,
                            },
                        ]}
                        childrenKey={"listItems"}
                        navigation={navigation}
                        fromScreen={{
                            name: "WantedDetail",
                            id: criminalId,
                        }}
                    />
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default WantedDetail;
