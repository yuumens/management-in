/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { addProduct, uploadImageToStorage } from '../../utils/productService';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const AddProductComponent = () => {

  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageURL = await uploadImageToStorage(productImage);
  
      if (imageURL) {
        addProduct(productName, productCategory, imageURL, productPrice);
  
        setProductName('');
        setProductCategory('');
        setProductImage(null);
        setProductPrice('');

        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  }

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
  };

  return (
    <div>
      <Container>
          <Helmet>
              <title>managementIn - Add Product</title>
          </Helmet>
        <Col className='d-flex justify-content-center m-3'>
          <h2>Add a New Product</h2>
        </Col>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Add Product</Button>
      </Form>

      {showAlert && (
        <Alert className='mt-3' variant='success' onClose={() => setShowAlert (false)} dismissible>
          Product added Succesfully!
        </Alert>
      )}
    </Container>
    </div>
  )
  }


export default AddProductComponent