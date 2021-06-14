#my react app

#How to work

It uses only react, react hook, axios. Not redux.
It works for getting user input for custom settings.
It returns the result as object.

#install

npm install

#start

npm start

#introduction

JsonSchema tag is all of this project.

default structure of JsonSchema tag is as follow.

  <JsonSchema schema={jsonSchema} value={initValue} onChange={changeValue} />

here, schema is json schema and required, value is initial user settings and optional, onChange is function to get user's settings and run when user save each setting and return the whole user settings.
