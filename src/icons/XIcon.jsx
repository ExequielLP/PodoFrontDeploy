export const XIcon = ({ size = 24, color = "currentColor", className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke={color}
      className={`size-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};
