import { Project } from './model/project.model.mjs';

export async function getAll(req, res) {
  try {
    const projects = await Project.find().lean();

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function post(req, res) {
  try {
    const { title, description, dueDate } = req.body;

    const newProject = new Project({
      title: title,
      description: description,
      dueDate: dueDate,
    });

    await newProject.save();

    return res.status(201).json({ message: 'New Project Added.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    const project = await Project.findOne({ _id: id });

    if (!project)
      return res.status(404).json({ message: 'Project does not exist.' });

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    const data = req.body;

    await Project.updateOne({ _id: id }, { ...data });

    return res.status(200).json({ message: 'Project updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function deleteById(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    await Project.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Project deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
