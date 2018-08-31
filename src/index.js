import React, { Component } from "react";
import { render } from "react-dom";

const overrideProps = overrideProps => BaseComponent => props => (
  <BaseComponent {...props} {...overrideProps} />
);

const alwaysBob = overrideProps({ name: "Bob" });

// Will update the name after 3 seconds
const updateLater = BaseComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { name: this.props.name };
    }
    componentDidMount() {
      setTimeout(() => this.setState({ name: "Adam" }), 3000);
    }
    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  };

// Click the name will increase the font size
const toggleFontSize = BaseComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { fontSize: "inherit"};
      this.onClick = this.onClick.bind(this);
    }

    onClick() {
      const size = this.state.fontSize === "inherit" ? "40px" : "inherit";
      this.setState({ fontSize: size });
    }

    render() {
      return (
        <div>
          <BaseComponent
            onClick={this.onClick}
            style={{ fontSize: this.state.fontSize }}
            {...this.props}
          />
        </div>
      );
    }
  };

const User = props => (
  <div {...props} className="User">
    {props.name}
  </div>
);

const User2 = alwaysBob(User); // I will display 'Bob', even though I passed in 'Joe'
const User3 = updateLater(User); // The name will change after 3 seconds
const User4 = toggleFontSize(updateLater(User)); // Name will change, and I am clickable

const App = () => (
  <div>
    <User name="Tim" />
    <User2 name="Joe" />
    <User3 name="Steve" />
    <User4 name="Peter" />
  </div>
);

render(<App />, document.getElementById("root"));
