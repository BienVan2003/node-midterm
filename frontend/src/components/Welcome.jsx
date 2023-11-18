import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function fetchData() {
      if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
        setUserName(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          ).username
        );
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Xin chào, <span>{userName}!</span>
      </h1>
      <h3>Hãy chọn một cuộc trò chuyện để bắt đầu</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: rgb(154, 134, 243);
  }
`;
