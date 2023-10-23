
import PropTypes from 'prop-types'
import { Card, Col } from 'react-bootstrap';

const ProductCard = ({product}) => {
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
        </Card.Body>
      </Card>
    </Col> 
  )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
      productImage: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      productStock: PropTypes.string.isRequired,
      productPrice: PropTypes.number.isRequired,
    }).isRequired,
  };

export default ProductCard