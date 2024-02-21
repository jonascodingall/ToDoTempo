import { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import TaskModel from '../models/TaskModel';
import TaskComponent from "../components/TaskComponent";
import './ToDoPage.css';

function TodoPage(){
    const tasksStorageKey = "tasks";

    // Funktion zum Abrufen von Daten aus dem Local Storage
    const getDataFromLocalStorage = () => {
        const localData = localStorage.getItem(tasksStorageKey);
        return localData ? JSON.parse(localData) : null;
    }

    const { data: tasksFromLocalStorage, isLoading: loadingLocalStorage } = useQuery({
        queryFn: getDataFromLocalStorage,
        queryKey: tasksStorageKey,
        retry: false,
    });

    const { data: tasksFromAPI, isLoading: loadingAPI } = useQuery({
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json()),
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

    return(
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {taskData.map((task: TaskModel) =>
                        <TaskComponent key={task.id} taskModel={task}/>
                    )}
                </ul>
            )}
        </>
    )
}

export default TodoPage;
