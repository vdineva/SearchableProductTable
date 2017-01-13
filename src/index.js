import React from 'react';
import ReactDOM from 'react-dom';
import SearchableProductTable from './components/SearchableProductTable';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const products = window.datastore.getProducts();
const properties = window.datastore.getProperties();
const operators = window.datastore.getOperators();

const propertyToOperatorsMap = {
  'string': ['equals', 'any', 'none', 'in', 'contains'],
  'number': ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
  'enumerated': ['equals', 'any', 'none', 'in'],
};

ReactDOM.render(
  <SearchableProductTable
    products={products}
    properties={properties}
    operators={operators}
    propertyToOperatorsMap={propertyToOperatorsMap} />,
  document.getElementById('root')
);
