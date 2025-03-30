import React, { useState, useContext } from "react";
import axios from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
    } else {
      // submit form to server
      axios
        .post("/users/register", { fullname, email, password })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setUser(res.data.user);
          // console.log(res.data.user);
          setErrors(false);
          // alert("Form submitted successfully for " + fullname);
          toast.success("Register Successful for " + fullname + '!');

          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
          setErrors(err.response.data.msg);
        });
    }
  };

  return (
    <div>
      <div className=" w-full h-screen flex items-center justify-center bg-[#f4f4f4]">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-4xl font-[500] text-black">Register</h1>
          <form
            onSubmit={submitHandler}
            className=" form h-[26rem] flex flex-col items-center  justify-center rounded-xl p-9 gap-6"
            action="#"
          >
            <label className="input inputs validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                required
                placeholder="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                title="Only letters, numbers or dash"
              />
            </label>
            {/* <p className="validator-hint">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p> */}
            <label className="input inputs validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@site.com"
                required
              />
            </label>
            {/* <div className="validator-hint hidden">Enter valid email address</div> */}
            {/* <div></div> */}
            <label className="input inputs validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <label className="input inputs validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>

            {errors && <p className="text-red-500 text-xs">{errors}</p>}

            {/* <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p> */}
            <div className="w-60 h-10 text-sm flex items-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="hover:underline pl-1 text-blue-700 cursor-pointer"
              >
                {" "}
                Log In
              </Link>{" "}
            </div>
            <input
              className=" inputs  w-60 h-10 rounded-lg  text-sm"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
