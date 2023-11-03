/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { addProduct, checkProductExists, uploadImageToStorage } from '../../utils/productService';
import { Alert, Button, Col, Container, Form, Modal } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useFormik } from 'formik';

const AddProductComponent = () => {
  const [showModal, setshowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      productName: '',
      productStock: '',
      productImage: null,
      productPrice: '',
    },
    onSubmit: async (values) => {
      try {
        const isProductExists = await checkProductExists(values.productName);

        if (isProductExists) {
          setShowAlert(true);
        } else {
          const imageURL = await uploadImageToStorage(values.productImage);

          if (imageURL) {
            addProduct(values.productName, values.productStock, imageURL, values.productPrice);

            formik.resetForm(); 

            setshowModal(true);
          }
        }
      } catch (error) {
        console.error('Error adding product: ', error);
      }
    },

    validate: (values) => {
      const errors = {};

      if (!values.productName) {
        errors.productName = 'Product Name is Required';
      }
      if (!values.productStock) {
        errors.productStock = 'Product Stock is Required';
      }
      if (!values.productImage) {
        errors.productImage = 'Product Images is Required';
      }
      if (!values.productPrice) {
        errors.productPrice = 'Product Price is Required';
      }

      return errors;
    },
  });

  return (
    <div>
      <HelmetProvider>
      <Container>
          <Helmet>
              <title>managementIn - Add Product</title>
          </Helmet>
        <Col className='d-flex justify-content-center m-3'>
          <h2>Add a New Product</h2>
        </Col>
      <Form onSubmit={formik.handleSubmit} className='m-md-3 m-sm-3'>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name='productName'
            type="text"
            placeholder="Product Name"
            value={formik.values.productName}
            onChange={formik.handleChange}
          />
          {formik.errors.productName && <div className="text-danger">{formik.errors.productName}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            name='productStock'
            type="number"
            placeholder="Product Stock"
            value={formik.values.productStock}
            onChange={formik.handleChange}
          />
          {formik.errors.productStock && <div className="text-danger">{formik.errors.productStock}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            name='productImage'
            type="file"
            accept="image/*"
            onChange={(e) => formik.setFieldValue('productImage', e.target.files[0])}
          />
          {formik.errors.productImage && <div className="text-danger">{formik.errors.productImage}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            name='productPrice'
            type="number"
            placeholder="Product Price"
            value={formik.values.productPrice}
            onChange={formik.handleChange}
          />
          {formik.errors.productPrice && <div className="text-danger">{formik.errors.productPrice}</div>}
        </Form.Group>

        <Button type="submit">Add Product</Button>
      </Form>
      {showAlert && (
            <Alert variant="warning" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
              Product already exists!
            </Alert>
        )}
    </Container>
      <Modal 
        show={showModal} 
        backdrop="static" 
        keyboard="false"
        onHide={() => setshowModal(false)}
      >
      <Modal.Header closeButton>
        <Modal.Title>Product Added</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Product added successfully!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setshowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </HelmetProvider>
    </div>
  )
  }


export default AddProductComponent