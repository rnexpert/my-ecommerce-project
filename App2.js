import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { View, Text } from 'native-base'
import ProductsView from './src/screen/view/ProductsView'
import { Root } from 'native-base';
import { Provider } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import store from './src/publics/redux/store'
import CategoryView from './src/screen/view/CategoryView'
import CartView from './src/screen/view/CartView'
import AccountView from './src/screen/view/AccountView'
import DetailsView from './src/screen/view/DetailsView'
import LoginView from './src/screen/view/LoginView'
import SignUpView from './src/screen/view/SignUpView'
import ProfileView from './src/screen/view/ProfileView'
import CheckoutView from './src/screen/view/CheckoutView'

class IconWithBadge extends Component {
    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <Ionicons name={name} size={size} color={color} />
                {badgeCount > 0 && (
                    <View
                        style={{

                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const HomeIconWithBadge = props => {
    return <IconWithBadge {...props} badgeCount={3} />
}

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons
    let iconName
    if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`
    } else if (routeName === 'Category') {
        iconName = `ios-grid${focused ? '' : ''}`
    } else if (routeName === 'Cart') {
        iconName = `ios-cart${focused ? '' : ''}`
        IconComponent = HomeIconWithBadge
    } else if (routeName === 'Account') {
        iconName = `ios-person${focused ? '' : ''}`
    }

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />
}

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: ProductsView,
    },
    Category: {
        screen: CategoryView,
    },
    Cart: {
        screen: CartView,
    },
    Account: {
        screen: AccountView
    }
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: '#3F51B5',
            inactiveTintColor: 'gray',
        },
    })

const StackNavigator = createStackNavigator({
    Main: {
        screen: TabNavigator,
    },
    initialRouteName: 'Main'
})

const AppContainer = createAppContainer(StackNavigator)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <AppContainer />
                </Root>
            </Provider>
        )
    }
}