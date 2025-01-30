const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

///////////////////////////
// Data initialization
///////////////////////////

const tags = require('./data/tags.json');
const columns = require('./data/columns.json');

var taskIdCounter = getInitTaskId();

function getInitTaskId() {
  let max = 0;
  for(let column of columns) {
    for (let task of column.tasks) {
      let id = Number(task.id.slice(1));
      if ( id > max) {max = id};
    }
  }
  return max+1;
}

function findTask(wantedId) {
  let foundTask;
  for(let column of columns) {
    for (let task of column.tasks) {
      if (wantedId == task.id) {foundTask = task};
    }
  }
  return foundTask;
}

function findAndDeleteTask(wantedId) {
  let deleted;
  for(let column of columns) {
    column.tasks.forEach((element, index) => {
      if (element.id == wantedId) {
        deleted = element;
        column.tasks.splice(index, 1);
      };
    });
  }
  return deleted;
}

///////////////////////////
// Server setup
///////////////////////////

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.options('/', (req, res) => {
  console.log("OPTIONS request");
  res.writeHead(204, {'Allow': 'OPTIONS, GET, POST, PUT, DELETE'});
  res.end();
})

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

///////////////////////////
// CRUD operations
///////////////////////////

app.get('/api/counter', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({"taskIdCounter" : taskIdCounter}));
  res.end();
});

app.get('/api/tags', (req, res) => {
  console.log("GET request");
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(tags));
  res.end();
});

app.get('/api/columns', (req, res) => {
  console.log("GET request");
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(columns));
  res.end();
});

app.post('/api/tasks', jsonParser, (req, res) => {
  console.log("POST request");
  newID = taskIdCounter;
  taskIdCounter++;
  columns[req.body.column].tasks.push({
    id: 't' + newID,
    title: req.body.title,
    text: req.body.text,
    tags: req.body.taskTags,
  });
  res.writeHead(201, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({"id": 't' + newID}));
  res.end();
});

app.put('/api/tasks/:id', jsonParser, (req, res) => {
  console.log("PUT request for editing");
  let foundTask = findTask(req.params.id);
  if (foundTask) {
    foundTask.title = req.body.title;
    foundTask.text = req.body.text;
    foundTask.tags = req.body.taskTags;
    res.writeHead(200, "Task aktualisiert");
    res.end();
  }
  else {
    res.writeHead(404, "Task nicht gefunden");
    res.end();
  }
});

app.delete('/api/tasks/:id', jsonParser, (req, res) => {
  console.log("DELETE request");
  let deleted = findAndDeleteTask(req.params.id);
  if (deleted) {
    res.writeHead(200, "Task geloescht");
    res.end();
  }
  else {
    res.writeHead(404, "Task nicht gefunden");
    res.end();
  }
});

app.put('/api/move-task/:id', jsonParser, (req, res) => {
  console.log("PUT request for moving");
  let movableTask = findAndDeleteTask(req.params.id);
  if(movableTask && columns[req.body.newColumnId]) {
    columns[req.body.newColumnId].tasks.push(movableTask);
    res.writeHead(200, "Task verschoben");
    res.end();
    console.log(columns[req.body.newColumnId]);
    }
  else {
    res.writeHead(404, "Task oder Zielspalte nicht gefunden");
    res.end();
  }
});

///////////////////////////
// Start the server
///////////////////////////

app.listen(port, () => console.log(`Express server listening on port ${port}...`));
///////////////////////////