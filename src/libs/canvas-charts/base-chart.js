export class BaseChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.margin = 40;
    this.marginBottom = 220;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawGrid(maxVal) {
    const chartHeight = this.height - this.margin - this.marginBottom;
    const numLines = Math.min(maxVal + 1, 10);

    this.ctx.strokeStyle = '#e0e0e0';
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = '#666';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';

    for (let i = 0; i < numLines; i++) {
      const y = this.margin + (i * chartHeight / (numLines - 1));

      this.ctx.beginPath();
      this.ctx.moveTo(this.margin, y);
      this.ctx.lineTo(this.width - this.margin, y);
      this.ctx.stroke();

      const labelValue = Math.round(maxVal - (i * maxVal / (numLines - 1)));
      this.ctx.fillText(labelValue, this.margin - 10, y);
    }
  }

  drawLegend(labels, data, colors) {
    const boxSize = 14;
    const lineHeight = 20;
    const maxLabelChars = 60;
    const maxVisibleChars = maxLabelChars - 3;
    const labelOffset = 20;
    const legendPadding = 10;

    const startX = 20;
    const startY = this.height - (labels.length * lineHeight) - legendPadding;

    const total = data.reduce((sum, v) => sum + v, 0);

    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';

    labels.forEach((label, i) => {
      const y = startY + (i * lineHeight);

      this.ctx.fillStyle = colors[i];
      this.ctx.fillRect(startX, y, boxSize, boxSize);

      const cleanLabel =
        label.length > maxLabelChars
          ? label.substring(0, maxVisibleChars) + "..."
          : label;

      const value = data[i];
      const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

      const text = `${cleanLabel} - ${value} (${percent}%)`;

      this.ctx.fillStyle = '#1d1d1d';
      this.ctx.fillText(text, startX + labelOffset, y + boxSize / 2);
    });
  }
}