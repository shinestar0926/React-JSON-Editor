import React, {useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ParaNumber from './paraNumber';
import ParaInteger from './paraInteger';
import ParaSelect from './paraSelect';
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
    zIndex: 100000,
    left: 0,
    right: 0,
    border: '1px solid black',
    cursor: 'default',
    background: '#eeeeee',
  },
  option: {
    width: 'calc(100% - 40px)',
    display: 'inline-block',
    marginLeft: '10px',
    background: 'transparent',
    border: 'none',
    borderBottom: "1px dotted grey",
    '&:focus': {
      outline: 'none',
    }
  },
  button: {
    color: '#0056b3',
    '&:hover': {
      textDecoration: 'underline',
    },
    cursor: 'default',
  }
}))

export default function ParaArraySelect( props ) {
  const ref = useRef();
  const paraSelectClasses = paraSelectStyles();
  const treeClasses = props.treeClasses;
  const required = props.required;
  const key = props.index;
  const error = props.error;
  const onChangeFunc = props.onChange || function(){};
  const value = props.value;
  const defaultValue = props.defaultValue;
  const [active, setActive] = useState(false);
  const additionalItems = props.property.additionalItems === false ? false : true;
  const property = props.property;

  // useEffect(() => {
  //   if(value === undefined) onChangeFunc([], undefined);
  // })

  function toggleActive() {
    if(active) setActive(false);
    else setActive(true);
  }

  function changeValue(eachValue, eachError, index, eachIndex) {
    const newValue = value ? [...value] : [];
    if(eachIndex !== undefined) {
      if(!newValue[eachIndex]) newValue[eachIndex] = [];
      newValue[eachIndex][index] = eachValue;
    }
    else newValue[index] = eachValue;
    const newError = error && Array.isArray(error) ? [...error] : [];
    if(eachIndex !== undefined) {
      if(!newError[eachIndex]) newError[eachIndex] = [];
      newError[eachIndex][index] = eachError;
    }
    else newError[index] = eachError;
    onChangeFunc(newValue, newError);
  }

  function removeIndex(event, index) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if(value.length > 1) {
      const newValue = [...value];
      newValue.splice(index, 1);
      let newError;
      if(error) newError = JSON.parse(JSON.stringify(error));
      else newError = error;
      if(newError && Array.isArray(newError) && newError.length > index) newError.splice(index, 1);
      onChangeFunc(newValue, newError);
    }
  }

  function addNewIndex() {
    let newValue = value ? [...value] : [[]];
    if(defaultValue !== undefined) newValue.push(JSON.parse(JSON.stringify(defaultValue)));
    else newValue.push([]);
    onChangeFunc(newValue, error);
  }

  useOutsideClick(ref, () => {
    setActive(false);
  });

  function checkError() {
    if(!error) return false;
    for(let each of error) {
      if(typeof each === "object") {
        if(Array.isArray(each)) {
          for(let i of each) {
            if(i) return true;
          }
        }
        else {
          for(let i in each) {
            if(i) return true;
          }
        }
      }
      else if(each) return true;
    }
    return false;
  }

  function getContent() {
    switch(property.items.type) {
      case 'array':
        if(!value || value.length === 1) {
          return (
            <div style={active ? {display: "block", width: '100%'} : {display: "none"}}>
              <Grid container className={paraSelectClasses.root}>
                <Grid item xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center", outline: "1px solid #bbbbbb"}}>
                </Grid>
                <Grid item xs={11}>
                  <Grid container style={{flexWrap: "nowrap"}}>
                  {property.items.items.map((each, index) => (
                    <Grid item xs={property.items.items.length > 3 ? 4 : 12 / property.items.items.length} lg={property.items.items.length > 4 ? 3 : 12 / property.items.items.length} key={"option"+index} style={{padding: "2px", outline: "1px solid #bbbbbb"}}>
                      <div style={{display:"flex"}}>&ensp;<span>{index+" : "}</span>
                        {each.type === "number" ? 
                        <ParaNumber
                          property={each}
                          cClass={paraSelectClasses.option}
                          value={value !== undefined && Array.isArray(value) ? value[0][index] : ''}
                          error={error && Array.isArray(error) && error[0] && error[0][index] ? true : undefined}
                          onChange={(value, error) => changeValue(value, error, index, 0)}
                        /> :
                        (each.type === "integer" ?
                        <ParaInteger
                          property={each}
                          cClass={paraSelectClasses.option}
                          value={value !== undefined && Array.isArray(value) ? value[0][index] : ''}
                          error={error && Array.isArray(error) && error[0] && error[0][index] ? true : undefined}
                          onChange={(value, error) => changeValue(value, error, index, 0)}
                        /> : 
                        <input
                          type="text"
                          value={value !== undefined && Array.isArray(value) ? value[0][index] : ''}
                          onChange={(value, error) => changeValue(value, error, index, 0)}
                          onFocus = {()=>console.log("focus")}
                        />)
                        }
                      </div>
                    </Grid>
                  ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={paraSelectClasses.root}>
                <Grid item xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <span className={paraSelectClasses.button} onClick={addNewIndex}>Add new</span>
                </Grid>
              </Grid>
            </div>
          )
        }
        return (
          <div style={active ? {display: "block", width: '100%'} : {display: "none"}}>
            {value.map((eachValue, eachIndex) => (
              <Grid container className={paraSelectClasses.root} key={'additional'+eachIndex}>
                <Grid item xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center", outline: "1px solid #bbbbbb"}}>
                  <RemoveCircleOutlineIcon onClick={(event)=>removeIndex(event, eachIndex)} />
                </Grid>
                <Grid item xs={11}>
                  <Grid container>
                  {property.items.items.map((each, index) => (
                    <Grid item xs={property.items.items.length > 3 ? 4 : 12 / property.items.items.length} lg={property.items.items.length > 4 ? 3 : 12 / property.items.items.length} key={"option"+index} style={{padding: "2px", outline: "1px solid #bbbbbb"}}>
                      <div style={{display:"flex"}}>&ensp;<span>{index+" : "}</span>
                        {each.type === "number" ? 
                        <ParaNumber
                          property={each}
                          cClass={paraSelectClasses.option}
                          value={eachValue !== undefined && Array.isArray(eachValue) ? eachValue[index] : ''}
                          error={error && Array.isArray(error) && error[eachIndex] && error[eachIndex][index] ? true : undefined}
                          onChange={(eachValue, error) => changeValue(eachValue, error, index, eachIndex)}
                        /> :
                        (each.type === "integer" ?
                        <ParaInteger
                          property={each}
                          cClass={paraSelectClasses.option}
                          value={eachValue !== undefined && Array.isArray(eachValue) ? eachValue[index] : ''}
                          error={error && Array.isArray(error) && error[eachIndex] && error[eachIndex][index] ? true : undefined}
                          onChange={(eachValue, error) => changeValue(eachValue, error, index, eachIndex)}
                        /> : 
                        <input
                          type="text"
                          value={eachValue !== undefined && Array.isArray(eachValue) ? eachValue[index] : ''}
                          onChange={(eachValue, error) => changeValue(eachValue, error, index)}
                          onFocus = {()=>console.log("focus")}
                        />)
                        }
                      </div>
                    </Grid>
                  ))}
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid container className={paraSelectClasses.root}>
              <Grid item xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span className={paraSelectClasses.button} onClick={addNewIndex}>Add new</span>
              </Grid>
            </Grid>
          </div>
        )
      case 'integer': case 'number':
        if(!value || value.length === 1) {
          return (
            <div style={active ? {display: "block", width: '100%'} : {display: "none"}}>
              <Grid container className={paraSelectClasses.root}>
                <Grid item xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                </Grid>
                <Grid item xs={11}>
                  <div style={{display:"flex"}}>&ensp;<span>{"0 : "}</span>
                    {property.items.type === "number" ? 
                    <ParaNumber
                      property={property.items}
                      cClass={paraSelectClasses.option}
                      error={error && error[0] ? error[0][0] : false}
                      value={value && value[0] !== undefined ? value[0] : ''}
                      onChange={(value, error) => changeValue(value, error, 0, 0)}
                    /> :
                    (property.items.type === "integer" ?
                    <ParaInteger
                      property={property.items}
                      cClass={paraSelectClasses.option}
                      error={error && error[0] ? error[0][0] : false}
                      value={value && value[0] !== undefined ? value[0] : ''}
                      onChange={(eachValue, error) => changeValue(eachValue, error, 0, 0)}
                    /> : 
                    <input
                      type="text"
                      value={value && value[0] !== undefined ? value[0] : ''}
                      onChange={(eachValue, error) => changeValue(eachValue, error, 0, 0)}
                      onFocus = {()=>console.log("focus")}
                    />)
                    }
                  </div>
                </Grid>
              </Grid>
              <Grid container className={paraSelectClasses.root}>
                <Grid item xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <span className={paraSelectClasses.button} onClick={addNewIndex}>Add new</span>
                </Grid>
              </Grid>
            </div>
          )
        }
        return (
          <div style={active ? {display: "block", width: '100%'} : {display: "none"}}>
            {value.map((eachValue, eachIndex) => (
              <Grid container className={paraSelectClasses.root} key={'additional'+eachIndex}>
                <Grid item xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <RemoveCircleOutlineIcon onClick={(event)=>removeIndex(event, eachIndex)} />
                </Grid>
                <Grid item xs={11}>
                  <div style={{display:"flex"}}>&ensp;<span>{"0 : "}</span>
                    {property.items.type === "number" ? 
                    <ParaNumber
                      property={property.items}
                      cClass={paraSelectClasses.option}
                      value={eachValue[0] !== undefined ? eachValue[0] : ''}
                      error={error && Array.isArray(error) && error[eachIndex] && error[eachIndex][0] ? true : undefined}
                      onChange={(eachValue, error) => changeValue(eachValue, error, 0, eachIndex)}
                    /> :
                    (property.items.type === "integer" ?
                    <ParaInteger
                      property={property.items}
                      cClass={paraSelectClasses.option}
                      value={eachValue[0] !== undefined ? eachValue[0] : ''}
                      error={error && Array.isArray(error) && error[eachIndex] && error[eachIndex][0] ? true : undefined}
                      onChange={(eachValue, error) => changeValue(eachValue, error, 0, eachIndex)}
                    /> : 
                    <input
                      type="text"
                      value={eachValue[0] !== undefined ? eachValue[0] : ''}
                      onChange={(eachValue, error) => changeValue(eachValue, error, 0)}
                      onFocus = {()=>console.log("focus")}
                    />)
                    }
                  </div>
                </Grid>
              </Grid>
            ))}
            <Grid container className={paraSelectClasses.root}>
              <Grid item xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span className={paraSelectClasses.button} onClick={addNewIndex}>Add new</span>
              </Grid>
            </Grid>
          </div>
        )
      case 'string':
        if(property.items.enum) return(
          <div style={active ? {display: "block", width: '100%'} : {display: "none"}}>
            {value ? value.map((eachValue, eachIndex) => (
              <Grid container className={paraSelectClasses.root} key={'additional'+eachIndex}>
                <Grid item xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <RemoveCircleOutlineIcon onClick={(event)=>removeIndex(event, eachIndex)} />
                </Grid>
                <Grid item xs={11}>
                  <Grid container>
                    <Grid item xs={2}>
                      &ensp;{"0 : "}
                    </Grid>
                    <Grid item xs={10}>
                      <ParaSelect 
                        property={property.items}
                        value={eachValue[0]}
                        error={error && Array.isArray(error) && error[eachIndex] && error[eachIndex][0] ? true : undefined}
                        onChange={(newValue, error) => changeValue(newValue, error, 0, eachIndex)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )) : <Grid container className={paraSelectClasses.root}>
                <Grid item xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                </Grid>
                <Grid item xs={11}>
                  <Grid container>
                    <Grid item xs={2}>
                      &ensp;{"0 : "}
                    </Grid>
                    <Grid item xs={10}>
                      <ParaSelect 
                        property={property.items}
                        error={error}
                        onChange={(newValue, error) => changeValue(newValue, error, 0, 0)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              }
            <Grid container className={paraSelectClasses.root}>
              <Grid item xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span className={paraSelectClasses.button} onClick={addNewIndex}>Add new</span>
              </Grid>
            </Grid>
          </div>
        )
        break;
      default: return(
        <div>{JSON.stringify(property.items)}</div>
      )
    }
  }
  return(
    <div className={treeClasses.itemRow} tabIndex="0" ref={ref}>
      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={<p className={treeClasses.tooltip}>{property.description}</p>} arrow>
        {required ? 
        <div className={treeClasses.itemText}>{key}*</div> : 
        <div className={treeClasses.itemText}>{key}</div>}
      </Tooltip>
      <div className={treeClasses.item}>
        <div onClick={toggleActive} className={paraSelectClasses.select} style={checkError() ? warning : {}} >
          {value !== undefined && Array.isArray(value) ? '[ '+value.map((each) => JSON.stringify(each)).join(' , ')+' ]' : ''}
        </div>
      </div>
      {!additionalItems ?
        <Grid container className={paraSelectClasses.root} style={active ? {display: "flex"} : {display: "none"}}>
          {property.items.map((each, index) => (
            <Grid item xs={property.items.length > 3 ? 4 : 12 / property.items.length} lg={property.items.length > 4 ? 3 : 12 / property.items.length} key={"option"+index} style={{padding: "2px", outline: "1px solid #bbbbbb"}}>
              <div style={{display:"flex"}}>&ensp;<span>{index+" : "}</span>
                {each.type === "number" ? 
                <ParaNumber
                  property={each}
                  cClass={paraSelectClasses.option}
                  error={error && Array.isArray(error) ? error[index] : undefined}
                  value={value !== undefined && Array.isArray(value) ? value[index] : ''}
                  onChange={(eachValue, error) => changeValue(eachValue, error, index)}
                /> :
                (each.type === "integer" ?
                <ParaInteger
                  property={each}
                  error={error && Array.isArray(error) ? error[index] : undefined}
                  cClass={paraSelectClasses.option}
                  value={value !== undefined && Array.isArray(value) ? value[index] : ''}
                  onChange={(eachValue, error) => changeValue(eachValue, error, index)}
                /> : 
                <input
                  type="text"
                  property={each}
                  value={value !== undefined && Array.isArray(value) ? value[index] : ''}
                  onChange={(eachValue, error) => changeValue(eachValue, error, index)}
                  onFocus = {()=>console.log("focus")}
                />)
                }
              </div>
            </Grid>
          ))}
        </Grid> : getContent()}
    </div>
  )
}
