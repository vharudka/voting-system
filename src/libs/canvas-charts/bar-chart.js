import { BaseChart } from './base-chart.js';

export class BarChart extends BaseChart {
  draw(data, labels, max, colors) {
    this.clear();
    this.drawGrid(max);
    
    const chartAreaHeight = this.height - this.margin - this.marginBottom;
    const columnWidth = (this.width - this.margin * 2) / data.length;

    data.forEach((val, i) => {
      const barHeight = (val / max) * chartAreaHeight;
      const barWidth = columnWidth - 20;

      const x = this.margin + i * columnWidth + 10;
      const y = (this.height - this.marginBottom) - barHeight;

      this.ctx.fillStyle = colors[i];
      this.ctx.fillRect(x, y, barWidth, barHeight);
    });

    this.drawLegend(labels, data, colors);
  }
}