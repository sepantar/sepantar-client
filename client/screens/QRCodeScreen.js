import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth'; // Hook untuk mendapatkan data profil
import { Card } from 'tamagui'; // Mengimpor komponen Card dari Tamagui
import { Ionicons } from 'react-native-vector-icons'; // Mengimpor ikon dari react-native-vector-icons

const QRCodeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth(); // Hook yang mengakses data profil pengguna

  // Data QR code dummy
  const qrValue = "Student ID: 12345"; // Ubah dengan data yang sesuai jika diperlukan

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#2F4858" />
      </TouchableOpacity>
      <Text style={styles.header}>Scan untuk Absen</Text>
      <Card padding="$4" borderRadius="$6" backgroundColor="#F6AE2D" shadow="$2" style={styles.card}>
        <QRCode
          value={qrValue}
          size={250}
          color="black"
          backgroundColor="white"
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 40,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#2F4858',
  },
  card: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 350,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
});

export default QRCodeScreen;
