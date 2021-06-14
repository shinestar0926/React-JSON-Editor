import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const paraSelectStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '26px',
    border: 'none',
    borderLeft: '2px solid #808080',
    "&:focuse": {
      outline: 'none',
    },
    position: 'relative',
  },
  select: {
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
      content: `url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
      position: 'absolute',
      right: '6px',
      top: '0px',
    },
  },
  options: {
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    border: '1px solid black',
    cursor: 'default',
    background: 'rgb(240, 240, 240)',
  },
  option: {
    width: '100%',
    paddingLeft: '3px',
    paddingRight: '5px',
    background: 'transparent',
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  }
}))

export default function ParaBoolean( props ) {

  const paraSelectClasses = paraSelectStyles();

  const cClass = props.cClass;
  const [propsValue, setPropsValue] = useState('');
  const [value, setValue] = useState(props.value);
  const [focusSelf, setFocusSelf] = useState(0);
  
  if(JSON.stringify(propsValue) !== JSON.stringify(props.value)) {
    setPropsValue(props.value);
    setValue(props.value);
  }
  const onChangeFunc = props.onChange || function() {};


  function toggleFocusSelf () {
    if(focusSelf) setFocusSelf(0);
    else setFocusSelf(1);
  }
  
  function changeValue(option) {
    setFocusSelf(0);
    onChangeFunc(option);
    setValue(option);
  }
  return(
    <div className={cClass ? cClass : paraSelectClasses.root} onBlur={() => setFocusSelf(0)} tabIndex="1">
      <div onClick={() => toggleFocusSelf()} className={paraSelectClasses.select}>
        {value && value.toString()}
      </div>
      <div className={paraSelectClasses.options} style={focusSelf ? {} : {display: 'none'}}>
      <div className={paraSelectClasses.option} onClick={() => changeValue(true)}>
        true
      </div>
      <div className={paraSelectClasses.option} onClick={() => changeValue(false)}>
        false
      </div>
      </div>
    </div>
  )
}