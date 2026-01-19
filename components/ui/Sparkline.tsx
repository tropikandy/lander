'use client';

export function Sparkline({ data, color = "currentColor", height = 30 }: { data: number[], color?: string, height?: number }) {
  const max = Math.max(...data, 100);
  const min = 0;
  const range = max - min;
  const width = 100;
  
  // Create SVG path
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible" height={height} preserveAspectRatio="none">
        <path
            d={`M 0,${height} L ${points} L ${width},${height} Z`}
            fill="var(--color-chart-bg)"
            stroke="none"
        />
        <path
            d={`M ${points}`}
            fill="none"
            stroke="var(--color-chart-line)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
  );
}
