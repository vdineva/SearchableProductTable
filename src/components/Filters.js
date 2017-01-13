import React from 'react';
import InputField from './InputField';
import MultiSelect from './MultiSelect';

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.filterChange = this.filterChange.bind(this);
    this.filterValueChange = this.filterValueChange.bind(this);
    this.clearFilterValues = this.clearFilterValues.bind(this);
  }

  filterChange() {
    this.props.onFilterChanged(this.propertyFilter.value, this.operatorFilter.value);
  }

  filterValueChange(value) {
    this.props.onFilterValueChanged(value);
  }

  clearFilterValues() {
    this.props.clearFilterValues();
  }

  render() {
    let selectedProperty = this.props.properties.find((property) => {
      return property.name === this.props.filterProperty;
    });

    let propertyFilterOptions = this.props.properties.map(property => {
      return <option value={property.name} key={property.name}>{property.name}</option>
    });

    let operatorFilterOptions = this.props.operators.map(operator => {
      return <option value={operator.id} key={operator.text}>{operator.text}</option>
    });

    return (
      <div id="filter-container" className="row">
        <select
          value={this.props.filterProperty}
          onChange={this.filterChange}
          ref={(input) => this.propertyFilter = input}
          className="form-control pull-left"
        >
          <option value="">Select a property</option>
          {propertyFilterOptions}
        </select>

        <select
          value={this.props.filterOperator}
          onChange={this.filterChange}
          ref={(input) => this.operatorFilter = input}
          className="form-control pull-left"
        >
          <option value="">Select an operator</option>
          {operatorFilterOptions}
        </select>

        {
          this.props.filterProperty &&
          this.props.filterOperator &&
          (
            selectedProperty.type === 'enumerated'
              ?
            <MultiSelect value={this.props.enumeratedFilterValue} filterChange={this.filterValueChange} selectedProperty={selectedProperty}/>
              :
            <InputField type={selectedProperty.type} value={this.props.filterValue} filterChange={this.filterValueChange} />
          )
        }

        <button type="button" className="btn btn-default pull-right" onClick={this.clearFilterValues}>Clear</button>
      </div>
    )
  }
}


export default Filters;
