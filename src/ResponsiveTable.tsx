import React, { useState } from 'react';
import styled from 'styled-components';

interface TableData {
  id: number;
  name: string;
  age: number;
  // adicione mais propriedades aqui, se necessário
}

interface TableHeader {
    label: string;
    key: string;
  }
  
  interface Pokemon {
    id: number;
    name: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
    'sp.attack': number;
    'sp.defense': number;
    speed: number;
    total: number;
  }
  
  function getTableHeaders(): TableHeader[] {
    const pokemonKeys: Array<keyof Pokemon> = [
      'id',
      'name',
      'type',
      'hp',
      'attack',
      'defense',
      'sp.attack',
      'sp.defense',
      'speed',
      'total',
    ];
  
    const tableHeaders: TableHeader[] = pokemonKeys.map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      key: key.toString(),
    }));
  
    return tableHeaders;
  }
  
  const tableHeaders: TableHeader[] = getTableHeaders();
  console.log(tableHeaders);
  

// Defina os dados da tabela
const tableData: TableData[] = [
  { id: 1, name: 'Blastoise', type: water, hp: 79, attack: 83, defense: 100, 'sp.attack': 85, 'sp.defense': 105, speed: 78, total: 530 },
  { id: 2, name: 'Bullbasaur', type: grass, hp: 45, attack: 49, defense:49, 'sp.attack': 65, 'sp.defense': 65, speed: 45, total: 318 },
  { id: 3, name: 'Caterpie', type: bug, hp: 45, attack: 30, defense: 35, 'sp.attack': 20, 'sp.defense': 20, speed: 45, total: 195 },
  { id: 4, name: 'Charizard', type: fire, hp: 78, attack: 84, defense: 78, 'sp.attack': 109, 'sp.defense': 85, speed: 100, total: 534 },
  { id: 5, name: 'Charmander', type: fire, hp: 39, attack: 52, defense: 43, 'sp.attack': 60, 'sp.defense': 50, speed: 65, total: 309},
  { id: 6, name: 'Charmeleon',type: fire, hp: 58, attack: 64, defense:58, 'sp.attack': 80, 'sp.defense': 65, speed: 80, total: 405},
  { id: 7, name: 'Ivysaur', type: Grass, hp: 60, attack: 62, defense: 63, 'sp.attack': 80, 'sp.defense': 80, speed: 60, total: 405},
  { id: 8, name: 'Squirtle', type: water, hp: 44, attack: 48, defense: 65, 'sp.attack': 50, 'sp.defense': 64, speed: 43, total: 314},
  { id: 9, name: 'Venusaur', type: grass, hp: 80, attack: 80, defense: 83, 'sp.attack': 100, 'sp.defense': 100, speed: 80, total: 525},
  { id: 10, name: 'Wartortle', type: water, hp: 59, attack: 63, defense: 80, 'sp.attack': 65, 'sp.defense': 80, speed: 58, total: 405},
  // ... adicione mais dados aqui
];

// Defina os cabeçalhos da tabela
const tableHeaders: TableHeader[] = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
];


// Componente da tabela
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Componente de cabeçalho da tabela
const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

// Componente de célula da tabela
const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

// Componente de linha da tabela
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const ResponsiveTable: React.FC = () => {
  const [sortColumn, setSortColumn] = useState<keyof TableData>('');

  const handleSort = (columnKey: keyof TableData) => {
    setSortColumn(columnKey);
  };

  const sortedData = sortColumn ? [...tableData].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    } else {
      return aValue - bValue;
    }
  }) : tableData;

  return (
    <Table>
      <thead>
        <TableRow>
          {tableHeaders.map(header => (
            <TableHeader key={header.key} onClick={() => handleSort(header.key)}>
              {header.label}
            </TableHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <TableRow key={row.id}>
            {tableHeaders.map(header => (
              <TableCell key={`${row.id}-${header.key}`}>
                {row[header.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default ResponsiveTable;
