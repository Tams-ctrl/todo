import React,{useState,useEffect} from 'react'
import './home.css'

function Home() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
  
    // Load tasks from local storage on mount
    useEffect(() => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(savedTasks);
    }, []);
  
    // Save tasks to local storage
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
    const handleAdd = () => {
      if (task.trim()) {
        setTasks([...tasks, { id: Date.now(), text: task }]);
        setTask('');
      }
    };
  
    const handleDelete = (id) => {
      setTasks(tasks.filter((t) => t.id !== id));
    };
  
    const handleEdit = (id, text) => {
      setEditingId(id);
      setEditText(text);
    };
  
    const handleSave = () => {
      setTasks(tasks.map((t) => (t.id === editingId ? { ...t, text: editText } : t)));
      setEditingId(null);
      setEditText('');
    };
  return (
    <>
    <div className='container d-flex justify-content-around '>
    <div className="todo-app d-flex justify-content-center align-items-center flex-column mt-5">
      <h1>Todo App</h1>
      <input type="text" placeholder="Add a task..." value={task} onChange={(e) => setTask(e.target.value)}/>
      <button className='m-5 btn btn-success' onClick={handleAdd}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {editingId === t.id ? (
              <>
                <input className='form-control' type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                
                <div className='container d-flex '>
                <span>{t.text}</span>
                    <button className='btn ' onClick={() => handleEdit(t.id, t.text)}><i className="fa-solid fa-pen-to-square" style={{color: "#0baaef",}} /></button>
                    <button className='btn' onClick={() => handleDelete(t.id)}><i className="fa-solid fa-trash" style={{color: "#d20f0f",}} /></button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    <div className='m-5 '>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-illustration-download-in-svg-png-gif-file-formats--checklist-checkmark-survey-pack-people-illustrations-5059486.png?f=webp" alt="" />
    </div>
    </div>
    </>
  )
}

export default Home

