// vendors
// eslint-disable-next-line
import React from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

// HU006 Administrador podrá ver la información de los usuarios registrados en la plataforma

const PROJECTS = gql `
  query AllProjects {
    allProjects {
        name
        startDate
        endDate
        status
        phase
    }
  }
`;

// HU_007
const APPROVEPROYECT = gql `
mutation ApproveProject( $name: String!) {
  approveProject(name: $name) {
    name
    startDate
    status
    phase    
  }
}
`;

// HU_008
// mutation ProjectChangeStatus($name: String!, $status: ProjectStatus!) {
//   projectChangeStatus(name: $name, status: $status) {
//     name
//     status    
//   }
// }

// HU_009
// mutation ProjectChangePhase($name: String!) {
//   projectChangePhase(name: $name) {
//     name
//     endDate
//     status
//     phase
//   }
// }



const Projects = () => {
  const { data } = useQuery(PROJECTS);
  const [ activar ] = useMutation(APPROVEPROYECT, {refetchQueries: [PROJECTS] }); 

  return <>
    <Container className="mt-2 mb2 border">
      <Row>
        <Col><h2 className="text-center">PROYECTOS</h2></Col>
      </Row>
    </Container>
    <Container className="mb-2">
      <Row>
          <Col><b>Nombre</b></Col>
          <Col><b>Fecha Inicio</b></Col>
          <Col><b>Fecha Finalización</b></Col>
          <Col><b>Estado</b></Col>
          <Col></Col>
          <Col><b>Fase</b></Col>
          <Col></Col>
      </Row>
      </Container>
  {!data ? <></> : data?.allProjects?.map(project => (
    <>
      <Container>
        <Row>
            <Col>{project.name}</Col>
            <Col>{project.startDate}</Col>
            <Col>{project.endDate}</Col>
            <Col>{project.status}</Col>
            <Col>
            {(project.status === 'ACTIVE' ? <Button variant="primary" size="sm">Inactivar</Button>  : 
            project.status === 'INACTIVE' ? <button onClick={() => activar({status: "ACTIVE"})} className="btn btn-primary">Activar</button> : 
            <></>)}
            </Col>
            <Col>{project.phase}</Col>
            <Col>
            {(project.phase === 'STARTED' ? <Button variant="primary" size="sm">Finalizar</Button>  : 
            project.pahse === 'ENDED' ? <Button variant="primary" size="sm">Iniciar</Button> :
            <></>)}
            </Col>
        </Row>
      </Container>
    </>
  ))} </>
};

export default Projects;