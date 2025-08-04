import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let projects = [];

// API Routes

// GET all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// GET single project
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(project);
});

// POST create new project
app.post('/api/projects', (req, res) => {
  const { title, description, dueDate } = req.body;
  
  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: 'Title, description, and due date are required' });
  }

  const newProject = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    tasks: [],
    createdAt: new Date().toISOString()
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

// PUT update project
app.put('/api/projects/:id', (req, res) => {
  const { title, description, dueDate } = req.body;
  const projectIndex = projects.findIndex(p => p.id === req.params.id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects[projectIndex] = {
    ...projects[projectIndex],
    title: title || projects[projectIndex].title,
    description: description || projects[projectIndex].description,
    dueDate: dueDate || projects[projectIndex].dueDate,
    updatedAt: new Date().toISOString()
  };

  res.json(projects[projectIndex]);
});

// DELETE project
app.delete('/api/projects/:id', (req, res) => {
  const projectIndex = projects.findIndex(p => p.id === req.params.id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects.splice(projectIndex, 1);
  res.status(204).send();
});

// POST add task to project
app.post('/api/projects/:id/tasks', (req, res) => {
  const { text } = req.body;
  const project = projects.find(p => p.id === req.params.id);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }

  const newTask = {
    id: uuidv4(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  project.tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/projects/:projectId/tasks/:taskId', (req, res) => {
  const { text, completed } = req.body;
  const project = projects.find(p => p.id === req.params.projectId);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const task = project.tasks.find(t => t.id === req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.text = text !== undefined ? text : task.text;
  task.completed = completed !== undefined ? completed : task.completed;
  task.updatedAt = new Date().toISOString();

  res.json(task);
});

// DELETE task
app.delete('/api/projects/:projectId/tasks/:taskId', (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const taskIndex = project.tasks.findIndex(t => t.id === req.params.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  project.tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 