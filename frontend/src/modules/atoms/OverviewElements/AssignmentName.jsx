// 과제명
import styled from "styled-components";
import { Text } from "../../atoms";

const AssignmentNameStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;

  border-radius: 10px;

  width: 550px;
  height: 68px;
  color: #000000;
  background: ${(props) => props.background};
`;

export const AssignmentName = ({ assignment, background, submission }) => {
  // console.log(`SUBMISSION PROP: ${submission}`);

  if (submission) {
    background = `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${background}`;
    return (
      <AssignmentNameStyle background={background}>
        <div style={{ marginRight: "12px" }}>{assignment}</div>
      </AssignmentNameStyle>
    );
  } else {
    return (
      <AssignmentNameStyle background={background}>
        <div style={{ marginRight: "12px" }}>{assignment}</div>
      </AssignmentNameStyle>
    );
  }
};
