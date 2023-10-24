
import PropTypes from 'prop-types'
import { Button, Card, Col, Modal } from 'react-bootstrap';
import { deleteProduct } from '../../utils/productService';
import { useState } from 'react';

const ProductCard = ({product, onDelete}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleDelete = () => {
      setShowDeleteModal(true);
      setProductToDelete(product);
    };
  
    const confirmDelete = async () => {
        if(productToDelete){
            const deleted = await deleteProduct(productToDelete.id);
            if(deleted){
                onDelete(productToDelete.id);
                setProductToDelete(null);
                setShowDeleteModal(false);
            }
        }
    };

  return (
    <Col xs={12} sm={6} md={5} lg={3} className='mb-3 mb-md-3'>
      <Card>
      <div className="d-flex justify-content-center">
          <Card.Img
            variant="top"
            src={product.productImage}
            alt={product.productName}
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>
            Stock: {product.productStock}<br />
            Price: Idr {product.productPrice}
          </Card.Text>
          <Button variant='danger' onClick={handleDelete}>Delete</Button>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to remove this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Col> 
  )
}

ProductCard.propTypes = {
    onDelete: PropTypes.func.isRequired,
    product: PropTypes.shape({
        id : PropTypes.string.isRequired,
        productImage: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productStock: PropTypes.number.isRequired,
        productPrice: PropTypes.number.isRequired,
    }).isRequired,
  };

export default ProductCard