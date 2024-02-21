import React from "react";
import TaskModel from "../models/TaskModel";
import './TaskComponent.css'

interface TaskComponentProps {
    taskModel: TaskModel;
}

const TaskComponent: React.FC<TaskComponentProps> = (props) => {
    const { taskModel } = props;

    return (
        <div className={`task-card ${taskModel.completed ? ("completed"):("not-completed")}`}>
            <h1>Title: {taskModel.title}</h1>
            <p>Id: {taskModel.id}</p>
            <p>User Id: {taskModel.userId}</p>
        </div>
    );
}

export default TaskComponent;
