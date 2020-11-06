const express = require('express');
const app = express();

app.use(express.json());

const modeldata = require('./schema');
const { urlencoded } = require('express');

require('./configDB');

const port = process.env.PORT || 3000;
// const uri = 'mongodb://127.0.0.1:27017/students';

app.get('/students', (req, res) => {
  modeldata
    .find()
    .then((result) =>
      res.json({
        length: result.length,
        result: result.length == 0 ? 'no record found' : result,
      })
    )
    .catch((error) => res.json(error));
});

app.get('/students/:id', (req, res) => {
  const id = req.params.id;
  modeldata.findById(id, (error, result) => {
    if (error) res.json({ error: `no record found with _id => ${id}` });
    else
      res.json({
        result:
          result.length == 0 || result == null
            ? 'no record using id found'
            : result,
      });
  });
});

app.post('/students', (req, res) => {
  const { name, degree, sex } = req.body;

  const data = new modeldata({
    name,
    degree,
    sex,
  });

  data
    .save()
    .then((result) =>
      res.json({
        message:
          result.length != 0 || result != null
            ? 'data inserted successfully'
            : 'not to be inserted',
        inserted_data:
          result.length != 0 || result != null ? result : 'some error',
      })
    )
    .catch((err) => res.json(err));
});

app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const { name, degree, sex } = req.body;
  const updatadata = {
    name,
    degree,
    sex,
  };
  modeldata.findByIdAndUpdate(id, updatadata, (error, result) => {
    if (error) res.json(error);
    else res.json({ message: 'update sucessfull ' });
  });
});

app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  modeldata.findByIdAndRemove(id, (error, Remove_Data) => {
    if (error) res.statusCode(400).json(error);
    else if (Remove_Data != null) {
      res.json({ status: 'deleated sucessfull', Remove_Data });
    } else res.json({ status: 'not data found' });
  });
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
