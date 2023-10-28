import { Spinner } from "react-bootstrap"


const Spinners = () => {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}>
        <Spinner animation="border" role="status"></Spinner>
      </div>
  )
}

export default Spinners