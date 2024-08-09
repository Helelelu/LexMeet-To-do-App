import "./App.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DateTimeModal from "./DateTimeModal";
import DeleteModal from "./DeleteModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

function App() {
    const [newTask, setNewTask] = useState("");
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("TASK");
        if (localValue == null) return [];
        return JSON.parse(localValue);
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        localStorage.setItem("TASK", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();
        if (newTask === "") return;
        setTodos((currentTodos) => [
            ...currentTodos,
            {
                id: crypto.randomUUID(),
                title: newTask,
                completed: false,
                date: selectedDate,
                selected: false,
            },
        ]);
        setNewTask("");
        setSelectedDate(null);
    }

    function toggleTodoCompleted(id) {
        setTodos((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    function confirmDeleteTodo() {
        setTodos((currentTodos) =>
            currentTodos.filter((todo) => todo.id !== taskToDelete.id)
        );
        setIsDeleteTaskModalOpen(false);
        setTaskToDelete(null);
    }

    function deleteAll() {
        if (todos.length === 0) {
            alert("No tasks available to delete.");
            return;
        }
        setTodos([]);
        setIsConfirmModalOpen(false);
    }

    function handleDateSet(date) {
        setSelectedDate(date);
    }

    function markAllAsDone() {
        if (todos.length === 0) {
            alert("No tasks available to mark as done.");
            return;
        }
        setTodos((currentTodos) =>
            currentTodos.map((todo) => ({
                ...todo,
                completed: true,
            }))
        );
    }

    function markAllAsUndone() {
        if (todos.length === 0) {
            alert("No tasks available to mark as undone.");
            return;
        }
        setTodos((currentTodos) =>
            currentTodos.map((todo) => ({
                ...todo,
                completed: false,
            }))
        );
    }

    function handleEdit(task) {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    }

    function handleEditConfirm(updatedTask) {
        setTodos((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === updatedTask.id ? updatedTask : todo
            )
        );
        setIsEditModalOpen(false);
        setSelectedTask(null);
    }

    const areButtonsDisabled = todos.length === 0;

    return (
        <div className="page-layout">
            <header>
                <img className="logo" src="/lexmeet_logo_white.png" alt="" />
            </header>
            <main>
                <div className="roboto-slab apptitle">To-Do App</div>
                <div className="addTask">
                    <form onSubmit={handleSubmit} className="task">
                        <div className="form-row">
                            <input
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                type="text"
                                id="item"
                                className="taskInput"
                                placeholder="Add task here..."
                            />
                            <div
                                className="selected-date"
                                onClick={() => setIsModalOpen(true)}
                            >
                                {selectedDate
                                    ? new Date(selectedDate).toLocaleString()
                                    : "No date set"}{" "}
                            </div>
                            <Button onClick={() => setIsModalOpen(true)}>
                                <i className="fa-regular fa-calendar-days"></i>
                            </Button>
                            <Button type="submit">
                                <i className="fa-regular fa-square-plus"></i>
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="selectAllBtn">
                    <Button
                        onClick={markAllAsDone}
                        disabled={areButtonsDisabled}
                        className={areButtonsDisabled ? "disabled" : ""}
                    >
                        Done All
                    </Button>
                    <Button
                        onClick={markAllAsUndone}
                        disabled={areButtonsDisabled}
                        className={areButtonsDisabled ? "disabled" : ""}
                    >
                        Undone All
                    </Button>
                    <Button
                        onClick={() => setIsConfirmModalOpen(true)}
                        disabled={areButtonsDisabled}
                        className={areButtonsDisabled ? "disabled" : ""}
                    >
                        Delete All
                    </Button>
                </div>
                <ul className="taskList">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={todo.completed ? "task-completed" : ""}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() =>
                                        toggleTodoCompleted(todo.id)
                                    }
                                />
                                <span
                                    className={
                                        todo.completed ? "completed" : ""
                                    }
                                >
                                    {todo.title} -{" "}
                                    {todo.date
                                        ? new Date(todo.date).toLocaleString()
                                        : "No date set"}
                                </span>
                            </label>
                            <div className="task-btns">
                                <Button
                                    onClick={() => handleEdit(todo)}
                                    variant="secondary"
                                    className="edit-btn"
                                >
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setTaskToDelete(todo);
                                        setIsDeleteTaskModalOpen(true);
                                    }}
                                    variant="danger"
                                    className="remove-btn"
                                >
                                    <i className="fa-regular fa-trash-can"></i>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
            <DateTimeModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onDateSet={handleDateSet}
            />
            <DeleteModal
                isOpen={isConfirmModalOpen}
                onRequestClose={() => setIsConfirmModalOpen(false)}
                onConfirm={deleteAll}
            />
            {selectedTask && (
                <EditTaskModal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    onConfirm={handleEditConfirm}
                    task={selectedTask}
                />
            )}
            {taskToDelete && (
                <DeleteTaskModal
                    isOpen={isDeleteTaskModalOpen}
                    onRequestClose={() => setIsDeleteTaskModalOpen(false)}
                    onConfirm={confirmDeleteTodo}
                    taskTitle={taskToDelete.title}
                />
            )}
        </div>
    );
}

export default App;
