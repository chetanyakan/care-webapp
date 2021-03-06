import React, { PureComponent } from 'react';
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from 'recharts';
import './styles.scss';

export default class CovidFacilities extends PureComponent {
  render() {
    return (
      <div className="chart-wrap">
        <span className="chart-title">
          {this.props.title}
        </span>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            data={this.props.data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
            >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Private" stackId="a" barSize={20} fill="#8554ef" background={{ fill: '#eee' }} />
            <Bar dataKey="Government" stackId="a" barSize={20} fill="#5751d9" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
