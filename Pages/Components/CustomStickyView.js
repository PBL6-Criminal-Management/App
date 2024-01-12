import React, { useEffect, useState } from "react";
import { View } from "react-native";
import StickyHeaderFlatlist from "./StickyHeaderFlatlist";
import InformationFlat from "./InformationFlat";
import InformationFields from "./InformationFields";

const CustomStickyView = ({
    style,
    data,
    childrenKey,
    hasDetailView,
    listIndexHasDetailView,
    navigation,
    fromScreen,
}) => {
    const [listShow, SetListShow] = useState({});

    const onHeadPressed = (id) => {
        SetListShow({ ...listShow, [id]: !listShow[id] });
    };

    useEffect(() => {
        var listShowTmp = {};
        for (let i = 0; i < data.length; i++) listShowTmp[i] = true;
        SetListShow(listShowTmp);
    }, []);

    return (
        <View style={style}>
            <StickyHeaderFlatlist
                keyExtractor={(_, i) => i + ""}
                style={{ borderRadius: 5, overflow: "hidden" }}
                childrenKey={childrenKey}
                renderHeader={({ item, index }) => {
                    return (
                        <InformationFields
                            key={index}
                            item={item}
                            isShow={listShow[index / 2]}
                            onHeadPressed={() => onHeadPressed(index / 2)}
                        />
                    );
                }}
                renderItem={({ item, index }) => {
                    if (
                        listIndexHasDetailView !== undefined &&
                        listIndexHasDetailView.includes((index - 1) / 2)
                    )
                        return (
                            <InformationFlat
                                key={index}
                                listItems={item}
                                paddingHorizontal={20}
                                firstTopPadding={20}
                                isShow={listShow[(index - 1) / 2]}
                                hasDetailView={hasDetailView}
                                navigation={navigation}
                                fromScreen={fromScreen}
                            />
                        );

                    return (
                        <InformationFlat
                            key={index}
                            listItems={item}
                            paddingHorizontal={20}
                            firstTopPadding={20}
                            isShow={listShow[(index - 1) / 2]}
                            navigation={navigation}
                            fromScreen={fromScreen}
                        />
                    );
                }}
                data={data}
            />
        </View>
    );
};

export default CustomStickyView;
