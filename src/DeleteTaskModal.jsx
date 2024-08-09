import Modal from "react-modal";
import { Button } from "react-bootstrap";

Modal.setAppElement("#root");

export default function DeleteTaskModal({
    isOpen,
    onRequestClose,
    onConfirm,
    taskTitle,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="roboto-slab">Confirm Deletion</h2>
            <p>Are you sure you want to delete the task `{taskTitle}`?</p>
            <Button onClick={onConfirm}>Confirm</Button>
            <Button variant="secondary" onClick={onRequestClose}>
                Cancel
            </Button>
        </Modal>
    );
}
