import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import StudentList from './StudentList';
import StudentModal from './StudentModal';
import studentService from '../../services/studentService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOpenModal = (student = null) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };

  const handleSubmit = async (studentData) => {
    try {
      setIsLoading(true);
      if (selectedStudent) {
        await studentService.updateStudent(selectedStudent.id, studentData);
      } else {
        await studentService.createStudent(studentData);
      }
      await fetchStudents();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save student');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa học viên này?')) return;

    try {
      setIsLoading(true);
      await studentService.deleteStudent(id);
      await fetchStudents();
    } catch (err) {
      setError('Failed to delete student');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <Container className="py-4">
      <StudentList
        students={students}
        isLoading={isLoading}
        onAdd={() => handleOpenModal()}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <StudentModal
        show={showModal}
        student={selectedStudent}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Student;