// screens/CreateStudyPlanScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, Button, Card, Stack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from 'react-native-vector-icons'; // Pastikan Anda memiliki package ini terinstall
import { ArrowLeft } from 'lucide-react-native';

const initialStudyPlans = [
  { id: '1', name: 'Math Study Plan', checked: false },
  { id: '2', name: 'Science Study Plan', checked: false },
  { id: '3', name: 'History Study Plan', checked: false },
  // Tambahkan lebih banyak study plans sesuai kebutuhan
];

const StudyPlanScreen = () => {
  const navigation = useNavigation();
  const [plans, setPlans] = useState(initialStudyPlans);

  const handleGenerateStudyPlan = () => {
    // Logika untuk menghasilkan study plan baru
    // Untuk saat ini, kita hanya menambahkan dummy plan
    const newPlan = { id: String(plans.length + 1), name: `New Plan ${plans.length + 1}`, checked: false };
    setPlans([...plans, newPlan]);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditPlan = (id) => {
    // Logika untuk mengedit study plan berdasarkan ID
    console.log(`Edit plan with ID: ${id}`);
    // Implementasikan navigasi atau logika edit di sini
  };

  const handleCheck = (id) => {
    setPlans(plans.map(plan =>
      plan.id === id ? { ...plan, checked: !plan.checked } : plan
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => handleCheck(item.id)} style={[styles.checkBox, item.checked && styles.checkedBox]}>
        {item.checked && <MaterialIcons name="check" size={20} color="white" />}
      </TouchableOpacity>
      <Text style={[styles.listItemText, item.checked && styles.checkedText]}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleEditPlan(item.id)} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
        </View>

      {/* Body with Generate Study Plan Button and List of Study Plans */}
      <Stack space="$4" style={styles.body}>
        <TouchableOpacity
          onPress={handleGenerateStudyPlan}
          size="large"
          variant="solid"
          style={styles.generateButton}
        >
          <Text style={styles.buttonText}>Generate Study Plan</Text>
        </TouchableOpacity>

        <Card padding="$4" borderRadius="$4" backgroundColor="#F6AE2D" shadow="$2">
          <FlatList
            data={plans}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Card>
      </Stack>
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
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  body: {
    flex: 1,
  },
  generateButton: {
    backgroundColor: '#2F4858', // Background color for the button
    paddingVertical: 10, // Memperbesar tinggi tombol
    paddingHorizontal: 30, // Memperbesar lebar tombol
    borderRadius: 6, // Jari-jari border untuk tombol
    alignItems: 'center', // Menyelaraskan teks di tengah tombol
    justifyContent: 'center', // Menyelaraskan teks di tengah tombol
    marginTop: 30,
    marginBottom: 20,
    height: 65,
  },
  buttonText: {
    color: 'white', // Warna teks tombol
    fontSize: 18, // Ukuran font teks tombol
  },
  listItem: {
    flexDirection: 'row', // Mengatur item agar checkbox dan teks berada dalam satu baris
    alignItems: 'center', // Menyelaraskan item secara vertikal
    borderBottomWidth: 1, // Garis bawah setiap item
    borderBottomColor: '#B95623', // Warna garis bawah
    paddingVertical: 10, // Jarak vertikal dalam item
    paddingHorizontal: 16, // Jarak horizontal dalam item
  },
  checkBox: {
    width: 24, // Lebar kotak checklist
    height: 24, // Tinggi kotak checklist
    borderWidth: 1, // Ketebalan border kotak
    borderColor: '#B95623', // Warna border kotak
    marginRight: 16, // Jarak antara kotak dan teks
    borderRadius: 4, // Jari-jari border kotak
    justifyContent: 'center', // Menyelaraskan ikon centang di tengah kotak
    alignItems: 'center', // Menyelaraskan ikon centang di tengah kotak
  },
  checkedBox: {
    backgroundColor: '#B95623', // Warna latar belakang kotak saat dicentang
  },
  listItemText: {
    fontSize: 16, // Ukuran font untuk teks item
    color: '#2F4858', // Warna teks item
    flex: 1, // Menggunakan sisa ruang yang tersedia
  },
  checkedText: {
    textDecorationLine: 'line-through', // Mencoret teks
  },
  editButton: {
    paddingVertical: 3, // Menambahkan padding vertikal
    paddingHorizontal: 10, // Menambahkan padding horizontal
    backgroundColor: '#38A0ED', // Background color for the edit button
    borderRadius: 6, // Jari-jari border untuk tombol edit
    justifyContent: 'center', // Menyelaraskan teks di tengah tombol
    height: 30,
    marginLeft: 10, // Jarak antara tombol edit dan teks
  },
  editButtonText: {
    color: 'white', // Warna teks tombol edit
    fontSize: 16, // Ukuran font untuk teks tombol edit
    textAlign: 'center', // Menyelaraskan teks di tengah tombol
  },
});

export default StudyPlanScreen;
