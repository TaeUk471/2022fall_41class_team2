// 제출 결과 창

import { SubmissionMaster } from "../../molecules";

export const SubmissionResult = ({ submitResult, darkMode, ...restProps }) => {
  return <SubmissionMaster resultObj={submitResult} darkMode={darkMode} />;
};
