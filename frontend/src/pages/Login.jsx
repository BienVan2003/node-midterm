import React, { useEffect, useState } from "react";
import { Bars } from 'react-loader-spinner';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { apiLogin } from "../services";

export default function Login() {
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });


  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Email và Password là bắt buộc.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    // Đợi một chút trước khi xử lý
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await apiLogin(username, password);
      if (data.status === false) {
        toast.error(data.message);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      {isLoading ? (<FormContainer><Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /></FormContainer>) : (<FormContainer>
        <form >
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Đăng nhập</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={() => handleLogin()}>Đăng nhập</button>
          <span>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </span></form>
      </FormContainer>)}

      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: #131324; */
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgb(70 84 233);
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    /* background-color: transparent; */
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    /* color: white; */
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: rgb(0 0 0);
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: rgb(7, 188, 12);
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: rgb(255 255 255);
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
