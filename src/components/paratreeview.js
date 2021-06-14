import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../assets/css/schema.css';
import InputSquare from './parameter/inputSquare';

const treeUseStyles = makeStyles({
  root: {
    height: '100%',
    maxWidth: 500,
    padding:'5%',
  },
  warningMsg: {
    position: 'absolute',
    top: -19,
    left: 0,
    color: 'red',
    fontSize: '12px',
  },
  buttonDiv: {
    top: "-26px",
    position: "absolute",
    right: "0",
    display: "flex",
    justifyContent: "flex-end"
  },
  saveBtn: {
    fontSize: "15px",
    textAlign: "center",
    color: "#444444",
    border: "none",
    backgroundColor: "transparent",
    "&:hover": {
      fontWeight: "bold",
    },
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      color: "#888888",
      cursor: "not-allowed"
    }
  },
  main: {
    minWidth: '290px',
    position: 'relative',
    display: 'block',
  },
  itemRow: {
    border: '1px solid grey',
    display: 'flex',
    flexFlow: 'wrap',
    '&:focus': {
      outline: 'none',
    },
  },
  itemText: {
    display: 'inline-block',
    width: '50%',
    paddingLeft: '15px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    cursor: 'default'
  },
  item: {
    display: 'inline-block',
    width: '50%',
    whiteSpace: 'nowrap',
  },
  tooltip: {
    fontSize: '12px',
    margin: 0,
    padding: 0,
    fontWeight: 300,
  },
});

export default function ParaTreeView( props ) {
  const treeClasses = treeUseStyles();

  const setting = props.setting;
  const property = props.property;
  const defaultValue = props.defaultValue;

  const onChange = props.onChange;
  const onChangeType = props.onChangeType;
  const error = props.error;

  function changeValue(key, newValue, eachError) {
    const newSetting = JSON.parse(JSON.stringify(setting));
    newSetting[key] = newValue;
    let newError = error ? JSON.parse(JSON.stringify(error)) : {};
    newError[key] = eachError;
    onChange(newSetting, newError);
  }
  return (
    <div>
        <div className={treeClasses.main}>
          <div className={treeClasses.warningMsg}>* must be required!</div>
          {property && Object.keys(property).length && Object.keys(property.properties).map((key, i)=>
            key !== "type" ? (<InputSquare 
              key = {i} 
              treeClasses = {treeClasses}
              index={key}
              value={setting[key]} 
              error={error && error[key] ? error[key] : undefined}
              required = {property.required && property.required.includes(key)} 
              property={property.properties[key]} 
              defaultValue={defaultValue[key]}
              onChange={(newValue, error) => changeValue(key, newValue, error)}
            />) : (<InputSquare 
              treeClasses={treeClasses}
              key = {i}
              value={setting[key]}
              index={key}
              property={property.properties[key]}
              onChange={(newValue) => onChangeType(newValue)}
            />))
          }
        </div>
    </div>
  );
}
