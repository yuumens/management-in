import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types'

const DeleteProduct = ({product, show, onHide, onConfirmDelete}) => {
    const confirmDelete = () => {
        onConfirmDelete();
        onHide();
      };

  return (
    <div>
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove {product.productName} <br />from list?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
    </Modal>
    </div>
  )
}

DeleteProduct.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onConfirmDelete: PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired,
    product: PropTypes.shape({
        productName: PropTypes.string.isRequired,
    }).isRequired,
  };

export default DeleteProduct