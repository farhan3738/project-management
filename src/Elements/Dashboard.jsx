import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [history, setHistory] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, 'tasks'), {
          name: newTask,
          status: 'todo'
        });

        setTasks(prevTasks => ({
          ...prevTasks,
          todo: [...prevTasks.todo, { id: docRef.id, name: newTask }]
        }));

        setHistory(prevHistory => ({
          ...prevHistory,
          todo: [
            ...prevHistory.todo,
            { action: 'Added', task: newTask, timestamp: new Date().toLocaleString() }
          ]
        }));

        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const moveTask = async (task, from, to) => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        status: to
      });

      setTasks(prevTasks => ({
        ...prevTasks,
        [from]: prevTasks[from].filter(t => t.id !== task.id),
        [to]: [...prevTasks[to], { ...task, status: to }]
      }));

      setHistory(prevHistory => ({
        ...prevHistory,
        [from]: [
          ...prevHistory[from],
          { action: `Moved to ${to}`, task: task.name, timestamp: new Date().toLocaleString() }
        ],
        [to]: [
          ...prevHistory[to],
          { action: `Moved from ${from}`, task: task.name, timestamp: new Date().toLocaleString() }
        ]
      }));
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const deleteTask = async (task) => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await deleteDoc(taskRef);

      setTasks(prevTasks => ({
        ...prevTasks,
        [task.status]: prevTasks[task.status].filter(t => t.id !== task.id)
      }));

      setHistory(prevHistory => ({
        ...prevHistory,
        [task.status]: [
          ...prevHistory[task.status],
          { action: 'Deleted', task: task.name, timestamp: new Date().toLocaleString() }
        ]
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const saveEditedTask = async () => {
    if (editingTask) {
      try {
        const taskRef = doc(db, 'tasks', editingTask.id);
        await updateDoc(taskRef, {
          name: editingTask.name
        });

        setTasks(prevTasks => ({
          ...prevTasks,
          [editingTask.status]: prevTasks[editingTask.status].map(t =>
            t.id === editingTask.id ? editingTask : t
          )
        }));

        setHistory(prevHistory => ({
          ...prevHistory,
          [editingTask.status]: [
            ...prevHistory[editingTask.status],
            { action: 'Edited', task: editingTask.name, timestamp: new Date().toLocaleString() }
          ]
        }));

        setEditingTask(null);
      } catch (error) {
        console.error('Error saving edited task:', error);
      }
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksSnapshot = await getDocs(collection(db, 'tasks'));
        const tasksData = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const taskGroups = {
          todo: tasksData.filter(task => task.status === 'todo'),
          inProgress: tasksData.filter(task => task.status === 'inProgress'),
          completed: tasksData.filter(task => task.status === 'completed')
        };

        setTasks({
          todo: taskGroups.todo,
          inProgress: taskGroups.inProgress,
          completed: taskGroups.completed
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
    <div className="task-board">
      <h1>Task Board</h1>
      <div className="new-task">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-columns">
        {['todo', 'inProgress', 'completed'].map(status => (
          <div key={status} className="task-column">
            <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
            <ul>
              {tasks[status]?.map(task => (
                <li key={task.id}>
                  {editingTask && editingTask.id === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editingTask.name}
                        onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                      />
                      <button onClick={saveEditedTask}>Save</button>
                      <button onClick={() => setEditingTask(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {task.name}
                      {status !== 'completed' && (
                        <button onClick={() => moveTask(task, status, status === 'todo' ? 'inProgress' : 'completed')}>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                      )}
                      {status !== 'completed' && (
                        <button onClick={() => setEditingTask(task)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      )}
                      <button onClick={() => deleteTask(task)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div className="history-section">
            <p>{status.charAt(0).toUpperCase() + status.slice(1)} History</p>
            <ul>
             {(history[status] || []).map((entry, index) => (
            <li key={index}>
            {entry.timestamp}: {entry.action} "{entry.task}"
        </li>
      ))}
    </ul>
  </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Dashboard;
