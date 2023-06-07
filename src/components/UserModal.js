// UserModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';
import UserForm from './UserForm';

const UserModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Crear usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm />
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
