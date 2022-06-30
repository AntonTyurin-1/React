import React, { useState } from 'react';
import './index.css';
import { ReactComponent as RemoveIcon } from './IconCart/remove.svg';

function App() {
  const [tasks, setTasks] = useState([]);

  const [text, setText] = useState('');

  const handlerInput = (event) => {
    const textInput = event.target.value;
    setText(textInput);
  };

  const addTask = (event) => {
    event.preventDefault();
    const task = { id: +new Date(), text, completed: false };
    setTasks([...tasks, task]);
    setText('');
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const checkInput = (id) => {
    const checked = tasks.map((task) => {
      if (id === task.id) {
        return (task.completed = !task.completed);
      }
      setTasks(checked);
      return null;
    });
  };

  const btnAll = () => {
    setTasks(tasks);
  };

  const btnCompleted = () => {
    const completed = tasks.filter((task) => task.completed === true);
    setTasks(completed);
  };

  const btnNotCompleted = () => {
    const completed = tasks.filter((task) => task.completed !== true);
    setTasks(completed);
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
              <input
                className='list__input'
                type='checkbox'
                checked={task.completed}
                onClick={() => checkInput(id)}
              />
              <p
                className={
                  task.completed
                    ? 'list__text list__text--active'
                    : 'list__text'
                }
              >
                {task.text}
              </p>
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
