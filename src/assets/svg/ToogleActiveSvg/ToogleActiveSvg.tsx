import { SvgProps } from "../../../types/SvgProps";

export function ToogleActiveSvg({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 1C5 4.01347 5 7.50356 5 10" stroke="#838383" />
    </svg>
  );
}
