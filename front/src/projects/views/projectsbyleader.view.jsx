import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Formik } from "formik";
import * as Yup from 'yup';
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// styles
import 'projects/styles/projects.styles.scss';

const PROJECTS_BY_LEADER = gql`
    query UserByLeader($email: String!) {
        FindByleader(email: $email) {
            _id
            name
            generalObjective
            specificObjectives
            budget
        }
    }
`;

const PROJECT_BY_ID = gql`
    query Query($id: ID!){
        project(_id: $id){
            name
            generalObjective
            specificObjectives
            budget
        }
    }
`;

const EDIT_PROJECT = gql`
    mutation Mutation($input: UpdateInfo!, $id: ID!) {
        update_project(input: $input, _id: $id)
        {
            name
        }
    }
`;
const ENROLLMENTS_PROJECT = gql`
    query Query($id: ID) {
        project(_id: $id) {
            enrollments {
                student {
                    fullName
                    documentId
                }
            _id
            status
            }
        }
    }
`;
const EDIT_ENROLLMENT_PROJECT = gql`
    mutation Mutation($id: ID!, $status: EnrollmentStatus!){
        update_enrollment(_id: $id, status: $status){
            student {
                fullName
                documentId
            }
            _id
            status
        }
    }
`;
const ADVANCES_PROJECT = gql`
    query Query($id: ID!){
        project(_id: $id){
            name
            generalObjective
            specificObjectives
            budget
            startDate
            endDate
            status
            phase
            advances {
                _id
                description
                observations
                addDate
            }
        }
    }
`;
const EDIT_ADVANCES_PROJECT = gql`
    mutation Update_advance($id: ID!, $observations: String){
        update_advance(_id: $id, observations: $observations) {
            _id
            addDate
            description
            observations
        }
    }
`;


const EditProject = (props) => {
    const {data, loading: loadingData} = useQuery(PROJECT_BY_ID, {variables: { id:props.id_project } });
    const [error, setError] = useState(false);
    const validationSchema = Yup.object({});
    const [editProject] = useMutation(EDIT_PROJECT);
    const navigate = useNavigate();
    const initialValues = {
        name: data?.project?.name,
        generalObjective: data?.project?.generalObjective
    }
        
    return(
        <>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        <Box gridColumn="2 / span 2">
        <Collapse in={error}>
          <Alert severity="error" onClose={() => setError(false)} sx={{ mt: 2 }}>
            No estas logueado como lider.
          </Alert>
        </Collapse>
      </Box>
        <Box gridColumn="2 / span 2">
        <Formik
          enableReinitialize={true} 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            editProject({
              variables: {
                  input: {
                      ...values
                  },
                  id: props.id_project
              }
            })
            .then(response => {
                window.location.reload();
            })
            .catch(() => setError(true));
          }}
        >
          {({
            handleSubmit,
            getFieldProps,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre"
                margin="normal"
                variant="outlined"
                focused
                {...getFieldProps('name')}
              />
              <TextField
                fullWidth
                label="Objetivo general"
                margin="normal"
                variant="outlined"
                multiline
                focused
                {...getFieldProps('generalObjective')}
              />
              <Button type="submit" variant="contained" sx={{ mt: 1 }} >Actualizar</Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
        </>
    );
};

const AdvancesProject = (props) => {
    const {data} = useQuery(ADVANCES_PROJECT, {variables: { id:props.id_project } });
    let time;
    return(
        <>
            <section className="grid" style={{"--bs-columns": 4, "--bs-gap": '10px 0'}}>
            <span>{'Fecha'}</span>
            <span>{'Observacion'}</span>
            <span className="g-col-2">{'descripcion'}</span>
            {data?.project?.advances?.map(({ addDate, description, observations, _id }) => {
            return (
            <>
                <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(addDate)}</span>
                <span>{observations}</span>
                <span>{description}</span>
                <span><button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(_id, "edit_observation")}>Editar</button></span>
            </>
            )
            })}
            </section> 
        </>        
    )
}

const EditAdvanceProject = (props) => {
    const [error, setError] = useState(false);
    const validationSchema = Yup.object({});
    const [editProject] = useMutation(EDIT_ADVANCES_PROJECT);
    const navigate = useNavigate();
    const initialValues = {
        observations : ''
    }
    return (
        <>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        <Box gridColumn="2 / span 2">
        <Collapse in={error}>
          <Alert severity="error" onClose={() => setError(false)} sx={{ mt: 2 }}>
            No estas logueado como lider.
          </Alert>
        </Collapse>
      </Box>
        <Box gridColumn="2 / span 2">
        <Formik
          enableReinitialize={true} 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            editProject({
              variables: {
                  ...values,
                  id: props.id_project
              }
            })
            .then(response => {
               window.location.reload();
            })
            .catch(() => setError(true));
          }}
        >
          {({
            handleSubmit,
            getFieldProps,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Observaciones"
                margin="normal"
                variant="outlined"
                focused
                {...getFieldProps('observations')}
              />
              <Button type="submit" variant="contained" sx={{ mt: 1 }} >Actualizar</Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
        </>
    )
}

const EnrollmentsProject = (props) => {
    const {data} = useQuery(ENROLLMENTS_PROJECT, {variables: { id:props.id_project } });
    const [activar] = useMutation(EDIT_ENROLLMENT_PROJECT, {
        refetchQueries: [PROJECT_BY_ID]
    });
    return(
        <>
        <section className="grid" style={{"--bs-columns": 4, "--bs-gap": '10px 0'}}>
        <span>{'Nombre estudiante'}</span>
        <span>{'Documento estudiante'}</span>
        <span className="g-col-2">{'Status'}</span>
        {data?.project?.enrollments?.map(({ student, status, _id }) => {
        return (
        <>
          <span>{student?.fullName}</span>
          <span>{student?.documentId}</span>
          <span>{status === null ? <button id="button" onClick={() => activar({variables: {id: _id, status: "ACEPTED"}})} className="btn btn-primary">Activar</button> : status}</span>
        </>
        )})}
        </section>
        </>
    )
}


const ProjectsByleader = (props) => {
    const token = sessionStorage.getItem('token');
    const user = jwt.decode(token)?.user;
    const {data} = useQuery(PROJECTS_BY_LEADER, {variables: { email: user?.email } });
    return (
        <>
        {data?.FindByleader?.map(({ name, generalObjective, budget, specificObjectives, _id}) => {
          return (
            <>
                <div key={_id} className="card" style={{"marginTop": '10px'}}>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{generalObjective}</p>
                        <h6 className="card-subtitle mb-2 text-muted">Presupuesto:</h6>
                        <p className="card-text">{budget}</p>
                        <h6 className="card-subtitle mb-2 text-muted">Objectivos especificos:</h6>
                        <ul className="list-group list-group-flush">
                        {specificObjectives?.map((value, index)=>{
                            return(
                                <li className="list-group-item">{value}</li>
                            )
                        })}
                        </ul>
                        <button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(_id, "edit")}>Editar</button>
                        <button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(_id, "advances")}>Avances</button>
                        <button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(_id, "enrollments")}>Solicitudes</button>
                    </div>
                </div>
            </>
                        
         )
        })}
      </>
    )
};

class Leader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_project: null,
            module:null,
        }
    }
    handleClick(id, module)
    {
     this.setState(
         {
             module: module,
             id_project: id
         }
     )   
    }


    render()
    {
        if(this.state.module === "edit")
        {
            return <EditProject id_project={this.state.id_project} />
        }
        else if(this.state.module === "advances")
        {
            return <AdvancesProject 
                id_project={this.state.id_project} 
                onClick={(id, module) => this.handleClick(id, module)}
                />
        }
        else if(this.state.module === "enrollments")
        {
            return <EnrollmentsProject id_project={this.state.id_project} />
        }
        else if(this.state.module === "edit_observation")
        {
            return <EditAdvanceProject id_project={this.state.id_project} />
        }
        else
        {
            return <ProjectsByleader onClick={(id, module) => this.handleClick(id, module)}/>
        }
    }

}

export default Leader