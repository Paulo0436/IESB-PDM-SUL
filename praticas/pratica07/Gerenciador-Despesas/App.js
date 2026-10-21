
import { useColorScheme } from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { ExpensesContextProvider } from './store/expenses-context';
import { themes } from './constants/theme';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';

import IconButton from './components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  const scheme = useColorScheme();
  const theme = themes[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabelStyle: {
          fontSize: 12,
        },

        headerStyle: {
          backgroundColor: theme.card,
        },

        headerTintColor: theme.text,

        tabBarStyle: {
          backgroundColor: theme.card,
        },

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondary,

        headerRight: () => (
          <IconButton
            icon="add-circle"
            size={28}
            color={theme.primary}
            onPress={() =>
              navigation.getParent()?.navigate('GerenciarDespesa')
            }
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="hourglass"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="wallet-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const theme = themes[isDark ? 'dark' : 'light'];
  const baseTheme = isDark ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      primary: theme.primary,
      border: theme.border,
    },
  };

  return (
    <ExpensesContextProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.card,
            },
            headerTintColor: theme.text,
          }}
        >
          <Stack.Screen
            name="Despesas"
            component={BottomTabScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{
              title: 'Nova despesa',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
