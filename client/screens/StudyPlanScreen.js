import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Text, Stack, Card } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native'; // Import ikon dari lucide-react-native
import { Ionicons } from 'react-native-vector-icons';

// Data awal study plans
const initialStudyPlans = [
  { id: '1', name: 'Math Study Plan', checked: false, tasks: [
    { id: '1-1', text: 'Pelajari konsep polinomial dan cara menyederhanakan bentuknya', checked: false },
    { id: '1-2', text: 'Pahami teknik-teknik faktorisasi polinomial', checked: false },
    { id: '1-3', text: 'Kerjakan latihan soal untuk faktorisasi dan operasi dengan polinomial', checked: false },
  ]},
  { id: '2', name: 'Science Study Plan', checked: false, tasks: [
    { id: '2-1', text: 'Baca materi tentang ekosistem', checked: false },
    { id: '2-2', text: 'Pelajari siklus air dan daur ulang nutrisi', checked: false },
    { id: '2-3', text: 'Kerjakan soal latihan tentang ekosistem', checked: false },
  ]},
  { id: '3', name: 'History Study Plan', checked: false, tasks: [
    { id: '3-1', text: 'Pelajari peristiwa penting pada abad ke-20', checked: false },
    { id: '3-2', text: 'Pahami perkembangan politik dan sosial', checked: false },
    { id: '3-3', text: 'Kerjakan latihan soal sejarah', checked: false },
  ]},
  // Tambahkan lebih banyak study plans sesuai kebutuhan
];

const StudyPlanScreen = () => {
  const navigation = useNavigation();
  const [plans, setPlans] = useState(initialStudyPlans);
  const [openAccordionId, setOpenAccordionId] = useState(null); // Untuk mengontrol accordion yang terbuka

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditPlan = (id) => {
    // Logika untuk mengedit study plan berdasarkan ID
    console.log(`Edit plan with ID: ${id}`);
  };

  const handleCheck = (planId, taskId) => {
    setPlans(plans.map(plan =>
      plan.id === planId ? {
        ...plan,
        tasks: plan.tasks.map(task =>
          task.id === taskId
            ? { ...task, checked: !task.checked }
            : task // Tidak mengubah status tugas lainnya
        )
      } : plan
    ));
  };

  const toggleOpen = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const renderTask = ({ item, planId }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => handleCheck(planId, item.id)}
        style={[styles.checkBox, item.checked && styles.checkedBox]}
      >
        {item.checked && <Ionicons name="checkmark" size={20} color="white" />}
      </TouchableOpacity>
      <Text style={[styles.taskText, item.checked && styles.checkedTaskText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
      </View>

      {/* Body with List of Study Plans */}
      <Stack space="$4" style={styles.body}>
        <View style={styles.accordionSection}>
          {plans.map((plan) => (
            <Card key={plan.id} padding="$4" borderRadius="$4" backgroundColor="#F6AE2D" shadow="$2" style={styles.card}>
              <View style={styles.accordionItem}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => toggleOpen(plan.id)}
                >
                  <Text style={styles.accordionTitle}>{plan.name}</Text>
                  {openAccordionId === plan.id ? (
                    <ChevronUp size={20} color="#2F4858" /> // Ikon ChevronUp saat accordion terbuka
                  ) : (
                    <ChevronDown size={20} color="#2F4858" /> // Ikon ChevronDown saat accordion tertutup
                  )}
                </TouchableOpacity>
                {openAccordionId === plan.id && (
                  <View>
                    <FlatList
                      data={plan.tasks}
                      renderItem={(item) => renderTask({ item: item.item, planId: plan.id })}
                      keyExtractor={(task) => task.id}
                      style={styles.taskList}
                    />
                    <TouchableOpacity
                      onPress={() => handleEditPlan(plan.id)}
                      style={styles.editButton}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Card>
          ),)}
        </View>
      </Stack>
    </View>
  );
};

const { width } = Dimensions.get('window');

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
  body: {
    flex: 1,
  },
  accordionSection: {
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
  },
  accordionItem: {
    marginBottom: 10,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6AE2D',
    padding: 10,
    borderRadius: 6,
  },
  accordionTitle: {
    fontSize: 16,
    color: '#2F4858', // Warna judul accordion
  },
  checkBox: {
    width: 24, // Lebar kotak checklist
    height: 24, // Tinggi kotak checklist
    borderWidth: 1, // Ketebalan border kotak
    borderColor: '#B95623', // Warna border kotak
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 4, // Jari-jari border kotak
    justifyContent: 'center', // Menyelaraskan ikon centang di tengah kotak
    alignItems: 'center', // Menyelaraskan ikon centang di tengah kotak
  },
  checkedBox: {
    backgroundColor: '#B95623', // Warna latar belakang kotak saat dicentang
  },
  taskList: {
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  taskText: {
    fontSize: 16,
    color: '#2F4858',
    flex: 1,
  },
  checkedTaskText: {
    textDecorationLine: 'line-through', // Mencoret teks
  },
  editButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#38A0ED',
    borderRadius: 6,
    justifyContent: 'center',
    height: 30,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StudyPlanScreen;
