// src/components/TaskForm.js
import React, { useState } from "react";
import axios from "axios";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    taskType: "",
    dueDate: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/tasks", task);
      alert("Task başarıyla eklendi!");
      setTask({
        title: "",
        description: "",
        taskType: "",
        dueDate: "",
        completed: false,
      });
    } catch (error) {
      console.error("Task eklenirken hata oluştu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Yeni Görev Ekle</h2>

      <label>Başlık:</label>
      <input type="text" name="title" value={task.title} onChange={handleChange} required />

      <label>Açıklama:</label>
      <textarea name="description" value={task.description} onChange={handleChange} />

      <label>Görev Türü:</label>
      <input type="text" name="taskType" value={task.taskType} onChange={handleChange} />

      <label>Son Tarih:</label>
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />

      <label>
        <input type="checkbox" name="completed" checked={task.completed} onChange={handleChange} />
        Tamamlandı mı?
      </label>

      <button type="submit">Ekle</button>
    </form>
  );
}

export default TaskForm;
