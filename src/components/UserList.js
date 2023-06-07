// UserList.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { Table, Button, Modal } from 'react-bootstrap';
import UserForm from './UserForm';
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';


const override = css`
  display: block;
  margin: 30px auto;
  
  border-color: red;
`;


const GET_USERS = gql`
  query GetUsers {
    usuarios {
      id
      nombre
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    eliminarUsuario(id: $id)
  }
`;

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleDeleteUser = (id) => {
    deleteUser({ variables: { id } })
      .then(() => {
        console.log('Usuario eliminado');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar usuario:', error);
      });
  };
 

  return (
    <div>
      <h2>Lista de libros:</h2>
      {loading ? (
        <PropagateLoader color={'#000'} loading={loading} css={override} size={15} />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table striped bordered hover>
          <thead  >
            <tr  >
              <th >Titulo</th>
              <th>Descripcion</th>
              <th>CRUD</th>
            </tr>
          </thead>
          <tbody>
            {data.usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => setSelectedUser(usuario)}>
                    Modificar
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteUser(usuario.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {selectedUser && (
        <Modal show={!!selectedUser} onHide={() => setSelectedUser(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm user={selectedUser} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
