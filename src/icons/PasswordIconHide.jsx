export const PasswordIconHide = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-lock-off ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 11h2a2 2 0 0 1 2 2v2m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4" />
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M8 11v-3m.719 -3.289a4 4 0 0 1 7.281 2.289v4" />
      <path d="M3 3l18 18" />
    </svg>
  );
};