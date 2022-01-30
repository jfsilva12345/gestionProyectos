// vendors
// eslint-disable-next-line
import React from "react";
import { useQuery, gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

// HU004 Administrador podrá ver la información de los usuarios registrados en la plataforma
// HU005 Administrador podrá cambiar el estado del usuario

const USERS = gql `
  query AllUsers {
    allUsers {
      _id
      email
      documentId
      fullName
      status
    }
  }
`;

const Users = () => {
  const { data } = useQuery(USERS);
  return <>
    <Container>
      <Row>
        <Col><h2 className="text-center">USUARIOS</h2></Col>
      </Row>
    </Container>
    <Container>
    <Row>
        <Col><b>Id</b></Col>
        <Col><b>Nombre</b></Col>
        <Col><b>e-mail</b></Col>
        <Col><b>status</b></Col>
        <Col><b>Acción</b></Col> 
    </Row>
  </Container>
  {!data ? <></> : data?.allUsers?.map(user => (
    <>
      <Container>
        <Row>
            <Col>{user.documentId}</Col>
            <Col>{user.fullName}</Col>
            <Col>{user.email}</Col>
            <Col>{user.status}</Col>
            <Col>{(user.status === 'PENDING' ? <Button variant="primary" size="sm">Aceptar</Button>  : 
                   user.status === 'AUTHORIZED' ? <Button variant="primary" size="sm">No Autorizado</Button> :
                   user.status === 'UNAUTHORIZED' ? <Button variant="primary" size="sm">Autorizado</Button> : <></>)}</Col>
        </Row>
      </Container>
    </>
  ))} </>
};

export default Users;