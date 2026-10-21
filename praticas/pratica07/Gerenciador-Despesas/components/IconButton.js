
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ icon, size = 26, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        padding: 8,
      })}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}
