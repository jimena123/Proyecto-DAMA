import React from 'react';
import { View, Text } from 'react-native';

export default function PrintTicket({ route }) {
  const { item, quantity, unitPrice, total } = route.params;

  return (
    <View>
      <Text>Nombre del Producto: {item.name}</Text>
      <Text>Cantidad: {quantity}</Text>
      <Text>Precio Unitario: $ {unitPrice}</Text>
      <Text>Total: $ {total}</Text>
    </View>
  );
}
