import React from 'react';

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let selected = Array
                    .from(e.target.options)
                    .filter(opt =>  opt.selected)
                    .map(val => val.value);

    this.props.filterChange(selected);
  }

  render() {
    let MultiSelectOptions = this.props.selectedProperty.values.map((val, index) => <option value={val} key={index}>{val}</option>);

    return (
      <select value={this.props.value} onChange={this.handleChange} className="form-control pull-left" multiple>
        {MultiSelectOptions}
      </select>
    );
  }
}

export default MultiSelect;
