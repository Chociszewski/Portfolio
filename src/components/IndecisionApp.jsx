import React from "react";
import AddOption from "./AddOption.jsx";
import Action from "./Action.jsx";
import Header from "./Header.jsx";
import Options from "./Options.jsx";

class Indecision extends React.Component {
  state = {
    options: []
  };

  componentDidMount = () => {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // do nothing at all
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  };

  componentWillUnmount = () => {
    console.log("componentWillUnmount");
  };

  handleDeleteOptions() {
    this.setState(() => ({
      options: []
    }));
  }

  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  };

  handleAddOption = option => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    } else {
      return this.setState(prevState => ({
        options: prevState.options.concat([option])
      }));
    }
  };

  handlePick = () => {
    let random = Math.random() * this.state.options.length;
    let choice = Math.floor(random);
    alert(this.state.options[choice]);
  };

  render() {
    const subtitle = "Put your life in the hands";
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

export default Indecision;