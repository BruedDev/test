import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  course: ''
};

const StudentModal = ({ show, student, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData(INITIAL_STATE);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {student ? 'Cập Nhật Học Viên' : 'Thêm Học Viên Mới'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Họ Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Khóa Học</Form.Label>
            <Form.Control
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : (student ? 'Cập Nhật' : 'Thêm')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StudentModal;