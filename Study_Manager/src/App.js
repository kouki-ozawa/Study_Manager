import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import HamburgerMenu from "./HamburgerMenu";
import TaskCompletion from "./TaskCompletion";
import TaskList from "./TaskList";
import CalendarMenu from "./CalendarMenu";
import LevelDisplay from "./LevelDisplay";
import TaskForm from "./TaskForm";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [xp, setXP] = useState({});
  const [showAll, setShowAll] = useState(false);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:4000/subjects");
      setSubjects(res.data);

      const initialXp = res.data.reduce((acc, subject) => {
        acc[subject._id] = subject.XP || 0;
        return acc;
      }, {});
      setXP(initialXp);
    } catch (err) {
      console.error("科目の取得に失敗：", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("タスクの取得に失敗：", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchTasks();
  }, []);

  const addSubject = async (subject) => {
    try {
      console.log("追加する科目：", subject);

      const res = await axios.post("http://localhost:4000/subjects", {
        name: subject.name,
        date: subject.date || new Date().toISOString().split('T')[0]
      });
      setSubjects([...subjects, res.data]);
    } catch (err) {
      console.error("科目の追加に失敗：", err.response?.data || err);
    }
  };

  const addTask = async (subjectId, task) => {
    try {
      if (!subjects[subjectIndex]) {
        console.error("Invalid subjectIndex:", subjectIndex);
        return;
      }
      console.log("追加するタスク:", { subjectId, ...task });
      const newTask = { ...task, subjectId };
      const res = await axios.post("http://localhost:4000/tasks", newTask);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("タスクの追加に失敗:", err);
    }
  };

  const updateTask = async (taskIndex, updatedTask) => {
    try {
      await axios.put(`http://localhost:4000/tasks/${tasks[taskIndex]._id}`, updatedTask);
      const newTasks = [...tasks];
      newTasks[taskIndex] = updatedTask;//更新したデータを取得
      setTasks(newTasks);//取得したデータを更新
    } catch (err) {
      console.error("タスクの更新に失敗：", err.message);
    }
  };

  const deleteTask = async (taskIndex) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${tasks[taskIndex]._id}`);
      const newTasks = [...tasks];
      newTasks.splice(taskIndex, 1);//削除したタスクを取得
      setTasks(newTasks);//取得したデータを更新
    } catch (err) {
      console.error("タスクの削除に失敗：", err.message);
    }
  };

  const completeTask = async (taskIndex, rating) => {
    try {
      const task = tasks[taskIndex];
      if (!task) {
        console.error("エラー: タスクが取得できません");
        return;
      }

      const xpIncrement = (task.understanding || 0) * task.priority * 4;

      const updatedTask = { ...task, completed: true, rating };
      await axios.put(`http://localhost:4000/tasks/${task._id}`, updatedTask);

      const subjectId = task.subjectId;
      if (subjectId) {
        await axios.put(`http://localhost:4000/subjects/${subjectId}/increase-xp`, {
          increment: xpIncrement,
        });

        setXP((prevXP) => ({
          ...prevXP,
          [subjectId]: (prevXP[subjectId] || 0) + xpIncrement,
        }));
      }

      setTasks((prev) => prev.map((t, index) => (index === taskIndex ? updatedTask : t)));
    } catch (err) {
      console.error("タスクの完了に失敗:", err.message);
    }
  };

  const editSubject = async (subjectId, updatedSubject) => {
    try {
      await axios.put(`http://localhost:4000/subjects/${subjectId}`, updatedSubject);
      const newSubjects = subjects.map(subject =>
        subject._id === subjectId ? { ...subject, ...updatedSubject } : subject
      );
      setSubjects(newSubjects);
    } catch (err) {
      console.error("科目の編集に失敗：", err);
    }
  };

  const deleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:4000/subjects/${subjectId}`);
      const newSubjects = subjects.filter(subject => subject._id !== subjectId);
      setSubjects(newSubjects);
    } catch (err) {
      console.error("科目の削除に失敗：", err);
    }
  };

  console.log("Subjects:", subjects);
  console.log("XP:", xp);

  return (
    <Router>
      <div className="App">
        <HamburgerMenu
          subjects={subjects}
          setSubjects={setSubjects}
          addSubject={addSubject}
          editSubject={editSubject}
          deleteSubject={deleteSubject}
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
        <h2 className="app-title">Study Manager</h2>
        
        {/* タスク一覧 */}
        <Routes>
          <Route
            path="/task-completion"
            element={<TaskCompletion tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />}
          />
          <Route path="/" element={<TaskList tasks={tasks} completeTask={completeTask} isMainView={true} />} />
        </Routes>

        <CalendarMenu />
        
        {/* レベル表示（横スクロール対応） */}
        <div className="level-display-container flex flex-wrap justify-center gap-4 p-4">
          {(showAll ? subjects : subjects.slice(0, 3)).map((subject) => (
            <div key={subject._id} className="min-w-[16rem] flex-shrink-0">
              <LevelDisplay initialXp={xp[subject._id] || 0} subjectName={subject.name} />
            </div>
          ))}
        </div>

        {/* もっと見る/隠す ボタン */}
        {subjects.length > 3 && (
          <div className="show-more-button-container">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="btn btn-primary">
              {showAll ? "隠す" : "もっと見る"}
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;