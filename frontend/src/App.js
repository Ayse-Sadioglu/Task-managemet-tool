import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // CSS dosyasını ayrıca ekle



const App = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    taskType: "",
    dueDate: "",
  });

  const [taskList, setTaskList] = useState([]);

  // Görevleri API'den çek
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks");
      setTaskList(res.data);
    } catch (err) {
      console.error("Görevler alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Form gönderildiğinde task ekle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/tasks", task);
      setTask({
        title: "",
        description: "",
        taskType: "",
        dueDate: "",
      });
      fetchTasks(); // listeyi güncelle
    } catch (err) {
      console.error("Görev eklenemedi:", err);
    }
  };

  return (
    <div className="container">
     
      <h1>Task Management Tool</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Başlık"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Açıklama"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tür (Örn: Bug, Feature)"
          value={task.taskType}
          onChange={(e) => setTask({ ...task, taskType: e.target.value })}
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <button type="submit">Görev Ekle</button>
      </form>

      <h2>Mevcut Görevler</h2>
      <ul className="task-list">
        {taskList.map((t) => (
          <li key={t.id}>
            <strong>{t.title}</strong> - {t.taskType}  
            <br />
            {t.description}  
            <br />
            <em>Son tarih: {t.dueDate}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
