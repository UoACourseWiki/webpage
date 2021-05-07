import { Modal } from "@material-ui/core";

const DialogueCointainer = (props) => {
    const modalContentStyle = {
        backgroundColor: "#fefefe",
        margin: "auto",
        padding: "20px",
        border: "1px solid #888",
        width: "80%",
    };

    return (
        <Modal
            open = {props.open}
            onClose = {props.onClose}
        >
            <div style={modalContentStyle}>{props.children}</div>
        </Modal>
    );
}

export default DialogueCointainer;