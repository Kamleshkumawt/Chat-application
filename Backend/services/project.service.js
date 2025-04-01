import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, image, userId }) => {
  if (!name || !image || !userId) {
    throw new Error("All fields are required");
  }

  try {
    const project = await projectModel.create({
      name,
      image,
      users: [userId],
    });
    return project;
  } catch (err) {
    throw new Error("Failed to create project");
  }
};

export const getAllProjects = async ({ userId }) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const projects = await projectModel.find({ users: userId });
    return projects;
  } catch (err) {
    throw new Error("Failed to get projects");
  }
};

export const addUserToProject = async ({ projectId, users, userId }) => {
  if (!projectId || !users) {
    throw new Error("All fields are required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userID");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  if (
    !Array.isArray(users) ||
    users.some((user) => !mongoose.Types.ObjectId.isValid(user))
  ) {
    throw new Error("Invalid user IDs");
  }

  try {
    const project = await projectModel.findOne({
      _id: projectId,
      users: userId,
    });

    console.log("project:", project);

    if (!project) {
      throw new Error("User is not a member of the project");
    }

    const updatedProject = await projectModel.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        $addToSet: {
          users: {
            $each: users,
          },
        },
      },
      {
        new: true,
      }
    );

    console.log("updated Project:", updatedProject);

    return updatedProject;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add user to project");
  }
};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  try {
    const project = await projectModel
      .findById({
        _id: projectId,
      })
      .populate("users", "-password");

    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get project");
  }
};

export const deleteUserToProject = async ({ projectId, users, userId }) => {
  if (!projectId || !users) {
    throw new Error("All fields are required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userID");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  if (
    !Array.isArray(users) ||
    users.some((user) => !mongoose.Types.ObjectId.isValid(user))
  ) {
    throw new Error("Invalid user IDs");
  }

  try {
    const project = await projectModel.findOne({
      _id: projectId,
      users: userId,
    });

    console.log("project:", project);

    if (!project) {
      throw new Error("User is not a member of the project");
    }

    // Convert user IDs to ObjectId
    //  const userIds = users.map(id => mongoose.Types.ObjectId(id));
    const { ObjectId } = mongoose.Types;

    const userIds = users.map((id) => new ObjectId(id));

    const updatedProject = await projectModel.findOneAndUpdate(
      { _id: projectId },
      {
        $pull: {
          users: { $in: userIds },
        },
      },
      { new: true }
    );

    console.log("updated Project:", updatedProject);

    return updatedProject;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete user to project");
  }
};

export const exitProject = async ({ projectId, userId }) => {
  if (!projectId || !userId) {
    throw new Error("All fields are required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userID");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  try {
    const project = await projectModel.findOne({
      _id: projectId,
      users: userId,
    });
    if (!project) {
      throw new Error("User is not a member of the project");
    }

    const newProject = await projectModel.updateOne(
      { _id: projectId },
      { $pull: { users: userId } }
    );

    return newProject;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to exit project");
  }
};

// export const deleteProject = async ({projectId, userId}) => {
//     if(!projectId || !userId) {
//         throw new Error('All fields are required');
//     }
//     if(!mongoose.Types.ObjectId.isValid(userId)) {
//         throw new Error('Invalid userID');
//     }
//     if(!mongoose.Types.ObjectId.isValid(projectId)) {
//         throw new Error('Invalid project ID');
//     }

//     try {
//         const project = await projectModel.findOne({
//             _id: projectId,
//             users: userId
//         });
//         if(!project) {
//             throw new Error('User is not a member of the project');
//         }
//         await projectModel.deleteOne({ _id: projectId });
//         return project;
//     }
//     catch (err) {
//         console.error(err);
//         throw new Error('Failed to delete project');
//     }
// }
