import Modal from "react-modal";
import { Button } from "react-bootstrap";

Modal.setAppElement("#root");

export default function DeleteModal({ isOpen, onRequestClose, onConfirm }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="roboto-slab">Confirm Deletion</h2>
            <p>Are you sure you want to delete all tasks?</p>
            <Button onClick={onConfirm}>Confirm</Button>
            <Button variant="secondary" onClick={onRequestClose}>
                Cancel
            </Button>
        </Modal>
    );
}
