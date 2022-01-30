// vendors
import React, {useState} from "react";
import { useMutation, useQuery, gql } from '@apollo/client';
import jwt from 'jsonwebtoken';

// styles
import 'projects/styles/projects.styles.scss';

const project = gql `
  query Allproject {
    allProjectsEstudiante019 {
      _id
      name
      leader{
        fullName
        email
      }
      generalObjective
      startDate
      budget
      status
      
     
    }
  }
`;

const registrarEnrrolment = gql `
  mutation RegisterEnrrolment020($input: enrrolmentInput!) {
  registerEnrrolment020(input: $input) 
        {
          enrollmentDate    
        }
    }
  
`;
const RegistroButon = (props) => {
  console.log(props.project_name);
  const [error, setError] = useState(false);
  const [editProject] = useMutation(registrarEnrrolment);
  
  
  editProject({
    variables: {
        input: {
            project: props.project_name
        },

    }
  })
  .then(response => {
     window.location.reload();
  })
  .catch(() => setError(true));

  return <></>;

       
  
}

const ProjectsView = (props) => {
  const token = sessionStorage.getItem('token');
  const user = jwt.decode(token)?.user;
  const {data} = useQuery(project);
  

  return (
    <>
  {!data ? <></> : data?.allProjectsEstudiante019?.map(project => {
    return (
      <>

    <div key={project._id} className="card" style={{"marginTop": '10px'}}>
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.generalObjective}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Lider del proyecto:</h6>
                    <p className="card-text">{project.leader.fullName}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Correo del Lider:</h6>
                    <p className="card-text">{project.leader.email}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Fecha inicio del proyecto:</h6>
                    <p className="card-text">{project.startDate}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Presupuesto:</h6>
                    <p className="card-text">{project.budget}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Estado del proyecto:</h6>
                    <p className="card-text">{project.status}</p>

                    <button className="btn btn-primary" style= {{"marginRight": "10px"}} onClick={() => props.onClick(project.name,"registro")}>Pedir Registro</button>
                </div>
            </div>
        </>
                    
        )
       })}
     </>
   )
   
   };
   class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project_name: null,
            module:null,
            initialValuesProject:{
                name: null
            }
        }
    }
    handleClick(id, module)
    {
     this.setState(
         {
             module: module,
             project_name: id
             
         }
     )   
    }


    render()
    {
        if(this.state.module === "registro")
        {
            return <RegistroButon project_name={this.state.project_name} />
        }
        else
        {
            return <ProjectsView onClick={(id, module) => this.handleClick(id, module)}/>
        }

    }

}


export default Projects;