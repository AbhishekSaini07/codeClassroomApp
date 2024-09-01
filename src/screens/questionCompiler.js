import { StreamLanguage } from "@codemirror/language";
import { c } from "@codemirror/legacy-modes/mode/clike";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Alert, Image, ProgressBar, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import logoImage from "../assets/codeClassroom.png";
import style from "../style_files/Compiler.module.css";

export default function QuestionCompiler() {
  const [codeInput, setCodeInput] = useState("console.log('hello world!');");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stringWithBreaks = output.replace(/\n/g, "</br>");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [inputValue, setInputValue] = useState("");
  const [isCustomInputMode, setIsCustomInputMode] = useState(false);
  const [isTestPassed, setIsTestPassed] = useState(false);
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [progress, setProgress] = useState({
    totalTestCases: 0,
    passedTestCases: 1,
    isRunning: false,
  });

  const toggleInputMode = () => {
    setIsCustomInputMode((prevMode) => !prevMode);
  };

  const handleCodeChange = (value) => {
    setCodeInput(value);
  };

  const inputLabel = isCustomInputMode
    ? "Custom Input:"
    : "Sample Test Case Input:";

  // useEffect(() => {
  //   // Fetch a specific question by ID from the server
  //   // Replace this with your actual fetch logic
  //   fetch(`https://codeclassroom.onrender.com/questions/${id}`, {
  //     credentials: 'include',
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setQuestion(data))
  //     .catch(error => {
  //       console.error('Error fetching questions:', error);

  //       if (error.response && error.response.data.message === 'Unauthorized') {
  //         // Redirect to the login page or handle unauthorized access
  //         // For example, you can use react-router or window.location.href
  //         // to navigate to the login page
  //         navigate('/');
  //       }
  //     })}, [id]);
  useEffect(() => {
    // Fetch a specific question by ID from the server
    // Replace this with your actual fetch logic
    axios
      .get(`https://codeclassroom.onrender.com/questions/${id}`, { withCredentials: true })
      .then((response) => setQuestion(response.data))
      .catch((error) => {
        console.error("Error fetching question:", error);

        if (error.response && error.response.data.message === "Unauthorized") {
          // Redirect to the login page or handle unauthorized access
          // For example, you can use react-router or window.location.href
          // to navigate to the login page
          window.location.href = "/";
        }
      });
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }
  const hiddenTestCases =
    question && question.hidden_testcases ? question.hidden_testcases : [];

  const runSampleTestCase = async () => {
    // Add logic to run sample test case
    try {
      setLoading(true);
      setError(null);

      const result = await axios.post(
        "https://codeclassroom.onrender.com/newCompile",
        {
          language: selectedLanguage,
          code: codeInput,
          input: getSampleInput(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(result.data);
      const o = getSampleOutput();
      const isOutputMatched = result.data.toString().trim() === o.toString().trim();

      if (isOutputMatched) {
        setIsTestPassed(true);
        alert("Sample test case Passed.");
        runHiddenTestCases();
      } else {
        setIsTestPassed(false);
        alert("Sample test case failed. Please try again.");
      }
    } catch (error) {
      console.error("Error calling server:", error);
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          `Server error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const runCustomTestCase = async () => {
    // Add logic to run sample test case
    try {
      setLoading(true);
      setError(null);

      const result = await axios.post(
        "https://codeclassroom.onrender.com/newCompile",
        {
          language: selectedLanguage,
          code: codeInput,
          input: inputValue,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(result.data);
      
    } catch (error) {
      console.error("Error calling server:", error);
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          `Server error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getSampleInput = () => {
    return question.sample_testcases[0].input;
  };

  const getSampleOutput = () => {
    return question.sample_testcases[0].output;
  };
  const runHiddenTestCases = async () => {
    try {
      let allHiddenTestCasesPassed = true;

      setProgress((prevProgress) => ({
        ...prevProgress,
        isRunning: true,
        totalTestCases: hiddenTestCases.length,
      }));

      for (const [index, hiddenTestCase] of hiddenTestCases.entries()) {
        const hiddenResult = await axios.post(
          "https://codeclassroom.onrender.com/newCompile",
          {
            language: selectedLanguage,
            code: codeInput,
            input: hiddenTestCase.input,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const isHiddenOutputMatched =
          hiddenResult.data.toString().trim() ===
          hiddenTestCase.output.toString().trim();

        if (isHiddenOutputMatched) {
          setProgress((prevProgress) => ({
            ...prevProgress,
            passedTestCases: prevProgress.passedTestCases + 1,
          }));
          console.log("Hidden test case passed:", hiddenTestCase);
          //alert(index, "Hidden test case passed:", hiddenTestCase); // to check all testcase run or not
        } else {
          allHiddenTestCasesPassed = false;
          console.log("Hidden test case failed:", hiddenTestCase);
        }

        // if (progress.passedTestCases === hiddenTestCases.length-1) {
        //   setProgress({
        //     totalTestCases: hiddenTestCases.length,
        //     passedTestCases: 0,
        //     isRunning: false,
        //   });
        //   break;
        // }
        //   // setProgress((prevProgress) => ({
        //   //   ...prevProgress,
        //   //   isRunning: false,
        //   // }));

        //   if (allHiddenTestCasesPassed) {
        //     alert('All hidden test cases passed! Question completed successfully.');
        //   }
        // }
        
      }
      
      setProgress({
        totalTestCases: hiddenTestCases.length,
        passedTestCases: progress.passedTestCases,
        isRunning: false,
      });
      alert("All hidden test cases passed! Question completed successfully.");
    } catch (error) {
      console.error("Error running hidden test cases:", error);
    }
  };

  const handleCompile = async () => {
    isCustomInputMode ? runCustomTestCase():runSampleTestCase();
    
  };

  return (
    <div className="full">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className={style.header}>
          <Image src={logoImage} alt="Logo" height="48px" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              <div className={style.langbutton}>
                Language:&nbsp;
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python3">python3</option>
                  <option value="java">java</option>
                  <option value="c">c</option>
                  <option value="cpp17">cpp17</option>
                  <option value="dart">dart</option>
                </select>
              </div>
              <span>&emsp; </span>
              <button className={style.RunButton} onClick={handleCompile}>
                Run Code
              </button>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {progress.isRunning && (
        <div className={style.overlay}>
          <div className={style.progresscontainer}>
            <ProgressBar
              animated
              now={(progress.passedTestCases / progress.totalTestCases) * 100}
              label={`${progress.passedTestCases}/${progress.totalTestCases} Hidden Test Cases Passed`}
            />
          </div>
        </div>
      )}
      {error && (
        <div className={style.errorContainer}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      <div className={style.cBody}>
        <Row>
          <Col sm={3}>
            <div className={style.lBox}>
              <h2>{question.title}</h2>
              <p>
                <strong>Problem Statement:</strong> {question.problem_statement}
              </p>
              <p>
                <strong>Difficulty:</strong> {question.difficulty}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {question.tags ? question.tags.join(", ") : "No tags available"}
              </p>

              <p>
                <strong>Input Format:</strong> {question.input_format}
              </p>
              <p>
                <strong>Output Format:</strong> {question.output_format}
              </p>
              <p>
                <strong>Constraints:</strong> {question.constraints}
              </p>

              <h4>Sample Test Cases:</h4>
              {question.sample_testcases &&
                question.sample_testcases.map((sample, index) => (
                  <div key={index}>
                    <strong>Input:</strong>{" "}
                    {sample.input ? sample.input : "No input available"} <br />
                    <strong>Output:</strong>{" "}
                    {sample.output ? sample.output : "No output available"}{" "}
                    <br />
                    <strong>Explanation:</strong>{" "}
                    {sample.explanation
                      ? sample.explanation
                      : "No explanation available"}
                    <hr />
                  </div>
                ))}
            </div>
          </Col>
          <Col sm={9}>
            {" "}
            <Row>
              <Col>
                <CodeMirror
                  className={style.cb}
                  value={codeInput}
                  height="60vh"
                  theme={xcodeLight}
                  extensions={[StreamLanguage.define(c)]}
                  onChange={handleCodeChange}
                />
              </Col>
            </Row>
            <Row>
              <Col className={style.IOs}>
                <label htmlFor="inputTextArea">
                  {" "}
                  <label>Custom Input </label> {"  "}
                  <label className={style.switch}>
                    <input
                      type="checkbox"
                      checked={isCustomInputMode}
                      onChange={toggleInputMode}
                    />
                    <span className={style.slider}></span>
                  </label>
                  
                </label>
                <textarea
                  id="inputTextArea"
                  className={style.fullwidth}
                  value={isCustomInputMode ? inputValue : getSampleInput()}
                  onChange={(e) => {
                    if (isCustomInputMode) {
                      setInputValue(e.target.value);
                    }
                  }}
                  placeholder={isCustomInputMode ? "Additional Input" : ""}
                  disabled={!isCustomInputMode}
                />
              </Col>
              <Col className={style.IOs}>
                <label htmlFor="outputTextArea">Output:</label>
                {loading && (
                  <Spinner animation="border" role="status" variant="primary" />
                )}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && !error && (
                  <div
                    id={style.outputbloc}
                    dangerouslySetInnerHTML={{ __html: stringWithBreaks }}
                  ></div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
