import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Project from "../models/Projects.js";
import Task from "../models/Task.js";
import connectDB from "../config/db.js";

async function seedDB() {
  await connectDB();

  await User.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});

  const hashedPassword = await bcrypt.hash("Test@123", 10);
  const user = await User.create({
    email: "test@example.com",
    password: hashedPassword,
  });

  const projects = await Project.create([
    {
      title: "Project 1",
      description: "First project",
      status: "active",
      user: user._id,
    },
    {
      title: "Project 2",
      description: "Second project",
      status: "active",
      user: user._id,
    },
  ]);

  await Task.create([
    {
      title: "Task 1",
      description: "Task 1 for Project 1",
      status: "todo",
      dueDate: new Date("2025-08-20"),
      project: projects[0]._id,
    },
    {
      title: "Task 2",
      description: "Task 2 for Project 1",
      status: "in-progress",
      dueDate: new Date("2025-08-22"),
      project: projects[0]._id,
    },
    {
      title: "Task 3",
      description: "Task 3 for Project 1",
      status: "done",
      dueDate: new Date("2025-08-18"),
      project: projects[0]._id,
    },
    {
      title: "Task 1",
      description: "Task 1 for Project 2",
      status: "todo",
      dueDate: new Date("2025-08-25"),
      project: projects[1]._id,
    },
    {
      title: "Task 2",
      description: "Task 2 for Project 2",
      status: "in-progress",
      dueDate: new Date("2025-08-27"),
      project: projects[1]._id,
    },
    {
      title: "Task 3",
      description: "Task 3 for Project 2",
      status: "done",
      dueDate: new Date("2025-08-23"),
      project: projects[1]._id,
    },
  ]);

  console.log("Database seeded");
  mongoose.connection.close();
}

seedDB().catch(console.error);
