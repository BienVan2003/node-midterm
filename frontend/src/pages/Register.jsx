import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { apiRegister } from "../services";

export default function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const { password, confirmPassword, username } = values;
        if (password !== confirmPassword) {
            toast.error(
                "Mật khẩu và mật khẩu xác nhận phải giống nhau!"
            );
            return false;
        } else if (username.length < 3) {
            toast.error(
                "Username phải lớn hơn 3 ký tự"
            );
            return false;
        } else if (password.length < 6) {
            toast.error(
                "Password phải bằng hoặc lớn hơn 6 ký tự!"
            );
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        console.log(process.env.REACT_APP_SERVER_URL)
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await apiRegister(username, password,);

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
            <FormContainer>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>Đăng ký</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        id="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Đăng ký</button>
                    <span>
                        Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                    </span>
                </form>
            </FormContainer>
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
    padding: 3rem 5rem;
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
