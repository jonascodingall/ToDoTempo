// TodoPage.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import TaskModel from '../models/TaskModel';
import TaskComponent from '../components/TaskComponent';
import './ToDoPage.css';

const TodoPage: React.FC = () => {
    const tasksStorageKey = 'tasks';

    const getDataFromLocalStorage = () => {
        const localData = localStorage.getItem(tasksStorageKey);
        return localData ? JSON.parse(localData) : null;
    };

    const { data: tasksFromLocalStorage, isLoading: loadingLocalStorage } = useQuery({
        queryFn: getDataFromLocalStorage,
        queryKey: tasksStorageKey,
        retry: false,
    });

    const { data: tasksFromAPI, isLoading: loadingAPI } = useQuery({
        queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()),
        retry: false,
    });

    const isLoading = loadingLocalStorage || loadingAPI;

    const [taskData, setTaskData] = useState<TaskModel[]>([]);

    useEffect(() => {
        if (tasksFromLocalStorage) {
            setTaskData(tasksFromLocalStorage);
        } else if (tasksFromAPI) {
            setTaskData(tasksFromAPI);
            localStorage.setItem(tasksStorageKey, JSON.stringify(tasksFromAPI));
        }
    }, [tasksFromLocalStorage, tasksFromAPI]);

    const updateTask = (id: number, completed: boolean, newTitle: string) => {
        const updatedTasks = taskData.map(task => {
            if (task.id === id) {
                return { ...task, title: newTitle, completed: completed };
            }
            return task;
        });
        setTaskData(updatedTasks);
        localStorage.setItem(tasksStorageKey, JSON.stringify(updatedTasks));
    };

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="task-list">
                    {taskData.map((task: TaskModel) => (
                        <TaskComponent key={task.id} taskModel={task} isEditing={false} updateTask={updateTask} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default TodoPage;
