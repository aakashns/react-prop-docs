import React, { Component } from "react";
import Button from "./components/Button";
import PropsTable from "./components/PropsTable";

class App extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: 16 }}>
        <h1>Prop Types Demo</h1>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Button
            label="Submit"
            onClick={() => alert("Hola mundo!")}
            disabled={false}
          />
        </div>
        <PropsTable component={Button} />
      </div>
    );
  }
}

export default App;
