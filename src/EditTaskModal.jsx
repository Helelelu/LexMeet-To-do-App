import { useState, useEffect } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Button } from "react-bootstrap";
import "./EditTaskModal.css";

Modal.setAppElement("#root");

export default function EditTaskModal({
    isOpen,
    onRequestClose,
    onConfirm,
    task,
}) {
    const [editedTitle, setEditedTitle] = useState(task ? task.title : "");
    const [editedDate, setEditedDate] = useState(
        task ? new Date(task.date) : new Date()
    );

    useEffect(() => {
        if (task) {
            setEditedTitle(task.title);
            setEditedDate(task.date ? new Date(task.date) : new Date());
        }
    }, [task, isOpen]);

    function handleConfirm() {
        if (editedTitle.trim() === "") {
            alert("Task title cannot be empty.");
            return;
        }
        onConfirm({
            ...task,
            title: editedTitle,
            date: editedDate,
        });
        onRequestClose();
    }

    function handleClose() {
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="roboto-slab editTitle">Edit Task</h2>
            <div className="taskEdit-wrap">
                <input
                    type="text"
                    id="taskTitle"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="taskInput"
                    placeholder="Edit task title here..."
                />
            </div>
            <div>
                <label className="editDateLabel">Set Date and Time: </label>
                <DateTimePicker onChange={setEditedDate} value={editedDate} />
            </div>
            <div className="modal-buttons">
                <Button onClick={handleConfirm}>Confirm</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}
