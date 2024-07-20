import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import "./Login.scss";

const Login = () => {
  // State to toggle between Sign Up and Login forms
  const [isSignUp, setIsSignUp] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State to track touched fields for validation
  const [touched, setTouched] = useState({});

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to toggle between Sign Up and Login forms
  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({ username: "", email: "", password: "" });
    setTouched({});
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle input blur event for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Function to validate form data
  const validate = () => {
    const errors = {};
    if (!formData.username && isSignUp) {
      errors.username = "Username is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Get validation errors
  const errors = validate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("username", formData.username);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("password", formData.password);

      // Log the stored data
      // console.log('Username:', localStorage.getItem('username'));
      // console.log('Email:', localStorage.getItem('email'));
      // console.log('Password:', localStorage.getItem('password'));

      navigate("/home");
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="cfh-auth-container">
        <div className="cfh-form-container">
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="cfh-form-group">
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
              </div>
            )}
            <div className="cfh-form-group">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </div>
            <div className="cfh-form-group">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="border-0 bg-transparent text-dark"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
          <a href="#" onClick={handleToggle}>
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
