import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalWrapper = ({ child, show = false, setShow = () => {} }) => {
  return (
    <Modal isOpen={show} style={customStyles} contentLabel="Example Modal">
      {child}
    </Modal>
  );
};

export default ModalWrapper;
