import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ParaNumber from './paraNumber';
import ParaInteger from './paraInteger';
import useOutsideClick from '../useOutsideClick';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

const warning = {'border': '1px solid red'};

const paraSelectStyles = makeStyles((theme) => ({
  root: {
    borderTop: '2px solid grey',
  },
  select: {
    paddingLeft: '10px',
    paddingRight: '40px',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
      content: `url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
      position: 'absolute',
      right: '6px',
      top: '0px',
    },
    borderLeft: '2px solid #808080',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  options: {
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    border: '1px solid black',
    cursor: 'default',
    background: '#eeeeee',
  },
  option: {
    width: 'calc(100% - 20px)',
    display: 'inline-block',
    marginLeft: '10px',
    background: 'transparent',
    border: 'none',
    borderBottom: "1px dotted grey",
    '&:focus': {
      outline: 'none',
    }
  },
}))

export default function ParaObjectSelect( props ) {
  const ref = useRef();
  const paraSelectClasses = paraSelectStyles();
  const treeClasses = props.treeClasses;
  const required = props.required;
  const key = props.index;
  const error = props.error;
  const property = props.property.properties;
  const defaultValue = props.defaultValue;
  let value = props.value;
  if(!value) value = defaultValue;
  const onChangeFunc = props.onChange || function(){};
  const [active, setActive] = useState(false);

  function toggleActive() {
    if(active) setActive(false);
    else setActive(true);
  }

  function changeValue(eachValue, eachError, key) {
    const newValue = JSON.parse(JSON.stringify(value));
    let newError = error ? JSON.parse(JSON.stringify(error)) : undefined;
    if(!newError) newError = {};
    if(!newError[property.type.const]) newError[property.type.const] = {};
    newError[property.type.const][key] = eachError;
    newValue[property.type.const][key] = eachValue;
    onChangeFunc(newValue, newError);
  }
  
  function checkError() {
    if(!error) return false;
    for(let each in error[property.type.const]) {
      if(error[property.type.const][each]) return true;
    }
    return false;
  }

  useOutsideClick(ref, () => {
    setActive(false);
  });
  return(
    <div className={treeClasses.itemRow} tabIndex="0" ref={ref}>
      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
        {required ? 
        <div className={treeClasses.itemText}>{key}*</div> : 
        <div className={treeClasses.itemText}>{key}</div>}
      </Tooltip>
      <div className={treeClasses.item}>
        <div onClick={toggleActive} className={paraSelectClasses.select} style={checkError() ? warning : {}}>
          {value[property.type.const] ? '{ '+Object.keys(value[property.type.const]).map(key=>value[property.type.const][key]).join(' , ')+' }' : ''}
        </div>
      </div>
      <Grid container className={paraSelectClasses.root} style={active ? {display: "flex"} : {display: "none"}}>
        {Object.keys(property).map((key, index) => (
          <Grid item xs={Object.keys(property).length > 3 ? 6 : 12 / (Object.keys(property).length-1)} md={Object.keys(property).length > 4 ? 4 : 12 / (Object.keys(property).length-1)} lg={Object.keys(property).length > 4 ? 4 : 12 / (Object.keys(property).length-1)} key={"option"+index} style={{padding: "2px", outline: "1px solid #bbbbbb"}}>
             <div style={{display: "flex"}}>
                &ensp;<span style={{marginRight: "20px"}}>{key+": "}</span>
                {property[key].type === "number" ? 
                  <ParaNumber
                    property={property[key]}
                    cClass={paraSelectClasses.option}
                    value={value[property.type.const] ? value[property.type.const][key] : ''}
                    error={error && error[property.type.const] ? error[property.type.const][key] : undefined}
                    index={key}
                    onChange={(eachValue, error) => changeValue(eachValue, error, key)}
                  /> :
                (property[key].type === "integer" ?
                <ParaInteger
                  property={property[key]}
                  cClass={paraSelectClasses.option}
                  value={value[property.type.const] ? value[property.type.const][key] : ''}
                  error={error && error[property.type.const] ? error[property.type.const][key] : undefined}
                  index={key}
                  onChange={(eachValue, error) => changeValue(eachValue, error, key)}
                /> : (property[key].const ? property[key].const : '')
                )}
             </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}