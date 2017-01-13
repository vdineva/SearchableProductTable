import React from 'react';
import TableHeader from './TableHeader';
import TableDataRow from './TableDataRow';

function ProductTable(props) {
  let tbody = props.products.map((product, index) => {
    return <TableDataRow product={product} properties={props.properties} key={index} />
  });

  return (
    <table className="table table-bordered table-striped">
      <TableHeader properties={props.properties} />
      <tbody>
        {tbody}
      </tbody>
    </table>
  );
}

export default ProductTable;
