import React from 'react';

class InputField extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.filterChange(e.target.value);
  }

  render() {
    return <input
            type={this.props.type}
            value={this.props.value}
            onChange={this.handleChange}
            className="form-control pull-left"
           />
  }
}

export default InputField;
