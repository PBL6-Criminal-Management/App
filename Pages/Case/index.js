import CaseList from "./CaseList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const tab = createNativeStackNavigator();

function Case() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="CaseList" component={CaseList} />
        </tab.Navigator>
    );
}
export default Case;