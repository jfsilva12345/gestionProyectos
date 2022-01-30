import { USER_STATUS, ROLES } from '../constants/user.constants.js';
import Advances from '../models/advances.model.js';
import Projects from '../models/projects.model.js';


const allAdvances = async () => {

    const advances = await Advances.find()
    return advances
};

const project = async (parent) => {
    const project = await Projects.findById(parent.project_id);
    return project;
};

const registrarAdvance = async (parent, args) =>{
    const idProject = await Projects.findOne({name: args.nameProject }, '_id');
    const registroAdvance = new Advances({
        project_id: idProject,
        addDate: new Date(),
        description: args.description,
        observations: "0",
      });
      return registroAdvance.save();
}
const update_advance = async (parent, args, {user, errorMessage}) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.LEADER) {
    throw new Error('Access denied');
  }
    return Advances.findByIdAndUpdate(args._id,
      {observations: args.observations || undefined},
    {new: true}
    );
  };

const update_advance_e = async (parent, args) => {

    return Advances.findByIdAndUpdate(args._id,
      {description: args.description || undefined},
    {new: true}
    );
  };
  
export default {
    advanceQueries: {
        allAdvances
    },
    advanceMutations: {
        registrarAdvance,
        update_advance,
        update_advance_e,
    },
    Advance: {
        project,
    }
}