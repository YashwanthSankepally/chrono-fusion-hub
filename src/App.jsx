import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Jobs from "./components/Jobs/Jobs";
import JobDetail from "./components/Jobs/JobDetail/JobDetail";
import Courses from "./components/Courses/Courses";
import Shop from "./components/Shop/Shop";
import PageNotFound from "./components/PageNotFound/PageNotFound"

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/job-detail" element={<JobDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cfh-shop" element={<Shop />} />
          <Route path="/page-not-found" element={< PageNotFound/>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
