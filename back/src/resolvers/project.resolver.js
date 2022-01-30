// vendors
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// constants
import { USER_STATUS, ROLES } from '../constants/user.constants.js';
import { PHASE } from '../constants/project.constants.js';

// models
import Projects from "../models/projects.model.js";
import Users from "../models/users.model.js";
import Enrollements from "../models/enrollments.model.js";
import Advances from "../models/advances.model.js";

// HU_006 Administrador --> ver la lista de proyectos
const allProjects = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role != ROLES.ADMIN) {
    throw new Error('Access denied');
  }  
  const projects = await Projects.find();
  return projects;
};

// HU_007
const approveProject = async (parent, args, { user, errorMessage }) => {
  
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.ADMIN) {
    throw new Error('Access denied');
  }
  return await Projects.findOneAndUpdate({"name": args.name}, {"status": "ACTIVE", "phase": "STARTED", "startDate": Date.now()}, {new: true} )
};

// HU_008
const projectChangeStatus = async (parent, args, { user, errorMessage }) => {
  
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.ADMIN) {
    throw new Error('Access denied');
  }
  return await Projects.findOneAndUpdate({"name": args.name}, {"status": args.status }, {new: true} )
};

// HU_009
const projectChangePhase = async (parent, args, { user, errorMessage }) => {
  
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.ADMIN) {
    throw new Error('Access denied');
  }
  return await Projects.findOneAndUpdate({"name": args.name}, {"phase": "ENDED", "status": "INACTIVE", "endDate": Date.now()}, {new: true} )
};

const allProjectsEstudiante019 = async (parent, args, { user, errorMessage }) => {
  if(!user){
    throw new Error(errorMessage);
  }
  if(user.role == ROLES.STUDENT){
    const projects = await Projects.find();
    return projects;
  }
};
const project = async (parent, args) => {
  const user = await Projects.findById(args._id);
  return user;
};

const advances = async (parent) => {
  const listAdvances = await Advances.find({ project_id: parent._id.toString() });
  return listAdvances;
}

const leader = async (parent) => {
  const user = await Users.findById(parent.leader_id);
  return user;
};

// HU_012 (LIDER) Crear un nuevo proyecto
const registerNewProject = async (parent, args) => { 
  const Projec = new Projects({
    ...args.input,
    name: args.input.name,
    generalObjective: args.input.generalObjective,
    specificObjectives:  args.input.specificObjectives ,
    budget: args.input.budget ,
    startDate: args.input.startDate ,
    endDate: args.input.endDate ,
    leader_id: args.input.leader_id ,
    status: args.input.status,
    });
  return Projec.save();
};
//
// HU_013 (LIDER) Listar los proyectos que tengo a cargo
const FindByleader = async (parent, args) => {
  const UserEmail = await Users.findOne({ email: args.email });
  const User = UserEmail;
  const leader =  Projects.find({leader_id : User._id.toString()});
  console.log(leader)
  return leader
};

const update_project = async (parent, args, {user, errorMessage}) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.LEADER) {
    throw new Error('Access denied');
  }
  return Projects.findByIdAndUpdate(args._id,
    {name: args.input.name || undefined,
    generalObjective: args.input.generalObjective || undefined,
    "$push": {"specificObjectives": args.input.specificObjectives || undefined},
    budget: args.input.budget || undefined
    },
    {new: true}
  );
};
const enrollments = async (parent) => {
  const enrollments = await Enrollements.find({ project_id: parent._id.toString() });
  return enrollments;
}

export default {
  projectQueries: {
    allProjects,
    allProjectsEstudiante019,
    project,
    FindByleader,
  },
  projectMutations: {
    update_project,
    registerNewProject,
    projectChangeStatus,
    projectChangePhase,
    approveProject
  },

  Project: {
    leader,
    enrollments,
    advances
  }
}
