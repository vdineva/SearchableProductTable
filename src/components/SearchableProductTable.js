import React, { Component } from 'react';
import Filters from './Filters';
import ProductTable from './ProductTable';


class SearchableProductTable extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      filterProperty: '',
      filterOperator: '',
      filterValue: '',
      enumeratedFilterValue: []
    };

    this.state = this.initialState;

    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.handleFilterValueChanged = this.handleFilterValueChanged.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  handleFilterChanged(propertyName, operator) {
    this.setState({
      filterProperty: propertyName,
      filterOperator: operator,
      //reset the filter values when either the filterProperty or filterOperator changes
      filterValue: this.initialState.filterValue,
      enumeratedFilterValue: this.initialState.enumeratedFilterValue
    });
  }

  handleFilterValueChanged(value) {
    if (typeof value === 'string') {
      this.setState({
        filterValue: value
      });
    } else {
      this.setState({
        enumeratedFilterValue: value
      });
    }
  }

  clearFilters() {
    this.setState(this.initialState);
  }

  filterProducts(property_value) {
    let selectedProperty = this.props.properties.find(property => {
      return property.name === this.state.filterProperty;
    });

    if (property_value.property_id !== selectedProperty.id) {
      return;
    }

    switch (this.state.filterOperator) {
      case 'contains':
      case 'any':
        if (typeof this.state.filterValue === 'string') {
          return (property_value.value.toLowerCase().includes(this.state.filterValue.toLowerCase()));
        } else {
          return (this.state.filterValue.includes(property_value.value));
        }
      case 'in':
        if (typeof this.state.filterValue === 'string') {
          return (property_value.value.toLowerCase().includes(this.state.filterValue.toLowerCase()));
        } else {
          return (this.state.filterValue.indexOf(property_value.value) > -1);
        }
      case 'none':
        return (this.state.filterValue.indexOf(property_value.value) === -1);
      case 'greater_than':
        return (property_value.value > this.state.filterValue);
      case 'less_than':
        return (property_value.value < this.state.filterValue);
      case 'equals':
        if (selectedProperty.type === 'string') {
          return (property_value.value.toLowerCase() === this.state.filterValue.toLowerCase());
        } else if (selectedProperty.type === 'number') {
          return (property_value.value.toString() === this.state.filterValue);
        } else {
          return (this.state.enumeratedFilterValue.includes(property_value.value));
        }
      default:
        break;
    }
  }

  render() {
    let products = this.props.products;
    if (this.state.filterOperator.length && this.state.filterProperty.length && (this.state.filterValue.length || this.state.enumeratedFilterValue.length)) {
      products = this.props.products.filter(product => {
        return product.property_values.filter(this.filterProducts).length;
      });
    }

    let properties = this.props.properties;
    let operators = this.props.operators;

    let selectedProperty = this.props.properties.find((property) => {
      return property.name === this.state.filterProperty;
    });

    let selectedOperator = this.props.operators.find((operator) => {
      return operator.id === this.state.filterOperator;
    });

    if (selectedProperty) {
      operators = this.props.operators.filter(op => {
        return this.props.propertyToOperatorsMap[selectedProperty.type].indexOf(op.id) > -1;
      })
    }

    if (selectedOperator) {
      properties = this.props.properties.filter(prop => {
        return this.props.propertyToOperatorsMap[prop.type].includes(this.state.filterOperator);
      })
    }

    return (
      <div id="container">
        <div className="row">
          <Filters
            properties={properties}
            operators={operators}
            filterValue={this.state.filterValue}
            enumeratedFilterValue={this.state.enumeratedFilterValue}
            filterProperty={this.state.filterProperty}
            filterOperator={this.state.filterOperator}
            onFilterChanged={this.handleFilterChanged}
            onFilterValueChanged={this.handleFilterValueChanged}
            clearFilters={this.clearFilters}
            />
        </div>

        <div className="row">
          <ProductTable
            products={products}
            properties={this.props.properties}
            />
        </div>
      </div>
    );
  }
}

export default SearchableProductTable;
