import React, { useState } from 'react';

export default function ParaString( props ) {

  const cClass = props.cClass;
  const [propsValue, setPropsValue] = useState('');
  const [value, setValue] = useState(props.value);
  const index = props.index;
  const onChangeFunc = props.onChange || function() {};
  const onEnd = props.onEnd || function() {};

  if(JSON.stringify(propsValue) !== JSON.stringify(props.value)) {
    setPropsValue(props.value);
    setValue(props.value);
  }

  function blurValue(value) {
    if(index !== undefined) onChangeFunc(value, index);
    else onChangeFunc(value);
    onEnd();
  }

  function changeValue(value) {
    if(index !== undefined) onChangeFunc(value ? value : null, index);
    else onChangeFunc(value ? value : null);
    setValue(value ? value : null);
  }
  return(
    <input
      type="text"
      className={cClass}
      value={value === null || value === undefined ? '' : value}
      onChange={(e) => changeValue(e.target.value)}
      onBlur={(e) => blurValue(e.target.value)}
    />
  )
}