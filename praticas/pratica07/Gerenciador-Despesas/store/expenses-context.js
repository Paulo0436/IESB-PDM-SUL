
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
  } from 'react';
  import { ActivityIndicator, View } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const ExpensesContext = createContext(null);
  const STORAGE_KEY = '@expenses';
  
  function expensesReducer(state, action) {
    switch (action.type) {
      case 'ADD':
        return [action.payload, ...state];
  
      case 'UPDATE':
        return state.map((expense) =>
          expense.id === action.payload.id
            ? { ...expense, ...action.payload }
            : expense
        );
  
      case 'DELETE':
        return state.filter(
          (expense) => expense.id !== action.payload
        );
  
      case 'SET':
        return [...action.payload];
  
      default:
        return state;
    }
  }
  
  export function ExpensesContextProvider({ children }) {
    const [expenses, dispatch] = useReducer(expensesReducer, []);
    const [isLoaded, setIsLoaded] = useState(false);
    const pendingWrites = useRef(Promise.resolve());
  
    useEffect(() => {
      let active = true;
  
      async function loadExpenses() {
        try {
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
  
          if (active && stored !== null) {
            const parsed = JSON.parse(stored);
  
            if (Array.isArray(parsed)) {
              dispatch({
                type: 'SET',
                payload: parsed,
              });
            }
          }
        } catch (error) {
          console.error('Erro ao carregar despesas:', error);
        } finally {
          if (active) setIsLoaded(true);
        }
      }
  
      loadExpenses();
  
      return () => {
        active = false;
      };
    }, []);
  
    useEffect(() => {
      if (!isLoaded) return;
  
      const serialized = JSON.stringify(expenses);
  
      // Mantém as gravações na ordem das alterações.
      pendingWrites.current = pendingWrites.current
        .catch(() => {})
        .then(async () => {
          try {
            await AsyncStorage.setItem(STORAGE_KEY, serialized);
          } catch (error) {
            console.error('Erro ao salvar despesas:', error);
          }
        });
    }, [expenses, isLoaded]);
  
    function addExpense(expense) {
      dispatch({ type: 'ADD', payload: expense });
    }
  
    function updateExpense(expense) {
      dispatch({ type: 'UPDATE', payload: expense });
    }
  
    function deleteExpense(id) {
      dispatch({ type: 'DELETE', payload: id });
    }
  
    function clearExpenses() {
      dispatch({ type: 'SET', payload: [] });
    }
  
    if (!isLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
    return (
      <ExpensesContext.Provider
        value={{
          expenses,
          addExpense,
          updateExpense,
          deleteExpense,
          clearExpenses,
        }}
      >
        {children}
      </ExpensesContext.Provider>
    );
  }
  
  export function useExpenses() {
    const context = useContext(ExpensesContext);
  
    if (!context) {
      throw new Error(
        'useExpenses precisa estar dentro de ExpensesContextProvider'
      );
    }
  
    return context;
  }
  