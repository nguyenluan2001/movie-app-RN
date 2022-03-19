import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import MoreScreen from './screens/MoreScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Icon } from 'react-native-elements';
import HomeNavigator from './navigators/HomeNavigator';
import SearchNavigator from './navigators/SearchNavigator';
import AccountNavigator from './navigators/AccountNavigator';
import LoginScreen from './screens/LoginScreen';
import Toast from 'react-native-toast-message';
import RegisterScreen from './screens/RegisterScreen';
import AuthenticateNavigator from './navigators/AuthenticationNavigator';
import MoreNavigator from './navigators/MoreNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeNavigator} options={
            {
              tabBarIcon: ({ focused }) => {
                return <Icon
                  name="home"
                  type="entypo"
                  color={focused ? '#ff725b' : 'black'}
                ></Icon>
              },
              tabBarLabel: ({ focused }) => {
                return <Text
                  style={{
                    color: focused ? '#ff725b' : 'black'
                  }}
                >Home</Text>
              },
              tabBarShowLabel: true,
              headerShown: false
            }
          }
          />
          <Tab.Screen name="Search" component={SearchNavigator} options={
            {
              tabBarIcon: ({ focused }) => {
                return <Icon
                  name="search"
                  type="font-awesome"
                  color={focused ? '#ff725b' : 'black'}
                ></Icon>
              },
              tabBarLabel: ({ focused }) => {
                return <Text
                  style={{
                    color: focused ? '#ff725b' : 'black'
                  }}
                >Search</Text>
              },
              tabBarShowLabel: true,
              headerShown: false
            }
          } />
          <Tab.Screen name="Authentication" component={AuthenticateNavigator} options={
            {
              tabBarButton: props => null,
              headerShown: false,
              tabBarStyle: { display: 'none' }
            }
          } />
          <Tab.Screen name="More" component={MoreNavigator} options={
            {

              tabBarIcon: ({ focused }) => {
                return <Icon
                  name="menu"
                  type="feather"
                  color={focused ? '#ff725b' : 'black'}
                ></Icon>
              },
              tabBarLabel: ({ focused }) => {
                return <Text
                  style={{
                    color: focused ? '#ff725b' : 'black'
                  }}
                >More</Text>
              },
              tabBarShowLabel: true,
              headerShown: false,
            }
          } />
          <Tab.Screen name="AccountTab" component={AccountNavigator} options={
            {
              tabBarIcon: ({ focused }) => {
                return <Icon
                  name="user"
                  type="font-awesome-5"
                  color={focused ? '#ff725b' : 'black'}
                ></Icon>
              },
              tabBarLabel: ({ focused }) => {
                return <Text
                  style={{
                    color: focused ? '#ff725b' : 'black'
                  }}
                >Account</Text>
              },
              tabBarShowLabel: true,
              headerShown: false,
            }
          } />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
