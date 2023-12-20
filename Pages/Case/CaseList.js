import React, { useState, useEffect, useRef, useContext } from "react";
import {
    TextInput,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Pressable,
    Image,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator,
    RefreshControl,
    KeyboardAvoidingView,
} from "react-native";
import styles from "./style.js";
import CaseElement from "../Components/CaseElement.js";
import FilterFields from "../Components/FilterFields.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { CustomText } from "../Components/CustomText.js";
import Toast from "react-native-toast-message";
import {
    API_URL,
    caseStatus,
    scale,
    textInputDefaultSize,
    typeOfViolation,
} from "../../Utils/constants.js";
import DropDown from "../Components/DropDown.js";
import { toastConfig } from "../Components/ToastConfig.js";

const CaseList = ({ navigation }) => {
    const [refresh, SetRefresh] = useState(false);
    const [modalVisible, SetModalVisible] = useState(false);
    const { refreshToken } = useContext(AuthContext);

    const [isLoading, SetIsLoading] = useState(false);
    const [isSubmit, SetIsSubmit] = useState(false);

    //search & filter
    const [txtSearch, SetTxtSearch] = useState(null);

    //area
    const [selectedArea, SetSelectedArea] = useState([]);
    const [areaItems, SetAreaItems] = useState([]);

    //checkbox
    const [statusChecked, SetStatusChecked] = useState([]);
    const [typeOfViolationChecked, SetTypeOfViolationChecked] = useState([]);

    //data to show
    const [caseList, SetCaseList] = useState([]);

    useEffect(() => {
        const fetchArea = () =>
            fetch("https://provinces.open-api.vn/api/?depth=1", {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    Accept: "application/json",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        SetAreaItems(
                            res.map((r) => ({
                                label: r.name,
                                value: extractPrefixInProvice(r.name),
                            }))
                        );
                    } else {
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
                })
                .catch((e) => {
                    console.log(`login error: ${e}`);
                    Toast.show({
                        type: "error",
                        text1: "Có lỗi xảy ra (lỗi server), lỗi khi lấy dữ liệu tỉnh thành cho tìm kiếm",
                    });
                });
        fetchArea();
    }, []);

    const extractPrefixInProvice = (province) => {
        if (province.startsWith("Tỉnh Thừa Thiên "))
            return province.substring("Tỉnh Thừa Thiên ".length);
        if (province.startsWith("Tỉnh "))
            return province.substring("Tỉnh ".length);
        if (province.startsWith("Thành phố "))
            return province.substring("Thành phố ".length);
        return province;
    };

    useEffect(() => {
        getAllCasesFromAPI();
    }, []);

    useEffect(() => {
        if (txtSearch != null) getAllCasesFromAPI();
    }, [txtSearch]);

    useEffect(() => {
        if (refresh) {
            getAllCasesFromAPI();
            SetRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        if (isSubmit) {
            getAllCasesFromAPI();
            SetIsSubmit(false);
        }
    }, [isSubmit]);

    const getAllCasesFromAPI = async () => {
        SetIsLoading(!refresh);
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
            API_URL +
                "v1/case" +
                `?Status=${statusChecked.length > 0 ? statusChecked[0] : ""}
            &TypeOfViolation=${
                typeOfViolationChecked.length > 0
                    ? typeOfViolationChecked[0]
                    : ""
            }&Area=${selectedArea.length > 0 ? selectedArea[0] : ""}&Keyword=${
                    txtSearch == null ? "" : txtSearch
                }
            &OrderBy="Id ASC"`,
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
                    SetCaseList(res.data);
                } else {
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
                    text1: "Có lỗi xảy ra (lỗi server)",
                });
                SetIsLoading(false);
            });
    };

    const resetFilter = () => {
        SetStatusChecked([]);
        SetTypeOfViolationChecked([]);
        SetSelectedArea([]);
    };

    const goToCaseDetail = (id, code) => {
        navigation.navigate(
            "CaseDetail",
            (params = { caseId: id, code: code })
        );
    };

    const inputRef = useRef(null);
    const checkLogic = () => {};

    return (
        <View style={styles.container}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <View style={[styles.head, { height: 240 }]}></View>
            <View style={[styles.content, { bottom: 250 }]}>
                <CustomText style={styles.title}>Danh sách vụ án</CustomText>
                <View style={styles.search}>
                    <Pressable
                        onPress={() => inputRef.current.focus()}
                        style={styles.input}
                    >
                        <Image
                            style={styles.icon}
                            source={require("../../Public/search.png")}
                        />
                        <TextInput
                            ref={inputRef}
                            placeholder="Tìm kiếm"
                            placeholderTextColor="black"
                            value={txtSearch}
                            onChangeText={SetTxtSearch}
                            style={{
                                width: "81%",
                                fontSize: textInputDefaultSize * scale,
                                color: "#5C5D60",
                                opacity: 1,
                                borderBottomColor: "#c9c3c3",
                                borderBottomWidth: 1,
                                paddingBottom: 0,
                                width: "70%",
                            }}
                        ></TextInput>
                    </Pressable>
                    <TouchableOpacity
                        style={styles.btnFilter}
                        onPress={() => SetModalVisible(true)}
                    >
                        <Image
                            style={styles.icon}
                            source={require("../../Public/filter.png")}
                        />
                        <CustomText style={{ color: "black" }}>
                            Bộ lọc
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        SetModalVisible(!modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback
                        onPressOut={() => SetModalVisible(false)}
                    >
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={styles.modalContainer}
                        >
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <View style={styles.modalHead}>
                                        <TouchableOpacity
                                            style={styles.btnCancel}
                                            onPress={() =>
                                                SetModalVisible(false)
                                            }
                                        >
                                            <Image
                                                source={require("../../Public/darkCancel.png")}
                                            />
                                        </TouchableOpacity>
                                        <CustomText style={styles.modalTitle}>
                                            Bộ lọc
                                        </CustomText>
                                        <TouchableOpacity onPress={resetFilter}>
                                            <CustomText
                                                style={{
                                                    color: "#53B6ED",
                                                }}
                                            >
                                                Cài lại
                                            </CustomText>
                                        </TouchableOpacity>
                                    </View>
                                    <ScrollView
                                        contentContainerStyle={{
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <DropDown
                                            title="Khu vực"
                                            placeholder="Chọn khu vực"
                                            value={selectedArea}
                                            items={areaItems}
                                            setValue={SetSelectedArea}
                                            setItems={SetAreaItems}
                                        />
                                        <FilterFields
                                            title="Trạng thái"
                                            listItems={caseStatus}
                                            listChecked={statusChecked}
                                            setListChecked={SetStatusChecked}
                                        />
                                        <FilterFields
                                            title="Loại vi phạm"
                                            listItems={typeOfViolation}
                                            listChecked={typeOfViolationChecked}
                                            setListChecked={
                                                SetTypeOfViolationChecked
                                            }
                                        />
                                    </ScrollView>
                                    <TouchableOpacity
                                        onPress={() => {
                                            SetModalVisible(false);
                                            SetIsSubmit(true);
                                        }}
                                        style={styles.btnAgree}
                                    >
                                        <CustomText
                                            style={{
                                                color: "white",
                                                fontFamily: "Be Vietnam bold",
                                            }}
                                        >
                                            Chấp nhận
                                        </CustomText>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </Modal>
                <View style={styles.body}>
                    {isLoading && (
                        <View style={styles.waitingCircle}>
                            <ActivityIndicator size="large" color="green" />
                        </View>
                    )}
                    {caseList && (
                        <ScrollView
                            style={styles.scroll}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={() => SetRefresh(true)}
                                />
                            }
                        >
                            {caseList.map((item, index) => {
                                // const Max_Image_Number = 20;
                                // if (index < Max_Image_Number)
                                return (
                                    <CaseElement
                                        key={index}
                                        item={item}
                                        onPress={() =>
                                            goToCaseDetail(item.id, item.code)
                                        }
                                    />
                                );
                            })}
                        </ScrollView>
                    )}
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default CaseList;
