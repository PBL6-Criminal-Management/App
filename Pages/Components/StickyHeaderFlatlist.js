import React from "react";
import { FlatList } from "react-native";

export default (props) => {
    let data = [];
    const indict = [];

    for (const i in props.data) {
        const row = props.data[i];
        indict.push(data.length);
        data.push({
            ...row,
            [props.childrenKey]: null,
            isStickyFlatListHeader: true,
        });
        data.push(row[props.childrenKey]);
    }

    return (
        <FlatList
            {...props}
            stickyHeaderIndices={indict}
            renderItem={(data, index) =>
                data.item.isStickyFlatListHeader
                    ? props.renderHeader(data, index)
                    : props.renderItem(data, index)
            }
            data={data}
        />
    );
};
