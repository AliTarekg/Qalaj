import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useTheme } from "../ThemeContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={`container py-5 d-flex align-items-center justify-content-center`}
      style={{ minHeight: "80vh" }}
    >
      <div
        className={`card shadow-lg p-4 w-100`}
        style={{
          maxWidth: 400,
          background: theme === "dark" ? "var(--color-card)" : "#fff",
          color: "var(--color-text-dark)",
          borderRadius: 18,
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: 800 }}>
          Register
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            try {
              await register({ username, email, password });
              navigate("/dashboard");
            } catch (err) {
              setError(err.response?.data?.message || "Registration failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            style={{ borderRadius: 10 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
