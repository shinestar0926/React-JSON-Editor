import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import ParaTreeView from '../components/paratreeview';
import Category from '../components/category';

export default function JsonSchema(props) {

    //props data
    const schema = props.schema;
    const currentInitValue = props.value;
    const onChangeValue = props.onChange;
    const hidden = props.hidden;

    console.log(schema);
    
    //user initValue for check if props init value is changed
    const [currentPropOutput, setCurrentPropOutput] = useState(currentInitValue);
    //user value setting {type:}
    const [valueSettings, setValueSettings] = useState({});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        //if props init value is changed, change current init value to props init value
        if(currentInitValue && typeof currentInitValue !== 'object') return (
            <div style={{padding: '20px', textAlign: 'center', color: "red"}}>
                <h1>Invalid initial value!</h1>
            </div>
        )
        if(currentPropOutput !== currentInitValue) {
            setCurrentPropOutput(currentInitValue);
            let newValueSettings = JSON.parse(JSON.stringify(currentInitValue));
            newValueSettings.parameters = getDefaultParameters();
            let list = getCategoryList();
            Object.keys(list).map(key => {
                if(Object.keys(newValueSettings).indexOf(key) === -1) {
                    if(list[key].extensible === true) {
                        newValueSettings[key] = [];
                    }
                }
            })
            setValueSettings(newValueSettings);
            setError(undefined);
            onChangeValue(newValueSettings);
        }
        if(valueSettings && !Object.keys(valueSettings).length && schema) {
            let initValueSettings = {parameters: getDefaultParameters()};
            let list = getCategoryList();
            Object.keys(list).map(key => {
                if(key !== 'parameters') {
                    if(list[key].extensible === true) {
                        initValueSettings[key] = [];
                    }
                }
            })
            setValueSettings(initValueSettings);
            onChangeValue(initValueSettings);
        }
    })
    console.log(valueSettings)
    function getCategoryList() {
        const categoryList = {};
        for(let key of Object.keys(schema.properties)) {
            if(hidden.includes(key)) continue;
            let required = schema.required.includes(key);
            if(schema.properties[key].type === "object") {
                categoryList[key] = {required: required, extensible: false};
                continue;
            }
            categoryList[key] = {required: required, list: [], extensible: true};
            if(valueSettings && valueSettings[key] && Array.isArray(valueSettings[key])) {
                valueSettings[key].map(each => {
                    categoryList[key].list.push(each.name);
                })
            }
        }
        return categoryList;
    }

    function getDefaultParameters() {
        let defaultParameters = JSON.parse(JSON.stringify(schema.properties.parameters));
        let initValue = currentInitValue.parameters;
        let currentParameters = {};
        for(let key of Object.keys(defaultParameters.properties)) {
            //add init value
            if(initValue && initValue[key]) {
                currentParameters[key] = initValue[key];
                continue;
            }
            //if default value setting return it
            let eachProperty = defaultParameters.properties[key];
            if(eachProperty.default !== undefined) {
                currentParameters[key] = eachProperty.default;
                continue;
            }
        };
        return currentParameters;
    }

    function changeValueSettings(newValueSettings, newError) {
        setValueSettings(newValueSettings);
        onChangeValue(newValueSettings);
        setError(newError);
    }

    return (
        <div style={{padding: '20px 40px', position:"relative", zIndex:"10"}}>
            {!!schema ? <Category
                    categoryList={getCategoryList()}
                    schema={schema}
                    valueSettings = {valueSettings}
                    error = {error}
                    currentInitValue = {currentInitValue}
                    changeValueSettings={changeValueSettings}
                /> :
                <div style={{padding: '20px', textAlign: 'center'}}>
                    <h1>Loading</h1>
                </div>
            }         
        </div>
    )
}