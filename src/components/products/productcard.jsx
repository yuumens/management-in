
import PropTypes from 'prop-types'
import { Button, Card, Col } from 'react-bootstrap';
import { useState } from 'react';
import ProductDetailsComponent from './productdetailscomponent';

const ProductCard = ({product}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
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
          <Button variant="primary" onClick={handleShowModal}>Details</Button>
        </Card.Body>
      </Card>

    <ProductDetailsComponent product={product} show={showModal} onHide={handleCloseModal} />

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