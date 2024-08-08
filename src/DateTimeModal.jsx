import { useState, useEffect } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Button } from "react-bootstrap";

Modal.setAppElement("#root");

export default function DateTimeModal({ isOpen, onRequestClose, onDateSet }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (!isOpen) {
            setSelectedDate(new Date());
        }
    }, [isOpen]);

    function handleSetDate() {
        onDateSet(selectedDate);
        onRequestClose();
    }

    function handleClose() {
        setSelectedDate(new Date());
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="roboto-slab">Set Date and Time</h2>
            <DateTimePicker onChange={setSelectedDate} value={selectedDate} />
            <Button onClick={handleSetDate}>Set Date</Button>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal>
    );
}
