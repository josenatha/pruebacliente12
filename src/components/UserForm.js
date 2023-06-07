// UserForm.js
import React from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { Form, Button } from 'react-bootstrap';

const CREATE_USER = gql`
  mutation CreateUser($nombre: String, $email: String) {
    crearUsuario(nombre: $nombre, email: $email) {
      id
      nombre
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $nombre: String, $email: String) {
    actualizarUsuario(id: $id, nombre: $nombre, email: $email) {
      id
      nombre
      email
    }
  }
`;

const UserForm = ({ user }) => {
  const [nombre, setNombre] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  React.useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      updateUser({ variables: { id: user.id, nombre, email } })
        .then(() => {
          console.log('Usuario actualizado');
          
          setNombre('');
          setEmail('');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error al actualizar usuario:', error);
        });
    } else {
      createUser({ variables: { nombre, email } })
        .then(() => {
          console.log('Usuario creado');
          setNombre('');
          setEmail('');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error al crear usuario:', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNombre">
        <Form.Label>Titulo</Form.Label>
        <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {user ? 'Actualizar' : 'Crear'}
      </Button>
    </Form>
  );
};

export default UserForm;
