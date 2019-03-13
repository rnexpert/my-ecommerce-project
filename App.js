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
import PaymentView from './src/screen/view/PaymentView'
import TransactionHistoryView from './src/screen/view/TransactionHistoryView'

class IconWithBadge extends Component {
  render() {
    const { name, badgeCount, color, size } = this.props
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
    )
  }
}


const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={0} />
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


const AppNavigator = createBottomTabNavigator({
  Home: createStackNavigator({
    ProductList: {
      screen: ProductsView,
      navigationOptions: {
        title: 'Home',
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    },
    DetailsProduct: {
      screen: DetailsView,
      navigationOptions: {
        title: '',
      },
    },
  }),
  Category: createStackNavigator({
    CategoryView: {
      screen: CategoryView,
      navigationOptions: {
        title: 'Categories',
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    }
  }),
  Cart: createStackNavigator({
    CartView: {
      screen: CartView,
      navigationOptions: {
        title: 'Cart',
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    },
    CheckoutView: {
      screen: CheckoutView,
      navigationOptions: {
        title: 'Checkout',
        headerTitleStyle: {
          flex: 1,
          fontFamily: 'monospace'
        },
      },
    },
    PaymentView: {
      screen: PaymentView,
      navigationOptions: {
        title: 'Payment',
        headerTitleStyle: {
          flex: 1,
          fontFamily: 'monospace'
        },
      },
    },
  }),
  Account: createStackNavigator({
    LoginView: {
      screen: LoginView,
      navigationOptions: {
        title: 'Login',
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    },
    SignUpView: {
      screen: SignUpView,
      navigationOptions: {
        title: 'SignUp',
        headerTitleStyle: {
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    },
    AccountView: {
      screen: AccountView,
      navigationOptions: {
        title: 'My Account',
        headerLeft: null,
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    },
    ProfileView: {
      screen: ProfileView,
      navigationOptions: {
        title: 'Profile',
        headerTitleStyle: {
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    },
    TransactionView: {
      screen: TransactionHistoryView,
      navigationOptions: {
        title: 'History Transaction',
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontFamily: 'monospace'
        },
      }
    },
  })
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


const AppContainer = createAppContainer(AppNavigator)

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