import { SvgProps } from "../../../types/SvgProps";

export function CircleSvg({className}: SvgProps) {
  return (
    <svg
      className={className}
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4.5" cy="5.47998" r="4" stroke="#838383" />
    </svg>
  );
}
