import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faList,
  faSignOut,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./ShopHeader.scss";

const ShopHeader = () => {
  return (
    <div className="main-navbar shadow-sm sticky-top">
      <div className="top-navbar">
        <Container fluid>
          <div className="row">
            <div className="col-md-2 my-auto d-none d-md-block">
              <h5 className="brand-name">ChronoFusionHub</h5>
            </div>
            <div className="col-md-5 my-auto">
              <Form role="search">
                <div className="input-group">
                  <FormControl
                    type="search"
                    placeholder="Search your product"
                    className="form-control"
                  />
                  <Button
                    className="btn bg-white"
                    type="submit"
                    aria-label="search"
                  >
                    <FontAwesomeIcon className="text-dark" icon={faSearch} />
                  </Button>
                </div>
              </Form>
            </div>
            <div className="col-md-5 my-auto">
              <Nav className="justify-content-end">
                <Nav.Item>
                  <Nav.Link href="#">
                    <FontAwesomeIcon icon={faShoppingCart} /> Cart (0)
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">
                    <FontAwesomeIcon icon={faHeart} /> Wishlist (0)
                  </Nav.Link>
                </Nav.Item>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} id="navbarDropdown">
                    <FontAwesomeIcon icon={faUser} /> Username
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon icon={faUser} /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon icon={faList} /> My Orders
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon icon={faHeart} /> My Wishlist
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon icon={faShoppingCart} /> My Cart
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon icon={faSignOut} /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </div>
          </div>
        </Container>
      </div>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand className="d-block d-md-none">Funda Ecom</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">All Categories</Nav.Link>
              <Nav.Link href="#">New Arrivals</Nav.Link>
              <Nav.Link href="#">Featured Products</Nav.Link>
              <Nav.Link href="#">Electronics</Nav.Link>
              <Nav.Link href="#">Fashions</Nav.Link>
              <Nav.Link href="#">Accessories</Nav.Link>
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Appliances</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default ShopHeader;
