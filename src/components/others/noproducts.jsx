import PropTypes from 'prop-types'

export const NoProducts = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <h3>No products found.</h3>
    </div>
  );
};

export const NoProductsSearch = ({productName}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <h3>{productName} Product you Search is Not Found.</h3>
    </div>
  );
};

NoProductsSearch.propTypes = {
  productName : PropTypes.string.isRequired,
}