# react-prop-docs
Autogenerate documentation for React components

![](https://i.imgur.com/BsIacSe.png)

Generated using the code:

```javascript
import React, { Component } from "react";
import Button from "./components/Button";
import PropsTable from "./components/PropsTable";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Prop Types Demo</h1>
        <Button
          label="Submit"
          onClick={() => alert("Hola mundo!")}
          disabled={false}
        />
        <PropsTable component={Button} />
      </div>
    );
  }
}
```
