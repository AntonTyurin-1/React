import React, { useState, useEffect } from 'react';
import './index2.css';
import { ReactComponent as RemoveIcon } from './IconCart/delete_FILL0_wght100_GRAD0_opsz24.svg';

// -------------------USE--------------------
function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [text, setText] = useState('');
  const [filter, setFilter] = useState(tasks);

  useEffect(() => {
    setFilter(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handlerInput = (e) => {
    const textInput = e.target.value;
    setText(textInput);
  };

  const addTask = (e) => {
    e.preventDefault();
    const task = { id: +new Date(), text: text, completed: false };
    setTasks([...tasks, task]);
    setText('');
  };

  const removeTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const checkInput = (id) => {
    const checked = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(checked);
  };

  const newFiltered = (completed) => {
    if (completed === 'all') {
      setFilter(tasks);
    } else {
      const newTasks = [...tasks].filter(
        (task) => task.completed === completed
      );
      setFilter(newTasks);
    }
  };

  return (
    <div className='wrapper'>
      <form className='wrapper__form form' onSubmit={addTask}>
        <input
          className='form__input'
          type='text'
          onChange={handlerInput}
          value={text}
        />

        <button className='form__button'>Add</button>
      </form>

      <ul className='wrapper__list list'>
        {filter.map((task) => {
          return (
            <li className='list__item item' key={task.id}>
              <label
                className={
                  task.completed
                    ? 'item__label item-completed list__text--active '
                    : 'item__label item-notCompleted'
                }
              >
                <input
                  className='item__input'
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => checkInput(task.id)}
                />
                {task.text}
              </label>
              <RemoveIcon
                className='item__icon'
                onClick={() => removeTask(task.id)}
              />
            </li>
          );
        })}
      </ul>
      <div className='wrapper__buttons'>
        <button className='button' onClick={() => newFiltered('all')}>
          All
        </button>
        <button className='button' onClick={() => newFiltered(true)}>
          Completed
        </button>
        <button className='button' onClick={() => newFiltered(false)}>
          NotCompleted
        </button>
      </div>
    </div>
  );
}

export default App;
