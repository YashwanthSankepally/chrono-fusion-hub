import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('system');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    if (theme === 'system') {
      setTheme(systemTheme);
    }
  }, [theme]);

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

      const day = now.getDate();
      const month = now.getMonth() + 1; // Months are 0-based
      const year = now.getFullYear();
      const dateString = `${day}-${month}-${year}`;

      setTime(timeString);
      setDate(dateString);
    };

    updateTimeAndDate(); // Update immediately
    const interval = setInterval(updateTimeAndDate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const home = () => {
    navigate("/home");
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleKeyDown = (event, callback) => {
    if (event.key === "Enter") {
      callback();
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className={`cfh-navbar shadow ${
          theme === 'dark' ? "navbar-dark" : "navbar-light"
        }`}
      >
        <Container fluid>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={56} />
          ) : (
            <>
              <Navbar.Brand tabIndex={0} onClick={home} className="cfh-g-cp">
                <div className="cfh-logo-container">
                  <img
                    src="/src/assets/images/CFHLogo.png"
                    alt="cfh logo"
                    className="cfh-logo"
                  />
                  <h1 className="cfh-title">ChronoFusionHub</h1>
                </div>
              </Navbar.Brand>
              <Paper
                className="d-flex ms-1 cfh-paper-input"
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 350,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                  <Nav.Link>
                      <span>{time}</span>
                  </Nav.Link>
                  <Nav.Link>
                    <span>{date}</span>
                  </Nav.Link>
                  <Nav.Link
                    tabIndex={0}
                    onClick={handleShow}
                    onKeyDown={(event) => handleKeyDown(event, handleShow)}
                  >
                    My Profile
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop={true}
        className="cfh-offcanvas"
        aria-labelledby="offcanvasTitle"
        aria-label="offcanvas"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>My Profile</Offcanvas.Title>
          <Button variant="link" onClick={handleClose} className="ms-auto">
            <CloseIcon />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="cfh-profile-container">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQHstFutlfl8tgZAtY8nDWucSWEvFM5AETQ&s"
              alt="profile"
              height={50}
              width={50}
              className="cfh-profile-img"
            />
            <p>
              <strong>UserName</strong>
            </p>
            <Button className="btn btn-primary">
              <FontAwesomeIcon icon={faUserPen} />
              Edit Profile
            </Button>
          </div>
          <hr />
          <ButtonGroup aria-label="Theme selection" className="mb-3">
            <Button
              variant={theme === 'light' ? 'primary' : 'outline-primary'}
              onClick={() => handleThemeChange('light')}
            >
              <LightModeIcon className="me-1" />
              Light
            </Button>
            <Button
              variant={theme === 'system' ? 'primary' : 'outline-primary'}
              onClick={() => handleThemeChange('system')}
            >
              <SettingsBrightnessIcon className="me-1" />
              System
            </Button>
            <Button
              variant={theme === 'dark' ? 'primary' : 'outline-primary'}
              onClick={() => handleThemeChange('dark')}
            >
              <DarkModeIcon className="me-1" />
              Dark
            </Button>
          </ButtonGroup>
          <hr />
          <div className="cfh-list-group-btns-container">
            <ListGroup className="cfh-list-group">
              <ListGroup.Item action>Link 1</ListGroup.Item>
              <ListGroup.Item action>Link 2</ListGroup.Item>
              <ListGroup.Item action>This one is a button</ListGroup.Item>
            </ListGroup>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;