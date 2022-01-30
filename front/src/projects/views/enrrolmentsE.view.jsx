// vedors
import React, {useState }  from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import TextField from '@mui/material/TextField';
import { Formik } from "formik";
import * as Yup from 'yup';
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// styles
import 'projects/styles/projects.styles.scss';

const project = gql `
query AllEnrollmentsE {
    allEnrollmentsE {
        _id
        project {
          _id
          name
          generalObjective
          leader {
            fullName
          }
        }
        enrollmentDate
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
    mutation Update_advance_e($id: ID!, $description: String!){
        update_advance_e(_id: $id, description: $description) {
            _id
            addDate
            description
            observations
        }
    }
`;
const RegisterA=gql`
  mutation RegistrarAdvance($nameProject: String!, $description: String!) {
  registrarAdvance(nameProject: $nameProject, description: $description) {
    addDate
  }
}
`;
const RegisterAdvanceProject = (props) => {
  const [error, setError] = useState(false);
  const validationSchema = Yup.object({});
  const [registerA] = useMutation(RegisterA);
  const navigate = useNavigate();
  console.log(props.project_name);
  const initialValues = {
    nameProject: props.project_name,
    description: ""
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
          registerA({
            variables: {
                
                ...values
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
              label="Descripcion"
              margin="normal"
              variant="outlined"
              focused
              {...getFieldProps('description')}
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
const EditAdvanceProject = (props) => {
  const [error, setError] = useState(false);
  const validationSchema = Yup.object({});
  const [editProject] = useMutation(EDIT_ADVANCES_PROJECT);
  const navigate = useNavigate();
  const initialValues = {
    description : ''
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
              label="Descripcion"
              margin="normal"
              variant="outlined"
              focused
              {...getFieldProps('description')}
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
const AdvancesProject = (props) => {
  const {data} = useQuery(ADVANCES_PROJECT, {variables: { id:props.id_project } });
  let time;
  return(
      <>
          <section className="grid" style={{"--bs-columns": 4, "--bs-gap": '10px 0'}}>
          <span>{'Fecha'}</span>
          <span className="g-col-2">{'descripcion'}</span>
          <span>{'Observacion'}</span>

          {data?.project?.advances?.map(({ addDate, description, observations, _id }) => {
          return (
          <>
              <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(addDate)}</span>
              <span>{description}</span>
              <span>{observations}</span>
              <span><button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(_id, "edit_descripcion")}>Editar</button></span>
          </>

          )
          })}
          </section> {console.log(props.project_name)}
          <button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(props.id_project, "create_avance",props.project_name)}>Crear</button>
      </>        
  )
}

const EnrrolmentE = (props) => {
  const {data} = useQuery(project);

  return (
    <>
    {!data ? <></> : data?.allEnrollmentsE?.map(enrrolmentE => {
      return (
        <>
            <div key={enrrolmentE._id} className="card" style={{"marginTop": '10px'}}>
                <div className="card-body">
                    <h5 className="card-title">{enrrolmentE.project.name}</h5>
                    <p className="card-text">{enrrolmentE.project.generalObjective}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Lider del proyecto:</h6>
                    <p className="card-text">{enrrolmentE.project.leader.fullName}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Fecha peticion del registro:</h6>
                    <p className="card-text">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(enrrolmentE.enrrolmentDate)}</p>
                    <h5 className="card-subtitle mb-2 text-muted">Estado:</h5>
                    <p className="card-text">{enrrolmentE.status===null ? "PENDIENTE":enrrolmentE.status}</p>
                    {enrrolmentE.status===null || enrrolmentE.status==="RECHAZADO" ? 
                    <button className="btn btn-danger" disabled="disabled" style= {{"marginRight": "10px"}} >PENDIENTE</button>
                    :
                    <button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(enrrolmentE.project._id, "advances", enrrolmentE.project.name)}>Avances</button>}

                </div>
            </div>
        </>
                    
     )
    })}
  </>
)

};
class ProjectsE extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          id_project: null,
          module:null,
          project_name:null,
      }
  }
  handleClick(id, module,name)
  {
   this.setState(
       {
           module: module,
           id_project: id,
           project_name: name,
       }
   )   
  }


  render()
  {
      if(this.state.module === "advances")
      {
        return <AdvancesProject 
        project_name={this.state.project_name} 
        
        id_project={this.state.id_project} 
        onClick={(id, module,name) => this.handleClick(id, module,name)}
        />
      }else if(this.state.module === "edit_descripcion")
      {
          return <EditAdvanceProject id_project={this.state.id_project}  />
      }
      else if(this.state.module === "create_avance")
      {
          return <RegisterAdvanceProject id_project={this.state.id_project} project_name={this.state.project_name}  />
      }else
      {
          return <EnrrolmentE onClick={(id, module, name) => this.handleClick(id, module, name)}/>
      }
  }

}

export default ProjectsE;