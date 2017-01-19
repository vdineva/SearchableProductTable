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

  getSelectedProperty() {
    return this.props.properties.find(property => {
      return property.name === this.state.filterProperty;
    });
  }

  filterProducts(property_value) {
    let selectedProperty = this.getSelectedProperty();

    if (property_value.property_id !== selectedProperty.id) {
      return;
    }

    let filterValue = this.state.filterValue;
    let value = property_value.value;
    let stringType;

    if (selectedProperty.type === 'string') {
      filterValue = filterValue.toLowerCase();
      value = value.toLowerCase();
      stringType = true;
    }

    switch (this.state.filterOperator) {
      case 'contains':
      case 'any':
        if (stringType) {
          return value.includes(filterValue);
        } else {
          return this.state.enumeratedFilterValue.includes(value);
        }
      case 'in':
        if (stringType) {
          return value.includes(filterValue);
        } else {
          return this.state.enumeratedFilterValue.indexOf(value) > -1;
        }
      case 'none':
        if (stringType) {
          return value.indexOf(filterValue) === -1;
        } else {
          return this.state.enumeratedFilterValue.indexOf(value) === -1;
        }
      case 'greater_than':
        return value > filterValue;
      case 'less_than':
        return value < filterValue;
      case 'equals':
        if (stringType) {
          return value === filterValue;
        } else if (selectedProperty.type === 'number') {
          return value.toString() === filterValue;
        } else {
          return this.state.enumeratedFilterValue.includes(value);
        }
      default:
        break;
    }
  }

  render() {
    let products = this.props.products;
    let properties = this.props.properties;
    let operators = this.props.operators;

    let selectedProperty = this.getSelectedProperty();
    let selectedOperator = this.state.filterOperator.length;

    if (selectedProperty && selectedOperator && (this.state.filterValue.length || this.state.enumeratedFilterValue.length)) {
      products = this.props.products.filter(product => {
        return product.property_values.filter(this.filterProducts).length;
      });
    }

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
