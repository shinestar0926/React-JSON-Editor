import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { useSpring, animated } from '@react-spring/web';
import Grid from '@material-ui/core/Grid';
import '../assets/css/schema.css';
import InputSquare from './parameter/inputSquare';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
  root: {
    marginTop: 10,
    '&.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, &.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    '&.custom-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, &.custom-selected:focus > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: "rgba(63, 81, 181, 0.12)"
    },
    '&.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: "transparent",
    },
    '&.custom-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: "rgba(63, 81, 181, 0.08)",
    },
  }
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const treeUseStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
  },
  addNew: {
    fontSize: "16px",
    lineHeight: "18px",
    cursor: "pointer",
    padding: "5px",
    '&:hover': {
      textDecoration: "black underline" 
    }
  },
  warningMsg: {
    position: 'absolute',
    top: -19,
    right: 0,
    color: 'red',
    fontSize: '12px',
    zIndex: -1
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
    width: '600px',
    display: 'inline-block',
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
    cursor: 'default',
    height: "26px",
    outline: '1px solid grey'
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

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export default function Category(props) {
  
  const treeClasses = treeUseStyles();

  //props value
  const categoryList = props.categoryList;
  const defaultIndex = props.defaultIndex;
  const schema = props.schema;
  const valueSettings = props.valueSettings;
  const currentInitValue = props.currentInitValue;
  const error = props.error;
  const onChangeValueSettings = props.changeValueSettings;

  const [checkPropValue, setCheckPropValue] = useState(currentInitValue);
  const [expand, setExpand] = useState(currentInitValue ? (Object.keys(currentInitValue).indexOf('parameters') !== -1 ? Object.keys(currentInitValue) : Object.keys(currentInitValue).concat(['parameters'])) : ['parameters']);

  useEffect(()=> {
    if(checkPropValue !== currentInitValue) {
      let newExpand = currentInitValue ? Object.keys(currentInitValue) : {};
      if(newExpand.indexOf('parameters') === -1) newExpand.push('parameters');
      setExpand(newExpand);
      setCheckPropValue(currentInitValue);
    }
  })

  function changeValue(key, eachIndex, eachkey, newValue, eachError) {
    const newValueSettings = JSON.parse(JSON.stringify(valueSettings));
    if(eachIndex === undefined) {
      if(!newValueSettings[key]) newValueSettings[key] = {};
      newValueSettings[key][eachkey] = newValue;
      let newError = error ? JSON.parse(JSON.stringify(error)) : {};
      if(!newError[key]) newError[key] = {};
      newError[key][eachkey] = eachError;
      onChangeValueSettings(newValueSettings, newError);
    }
    else {
      if(!newValueSettings[key]) newValueSettings[key] = [];
      if(!newValueSettings[key][eachIndex]) newValueSettings[key][eachIndex] = {};
      newValueSettings[key][eachIndex][eachkey] = newValue;
      let newError = error ? JSON.parse(JSON.stringify(error)) : {};
      if(!newError[key]) newError[key] = [];
      if(!newError[key][eachIndex]) newError[key][eachIndex] = {};
      newError[key][eachIndex][eachkey] = eachError;
      console.log(newValueSettings);
      onChangeValueSettings(newValueSettings, newError);
    }
  }

  function checkError(error) {
    if(typeof error === "object") {
      if(Array.isArray(error)) {
        for(let each of error) {
          if(checkError(each)) return true;
        }
      }
      else {
        for(let key in error) {
          if(checkError(error[key])) return true;
        }
      }
    }
    else return !!error;
  }

    // //get active category's property
    function getDefaultProperty(type, index) {

      if(!schema) return;
      let defaultProperty;
      if(schema.properties[type].type === "object") {
          defaultProperty = schema.properties[type];
      }
      else if(!valueSettings[type][index].type) {
          defaultProperty = {properties:{type: {type: "string", enum: getTypes(type)}}};
      }
      else {
          for(let each of schema.properties[type].items.anyOf) {
            if(each.properties.type.const === valueSettings[type][index].type) defaultProperty = JSON.parse(JSON.stringify(each));
          }
          defaultProperty.properties.type = {type: "string", enum: getTypes(type)};
          if(valueSettings.parameters) Object.keys(defaultProperty.properties).map(key=>{
            if(valueSettings.parameters[key] !== undefined) defaultProperty.properties[key].default = valueSettings.parameters[key];
          })
          else Object.keys(defaultProperty.properties).map(key=>{
            if(schema.properties.parameters.properties[key] && schema.properties.parameters.properties[key].default !== undefined) {
              defaultProperty.properties[key].default = schema.properties.parameters.properties[key].default;
            }
          })
      }
      return defaultProperty;
  }
  function getTypes(type) {
    return {type: "string", enum: schema.properties[type].items.anyOf.map((each) => (
      each.properties.type.const
    ))}
  }
  function getDefaultValue(type, index) {
    let defaultValueSetting = {};
    let defaultProperty = getDefaultProperty(type, index);
    if(!defaultProperty) return;
    defaultValueSetting = getValueSetting(JSON.parse(JSON.stringify(defaultProperty)), type, index);
    return defaultValueSetting;
  }
  function getValueSetting(defaultProperty, type, index) {
    let eachInitValue;
    if(schema.properties[type].type === "object") eachInitValue = currentInitValue[type];
    else eachInitValue = currentInitValue[type] ? currentInitValue[type][valueSettings[type][index].type.toLowerCase()] : undefined;
    const currentProperty = {};
    //get key:value object
    for(let key of Object.keys(defaultProperty.properties)) {
      //add init value
      if(eachInitValue && eachInitValue[key]) {
        currentProperty[key] = eachInitValue[key];
        continue;
      }
      //if default value setting return it
      let eachProperty = defaultProperty.properties[key];
      if(eachProperty.default !== undefined) {
        currentProperty[key] = eachProperty.default;
        continue;
      }
      //set name property
      if(key === 'name') {
        currentProperty[key] = null;
        continue;
      }
      //get value from its limitation
      if(!!eachProperty.type)
        switch(eachProperty.type) {
          case 'object':
            let subProp = {};
            for(let eachKey of Object.keys(eachProperty.properties)) {
              if(eachProperty.properties[eachKey].type) {
                if(eachProperty.properties[eachKey].default !== undefined) {
                  subProp[eachKey] = eachProperty.properties[eachKey].default;
                  continue;
                }
              }
            }
            if(Object.keys(subProp).length) {
              currentProperty[key] = {};
              currentProperty[key][eachProperty.properties.type.const] = subProp;
            }
            continue;
          case "array":
            if(currentProperty[key] === undefined) currentProperty[key] = [];
        }
    };
    return currentProperty;
  }
  function changeType(key, eachIndex, eachkey, type) {
    let newValueSettings = JSON.parse(JSON.stringify(valueSettings));
    if(eachIndex === undefined) newValueSettings[key][eachkey] = type;
    else newValueSettings[key][eachIndex][eachkey] = type;
    onChangeValueSettings(newValueSettings);
  }
  function deleteItem(type, index) {
    let newValueSettings = JSON.parse(JSON.stringify(valueSettings));
    if (newValueSettings[type] && Array.isArray(newValueSettings[type]) && newValueSettings[type].length > index) {
      newValueSettings[type].splice(index, 1);
    }
    onChangeValueSettings(newValueSettings);
  }

  function addItem(type) {
    let newValueSettings = JSON.parse(JSON.stringify(valueSettings));
    if (newValueSettings[type] && Array.isArray(newValueSettings[type])) {
      newValueSettings[type].push({type: ''});//schema.properties[type].items.anyOf[0].properties.type.const
    }
    onChangeValueSettings(newValueSettings);
  }

  function changeExpand(key) {
    let position = expand.indexOf(key);
    const newExpand = JSON.parse(JSON.stringify(expand));
    if(position !== -1) newExpand.splice(position, 1);
    else newExpand.push(key);
    setExpand(newExpand);
  }

  return (
    <Grid container spacing={4} style={{maxWidth: "800px"}}>
      <TreeView
        className={treeClasses.root}
        expanded={expand}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
      >
      {Object.keys(categoryList).map((key, index) => (
        <StyledTreeItem
          selected
          nodeId={key}
          key={index}
          label={<span>{key.capitalize()+(categoryList[key].required ? '* ' : ' ')}{error && checkError(error ? error[key] : undefined) && <ErrorOutlineOutlined style={{color: "red"}} />}</span>}
          onLabelClick={()=>changeExpand(key)}
          onIconClick={()=>changeExpand(key)}
        >
          {categoryList[key].extensible ? 
            (categoryList[key].list.map((each, eachIndex) => (
              <div key={eachIndex}>
                <div><CloseSquare style={{float: "none", marginRight: "5px"}} onClick={()=>deleteItem(key, eachIndex)} />{each ? each.capitalize()+" " : "Unnamed "}{error && checkError(error && error[key] ? error[key][eachIndex] : undefined) && <ErrorOutlineOutlined style={{color: "red"}} />}{" : "}</div>
                <div className={treeClasses.main} style={{marginLeft: "24px", marginTop: "5px", marginBottom: "5px"}}>
                  {Object.keys(getDefaultProperty(key, eachIndex).properties).map((eachkey, i)=>
                    eachkey !== "type" ? (<InputSquare 
                      key = {i} 
                      treeClasses = {treeClasses}
                      index={eachkey}
                      value={valueSettings[key][eachIndex][eachkey]} 
                      error={error && error[key] && error[key][eachIndex] && error[key][eachIndex][eachkey] ? error[key][eachIndex][eachkey] : undefined}
                      required = {getDefaultProperty(key, eachIndex).required && getDefaultProperty(key, eachIndex).required.includes(key)} 
                      property={getDefaultProperty(key, eachIndex).properties[eachkey]} 
                      defaultValue={getDefaultValue(key, eachIndex)[eachkey]}
                      onChange={(newValue, error) => changeValue(key, eachIndex, eachkey, newValue, error)}
                    />) : (<InputSquare 
                      treeClasses={treeClasses}
                      key = {i}
                      value={valueSettings[key][eachIndex][eachkey]}
                      index={eachkey}
                      property={getTypes(key)}
                      onChange={(newValue) => changeType(key, eachIndex, eachkey, newValue)}
                    />))
                  }
                </div>
              </div>
            ))) : 
            <div className={treeClasses.main}>
              {Object.keys(getDefaultProperty(key).properties).map((eachkey, i)=>
                eachkey !== "type" ? (<InputSquare 
                  key = {i} 
                  treeClasses = {treeClasses}
                  index={eachkey}
                  value={valueSettings[key] ? valueSettings[key][eachkey] : undefined} 
                  error={error && error[key] && error[key][eachkey] ? error[key][eachkey] : undefined}
                  required = {getDefaultProperty(key).required && getDefaultProperty(key).required.includes(eachkey)} 
                  property={getDefaultProperty(key).properties[eachkey]} 
                  defaultValue={getDefaultValue[key]}
                  onChange={(newValue, error) => changeValue(key, undefined, eachkey, newValue, error)}
                />) : (<InputSquare 
                  treeClasses={treeClasses}
                  key = {i}
                  value={valueSettings[key][eachkey]}
                  index={eachkey}
                  property={getDefaultProperty(key).properties[eachkey]}
                  onChange={(newValue) => changeType(key, undefined, eachkey, newValue)}
                />))
              }
            </div>
          }
          {categoryList[key].extensible && <div className={treeClasses.addNew} onClick={() => addItem(key)}>
            <ArrowBackIosIcon style={{fontSize: "18px"}} />+ add new
          </div>}
        </StyledTreeItem>
      ))}
      </TreeView>
    </Grid>
  )
}