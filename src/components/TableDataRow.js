import React from 'react';

function TableDataRow(props) {
  let rows = props.product.property_values.map((value, key) => {
    return <td key={key}>{value.value}</td>;
  });

  //make sure the tr have the same number of tds as the header row
  while (rows.length < props.properties.length) {
    rows = rows.concat([<td key={rows.length}></td>]);
  }

  return <tr>{rows}</tr>
}

export default TableDataRow;
