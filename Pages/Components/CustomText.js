import { Text } from "react-native";
import { scale, textInputDefaultSize } from "../../Utils/constants";

export const CustomText = (props) => {
    return (
        <Text
            {...props}
            style={[
                {
                    fontFamily: "Be Vietnam",
                    fontSize: textInputDefaultSize * scale,
                    color: "#5C5D60",
                    opacity: 1,
                },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
};
