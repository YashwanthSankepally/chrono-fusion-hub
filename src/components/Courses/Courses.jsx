import { useState, useEffect } from "react";
import axios from "axios";
import "./Courses.scss";
import Header from "../Header/Header";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Skeleton from "@mui/material/Skeleton";

const Courses = () => {
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setTimeout(() => {
          setCourses(response.data);
          setFilteredCourses(response.data);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.courseTitle.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchText, courses]);

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleShareClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${selectedCourse.playlistUrl}`);
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Failed to copy to clipboard!");
    }
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=Check out this course: ${selectedCourse.courseTitle} - ${selectedCourse.playlistUrl}`;
    window.open(url, "_blank");
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      selectedCourse.playlistUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=Check out this course: ${selectedCourse.courseTitle} - ${selectedCourse.playlistUrl}`;
    window.open(url, "_blank");
  };

  const handleShareTelegram = () => {
    const url = `https://telegram.me/share/url?url=${encodeURIComponent(
      selectedCourse.playlistUrl
    )}&text=Check out this course: ${selectedCourse.courseTitle}`;
    window.open(url, "_blank");
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(
      `Check out this course: ${selectedCourse.courseTitle}`
    );
    const body = encodeURIComponent(
      `Hey there,\n\nI thought you might be interested in this course:\n${selectedCourse.playlistUrl}\n\nCheers!`
    );
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      selectedCourse.playlistUrl
    )}`;
    window.open(url, "_blank");
  };

  const toggleFavorite = (courseId) => {
    if (favorites.includes(courseId)) {
      setFavorites(favorites.filter((id) => id !== courseId));
    } else {
      setFavorites([...favorites, courseId]);
    }
  };

  return (
    <div>
      <Header />
      <section className="cfh-courses-section">
        <div className="cfh-courses-container">
          <div className="cfh-courses-header d-flex justify-content-between">
            {loading ? (
              <Skeleton variant="rectangular" width={400} height={35} />
            ) : (
              <Paper
                className="cfh-paper-input-container"
                component="form"
                sx={{
                  padding: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  className="cfh-courses-search-input"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Courses"
                  inputProps={{ "aria-label": "search courses" }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && (
                  <IconButton
                    className="cfh-close-icon"
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="clear"
                    onClick={handleClearSearch}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
                <span>
                  <SearchIcon />
                </span>
              </Paper>
            )}
            {loading ? (
              <div className="d-flex">
                <Skeleton variant="rectangular" />
              </div>
            ) : (
              <div className="d-flex">
                <button
                  className="border-0 bg-transparent"
                  aria-label="favorite courses"
                >
                  <StarIcon />
                </button>
              </div>
            )}
          </div>
          <div className="cfh-courses-cards-container">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div className="cfh-card-container" key={index}>
                    <Card style={{ width: "18rem", marginBottom: "20px" }}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        animation="wave"
                      />
                      <Card.Body>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                        <div className="d-flex justify-content-between">
                          <Skeleton variant="button" width="30%" />
                          <Skeleton variant="button" width="15%" />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              : filteredCourses.map((course) => (
                  <div className="cfh-card-container" key={course._id}>
                    <Card style={{ width: "18rem" }} className="cfh-rbs-card">
                      <Card.Img
                        variant="top"
                        src={course.thumbnailUrl}
                        alt={course.courseTitle}
                      />
                      <Card.Body>
                        <Card.Title>{course.courseTitle}</Card.Title>
                        <Card.Text className="courses-info">
                          {course.info}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Card.Link
                            href={course.playlistUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                          >
                            Go to Playlist
                          </Card.Link>
                          <div className="d-flex flex-row cfh-hover-icons">
                            <button
                              className="border-0 bg-transparent"
                              onClick={() => toggleFavorite(course._id)}
                              aria-label={
                                favorites.includes(course._id)
                                  ? `Remove ${course.courseTitle} from favorites`
                                  : `Add ${course.courseTitle} to favorites`
                              }
                            >
                              {favorites.includes(course._id) ? (
                                <StarIcon style={{ color: "#fdd835" }} className="cfh-favorite-star-icon" />
                              ) : (
                                <StarBorderIcon />
                              )}
                            </button>

                            <Button
                              className="border-0 bg-transparent text-black"
                              onClick={() => handleShareClick(course)}
                              aria-label={`Share ${course.courseTitle}`}
                            >
                              <FontAwesomeIcon icon={faShare} />
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Share {selectedCourse?.courseTitle}</Modal.Title>
          <Button variant="link" onClick={handleCloseModal} className="ms-auto">
            <CloseIcon />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="cfh-share-options-container">
            <button
              aria-label="Copy"
              title="Copy"
              className="cfh-share-to-icon"
              onClick={handleCopyToClipboard}
            >
              <ContentCopyIcon />
            </button>
            <button
              aria-label="WhatsApp"
              title="WhatsApp"
              className="cfh-share-to-icon"
              onClick={handleShareWhatsApp}
            >
              <WhatsAppIcon />
            </button>
            <button
              aria-label="Facebook"
              title="Facebook"
              className="cfh-share-to-icon"
              onClick={handleShareFacebook}
            >
              <FacebookRoundedIcon />
            </button>
            <button
              aria-label="X (formerly Twitter)"
              title="X (formerly Twitter)"
              className="cfh-share-to-icon"
              onClick={handleShareTwitter}
            >
              <XIcon />
            </button>
            <button
              aria-label="Telegram"
              title="Telegram"
              className="cfh-share-to-icon"
              onClick={handleShareTelegram}
            >
              <TelegramIcon />
            </button>
            <button
              aria-label="Email"
              title="Email"
              className="cfh-share-to-icon"
              onClick={handleShareEmail}
            >
              <EmailIcon />
            </button>
            <button
              aria-label="LinkedIn"
              title="LinkedIn"
              className="cfh-share-to-icon"
              onClick={handleShareLinkedIn}
            >
              <LinkedInIcon />
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Courses;
