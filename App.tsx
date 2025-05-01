import "@/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { store } from "./store/store";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AuthProvider from "./AuthProvider";

// -------------------------------------------------------------------------------------------------------

// we're not typing the pages, but the type of parameters/data that the page expects to receive
export type RootStackParamList = {
  Tabs: { screen: string };
  Home: undefined;
  Categories: undefined;
  Stats: undefined;
  Login: undefined;
  Register: undefined;
  // Profile: { userId: string };
  Profile: undefined;
};

const TabNavigator = createBottomTabNavigator();

function MyTabs() {
  return (
    <AuthProvider>
      <TabNavigator.Navigator screenOptions={{ headerShown: false }}>
        <TabNavigator.Screen
          name="Home"
          component={HomePage}
          options={{
            title: "Home",
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
          }}
        />
        <TabNavigator.Screen
          name="Categories"
          component={CategoriesPage}
          options={{
            title: "Categories",
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>📂</Text>,
          }}
        />
        <TabNavigator.Screen
          name="profile"
          component={ProfilePage}
          options={{
            title: "Profile",
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>🧑</Text>,
          }}
        />
      </TabNavigator.Navigator>
    </AuthProvider>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: "Login",
  screens: {
    Login: {
      screen: LoginPage,
      options: { headerShown: false }, // No header for the Sign Up screen
    },
    Register: {
      screen: RegisterPage,
      options: { headerShown: false }, // No header for the Sign Up screen
    },

    Tabs: {
      screen: MyTabs,
      options: { headerShown: false },
    },
    Home: {
      screen: HomePage,
      options: { headerShown: true, title: "Home" },
    },
    Categories: {
      screen: CategoriesPage,
      options: { headerShown: true, title: "Categories" },
    },
    Profile: {
      screen: ProfilePage,
      options: { headerShown: true, title: "Profile" },
    },
    Stats: {
      screen: StatsPage,
      options: { headerShown: true, title: "Stats" },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider mode="dark">
        <Navigation />
      </GluestackUIProvider>
    </Provider>
  );
}
