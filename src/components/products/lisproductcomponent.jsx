import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/productService";
import ProductCard from "./productcard";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Helmet ,HelmetProvider } from "react-helmet-async";


const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onDelete = (productId) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      };

    useEffect(() => {
        fetchProducts()
          .then((productsData) => {
            if (productsData) {
              setProducts(productsData);
            }
          })
          .catch((error) => {
            console.error('Error fetching products: ', error);
          })
          .finally(() => {
            setIsLoading(false);
          })
      }, []);


  return (
    <HelmetProvider>
    <div>
    <Container>
        <Helmet>
            <title>managementIn - List Product</title>
        </Helmet>
        <Col className="d-flex justify-content-center m-3">
            <h2>Product List</h2>
        </Col>
        {isLoading ? (
            <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) : products.length === 0 ? (
            <p>Product is Empty</p>
        ) : (
        <Row>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onDelete={onDelete} />
            ))}
        </Row>
        )}
    </Container>
    </div>
    </HelmetProvider>

  )
}

export default ListProductComponent