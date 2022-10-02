import React, { useState, useEffect } from 'react';
import './index.css';
import { ReactComponent as RemoveIcon } from './IconCart/remove.svg';

// -------------------USE--------------------
function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  // -------------------LOCAL STORAGE----------
  useEffect(() => {
    const arr = localStorage.getItem('tasks') || [];
    setTasks(JSON.parse(arr));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  // -------------------INPUT------------------
  const handlerInput = (event) => {
    const textInput = event.target.value;
    setText(textInput);
  };
  // -------------------ADD---------------------
  const addTask = (event) => {
    event.preventDefault();
    const task = { id: +new Date(), text, completed: false };
    setTasks([...tasks, task]);
    setText('');
  };

  // -------------------DELETE-----------------
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  // -------------------CHECK INPUT------------
  const checkInput = (id) => {
    const checked = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(checked);
  };

  // -------------------BTN---------------------

  const btnAll = () => {
    setTasks(tasks);
  };

  const btnCompleted = (task) => {
    let completed = tasks.filter((task) => task.completed === true);
    setTasks(completed);
  };

  const btnNotCompleted = (task) => {
    let notCompleted = tasks.filter((task) => task.completed !== true);
    setTasks(notCompleted);
  };

  return (
    <div className='wrapper'>
      <form className='wrapper__form form' onSubmit={addTask}>
        <input className='form__input' onChange={handlerInput} value={text} />
        <button className='form__btn'>Add</button>
      </form>
      <ul className='wrapper__list list'>
        {tasks.map((task) => {
          return (
            <li className='list__item' key={task.id}>
              <label
                className={
                  task.completed
                    ? 'list__text list__textSecond list__text--active'
                    : 'list__text list__textFirst'
                }
              >
                {task.text}
                <input
                  className='list__input'
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => checkInput(task.id)}
                />
              </label>
              <RemoveIcon onClick={() => deleteTask(task.id)} />
            </li>
          );
        })}
      </ul>
      <div className='wrapper__buttons'>
        <button className='wrapper__btn' onClick={btnAll}>
          All
        </button>
        <button className='wrapper__btn' onClick={btnCompleted}>
          Completed
        </button>
        <button className='wrapper__btn' onClick={btnNotCompleted}>
          Not Completed
        </button>
      </div>
    </div>
  );
}

export default App;
