interface RiskBadgeProps {
  severity: string;
  size?: 'sm' | 'md' | 'lg';
}

function getRiskStyle(severity: string) {
  const s = severity.toLowerCase();
  if (s === 'low' || s === 'slight') return 'bg-green-100 text-green-800 border-green-200';
  if (s === 'medium' || s === 'serious' || s === 'moderate') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (s === 'high') return 'bg-orange-100 text-orange-800 border-orange-200';
  if (s === 'critical' || s === 'fatal') return 'bg-red-100 text-red-800 border-red-200';
  return 'bg-gray-100 text-gray-800 border-gray-200';
}

const sizeMap = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5 font-semibold',
};

export default function RiskBadge({ severity, size = 'sm' }: RiskBadgeProps) {
  return (
    <span className={`inline-block rounded border font-medium ${getRiskStyle(severity)} ${sizeMap[size]}`}>
      {severity}
    </span>
  );
}
