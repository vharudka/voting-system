import { BarChart } from './bar-chart.js';
import { LineChart } from './line_chart.js';
import { PieChart } from './pie_chart.js';

export default class CanvasChart {
  constructor(canvasId) {
    this.bar = new BarChart(canvasId);
    this.line = new LineChart(canvasId);
    this.pie = new PieChart(canvasId);

    this.defaultColors = [
      '#347cdb',
      '#eb4d3b',
      '#29b764',
      '#f2c40c',
      '#9756b0',
      '#17ab8d',
      '#dd751a',
      '#2b3d4f',
      '#c44f02',
      '#861b59'
    ];
  }

  render(type, data, labels, colors = []) {
    const filtered = data
    .map((value, i) =>
    ({
      value,
      label: labels[i],
      color: colors[i] || null
    }))
    .filter(item => item.value > 0);

    const filteredData = filtered.map(f => f.value);
    const filteredLabels = filtered.map(f => f.label);
    const filteredColors = filtered.map(f => f.color).filter(Boolean);

    const limitedData = filteredData.slice(0, 10);
    const limitedLabels = filteredLabels.slice(0, 10);
    const limitedColors = filteredColors.slice(0, 10);

    const dataMax = Math.max(...data);
    const finalColors = limitedColors.length > 0
        ? limitedColors
        : this.defaultColors;

    switch (type.toLowerCase()) {
      case 'bar':
        this.bar.draw(limitedData, limitedLabels, dataMax, finalColors);
        break;
      case 'line':
        this.line.draw(limitedData, limitedLabels, dataMax, finalColors);
        break;
      case 'pie':
        this.pie.draw(limitedData, limitedLabels, dataMax, finalColors);
        break;
    }
  }
}