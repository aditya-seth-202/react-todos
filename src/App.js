import React, { useRef } from "react";
import { useState } from "react";
import { v4 as idGen } from "uuid";
import { MdDelete } from "react-icons/md";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import styles from "./App.module.css";

const ToDoList = () => {
  const [taskStr, setTaskStr] = useState("");
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const saveLocal = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setTaskStr(e.target.value);
  };

  const addTask = () => {
    if (taskStr !== "") {
      const taskDetails = {
        id: idGen(),
        value: taskStr,
        isCompleted: false,
        isEdit: false,
      };

      ref.current.value = "";
      setTaskList([...taskList, taskDetails]);
      saveLocal([...taskList, taskDetails]);
    }
    setTaskStr("");
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    // find index of element
    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isCompleted: !temp[element].isCompleted,
    };

    setTaskList([...temp]);
    saveLocal([...temp]);
  };

  const editTaskHandler = (e, id) => {
    e.preventDefault();
    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isEdit: true,
    };

    setTaskList([...temp]);
    saveLocal([...temp]);
  };

  const onEditing = (e, id) => {
    e.preventDefault();

    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isEdit: true,
      value: e.target.value,
    };
    setTaskList([...temp]);
    saveLocal([...temp]);
  };

  const updateTaskHandler = (e, id) => {
    e.preventDefault();

    let temp = taskList;
    const element = temp.findIndex((elem) => elem.id === id);
    temp[element] = {
      ...temp[element],
      isEdit: false,
    };
    setTaskList([...temp]);
    saveLocal([...temp]);
  };

  const filterRemaining = (e) => {
    const newList = taskList.filter((t) => !t.isCompleted);
    setTaskList(newList);
    saveLocal(newList);
  };

  const deletetaskHandler = (e, id) => {
    e.preventDefault();
    const newList = taskList.filter((t) => t.id !== id);
    setTaskList(newList);
    saveLocal(newList);
  };

  const ref = useRef();

  return (
    <div className={styles.container}>
  <div>Hii</div>
      <h1 className={styles.heading}>To Do List</h1>
      <div className={styles.inputCss}>
        <input
          type="text"
          ref={ref}
          onChange={(e) => handleChange(e)}
          placeholder="add a task"
          className={styles.input}
        />
      </div>
      <div>
        <button className={styles.btnadd} onClick={addTask}>
          Add
        </button>
        <button onClick={filterRemaining} className={styles.btnadd}>
          Clear Completed
        </button>
      </div>
      <div className={styles.listDiv}>
        {taskList.map((item) => (
          <li key={item.id} className={styles.list}>
            <div className={styles.leftDiv}>
              <BiCheckbox
                size={30}
                color="red"
                onClick={(e) => {
                  taskCompleted(e, item.id);
                }}
                className={item.isCompleted ? styles.invisible : styles.visible}
              />
              <BiCheckboxChecked
                size={30}
                color="red"
                className={item.isCompleted ? styles.visible : styles.invisible}
                onClick={(e) => {
                  taskCompleted(e, item.id);
                }}
              />

              {item.isEdit ? (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => onEditing(e, item.id)}
                  className={styles.editInput}
                />
              ) : (
                <span
                  onDoubleClick={(e) => {
                    editTaskHandler(e, item.id);
                  }}
                >
                  {" "}
                  {item.value}
                </span>
              )}
            </div>

            {item.isEdit ? (
              <button
                className={styles.updatebtn}
                onClick={(e) => updateTaskHandler(e, item.id)}
              >
                Update
              </button>
            ) : (
              <div
                className={styles.visible}
                onClick={(e) => deletetaskHandler(e, item.id)}
              >
                <MdDelete color="red" size={25} />
              </div>
            )}
          </li>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
