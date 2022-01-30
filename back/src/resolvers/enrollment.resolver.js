import { USER_STATUS, ROLES } from '../constants/user.constants.js';
// models
import Enrollments from '../models/enrollments.model.js';
import Projects from '../models/projects.model.js';
import Users from '../models/users.model.js';

const allEnrollments = async () => {
  const enrollments = await Enrollments.find();
  return enrollments;
}

const allEnrollmentsE = async (parent, args, { user, errorMessage }) => {
  if(!user){
    throw new Error(errorMessage);
  }
  if(user.role == ROLES.STUDENT){
    
    const enrollments = await Enrollments.find({user_id: user._id}).exec();
    return enrollments;
  }
  

}
const registerEnrrolment020 = async (parent, args, { user, errorMessage }) => {
  const idProject = await Projects.findOne({name: args.input.project }, '_id');
  const registroEnrollment = new Enrollments({
    project_id: idProject,
    user_id: user._id,
    enrollmentDate: new Date(), 
  });
  return registroEnrollment.save();
}; 

const project = async (parent) => {
  const project = await Projects.findById(parent.project_id);
  return project;
};

const student = async (parent) => {
  const student = await Users.findById(parent.user_id);
  return student;
};

const update_enrollment = async (parent, args, { user, errorMessage}) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  if(user.role !== ROLES.LEADER) {
    throw new Error('Access denied');
  }
  return Enrollments.findByIdAndUpdate(args._id,
    {status: args.status || undefined},
    {new: true}
  );
};

export default {
  enrollmentQueries: {
    allEnrollments,
    allEnrollmentsE,
  },
  enrollmentMutations:{
    registerEnrrolment020,
    update_enrollment
  },
  Enrollment: {
    project,
    student,
  }
}
