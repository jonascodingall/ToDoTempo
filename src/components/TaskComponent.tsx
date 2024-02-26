import React, { useState, useEffect } from "react";
import TaskModel from "../models/TaskModel";
import './TaskComponent.css'

interface TaskComponentProps {
    taskModel: TaskModel;
    isEditing: boolean;
    updateTask: (id: number, completed: boolean, newTitle: string) => void;
}

const TaskComponent: React.FC<TaskComponentProps> = (props) => {
    const { taskModel, isEditing, updateTask } = props;
    const [editing, setEditing] = useState(isEditing);
    const [inputTitleValue, setInputTitleValue] = useState(taskModel.title);
    const [inputCompletedValue, setInputCompletedValue] = useState(taskModel.completed);

    useEffect(() => {
        if (!isEditing) {
            setInputTitleValue(taskModel.title);
            setInputCompletedValue(taskModel.completed);
        }
    }, [isEditing, taskModel.title, taskModel.completed]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitleValue(e.target.value);
    };

    const handleCompletedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputCompletedValue(e.target.checked);
    };

    const submitEdit = () => {
        setEditing(false);
        updateTask(taskModel.id, inputCompletedValue, inputTitleValue);
    }

    return (
        <>
            {editing ? (
                <div className="task-card editing">
                    <label>Title: </label>
                    <input type="text" value={inputTitleValue} onChange={handleInputChange}></input>
                    <label>Completed: </label>
                    <br></br>
                    <input type="checkbox" checked={inputCompletedValue} onChange={handleCompletedInputChange}></input>
                    <br></br>
                    <button onClick={submitEdit}>Submit</button>
                </div>
            ) : (
                <div onClick={() => setEditing(true)} className={`task-card ${taskModel.completed ? "completed" : "not-completed"}`}>
                    <h1>Title: {taskModel.title}</h1>
                    <p>Id: {taskModel.id}</p>
                    <p>User Id: {taskModel.userId}</p>
                </div>
            )}
        </>
    );
}

export default TaskComponent;
