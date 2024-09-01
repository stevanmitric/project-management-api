import { Client } from './model/client.model.mjs';

export async function getAll(req, res) {
  try {
    const clients = await Client.find().lean();

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (id === '' || id.length !== 24) {
      return res.status(422).json({ message: 'Invalid id format.' });
    }

    const client = await Client.findOne({ _id: id });

    if (!client) {
      return res
        .status(404)
        .json({ message: 'Client with provided id does not exist.' });
    }

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function post(req, res) {
  try {
    const data = req.body;

    console.log('DAta', data);

    const client = new Client({
      ...data,
    });

    await client.save();

    return res.status(201).json({ message: 'Client created successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (id === '' || id.length !== 24) {
      return res.status(422).json({ message: 'Invalid id format.' });
    }

    const client = await Client.findOne({ _id: id });

    if (!client) {
      return res
        .status(404)
        .json({ message: 'Client with provided id does not exist.' });
    }

    await Client.updateOne({ _id: id }, { ...data });

    return res
      .status(200)
      .json({ message: 'Client updated successfully.', client: client });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;

    if (id === '' || id.length !== 24) {
      return res.status(422).json({ message: 'Invalid id format.' });
    }

    const client = await Client.findOne({ _id: id });

    if (!client) {
      return res
        .status(404)
        .json({ message: 'Client with provided id does not exist.' });
    }

    await Client.deleteOne({ _id: id });

    return res.status(200).json({ message: 'Client deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
