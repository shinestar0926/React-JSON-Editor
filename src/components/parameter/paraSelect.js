import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const paraSelectStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: 'none',
    borderLeft: '2px solid #808080',
    "&:focus": {
      outline: 'none',
    },
  },
  select: {
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '100%',
    height: '26px',
    position: 'relative',
    outline: "1px solid gray",
    '&::after': {
      content: `url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
      position: 'absolute',
      right: '6px',
      top: '0px',
    },
  },
  options: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    borderTop: '1px solid gray',
    cursor: 'default',
  },
  option: {
    width: '100%',
    paddingLeft: '3px',
    paddingRight: '5px',
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  }
}))

const warning = {'border': '1px solid red'};

export default function ParaSelect( props ) {

  const paraSelectClasses = paraSelectStyles();

  const property = props.property;
  const cClass = props.cClass;
  const error = props.error;
  const onChangeFunc = props.onChange || function() {};

  const value = props.value;
  const [focusSelf, setFocusSelf] = useState(0);

  const options = property.enum;

  function toggleFocusSelf () {
    if(focusSelf) setFocusSelf(0);
    else setFocusSelf(1);
  }
  
  function changeValue(event, option) {
    console.log(option)
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    setFocusSelf(0);
    onChangeFunc(option);
  }
  if(value && !options.includes(value) && !error) onChangeFunc(value, true);
  return(
    <div className={cClass ? cClass : paraSelectClasses.root} onBlur={() => setFocusSelf(0)} tabIndex="1">
      <div onClick={() => toggleFocusSelf()} className={paraSelectClasses.select} style={error ? warning : {}}>
        {value}
      </div>
      <div className={paraSelectClasses.options} style={focusSelf ? {} : {display: 'none'}}>
      {options && options.map((each, index) => (
        <div className={paraSelectClasses.option} key={"option"+index} onClick={(e) => changeValue(e, each)}>
          {each}
        </div>
      ))}
      </div>
    </div>
  )
}