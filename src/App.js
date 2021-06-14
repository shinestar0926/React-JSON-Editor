import React, { useState, useEffect } from "react";
import axios from 'axios';
import $RefParser from "@apidevtools/json-schema-ref-parser";
import { TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import JsonSchema from 'views/JsonSchema';

const textareaUseStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
  },
  textareaDiv: {
    width: "40%",
    position: "relative"
  },
  textareaTitle: {
    textAlign: "center",
    width: "140px",
    fontSize: "18px",
    margin: "5px auto",
    padding: "5px",
    border: "1px solid black",
    boxShadow: "2px 2px 2px 2px #888"
  },
  textarea: {
    width: "100%",
    resize: "none",
    "&:focus": {
      outline: "none"
    }
  },
  submitBtn: {
    position: "absolute",
    right: "2px",
    top: "20px",
    border: "1px solid #888",
    borderRadius: "5px",
    "&:focus": {
      outline: "none"
    },
    "&:hover": {
      backgroundColor: "#eee",
      boxShadow: "0 0 1px 1px #ddd"
    }
  },
  errMsg: {
    color: "red",
    margin: "0px"
  }
})


export default function App() {

  const textareaClasses = textareaUseStyles();
  const [jsonSchema, setJsonSchema] = useState(undefined);
  const init = {
    "parameters": {
      "unit_length": "m"
    }
  }
  const [propOutput, setPropOutput] = useState(init);
  const [initOutput, setInitOutput] = useState(JSON.stringify(init, null, "\t"));
  const [err, setError] = useState(false);
  const [output, setOutput] = useState({});

  useEffect(() => {
    axios.get(`https://www.simulation.cloud/resources/tidy3d.json.schema.txt`)
      .then(res => {
        const jsonSchema = res.data;
        $RefParser.dereference(jsonSchema).then((data) => {
          setJsonSchema(data);
        });
      })
  }, []);

  function changeValue(value) {
    setOutput(value);
  }

  function submitInitOutput() {
    try {
      let value = JSON.parse(initOutput);
      setPropOutput(value);
      setError(false);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  function handleKey(e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      e.target.value = e.target.value.substring(0, start) +
        "\t" + e.target.value.substring(end);

      // put caret at right position again
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
  }

  return (
    <div>
      <JsonSchema schema={jsonSchema} value={propOutput} hidden={["run_parameters"]} onChange={changeValue} />
      <div className={textareaClasses.root}>
        <div className={textareaClasses.textareaDiv}>
          <div className={textareaClasses.textareaTitle}>Build Form</div>
          <button className={textareaClasses.submitBtn} onClick={submitInitOutput}>Submit</button>
          {err && <p className={textareaClasses.errMsg}>{err.name + " : " + err.message}</p>}
          <TextareaAutosize rowsMin={10} rowsMax={15} className={textareaClasses.textarea} value={initOutput} onChange={(e) => setInitOutput(e.target.value)} onKeyDown={handleKey} style={err ? { borderColor: "red" } : {}} />
        </div>
        <div className={textareaClasses.textareaDiv}>
          <div className={textareaClasses.textareaTitle}>Build JSON</div>
          <TextareaAutosize rowsMin={10} rowsMax={15} className={textareaClasses.textarea} value={JSON.stringify(output, null, "\t")} readOnly />
        </div>
      </div>
    </div>
  )
}