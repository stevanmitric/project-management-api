import { Task, TaskList } from './model/task.model.mjs';
export async function getAll(req, res) {
  const filters =
    req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
  const sorter =
    req.query && req.query.sorter
      ? JSON.parse(req.query.sorter)
      : { createdAt: 1 };
  const skip = req.query && req.query.offset ? Number(req.query.offset) : 0;
  const select =
    req.query && req.query.select ? JSON.parse(req.query.select) : {};

  try {
    const tasks = await Task.find(filters)
      .populate({
        path: 'reporter',
        model: 'User',
      })
      .lean();

    console.log('tasks', tasks);

    return res.status(200).json(tasks);
  } catch (error) {
    console.log('error', error);

    return res.status(500).json({ message: error });
  }
}

export async function post(req, res) {
  try {
    const { task, listId } = req.body;

    const dueDate = new Date(task.dueDate);

    const newTask = new Task({
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.projectId,
      listId: listId,
      reporter: task.reporter,
      dueDate: dueDate,
    });

    await newTask.save();

    return res.status(201).json(newTask);
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

    const task = await Task.findOne({ _id: id });

    if (!task) return res.status(404).json({ message: 'Task does not exist.' });

    return res.status(200).json(task);
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

    const { task } = req.body;

    // const dueDate = task.dueDate ? new Date(task.dueDate) : null;

    const newList = await TaskList.findOne({ title: task.status });

    await Task.updateOne(
      { _id: id },
      {
        title: task.title,
        description: task.description,
        status: task.status,
        projectId: task.projectId,
        listId: newList._id,
        reporter: task.reporter,
        // dueDate: dueDate,
      }
    );

    return res.status(200).json({ message: 'Task updated successfully.' });
  } catch (error) {
    console.log('error task update', error);

    return res.status(500).json({ message: error });
  }
}

export async function deleteById(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    await Task.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getTaskLists(req, res) {
  const filters =
    req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
  try {
    const lists = await TaskList.find(filters).lean();

    return res.status(200).json(lists);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function createTaskList(req, res) {
  try {
    const { title, projectId } = req.body;

    const newTaskList = new TaskList({
      title: title,
      projectId: projectId,
    });

    await newTaskList.save();

    return res.status(201).json(newTaskList);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function deleteListById(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    await TaskList.deleteOne({ _id: id });

    return res.status(200).json({ message: 'List deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
