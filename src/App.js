import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import UserList from './components/UserList';
import UserModal from './components/UserModal';

const client = new ApolloClient({
  uri: 'http://192.168.133.46:4040/graphql', // Cambia la URL si tu servidor está en un puerto diferente
  cache: new InMemoryCache(),
});

const App = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="header">
        <h1>LIBRERIA MACONDO</h1>
        </div>
        <UserList />
        <button className="btn btn-primary" onClick={handleShowModal}>
          Crear libro
        </button>
        <UserModal show={showModal} onHide={handleHideModal} />
      </div>
    </ApolloProvider>
  );
};

export default App;
