import { Alert, Button, Modal } from "react-bootstrap"
import PropTypes from 'prop-types'
import { useState } from "react";
import DeleteProduct from "./deleteproductcomponent";
import { deleteProduct } from "../../utils/productService";

const ProductDetailsComponent = ({ product, show, onHide }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setshowAlert(true);
    deleteProduct(product.id);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    
  };

  return (
    <div>
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{product.productName} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Product Image: </p>
        <img src={product.productImage} alt={product.productName} style={{ width: '300px', height: '300px' }}/>
        <p>Stock: {product.productStock}</p>
        <p>Price: ${product.productPrice}</p>
        <p>
          Created At:{" "}
            {product.uploadDate
              ? new Date(product.uploadDate.seconds * 1000).toLocaleString()
              : "N/A"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button onClick={handleDelete}>Delete Product</Button>
      </Modal.Footer>
      {showAlert && (
          <Alert variant="success">
            Product has been successfully deleted.
          </Alert>
        )}
    </Modal>

    <DeleteProduct 
      product={product}
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      onConfirmDelete={() => confirmDelete(product.id)}
    />
    </div>
    
  )
}

ProductDetailsComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      productImage: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      productStock: PropTypes.number.isRequired,
      productPrice: PropTypes.number.isRequired,
      uploadDate: PropTypes.any,
  }).isRequired,
};

export default ProductDetailsComponent