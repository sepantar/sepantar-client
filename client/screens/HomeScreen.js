// screens/HomeScreen.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Stack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { Bell } from 'lucide-react-native'; // Pastikan Anda memiliki icon Bell atau sesuaikan dengan ikon yang Anda gunakan

const { width } = Dimensions.get('window'); // Mendapatkan lebar layar untuk perhitungan

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo and Notification Icon */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Sepantar_Logo_No_Bg1.png')} // Pastikan path ini sesuai dengan lokasi gambar Anda
          style={styles.logo}
        />
        <Bell size={24} color="black" style={styles.notificationIcon} />
      </View>

      {/* User Card */}
      <TouchableOpacity onPress={() => navigation.navigate('UserScreen')} activeOpacity={0.7}>
        <Card padding="$4" marginBottom="$4" borderRadius="$4" backgroundColor="$background" shadow="$2" style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/adaptive-icon.png')} // Ganti dengan path gambar avatar Anda
              style={styles.avatar}
            />
          </View>
          <Stack spacing="$2" style={styles.userInfo}>
            <Text fontSize={20} fontWeight="bold">John Doe</Text>
            <Text fontSize={16} color="$gray500">Role: Teacher</Text>
            <Text fontSize={16} color="$gray500">Class: Mathematics</Text>
          </Stack>
        </Card>
      </TouchableOpacity>

      <Text style={styles.actionText}>What do you want to do today?</Text>
      {/* Action Buttons in One Card */}
      <Card padding="$4" borderRadius="$4" backgroundColor="$background" shadow="$2" style={styles.actionCard}>
        <Stack space="$2" style={styles.buttonStack}>
          <Button
            onPress={() => navigation.navigate('AbsenceScreen')}
            size="large"
            variant="outline"
            style={styles.button}
          >
            Absence
          </Button>
          <Button
            onPress={() => navigation.navigate('SubjectsScreen')}
            size="large"
            variant="outline"
            style={styles.button}
          >
            Subjects
          </Button>
          <Button
            onPress={() => navigation.navigate('StudyPlanScreen')}
            size="large"
            variant="outline"
            style={styles.button}
          >
            Study Plan
          </Button>
        </Stack>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 65,
  },
  logo: {
    width: 150, // Ukuran logo, sesuaikan jika perlu
    height: 55,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  notificationIcon: {
    marginLeft: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16, // Menambah padding vertical untuk kartu pengguna
    backgroundColor:'#F6AE2D',
    marginTop:20
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Set half of the width and height to make it circular
  },
  userInfo: {
    flex: 1,
  },
  actionCard: {
    flex: 1,
    justifyContent: 'flex-start', // Menjaga konten tetap di atas
    paddingVertical: 16, // Menambah padding vertikal
    borderColor: 'gray', // Warna border luar tombol
    borderWidth: 2, // Lebar border tombol
    borderRadius: 8,
  },
  buttonStack: {
    flexGrow: 1, // Membuat Stack mengisi sisa ruang
  },
  actionText: {
    marginBottom: 25, // Jarak antara teks dan tombol
    fontSize: 18, // Ukuran font teks
    marginTop:25
  },
  button: {
    paddingVertical: 10, // Memperbesar tinggi tombol
    paddingHorizontal: 30, // Memperbesar lebar tombol
    fontSize: 15, // Memperbesar ukuran teks
    width: '100%',
    height: '20%', // Memastikan tombol mengisi lebar card
    marginBottom: 20, // Jarak antar tombol
  },
});

export default HomeScreen;