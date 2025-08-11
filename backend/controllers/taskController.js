import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, project: req.params.projectId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
};

export const getTasks = async (req, res) => {
  try {
    const status = req.query.status || "";
    const query = { project: req.params.projectId };
    if (status) query.status = status;
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, project: req.params.projectId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      project: req.params.projectId,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error });
  }
};
