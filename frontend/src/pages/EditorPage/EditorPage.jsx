import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";

import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";

import {
  Banner,
  CodeEditor,
  Testcase,
  Problem,
} from "../../modules/organisms/CodeEditor";
import { getTimeDiff } from "../../modules/organisms/AssignmentOverview/AssignmentOverview";

const EditorPageGrid = styled.div`
  display: inline-grid;
  grid-template:
    "a c"
    "b c";
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const ProblemWrapper = styled.div`
  grid-area: a;
`;
const TestcaseWrapper = styled.div`
  grid-area: b;
`;
const CodeEditorWrapper = styled.div`
  grid-area: c;
  grid-row: 1 / 3;

  width: 550px;
`;

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const monaco = useMonaco();
  const params = useParams();

  const [lecture, setLecture] = useState();
  const [ass, setAss] = useState();

  const settingSelector = useSelector((state) => state.SettingReducer);

  useEffect(() => {
    if (!monaco) return;

  }, [monaco]);

  useEffect(() => {
    setLecture(location.state.lecture);
    apiClient.get(`/api/assignments/${params.assignment_id}/`).then((value) => {
      setAss(value.data.data);
      // * 테케 없으면 새로 추가
      try {
        if(!value.data.data.testcases.length) {
        apiClient.post("/api/testcases/", {
          input: "nums = [100,200,300,400]",
          output: "[0,1]",
          assignment_id: params.assignment_id,
          is_hidden: false
        }).then((value) => {
          apiClient.get(`/api/assignments/${params.assignment_id}/`).then((value) => {
            setAss(value.data.data);
          })
        })
      }else{
        // alert(JSON.stringify(value.data.data));
        setAss(value.data.data);
      }
      } catch (error) {
        
      }
      
    })
  },[])

  if(!ass) {
    return <></>;
  }


  return (
    <>
      {/* Banner */}
      <Banner
        lectureName={lecture.name}
        reamainingTime={`${new Date(ass.deadline)}`}
        assignmentName={ass.name}
        assignment={ass}
      />
      {/* Problem section*/}
      <EditorPageGrid>
        <ProblemWrapper style={{ marginLeft: "43px", marginTop: "25px" }}>
          {/* scroll test */}
          <Problem bodyContent={ass.question} />
        </ProblemWrapper>
        {/* TestCase */}
        <TestcaseWrapper style={{ marginLeft: "43px", marginTop: "9.77px" }}>
          <Testcase
            // // TODO: 오브젝트 형태로 변경해서 표시
            bodyContent={`테스트케이스 1>
            input: [1,2,3,4]
            output: [소공개]`}
            testCases={ass.testcases}
            />
        
        </TestcaseWrapper>

        {/* Editor */}
        <CodeEditorWrapper
          style={{
            marginLeft: "12.72px",
            marginTop: "25px",
            marginRight: "43px",
          }}
        >
          <CodeEditor assignment={ass}/>
        </CodeEditorWrapper>
      </EditorPageGrid>
    </>
  );
};

