import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [editInput, setEditInput] = useState('');
  const [date, setDate] = useState('');

  const addTodoHandler = () => {
    if (date && new Date(date) < new Date()) {
      alert("Due date cannot be in the past.");
      return;
    }

    setList([...list, {
      item: text,
      isEditing: false,
      isChecked: false,
      dueDate: date,
    }]);
    setText('');
    setDate('');
  };

  const editHandler = (index) => {
    const items = [...list];
    items[index].isEditing = true;
    setEditInput(items[index].item);
    setList(items);
  };

  const cancelHandler = (index) => {
    const items = [...list];
    items[index].isEditing = false;
    setList(items);
  };

  const deleteHandler = (index) => {
    const items = [...list];
    items.splice(index, 1);
    setList(items);
  };

  const saveHandler = (index) => {
    const items = [...list];
    items[index].item = editInput;
    items[index].isEditing = false;
    setList(items);
  };

  const checkboxHandler = (index) => {
    const items = [...list];
    items[index].isChecked = !items[index].isChecked;
    setList(items);
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const listItem = list.map((e, index) => (
    <div
      key={index}
      className={`${e.isChecked ? "box_style" : "item_style"} ${currentDate > e.dueDate ? "date_style" : ""} p-4 mb-4 bg-gray-800 rounded-lg shadow-md`}
    >
      {!e.isEditing ? (
        <>
          <span className="text-white">{e.item}</span>
          <span className="text-gray-400 mx-2">({e.dueDate})</span>
          <Button
            onClick={() => editHandler(index)}
            className="btn-sm my-2 mx-3"
            variant="primary"
          >
            Edit
          </Button>
          <input
            checked={e.isChecked}
            type="checkbox"
            onChange={() => checkboxHandler(index)}
            className="mx-2"
          />
          <Button
            onClick={() => deleteHandler(index)}
            className="btn-sm mx-3"
            variant="danger"
          >
            Delete
          </Button>
          {currentDate > e.dueDate && (
            <>
              <p className="text-red-500">Due date has passed</p>
            </>
          )}
        </>
      ) : (
        <>
          <input
            type='text'
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className="text-black"
          />
          <Button
            onClick={() => saveHandler(index)}
            className="btn-sm mx-3 my-2"
            variant="success"
          >
            Save
          </Button>
          <Button
            onClick={() => cancelHandler(index)}
            className="btn-sm mx-2 my-2"
            variant="warning"
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  ));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl text-white mb-6 text-center">Todo List</h2>
        <div className="mb-4">
          <input
            type='text'
            placeholder="Enter todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white w-full mb-2"
          />
          <input
            type='date'
            className="p-2 rounded bg-gray-700 text-white w-full mb-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button
            onClick={addTodoHandler}
            className="btn-sm mx-2"
            variant="outline-primary"
          >
            Add Todo
          </Button>
        </div>
        <div className="my-3">
          {listItem}
        </div>
      </div>
    </div>
  );
}

export default App;
