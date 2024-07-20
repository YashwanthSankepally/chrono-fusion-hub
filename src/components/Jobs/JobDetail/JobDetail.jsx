import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import "./JobDetail.scss";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const JobDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract query parameters
  const job = {
    _id: queryParams.get("id"),
    companyName: queryParams.get("companyName"),
    role: queryParams.get("role"),
    skills: queryParams.get("skills")?.split(",") || [],
    salary: queryParams.get("salary"),
    experience: queryParams.get("experience"),
    aboutJobRole: queryParams.get("aboutJobRole"),
    aboutCompany: queryParams.get("aboutCompany"),
    address: queryParams.get("address"),
    city: queryParams.get("city"),
    applied: queryParams.get("applied") === "true", // Parse applied status as boolean
  };

  const [isApplied, setIsApplied] = useState(job.applied);

  useEffect(() => {
    // Update the applied status if job data changes
    setIsApplied(job.applied);
  }, [job.applied]);

  const back = () => {
    navigate("/home");
  };

  const handleApply = async () => {
    try {
      const response = await axios.post("http://localhost:5000/jobs/apply", {
        jobId: job._id,
      });
      if (response.status === 200) {
        setIsApplied(true);
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <Header />
      <section className="cfh-job-detail-container">
        <h1>{job.companyName}</h1>
        <p>
          <strong>Role:</strong> {job.role}
        </p>
        <p>
          <strong>Skills:</strong> {job.skills.join(", ")}
        </p>
        <p>
          <strong>Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>Experience:</strong> {job.experience}
        </p>
        <p>
          <strong>About Job Role:</strong> {job.aboutJobRole}
        </p>
        <p>
          <strong>About Company:</strong> {job.aboutCompany}
        </p>
        <p>
          <strong>Address:</strong> {job.address}
        </p>
        <p>
          <strong>City:</strong> {job.city}
        </p>
        <div className="d-flex">
          <Button variant="primary" className="m-1" onClick={handleApply}>
            {isApplied ? "Applied" : "Apply"}
          </Button>
          <Button variant="info" className="m-1" onClick={back}>
            Back
          </Button>
        </div>
      </section>
    </>
  );
};

export default JobDetail;
