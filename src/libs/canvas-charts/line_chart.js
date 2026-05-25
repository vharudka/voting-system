import { BaseChart } from './base-chart.js';

export class LineChart extends BaseChart {
  draw(data, labels, max, colors) {
    this.clear();
    this.drawGrid(max);
    
    const chartAreaHeight = this.height - this.margin - this.marginBottom;
    const step = (this.width - this.margin * 2) / (data.length - 1);
    const floor = this.height - this.marginBottom;

    this.ctx.beginPath();
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 5;

    data.forEach((val, i) => {
      const x = this.margin + i * step;
      const y = floor - (val / max) * chartAreaHeight;
      i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
    });

    this.ctx.stroke();

    data.forEach((val, i) => {
      const x = this.margin + i * step;
      const y = floor - (val / max) * chartAreaHeight;
      this.ctx.fillStyle = colors[i];
      this.ctx.beginPath();
      this.ctx.arc(x, y, 6, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.drawLegend(labels, data, colors);
  }
}