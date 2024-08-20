import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import AbsensiScreen from "./AbsensiScreen";
import DetailSubjectScreen from "./DetailSubject";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfile";
import ChapterDetailScreen from "./DetailChapter";
import EditChapterScreen from "./EditChapter";
import NewChapterScreen from "./NewChapterScreen";
import AttendanceScreen from "./AttendanceScreen";
import DetailAbsensiScreen from "./DetailAbsensi";
import SubjectListScreen from "./SubjectsList";
import ScheduleScreen from "./ScheduleScreen";

const Stack = createNativeStackNavigator();

export default function TeacherNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Absensi" component={AbsensiScreen} />
      <Stack.Screen
        name="DetailMataPelajaran"
        component={DetailSubjectScreen}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="DetailChapter" component={ChapterDetailScreen} />
      <Stack.Screen name="EditChapter" component={EditChapterScreen} />
      <Stack.Screen name="NewChapter" component={NewChapterScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="DetailAbsensi" component={DetailAbsensiScreen} />
      <Stack.Screen name="MataPelajaran" component={SubjectListScreen} />
    </Stack.Navigator>
  );
}
