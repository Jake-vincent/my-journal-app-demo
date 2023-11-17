import Journal from '../models/journal_model.js';

const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find()
      .populate({ path: 'user', select: ['-password','-__v','-username','-email']})
      .select(['-__v'])
      .exec();

    res.status(200).send({
      message: 'Journal Entries',
      data: journals,
    });
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
};
const getUserJournals = async (req, res) => {
  try {
    const { user } = req.body;
    const journals = await Journal.find({ user })
      .populate({ path: 'user', select: ['-password','-__v','-username','-email']})
      .select(['-__v'])
      .exec();

    res.status(200).send({
      message: 'User Journal Entries',
      data: journals,
    });
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
};

const createJournal = async ( req, res) => {
  try {
    const { user, subject, body } = req.body;
    
    const newJournal = new Journal({
      user,
      subject,
      body,
    });

    await newJournal.save();

    res.status(201).send({
      message: 'New journal entry created',
      data: newJournal,
    });
  } catch (error) {
      console.error(error);
      res.send(error.message);
  }
};

const updateJournal = async ( req, res) => {
  try {
    const { id } = req.params;
    const { user, subject, body } = req.body;

    let journal = await Journal.updateOne({ _id: id }, {
      $set: {
        user: user,
        subject: subject,
        body: body
      }
    })

    res.status(201).send({
      message: 'Journal entry updated',
      data: journal,
    });

  } catch (error) {
      console.error(error);
      res.send(error.message);
  }
};

const deleteJournal = async ( req, res) => {
  try {
    const { id } = req.params;

    let journal = await Journal.deleteOne({ _id: id });

    res.status(200).send({
      message: 'Journal entry deleted',
      data: journal,
    });

  } catch (error) {
      console.error(error);
      res.send(error.message);
  }
};

export { 
  getAllJournals, 
  getUserJournals, 
  createJournal,
  updateJournal,
  deleteJournal
};