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
import CriminalElement from "../Components/CriminalElement.js";
import FilterFields from "../Components/FilterFields.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { CustomText } from "../Components/CustomText.js";
import Toast from "react-native-toast-message";
import {
    API_URL,
    criminalStatus,
    gender,
    scale,
    textInputDefaultSize,
    typeOfViolation,
} from "../../Utils/constants.js";
import DropDown from "../Components/DropDown.js";
import { toastConfig } from "../Components/ToastConfig.js";
import TextBox from "../Components/TextBox.js";

const CriminalList = ({ navigation }) => {
    const [refresh, SetRefresh] = useState(false);
    const [modalVisible, SetModalVisible] = useState(false);
    const { refreshToken } = useContext(AuthContext);

    const [isLoading, SetIsLoading] = useState(false);
    const [isSubmit, SetIsSubmit] = useState(false);

    //search & filter
    const [txtSearch, SetTxtSearch] = useState(null);

    //combobox
    const [selectedYearOfBirth, SetSelectedYearOfBirth] = useState([]);
    //value: now - 200 -> now (0 years old - 200 years old)
    const [yearOfBirthItems, SetYearOfBirthItems] = useState(
        Array.from({ length: 201 }, (_, i) => {
            return {
                label: i + (new Date().getFullYear() - 200),
                value: i + (new Date().getFullYear() - 200),
            };
        })
    );

    //area
    const [selectedArea, SetSelectedArea] = useState([]);
    const [areaItems, SetAreaItems] = useState([]);

    //checkbox
    const [statusChecked, SetStatusChecked] = useState([]);
    const [typeOfViolationChecked, SetTypeOfViolationChecked] = useState([]);
    const [genderChecked, SetGenderChecked] = useState([]);

    //textbox
    const [charge, SetCharge] = useState(null);
    const [characteristics, SetCharacteristics] = useState(null);

    //data to show
    const [criminalList, SetCriminalList] = useState([]);

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
                        text1:
                            "Có lỗi xảy ra khi lấy dữ liệu tỉnh thành cho tìm kiếm: " +
                            e,
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

    // useEffect(() => {
    //     console.log(dangerousLevelsChecked);
    // }, [dangerousLevelsChecked]);

    useEffect(() => {
        getAllCriminalsFromAPI();
    }, []);

    useEffect(() => {
        if (txtSearch != null) getAllCriminalsFromAPI();
    }, [txtSearch]);

    useEffect(() => {
        if (refresh) {
            getAllCriminalsFromAPI();
            SetRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        if (isSubmit) {
            getAllCriminalsFromAPI();
            SetIsSubmit(false);
        }
    }, [isSubmit]);

    const getAllCriminalsFromAPI = async () => {
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
                "v1/criminal" +
                `?Status=${statusChecked.length > 0 ? statusChecked[0] : ""}
                &YearOfBirth=${
                    selectedYearOfBirth.length > 0 ? selectedYearOfBirth[0] : ""
                }&Gender=${
                    genderChecked.length > 0 ? genderChecked[0] == 1 : ""
                }&Characteristics=${
                    characteristics == null ? "" : characteristics
                }&TypeOfViolation=${
                    typeOfViolationChecked.length > 0
                        ? typeOfViolationChecked[0]
                        : ""
                }&Area=${
                    selectedArea.length > 0 ? selectedArea[0] : ""
                }&Charge=${charge == null ? "" : charge}&Keyword=${
                    txtSearch == null ? "" : txtSearch
                }`,
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
                    SetCriminalList(res.data);
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

    const resetFilter = () => {
        SetGenderChecked([]);
        SetStatusChecked([]);
        SetTypeOfViolationChecked([]);
        SetSelectedYearOfBirth([]);
        SetSelectedArea([]);
        SetCharge(null);
        SetCharacteristics(null);
    };

    const goToCriminalDetail = (id) => {
        navigation.navigate("CriminalDetail", (params = { criminalId: id }));
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
                <CustomText style={styles.title}>Danh sách tội phạm</CustomText>
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
                                        <FilterFields
                                            title="Trạng thái"
                                            listItems={criminalStatus}
                                            listChecked={statusChecked}
                                            setListChecked={SetStatusChecked}
                                        />
                                        <DropDown
                                            title="Năm sinh"
                                            placeholder="Chọn năm sinh"
                                            value={selectedYearOfBirth}
                                            items={yearOfBirthItems}
                                            setValue={SetSelectedYearOfBirth}
                                            setItems={SetYearOfBirthItems}
                                        />
                                        <FilterFields
                                            title="Loại vi phạm"
                                            listItems={typeOfViolation}
                                            listChecked={typeOfViolationChecked}
                                            setListChecked={
                                                SetTypeOfViolationChecked
                                            }
                                        />
                                        <DropDown
                                            title="Khu vực"
                                            placeholder="Chọn khu vực"
                                            value={selectedArea}
                                            items={areaItems}
                                            setValue={SetSelectedArea}
                                            setItems={SetAreaItems}
                                        />
                                        <FilterFields
                                            title="Giới tính"
                                            listItems={gender}
                                            listChecked={genderChecked}
                                            setListChecked={SetGenderChecked}
                                        />
                                        <TextBox
                                            title="Tội danh"
                                            value={charge}
                                            setValue={SetCharge}
                                        />
                                        <TextBox
                                            title="Đặc điểm nhận dạng"
                                            height={120}
                                            value={characteristics}
                                            setValue={SetCharacteristics}
                                            multiline
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
                    {criminalList && (
                        <ScrollView
                            style={styles.scroll}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={() => SetRefresh(true)}
                                />
                            }
                        >
                            {criminalList.map((item, index) => {
                                // const Max_Image_Number = 20;
                                // if (index < Max_Image_Number)
                                return (
                                    <CriminalElement
                                        key={index}
                                        item={item}
                                        onPress={() =>
                                            goToCriminalDetail(item.id)
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
export default CriminalList;
