import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ParaSelect from './paraSelect';
import ParaNumber from './paraNumber';
import ParaInteger from './paraInteger';
import ParaArraySelect from './paraArraySelect';
import ParaObjectSelect from './paraObjectSelect';
import ParaString from './paraString';
import ParaBoolean from './paraBoolean';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

const inputUseStyles = makeStyles((theme) => ({
  root: {
    '.MuiOutlinedInput-input': {
        padding: '6.5px 14px',
    },
  },
  custom: {
    width: '100%',
    margin: 0,
    background: 'transparent',
    outline: 'none',
    border: 'none',
    borderLeft: '2px solid #808080',
    paddingLeft: "10px",
    paddingRight: "10px",
  }
}));

export default function InputSquare( props ) {
  const inputClasses = inputUseStyles();

  const treeClasses = props.treeClasses;
  const required = props.required;
  const key = props.index;
  const value = props.value;
  const defaultValue = props.defaultValue;
  const property = props.property;
  const onChangeFunc = props.onChange || function () {};
  const error = props.error;
  function changeValue(newValue, error) {
    onChangeFunc(newValue, error);
  }

  switch (property.type) {
    case 'string':
      if(property.enum) return (
        <div className={treeClasses.itemRow}>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
            {required ? 
            <div className={treeClasses.itemText}>{key}*</div> : 
            <div className={treeClasses.itemText}>{key}</div>}
          </Tooltip>
          <div className={treeClasses.item}>
            <ParaSelect
              property={property}
              value={value}
              const error = {props.error}
              onChange={changeValue}
            />
          </div>
        </div>
      );
      else return (
        <div className={treeClasses.itemRow}>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
            {required ? 
            <div className={treeClasses.itemText}>{key}*</div> : 
            <div className={treeClasses.itemText}>{key}</div>}
          </Tooltip>
          <div className={treeClasses.item}>
            <ParaString
              property={property}
              cClass={inputClasses.custom}
              value={value}
              onChange={changeValue}
            />
          </div>
        </div>
      );
    case 'boolean':
      return (
        <div className={treeClasses.itemRow}>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
            {required ? 
            <div className={treeClasses.itemText}>{key}*</div> : 
            <div className={treeClasses.itemText}>{key}</div>}
          </Tooltip>
          <div className={treeClasses.item}>
            <ParaBoolean
              property={property}
              value={value}
              onChange={changeValue}
            />
          </div>
        </div>
      );
    case 'number': 
      return (
        <div className={treeClasses.itemRow}>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
            {required ? 
            <div className={treeClasses.itemText}>{key}*</div> : 
            <div className={treeClasses.itemText}>{key}</div>}
          </Tooltip>
          <div className={treeClasses.item}>
            <ParaNumber
              property={property}
              cClass={inputClasses.custom}
              value={value}
              error={error}
              onChange={changeValue}
            />
          </div>
        </div>
      );
    case 'integer':
      return (
        <div className={treeClasses.itemRow}>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
            {required ? 
            <div className={treeClasses.itemText}>{key}*</div> : 
            <div className={treeClasses.itemText}>{key}</div>}
          </Tooltip>
          <div className={treeClasses.item}>
            <ParaInteger
              property={property}
              cClass={inputClasses.custom}
              value={value}
              error={error}
              onChange={changeValue}
            />
          </div>
        </div>
      );
    case 'array':
      return (
        <ParaArraySelect
          property={property}
          treeClasses={treeClasses}
          required={required}
          index={key}
          value={value}
          defaultValue={defaultValue}
          error={error}
          onChange={changeValue}
        />
      );
    case 'object':
      return (
        <ParaObjectSelect
          property={property}
          treeClasses={treeClasses}
          required={required}
          index={key}
          value={value}
          defaultValue={defaultValue}
          error={error}
          onChange={changeValue}
        />
      );
    default:
      if(!property.const) return (
        <div className={treeClasses.itemRow}>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
            {required ? 
            <div className={treeClasses.itemText}>{key}*</div> : 
            <div className={treeClasses.itemText}>{key}</div>}
          </Tooltip>
          <div className={treeClasses.item}>
            <ParaString
              property={property}
              cClass={inputClasses.custom}
              value={value}
              onChange={changeValue}
            />
          </div>
        </div>
      );
      else return (
        <div className={treeClasses.itemRow}>
          <div className={treeClasses.itemText}>{key}</div>
          <div className={treeClasses.item}>
            <p className={inputClasses.custom}>{value}</p>
          </div>
        </div>
      );
  }
}
