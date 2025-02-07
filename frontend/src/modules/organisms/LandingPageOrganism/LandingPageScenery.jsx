import styled from "styled-components";

import { Img } from "../../atoms";

const SceneryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${(props) => (props.darkMode ? "#000000" : "#FFFFFF")};
`;

const Title = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 65.6711px;
  line-height: 76px;
  /* identical to box height */

  color: ${(props) => (props.darkMode ? "#D8D8D8" : "#000000")};
  text-align: center;
`;

const SubTitle = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: center;

  color: ${(props) => (props.darkMode ? "#D8D8D8" : "#000000")};
`;

export const LandingPageScenery = ({ darkMode, ...restProps }) => {
  console.log(darkMode);
  return (
    <>
      <SceneryContainer darkMode={darkMode}>
        <div style={{ marginTop: "41px" }}>
          <Title darkMode={darkMode}>Coding Cat</Title>
        </div>
        <div style={{ marginTop: "15.67px" }}>
          <SubTitle darkMode={darkMode}>
            프로그래밍 문제를 풀고 온라인으로 채점받을 수 있는 곳입니다.
          </SubTitle>
        </div>
        <Img
          src={darkMode ? "images/line1_black.svg" : "/images/Line_24.svg"}
          className="illustrationOne1"
          alt="scenery1"
          style={{ marginTop: "34.33px" }}
        />

        <Img
          src={darkMode ? "images/line2_black.svg" : "/images/Line_23.svg"}
          className="illustrationOne2"
          alt="scenery2"
          style={{ marginTop: "17px" }}
        />

        <Img
          src="/images/img_illustration1_911X788.svg"
          className="illustrationOne3"
          alt="scenery3"
          style={{ marginTop: "17px", marginBottom: "78px" }}
        />
      </SceneryContainer>
    </>
  );
};
