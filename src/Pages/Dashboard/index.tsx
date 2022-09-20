import { Card } from 'antd';
import React from 'react';

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

const Dashboard: React.FC = () => (
  <Card title="Dashboard">
    <Card title="Usuários">
      <Card.Grid style={gridStyle}>Masculino</Card.Grid>
      <Card.Grid style={gridStyle}>Feminino</Card.Grid>
      <Card.Grid style={gridStyle}>Maior de 18</Card.Grid>
      <Card.Grid style={gridStyle}>Menor de 18</Card.Grid>
    </Card>
    <Card title="Servidores">
      <Card.Grid style={gridStyle}>Ativos</Card.Grid>
      <Card.Grid style={gridStyle}>Inativos</Card.Grid>
      <Card.Grid style={gridStyle}>Afastados</Card.Grid>
    </Card>
  </Card>
);

export default Dashboard;
