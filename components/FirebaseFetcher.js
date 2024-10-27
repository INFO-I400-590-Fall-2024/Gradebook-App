import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

export default function FirebaseFetcher() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentData = [];
      querySnapshot.forEach((doc) => {
        studentData.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentData);
    };

    fetchData();
  }, []);
  async function addStudent(studentData) {
    try {
      const docRef = await addDoc(collection(db, "students"), studentData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View>
      {students.map((student) => (
        <Text key={student.id}>{student.name}</Text>
      ))}
    </View>
  );
}
