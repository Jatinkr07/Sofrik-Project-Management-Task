import Project from "../models/Projects.js";

export const createProject = async (req, res) => {
  try {
    const project = new Project({ ...req.body, user: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Error creating project", error });
  }
};

export const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const projects = await Project.find({
      user: req.user.id,
      title: { $regex: search, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Project.countDocuments({ user: req.user.id });
    res.json({ projects, total });
  } catch (error) {
    res.status(400).json({ message: "Error fetching projects", error });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: "Error updating project", error });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting project", error });
  }
};
