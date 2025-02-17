import "@/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";

// -------------------------------------------------------------------------------------------------------

export type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: "Home",
  screens: {
    Home: HomePage,
    // To set custon name:
    // Home: {
    //   screen: HomeScreen,
    //   options: {
    //     title: 'Overview',
    //   },
    // },
    Categories: CategoriesPage,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <Navigation />;
    </GluestackUIProvider>
  );
}
