import "./Jobs.scss";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faAnglesRight,
  faPlus,
  faIdBadge,
  faScrewdriverWrench,
  faIndianRupeeSign,
  faBusinessTime,
  faBriefcase,
  faBuilding,
  faMapMarkerAlt,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import notificationSound from "../../assets/audio/notification_ding.mp3"; // Import the audio file
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton component

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [starred, setStarred] = useState({});
  const [applied, setApplied] = useState({}); // State to track applied jobs
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to manage snackbar message
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Create an Audio object
  const audio = new Audio(notificationSound);

  const handleViewDetails = (job) => {
    const queryParams = new URLSearchParams({
      id: job._id,
      companyName: job.companyName,
      role: job.role,
      skills: job.skills.join(","),
      salary: job.salary,
      experience: job.experience,
      aboutJobRole: job.aboutRole,
      aboutCompany: job.aboutCompany,
      address: job.address,
      city: job.city,
      applied: applied[job._id] || false, // Pass applied status
    }).toString();
    window.open(`/jobs/job-detail?${queryParams}`, "_blank");
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        // Simulate delay for demo purposes
        setTimeout(() => {
          setJobs(response.data);
          setLoading(false); // Data has been fetched, set loading to false
        });
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false); // Handle error: set loading to false
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const handleMoreClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleClose = () => setShowModal(false);

  const toggleStar = (jobId) => {
    setStarred((prevStarred) => {
      const isStarred = !prevStarred[jobId];
      // Set the snackbar message based on the new starred state
      setSnackbarMessage(
        isStarred ? "Added to favorites" : "Removed from favorites"
      );
      // Open the snackbar
      setSnackbarOpen(true);
      // Play the notification sound
      audio.play();

      return {
        ...prevStarred,
        [jobId]: isStarred,
      };
    });
  };

  const handleApply = async (jobId) => {
    try {
      const response = await axios.post("http://localhost:5000/jobs/apply", {
        jobId,
      });

      if (response.status === 200) {
        console.log("Job applied successfully");
        const appliedJob = jobs.find((job) => job._id === jobId);
        setApplied((prevApplied) => ({
          ...prevApplied,
          [jobId]: true, // Once applied, it remains applied
        }));
        // Set the snackbar message
        setSnackbarMessage(
          `You've successfully applied for ${appliedJob.role} role at ${appliedJob.companyName}`
        );
        // Open the snackbar
        setSnackbarOpen(true);
        // Play the notification sound
        audio.play();
      } else {
        console.error("Error applying for job:", response.status);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Filter jobs based on the search query
  const filteredJobs = jobs.filter((job) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      job.companyName.toLowerCase().includes(lowercasedQuery) ||
      job.role.toLowerCase().includes(lowercasedQuery) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(lowercasedQuery)
      ) ||
      job.city.toLowerCase().includes(lowercasedQuery)
    );
  });

  return (
    <>
      <Header />
      <section className="cfh-jobs-section">
        <div className="cfh-jobs-container">
          <div className="cfh-jobs-header">
            <div className="cfh-input-container">
              <input
                type="search"
                placeholder="Search Jobs"
                aria-label="Search Jobs"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </div>
            <div className="cfh-header-btns">
              <button
                className="border-0 bg-transparent m-1"
                aria-label="Add Job"
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="cfh-jobs-header-icon"
                />
              </button>
              <button
                className="border-0 bg-transparent m-1"
                aria-label="Filter Jobs"
              >
                <FontAwesomeIcon
                  icon={faFilter}
                  className="cfh-jobs-header-icon"
                />
              </button>
            </div>
          </div>
          <div className="cfh-jobs-cards-container">
            {loading
              ? // Display skeleton loaders while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`} // Unique key for the outer div
                    className="cfh-job-card-container"
                  >
                    <Card
                      style={{ width: "18rem" }}
                      className="cfh-job-card m-1"
                    >
                      <Skeleton
                        variant="text"
                        width="70%"
                        animation="wave"
                        key={`skeleton-title-${index}`}
                      />
                      <Skeleton
                        variant="text"
                        width="50%"
                        animation="wave"
                        key={`skeleton-subtitle-${index}`}
                      />
                      <Card.Body>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          key={`skeleton-text-1-${index}`}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          key={`skeleton-text-2-${index}`}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          key={`skeleton-text-3-${index}`}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          key={`skeleton-text-4-${index}`}
                        />
                        <div className="d-flex">
                          <Skeleton
                            variant="button"
                            height={40}
                            className="m-1"
                            width={70}
                            animation="wave"
                            key={`skeleton-button-1-${index}`}
                          />
                          <Skeleton
                            variant="button"
                            height={40}
                            className="m-1"
                            width={70}
                            animation="wave"
                            key={`skeleton-button-2-${index}`}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              : // Display actual job cards when data is loaded
                filteredJobs.map((job) => (
                  <div key={job._id} className="cfh-job-card-container">
                    <Card
                      style={{ width: "18rem" }}
                      className="cfh-job-card m-1"
                      tabIndex={0}
                    >
                      <Card.Body>
                        <Card.Title>{job.role}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {job.companyName}
                        </Card.Subtitle>
                        <Card.Text className="cfh-about-job">
                          {job.aboutRole}
                        </Card.Text>
                        <div className="d-flex cfh-buttons-container">
                          <div className="d-flex">
                            <Button
                              variant="primary"
                              className="m-1"
                              onClick={() => handleApply(job._id)}
                            >
                              {applied[job._id] ? "Applied" : "Apply"}
                            </Button>
                            <Button
                              variant="info"
                              className="m-1"
                              onClick={() => handleMoreClick(job)}
                            >
                              More
                            </Button>
                          </div>
                          <div className="d-flex cfh-hover-icons ms-auto">
                            <button
                              className="border-0 bg-transparent"
                              onClick={() => toggleStar(job._id)}
                              aria-label={
                                starred[job._id]
                                  ? "Remove from favorites"
                                  : "Add to favorites"
                              }
                            >
                              {starred[job._id] ? (
                                <StarIcon
                                  style={{ color: "#ffA500" }}
                                  className="solid-star"
                                />
                              ) : (
                                <StarBorderIcon className="outline-star" />
                              )}
                            </button>
                            <button
                              className="border-0 bg-transparent"
                              onClick={() => handleViewDetails(job)}
                              aria-label="View job details"
                              title="View in new window"
                            >
                              <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="cfh-jobs-modal-section">
        {selectedJob && (
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            aria-labelledby="job-details-modal"
            centered
            dialogClassName="cfh-job-modal"
          >
            <Modal.Header>
              <Modal.Title id="job-details-modal">
                {selectedJob.companyName}
              </Modal.Title>
              <Button variant="link" onClick={handleClose} className="ms-auto">
                <CloseIcon />
              </Button>
            </Modal.Header>
            <Modal.Body className="cfh-modal-body">
              <p>
                <FontAwesomeIcon icon={faIdBadge} className="me-1" />{" "}
                {selectedJob.role}
              </p>
              <p>
                <FontAwesomeIcon icon={faScrewdriverWrench} className="me-1" />{" "}
                {selectedJob.skills.join(", ")}
              </p>
              <p>
                <FontAwesomeIcon icon={faIndianRupeeSign} className="me-1" />{" "}
                {selectedJob.salary}
              </p>
              <p>
                <FontAwesomeIcon icon={faBusinessTime} className="me-1" />{" "}
                {selectedJob.experience} years
              </p>
              <p>
                <FontAwesomeIcon icon={faBriefcase} className="me-1" />{" "}
                {selectedJob.aboutRole}
              </p>
              <p>
                <FontAwesomeIcon icon={faBuilding} className="me-1" />{" "}
                {selectedJob.aboutCompany}
              </p>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />{" "}
                {selectedJob.address}
              </p>
              <p>
                <FontAwesomeIcon icon={faCity} className="me-1" />{" "}
                {selectedJob.city}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handleApply(selectedJob._id)}
              >
                {applied[selectedJob._id] ? "Applied" : "Apply"}
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </section>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message={snackbarMessage} // Use dynamic snackbar message
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default Jobs;
