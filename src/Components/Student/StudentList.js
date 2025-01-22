import React from 'react';
import { Table, Button } from 'react-bootstrap';
import StudentItem from './StudentItem';
// import SearchStudent from './SearchStudent';

const StudentList = ({ students, isLoading, onAdd, onEdit, onDelete }) => {
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (

    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản Lý Học Viên</h2>
        <Button variant="primary" onClick={onAdd}>
          Thêm Học Viên
        </Button>
      </div>
      {/* <SearchStudent /> */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Khóa Học</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <StudentItem
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;