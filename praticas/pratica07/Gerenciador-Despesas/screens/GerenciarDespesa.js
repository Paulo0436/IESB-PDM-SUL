
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  Alert,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { themes, CATEGORIES } from '../constants/theme';

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  if (
    !values.amount.trim() ||
    !Number.isFinite(Number(values.amount)) ||
    Number(values.amount) <= 0
  ) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const selectedDate = new Date(values.date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (
    Number.isNaN(selectedDate.getTime()) ||
    selectedDate > today
  ) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ navigation, route }) {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const scheme = useColorScheme();
  const theme = themes[scheme === 'dark' ? 'dark' : 'light'];

  const expenseId = route.params?.expenseId;
  const isEditing = expenseId !== undefined;

  const existingExpense = expenses.find(
    (expense) => expense.id === expenseId
  );

  const [form, setForm] = useState(() => ({
    description: existingExpense?.description ?? '',
    amount: existingExpense
      ? String(existingExpense.amount)
      : '',
    date: existingExpense?.date ?? new Date().toISOString(),
    category: existingExpense?.category ?? '',
  }));

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const updatedForm = {
      ...form,
      [field]: value,
    };

    setForm(updatedForm);

    if (Object.keys(errors).length > 0) {
      setErrors(validate(updatedForm));
    }
  }

  function handleAmount(text) {
    const normalized = text.replace(',', '.');

    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate.toISOString());
    }
  }

  function handleSave() {
    Keyboard.dismiss();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const expenseData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense({
        id: expenseId,
        ...expenseData,
      });
    } else {
      addExpense({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        ...expenseData,
      });
    }

    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert(
      'Excluir despesa',
      'Deseja realmente excluir esta despesa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteExpense(expenseId);
            navigation.goBack();
          },
        },
      ]
    );
  }

  function inputStyle(field) {
    return [
      styles.input,
      {
        backgroundColor: theme.input,
        color: theme.text,
        borderColor: errors[field] ? theme.danger : theme.border,
      },
    ];
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: theme.text }]}>
          Descrição
        </Text>
        <TextInput
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={theme.secondary}
          style={inputStyle('description')}
        />
        {errors.description && (
          <Text style={[styles.error, { color: theme.danger }]}>
            {errors.description}
          </Text>
        )}

        <Text style={[styles.label, { color: theme.text }]}>
          Valor (R$)
        </Text>
        <TextInput
          value={form.amount}
          onChangeText={handleAmount}
          keyboardType="decimal-pad"
          placeholder="Ex.: 35.50"
          placeholderTextColor={theme.secondary}
          style={inputStyle('amount')}
        />
        {errors.amount && (
          <Text style={[styles.error, { color: theme.danger }]}>
            {errors.amount}
          </Text>
        )}

        <Text style={[styles.label, { color: theme.text }]}>
          Data
        </Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={inputStyle('date')}
        >
          <Text style={{ color: theme.text }}>
            {new Date(form.date).toLocaleDateString('pt-BR')}
          </Text>
        </Pressable>
        {errors.date && (
          <Text style={[styles.error, { color: theme.danger }]}>
            {errors.date}
          </Text>
        )}

        {showDatePicker && (
          <>
            <DateTimePicker
              value={new Date(form.date)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
            {Platform.OS === 'ios' && (
              <Pressable
                onPress={() => setShowDatePicker(false)}
                style={styles.pickerClose}
              >
                <Text style={{ color: theme.primary }}>
                  Concluir seleção
                </Text>
              </Pressable>
            )}
          </>
        )}

        <Text style={[styles.label, { color: theme.text }]}>
          Categoria
        </Text>
        <Pressable
          onPress={() => setShowCategoryModal(true)}
          style={inputStyle('category')}
        >
          <Text style={{ color: theme.text }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {errors.category && (
          <Text style={[styles.error, { color: theme.danger }]}>
            {errors.category}
          </Text>
        )}

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Excluir despesa</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.card },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Selecione uma categoria
            </Text>

            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={styles.modalOption}
                onPress={() => {
                  handleChange('category', category);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={{ color: theme.text, fontSize: 16 }}>
                  {category}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={styles.modalOption}
              onPress={() => setShowCategoryModal(false)}
            >
              <Text style={{ color: theme.danger }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 70,
    gap: 9,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 13,
    minHeight: 48,
    justifyContent: 'center',
  },
  error: {
    fontSize: 12,
  },
  pickerClose: {
    padding: 12,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    padding: 12,
  },
});
