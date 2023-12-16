import CaseList from "./CaseList";
import CaseDetail from "./CaseDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const tab = createNativeStackNavigator();

function Case() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="CaseList" component={CaseList} />
            <tab.Screen name="CaseDetail" component={CaseDetail} />
        </tab.Navigator>
    );
}
export default Case;