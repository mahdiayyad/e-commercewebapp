import { MDBSpinner } from "mdb-react-ui-kit";

const Loader = () => (
  <MDBSpinner grow color="primary">
    <span className="visually-hidden">Loading...</span>
  </MDBSpinner>
);

export default Loader;
