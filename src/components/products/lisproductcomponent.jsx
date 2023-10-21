import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/productService";
import ProductCard from "./productcard";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";


const ListProductComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
          .then((productsData) => {
            if (productsData) {
              setProducts(productsData);
            }
          })
          .catch((error) => {
            console.error('Error fetching products: ', error);
          });
      }, []);


  return (
    <Container>
        <Helmet>
            <title>managementIn - List Product</title>
            <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Col className="d-flex justify-content-center m-3">
            <h2>Product List</h2>
        </Col>
      <Row>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  )
}

export default ListProductComponent