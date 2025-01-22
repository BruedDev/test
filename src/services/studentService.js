import { API_URL, ENDPOINTS } from '../utils/constants';

async function getAllStudents() {
  try {
    const response = await fetch(`${API_URL}${ENDPOINTS.STUDENTS}`);
    if (!response.ok) throw new Error('Failed to fetch students');
    const students = await response.json();

    return students.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  } catch (error) {
    console.error('Lỗi tìm id học sinh:', error);
    throw error;
  }
}

async function normalizeStudentIds() {
  try {
    const students = await getAllStudents();
    const normalizedStudents = students.map((student, index) => ({
      ...student,
      id: (index + 1).toString()
    }));

    await Promise.all(
      normalizedStudents.map(student =>
        fetch(`${API_URL}${ENDPOINTS.STUDENTS}/${student.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(student),
        })
      )
    );

    return normalizedStudents;
  } catch (error) {
    console.error('Lỗi khi xác thực ID học sinh:', error);
    throw error;
  }
}

async function createStudent(studentData) {
  try {
    const students = await getAllStudents();
    const newId = (students.length + 1).toString();
    const newStudent = { ...studentData, id: newId };

    const response = await fetch(`${API_URL}${ENDPOINTS.STUDENTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });

    if (!response.ok) throw new Error('Failed to create student');
    return await response.json();
  } catch (error) {
    console.error('Lỗi tạo học sinh:', error);
    throw error;
  }
}

async function updateStudent(id, studentData) {
  try {
    const updatedStudent = { ...studentData, id };

    const response = await fetch(`${API_URL}${ENDPOINTS.STUDENTS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    });

    if (!response.ok) throw new Error('Failed to update student');
    return await response.json();
  } catch (error) {
    console.error('Lỗi cập nhật học sinh:', error);
    throw error;
  }
}

// async function searchStudents(searchTerm) {
//   try {
//     // Lấy danh sách tất cả sinh viên
//     const students = await getAllStudents();

//     // Chuyển searchTerm về chữ thường để so sánh không phân biệt chữ hoa/thường
//     const lowerCaseTerm = searchTerm.toLowerCase();

//     // Lọc danh sách theo ID, tên, email hoặc khóa học
//     const filteredStudents = students.filter(student =>
//       student.id.toLowerCase().includes(lowerCaseTerm) ||
//       student.name.toLowerCase().includes(lowerCaseTerm) ||
//       student.email.toLowerCase().includes(lowerCaseTerm) ||
//       student.course.toLowerCase().includes(lowerCaseTerm)
//     );

//     return filteredStudents;
//   } catch (error) {
//     console.error('Lỗi khi tìm kiếm sinh viên:', error);
//     throw error;
//   }
// }


async function deleteStudent(id) {
  try {
    const deleteResponse = await fetch(`${API_URL}${ENDPOINTS.STUDENTS}/${id}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) throw new Error('Lỗi xóa học sinh');

    await normalizeStudentIds();

    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  // searchStudents,
};