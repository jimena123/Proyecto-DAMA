import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image} from 'react-native';
import { themeColors } from '../theme';

export default function CarritoScreen({ route, navigation }) {
  const { productData } = route.params;
  const total = productData.price * productData.quantity;
  const estaEnLista = productData.enLista;

  const [correlativo, setCorrelativo] = useState(1);

  useEffect(() => {
    setCorrelativo(correlativo + 1);
  }, [productData]);

  // Función para retroceder a la pantalla anterior
  const retroceder = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>N° DE ORDEN:</Text>
          <Text style={styles.cell}>{correlativo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>PRODUCTO:</Text>
          <Text style={styles.cell}>{productData.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>PRECIO UNITARIO:</Text>
          <Text style={styles.cell}>$ {productData.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CANTIDAD:</Text>
          <Text style={styles.cell}>{productData.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>TOTAL A PAGAR:</Text>
          <Text style={styles.cell}>$ {total}</Text>
        </View>
        
      </View>
      <Text style={styles.message}>
        Puede pasar a caja a pagar su orden
      </Text>
    </View>
  );
}

CarritoScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <Button
      onPress={() => {
        navigation.goBack();
      }}
      title="Retroceder"
      color={themeColors.primary}
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    top:45
  },
  table: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingLeft:7
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.text,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: themeColors.text,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
});
