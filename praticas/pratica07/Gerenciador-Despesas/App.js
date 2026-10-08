
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen({ despesas }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerRight: () => (
          <IconButton
            icon="add-circle"
            size={28}
            color="#2563eb"
            onPress={() =>
              navigation.getParent()?.navigate('GerenciarDespesa')
            }
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      >
        {() => <DespesasRecentes despesas={despesas} />}
      </Tab.Screen>

      <Tab.Screen
        name="TodasDespesas"
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <TodasDespesas despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState([
    {
      id: '1',
      descricao: 'Almoço',
      valor: 35.50,
      data: new Date(),
      categoria: 'Alimentação',
    },
    {
      id: '2',
      descricao: 'Ônibus',
      valor: 12.00,
      data: new Date(),
      categoria: 'Transporte',
    },
    {
      id: '3',
      descricao: 'Cinema',
      valor: 45.00,
      data: new Date(),
      categoria: 'Lazer',
    },
    {
      id: '4',
      descricao: 'Internet',
      valor: 99.90,
      data: new Date(),
      categoria: 'Contas',
    },
  ]);

  function adicionarDespesa(novaDespesa) {
    setDespesas((listaAtual) => [novaDespesa, ...listaAtual]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          options={{ headerShown: false }}
        >
          {() => <BottomTabScreen despesas={despesas} />}
        </Stack.Screen>

        <Stack.Screen
          name="GerenciarDespesa"
          options={{ title: 'Gerenciar Despesa' }}
        >
          {(props) => (
            <GerenciarDespesa
              {...props}
              onSalvar={adicionarDespesa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
