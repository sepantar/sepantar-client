import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./OnboardingScreen";
import HomeScreen from "./HomeScreen";
import AbsensiScreen from "./AbsensiScreen";
import DetailSubjectScreen from "./DetailSubject";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfile";
import ChapterDetailScreen from "./DetailChapter";
import QRCodeScreen from "./QRCodeScreen";
import DetailAbsensiScreen from "./DetailAbsensi";
import StudyPlanScreen from "./StudyPlanScreen";
import ListMateriStudyPlan from "./ListMateriStudy";
import ChapterListStudyPlanScreen from "./ChapterList";
import SubjectListScreen from "./SubjectsList";
import ScheduleScreen from "./ScheduleScreen";

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
      <Stack.Screen name="DetailAbsensi" component={DetailAbsensiScreen} />
      <Stack.Screen name="StudyPlan" component={StudyPlanScreen} />
      <Stack.Screen
        name="StudyPlanSubjectList"
        component={ListMateriStudyPlan}
      />
      <Stack.Screen
        name="StudyPlanTask"
        component={ChapterListStudyPlanScreen}
      />
      <Stack.Screen name="MataPelajaran" component={SubjectListScreen} />
    </Stack.Navigator>
  );
}
