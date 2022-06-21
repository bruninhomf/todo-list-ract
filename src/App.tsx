import React, { useState } from 'react'
import styles from './App.module.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Modal from './components/modal/Modal';
import TaskForm from './components/taskForm/TaskForm';
import Tasklist from './components/taskList/Tasklist';
import {ITask} from './interfaces/Task'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = {id, title, difficulty}

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)

    hideOrShowModal(false)
  }

  return (
    <div>
      <Modal 
        children={
          <TaskForm 
            btnText='Editar Tarefa' 
            taskList={taskList}            
            task={taskToUpdate}
            handleUpdate={updateTask}
          />} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm 
            btnText='Criar tarefa' 
            taskList={taskList}
            setTaskList={setTaskList} 
          />
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <Tasklist 
            taskList={taskList} 
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
