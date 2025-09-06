import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Görev Yöneticisi</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yeni görev gir..."
      />
      <button onClick={addTask}>Ekle</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
