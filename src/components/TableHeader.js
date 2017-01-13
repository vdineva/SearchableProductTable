import React from 'react';

function TableHeader(props) {
  let theadRow = props.properties.map(property => {
    return <th key={property.name}>{property.name}</th>
  });

  return (
    <thead>
      <tr>
        {theadRow}
      </tr>
    </thead>
  );
}

export default TableHeader;
