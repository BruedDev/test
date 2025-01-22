import React from 'react';
import { Button } from 'react-bootstrap';

const StudentItem = ({ student, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>{student.course}</td>
      <td>
        <Button
          variant="warning"
          size="sm"
          className="me-2"
          onClick={() => onEdit(student)}
        >
          Sửa
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(student.id)}
        >
          Xóa
        </Button>
      </td>
    </tr>
  );
};

export default StudentItem;