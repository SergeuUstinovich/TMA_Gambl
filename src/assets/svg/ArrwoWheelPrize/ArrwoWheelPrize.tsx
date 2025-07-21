import { SvgProps } from "../../../types/SvgProps";

function ArrwoWheelPrize({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="28"
      height="26"
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.1952 23C16.8858 27 11.1123 27 8.80287 23L1.00864 9.5C-1.30075 5.5 1.58599 0.5 6.2048 0.5H21.7933C26.4121 0.5 29.2988 5.5 26.9894 9.5L19.1952 23Z"
        fill="url(#paint0_linear_356_4215)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_356_4215"
          x1="15.8094"
          y1="8.10345"
          x2="12.1887"
          y2="8.10345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F4FFFF" />
          <stop offset="1" stopColor="#B5BFBF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default ArrwoWheelPrize;
