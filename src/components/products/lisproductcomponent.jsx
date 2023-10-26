import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/productService";
import ProductCard from "./productcard";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Helmet ,HelmetProvider } from "react-helmet-async";
import Navbars from "../navbar/navbar";


const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const searchResults = filteredProducts.length > 0 || searchQuery !== '';
    const noProducts = products.length === 0;

    const onDelete = (productId) => {
        setFilteredProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
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

      useEffect(() => {
        const filtered = products.filter((product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      }, [searchQuery, products]);

  return (
    <HelmetProvider>
    <Navbars onSearch={setSearchQuery}/>
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
              <Spinner animation="border" role="status"></Spinner>
            </div>
        ) : searchResults ? (
            filteredProducts.length > 0 ? (
                <Row>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onDelete={onDelete} />
                  ))}
                </Row>
              ) : (
                <h3>No products found for your search.</h3>
              )
          ) : noProducts ? (
            <h3>No products found.</h3>
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