import WantedDetail from "./WantedDetail";
import WantedList from "./WantedList";
import CaseDetail from "../Case/CaseDetail";
import CriminalDetail from "../Criminal/CriminalDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import StickyHeaderExample from "./file";

const tab = createNativeStackNavigator();

function HomeTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            {/* <tab.Screen name="file" component={StickyHeaderExample} /> */}
            <tab.Screen name="WantedList" component={WantedList} />
            <tab.Screen name="WantedDetail" component={WantedDetail} />
            <tab.Screen name="CaseDetail" component={CaseDetail} />
            <tab.Screen name="CriminalDetail" component={CriminalDetail} />
        </tab.Navigator>
    );
}

export default HomeTab;
