import { Text } from "react-native"

export const CustomText = (props) => {
   return (
        <Text {...props} style={{ fontFamily:'Be Vietnam',  fontSize: 13, color:'#5C5D60', opacity: 1, ...props.style }} >{props.children}</Text>
   )
}