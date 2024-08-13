import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [otp, setOtp] = useState("");
  // const [otpSent, setOtpSent] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        signIn();
        navigate("/");
      }
      // if (res.ok) {
      //   setOtpSent(true);
      //   dispatch(signInSuccess());
      // }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("/api/auth/verify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: formData.email, otp }),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       return dispatch(signInFailure(data.message));
  //     }

  //     if (res.ok) {
  //       dispatch(signInSuccess(data));
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     dispatch(signInFailure(error.message));
  //   }
  // };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="font-bold text-[#2D286A] sm:text-4xl text-3xl font-poppins"
          >
            <span className="px-2 py-1 rounded-lg text-[#ED1B4A] font-racing">
              BFAST
            </span>
            Dashboard
          </Link>
          <p className="text-sm mt-5 font-poppins">
            Sign in with Email and Password or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label className="font-poppins" value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="font-poppins" value="Your Password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              className="font-poppins"
              type="submit"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(90deg, rgba(237,27,74,1) 35%, rgba(45,40,106,1) 75%)",
              }}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3 font-poppins">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="font-poppins">Dont Have an account?</span>
            <Link
              to="/sign-up"
              className="text-blue-500 font-poppins font-semibold"
            >
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 font-poppins" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
