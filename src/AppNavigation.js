// src/AppNavigation.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import theme from './styles/theme';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ManageStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* -----------------------
   Inline placeholder screens (so you don't need separate files yet)
   These are simple square/material-like cards & lists.
   Replace them later with full files.
   ----------------------- */

function PlaceholderScreen({ title, subtitle, navLabel }) {
  return (
    <SafeAreaView style={phStyles.safe}>
      <View style={phStyles.header}>
        <Text style={phStyles.title}>{title}</Text>
        {subtitle ? <Text style={phStyles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={phStyles.grid}>
        <View style={phStyles.card}>
          <Text style={phStyles.cardTitle}>{navLabel || 'Action'}</Text>
          <Text style={phStyles.cardMeta}>This is a placeholder UI</Text>
        </View>

        <View style={phStyles.card}>
          <Text style={phStyles.cardTitle}>Quick item</Text>
          <Text style={phStyles.cardMeta}>Replace with real list</Text>
        </View>

        <View style={phStyles.card}>
          <Text style={phStyles.cardTitle}>Add New</Text>
          <Text style={phStyles.cardMeta}>Open form to create</Text>
        </View>

      </View>

      <View style={phStyles.footer}>
        <Text style={phStyles.footerText}>Built with BookBill theme</Text>
      </View>
    </SafeAreaView>
  );
}

/* specific placeholder wrappers to keep names consistent */
const BuildingSelect = (props) => <PlaceholderScreen {...props} title="Buildings" subtitle="Select a building" navLabel="Select Building" />;
const CustomerSelect = (props) => <PlaceholderScreen {...props} title="Customers" subtitle="Search or add customer" navLabel="Select Customer" />;
const CustomerForm = (props) => <PlaceholderScreen {...props} title="Customer Form" subtitle="Add / edit customer" navLabel="Save Customer" />;
const ProductSelect = (props) => <PlaceholderScreen {...props} title="Products" subtitle="Select product(s)" navLabel="Select Product" />;
const OrderSummary = (props) => <PlaceholderScreen {...props} title="Order Summary" subtitle="Review order" navLabel="Place Order" />;
const Reports = (props) => <PlaceholderScreen {...props} title="Orders & Reports" subtitle="View past orders" navLabel="View Reports" />;
const SettingsScreen = (props) => <PlaceholderScreen {...props} title="Settings" subtitle="App and account settings" navLabel="Preferences" />;
const ManageIndex = (props) => <PlaceholderScreen {...props} title="Manage" subtitle="Buildings / Customers / Products" navLabel="Manage Items" />;

/* -----------------------
   Stacks for each tab
   ----------------------- */

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="CustomerSelect" component={CustomerSelect} />
      <HomeStack.Screen name="OrderSummary" component={OrderSummary} />
      <HomeStack.Screen name="CustomerForm" component={CustomerForm} />
      <HomeStack.Screen name="ProductSelect" component={ProductSelect} />
    </HomeStack.Navigator>
  );
}

function ManageStackScreen() {
  return (
    <ManageStack.Navigator screenOptions={{ headerShown: false }}>
      <ManageStack.Screen name="ManageIndex" component={ManageIndex} />
      <ManageStack.Screen name="BuildingSelect" component={BuildingSelect} />
      <ManageStack.Screen name="CustomerSelect" component={CustomerSelect} />
      <ManageStack.Screen name="CustomerForm" component={CustomerForm} />
      <ManageStack.Screen name="ProductSelect" component={ProductSelect} />
    </ManageStack.Navigator>
  );
}

function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator screenOptions={{ headerShown: false }}>
      <OrdersStack.Screen name="OrdersList" component={Reports} />
      <OrdersStack.Screen name="OrderSummary" component={OrderSummary} />
    </OrdersStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

/* -----------------------
   Main Tabs
   ----------------------- */

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: theme.colors.card,
          borderTopColor: '#eee',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'HomeTab') iconName = 'home';
          else if (route.name === 'ManageTab') iconName = 'inventory'; // manage-like
          else if (route.name === 'OrdersTab') iconName = 'receipt-long';
          else if (route.name === 'SettingsTab') iconName = 'tune';
          return <Icon name={iconName} size={size ?? 22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="ManageTab"
        component={ManageStackScreen}
        options={{ tabBarLabel: 'Manage' }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStackScreen}
        options={{ tabBarLabel: 'Orders' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

/* -----------------------
   Root navigator includes Auth (Login/Register) and MainTabs
   ----------------------- */

export default function AppNavigation() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth screens */}
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />

      {/* Main app (tabs) */}
      <AuthStack.Screen
        name="Main"
        component={MainTabs}
        options={{ gestureEnabled: false }}
      />
    </AuthStack.Navigator>
  );
}

/* -----------------------
   Inline styles for placeholders
   ----------------------- */

const phStyles = StyleSheet.create
  ? StyleSheet.create({
      safe: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      header: {
        padding: theme.spacing.lg,
      },
      title: {
        fontSize: 22,
        fontWeight: '700',
        color: theme.colors.text,
      },
      subtitle: {
        color: theme.colors.muted,
        marginTop: 6,
      },
      grid: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      card: {
        width: '48%',
        backgroundColor: theme.colors.card,
        padding: theme.spacing.md,
        borderRadius: 6,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: '#EEE',
        elevation: 2,
      },
      cardTitle: {
        fontWeight: '700',
        color: theme.colors.text,
        fontSize: 15,
      },
      cardMeta: {
        marginTop: 6,
        color: theme.colors.muted,
        fontSize: 12,
      },
      footer: {
        alignItems: 'center',
        padding: theme.spacing.md,
      },
      footerText: {
        color: theme.colors.muted,
        fontSize: 12,
      },
    })
  : {}; 
