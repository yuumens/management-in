/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Form, Button, Col, Container, Alert } from 'react-bootstrap';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'; 
import { db } from '../../utils/firebase-config';
import { useNavigate, useParams } from 'react-router';
import { uploadImageToStorage } from '../../utils/productService';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const EditProductComponent = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [showAlert, setshowAlert] = useState(false);
    const [productName, setProductName] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productPrice, setProductPrice] = useState('');
    const [initialProductName, setinitialProductName] = useState('')
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const productDocRef = doc(db, 'products', productId);
            const productSnapshot = await getDoc(productDocRef);
            if (productSnapshot.exists()) {
              const productData = productSnapshot.data();
              setProduct(productData);
              setProductName(productData.productName);
              setProductStock(productData.productStock);
              setProductPrice(productData.productPrice);

              setinitialProductName(productData.productName);
            }
          } catch (error) {
            console.error('Error fetching product: ', error);
          }
        };
        fetchProduct();
      }, [productId]);

      const handleFormSubmit = async (e) => {
        e.preventDefault();

        let updateImg;
        if (productImage) {
          // Jika pengguna mengunggah gambar baru, upload gambar baru.
          updateImg = await uploadImageToStorage(productImage);
        } else {
          // Jika tidak ada gambar yang diunggah, gunakan gambar produk yang ada.
          updateImg = product.productImage;
        }
        
        const updatedProduct = {
          productName: productName,
          productStock: productStock,
          productImage: updateImg,
          productPrice: productPrice,
          lastUpdate: serverTimestamp(),
        };
      
        try {
          const productDocRef = doc(db, 'products', productId);
          await updateDoc(productDocRef, updatedProduct);
          setshowAlert(true);
        } catch (error) {
          console.error('Error updating product: ', error);
        }
      };
    
    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setProductImage(selectedFile);
      } else if (product.productImage) {
        setProductImage(product.productImage);
      }
    }

    const handleCloseAlert = () => {
        setshowAlert(false);
        navigate('/');
    }
    
  return (
    <HelmetProvider>
      <Helmet>
      <title>managementIn - Edit Product</title>
      </Helmet>
      <Container>
      <Col className='d-flex justify-content-center m-3'>
          <h2>Edit Product - {initialProductName}</h2>
        </Col>
      <Form className='m-md-3 m-sm-3' onSubmit={handleFormSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type='submit'>
          Update Product
        </Button>
      </Form>
        {showAlert && (
            <Alert variant="success" dismissible onClose={handleCloseAlert}>
              Product has been successfully deleted.
            </Alert>
          )}
    </Container>
    </HelmetProvider>
    
  );
}


export default EditProductComponent;
