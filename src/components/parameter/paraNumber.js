import React from 'react';

export default function ParaNumber( props ) {

  const property = props.property;
  const cClass = props.cClass;
  const value = props.value;
  const error = props.error;
  const index = props.index;
  const onChangeFunc = props.onChange || function() {};

  const minimum = property.minimum !== undefined ? property.minimum : (property.minimumExclusive !== undefined ? property.minimumExclusive : Number.NEGATIVE_INFINITY);
  const maximum = property.maximum !== undefined ? property.maximum : (property.maximumExclusive !== undefined ? property.maximumExclusive : Number.POSITIVE_INFINITY);
  const warning = {'border': '1px solid red'};

  function checkNumber(value) {
    value = value.replace(/[^0-9.-]/gm, '');
    value = value.replace(/(^-?)(0+)([0-9]+)/igm, function(a,b,c,d){
      return b + d;
    });
    value = value.replace(/(^[0-9-]*\.[0-9]*)(\.+)/igm, function(a,b,c,d){
      return b;
    });
    value = value.replace(/(^0*)(-)/igm, function(a,b,c){
      return c;
    });
    value = value.replace(/(^.+)(-)/igm, function(a,b,c){
      return b;
    });
    if(!value) value = '0';
    return value;
  }

  function changeValue(value) {
    value = checkNumber(value);
    if(value < minimum || value > maximum || value === '-' || value[value.length - 1] === ".") onChangeFunc(value === '-' || value[value.length - 1] ? value :Number(value), true);
    else onChangeFunc(value === '-' || value[value.length - 1] === "." ? value :Number(value), false);
  }

  if(value || value === 0) {
    let checkValue = checkNumber(value.toString());
    if((checkValue === "-" || checkValue[checkValue.length - 1] === ".") && !error) {
      onChangeFunc(value, true);
    }
    else if((checkValue < minimum || checkValue > maximum) && !error) {
      onChangeFunc(value, true);
    }
    else if(checkValue !== value.toString()) {
      onChangeFunc(Number(checkValue), false);
    }
  }

  return(
    <input
      type="text"
      className={cClass}
      value={(value !== undefined && value !== null) ? value : ''}
      style={error ? warning : {}}
      onChange={(e) => changeValue(e.target.value)}
    />
  )
}