import { BaseChart } from './base-chart.js';

export class PieChart extends BaseChart {
  draw(data, labels, max, colors) {
    this.clear();
    
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;

    const chartAreaHeight = this.height - this.margin - this.marginBottom;
    const centerX = this.width / 2;
    const centerY = chartAreaHeight / 2;
    const radius = Math.min(centerX, centerY) - this.margin;

    data.forEach((val, i) => {
      const sliceAngle = (val / total) * 2 * Math.PI;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      this.ctx.fillStyle = colors[i];
      this.ctx.fill();
      this.ctx.strokeStyle = '#e0e0e0';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      startAngle += sliceAngle;
    });

    this.drawLegend(labels, data, colors);
  }
}