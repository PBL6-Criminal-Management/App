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
} from "react-native";
import styles from "./style.js";
import WantedElement from "../Components/WantedElement.js";
import FilterFields from "../Components/FilterFields.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { CustomText } from "../Components/CustomText.js";
import Toast from "react-native-toast-message";
import {
    API_URL,
    scale,
    wantedType,
    textInputDefaultSize,
} from "../../Utils/constants.js";
import DropDown from "../Components/DropDown.js";
import { toastConfig } from "../Components/ToastConfig.js";

const WantedList = ({ navigation }) => {
    const [txtSearch, SetTxtSearch] = useState(null);
    const [refresh, SetRefresh] = useState(false);
    const [modalVisible, SetModalVisible] = useState(false);
    const [wantedList, SetWantedList] = useState(null);
    const { refreshToken } = useContext(AuthContext);

    const [value, SetValue] = useState([]);
    const [isSubmit, SetIsSubmit] = useState(false);
    const [isLoading, SetIsLoading] = useState(false);

    //now - 200 -> now (0 years old - 200 years old)
    const [items, SetItems] = useState(
        Array.from({ length: 201 }, (_, i) => {
            return {
                label: i + (new Date().getFullYear() - 200),
                value: i + (new Date().getFullYear() - 200),
            };
        })
    );

    const [dangerousLevelsChecked, SetDangerousLevelsChecked] = useState([]);

    // useEffect(() => {
    //     console.log(dangerousLevelsChecked);
    // }, [dangerousLevelsChecked]);

    useEffect(() => {
        getAllWantedCriminalsFromAPI();
    }, []);

    useEffect(() => {
        if (txtSearch != null) getAllWantedCriminalsFromAPI();
    }, [txtSearch]);

    useEffect(() => {
        if (refresh) {
            getAllWantedCriminalsFromAPI();
            SetRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        if (isSubmit) {
            getAllWantedCriminalsFromAPI();
            SetIsSubmit(false);
        }
    }, [isSubmit]);

    const getAllWantedCriminalsFromAPI = async () => {
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
                "v1/wanted-criminal" +
                `?WantedType=${
                    dangerousLevelsChecked.length > 0
                        ? dangerousLevelsChecked[0]
                        : ""
                }&&YearOfBirth=${
                    value != null && value.length > 0 ? value[0] : ""
                }&&Keyword=${
                    txtSearch == null ? "" : txtSearch
                }&OrderBy="Id ASC"`,
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
                    SetWantedList(res.data);
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
        SetDangerousLevelsChecked([]);
        SetValue([]);
    };
    const goToWantedDetail = (id) => {
        navigation.navigate("WantedDetail", (params = { criminalId: id }));
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
                <CustomText style={styles.title}>Danh sách truy nã</CustomText>
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
                        <View style={styles.modalContainer}>
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
                                    <FilterFields
                                        title="Mức độ nguy hiểm"
                                        listItems={wantedType}
                                        listChecked={dangerousLevelsChecked}
                                        setListChecked={
                                            SetDangerousLevelsChecked
                                        }
                                    />
                                    <DropDown
                                        title="Năm sinh"
                                        placeholder="Chọn năm sinh"
                                        value={value}
                                        items={items}
                                        setValue={SetValue}
                                        setItems={SetItems}
                                    />
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
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <View style={styles.body}>
                    {isLoading && (
                        <View style={styles.waitingCircle}>
                            <ActivityIndicator size="large" color="green" />
                        </View>
                    )}
                    {wantedList && (
                        <ScrollView
                            style={styles.scroll}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={() => SetRefresh(true)}
                                />
                            }
                        >
                            {wantedList.map((item, index) => {
                                // const Max_Image_Number = 20;
                                // if (index < Max_Image_Number)
                                return (
                                    <WantedElement
                                        key={index}
                                        item={item}
                                        onPress={() =>
                                            goToWantedDetail(item.id)
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
export default WantedList;
