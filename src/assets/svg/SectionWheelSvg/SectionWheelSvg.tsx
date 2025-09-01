import { SvgProps } from "../../../types/SvgProps";

function SectionWheelSvg({ className }: SvgProps) {
  return (
    <svg
      className={className}
      width="125"
      height="118"
      viewBox="0 0 125 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g dataFigmaBgBlur-radius="20">
        <path
          d="M23.8029 116.23C9.01323 122.291 -4.94248 105.763 3.43813 92.1106L54.6701 8.6451C59.4477 0.861509 69.6799 -1.59247 76.9339 3.9949C95.7566 18.4932 111.279 36.8768 122.442 57.8921C126.744 65.991 122.655 75.7212 114.223 79.1767L23.8029 116.23Z"
          fill="url(#paint0_radial_530_1317)"
        />
        <path
          d="M122 58.1262C126.149 65.9371 122.221 75.3589 114.033 78.714L23.6131 115.767C9.27783 121.642 -4.26729 105.619 3.86377 92.3723L55.0963 8.90658C59.7362 1.3476 69.636 -0.995252 76.6288 4.39083C95.3949 18.8455 110.871 37.1738 122 58.1262Z"
          stroke="white"
          strokeOpacity="0.15"
        />
      </g>
      <defs>
        <clipPath
          id="bgblur_0_530_1317_clip_path"
          transform="translate(19.0859 19.0417)"
        >
          <path d="M23.8029 116.23C9.01323 122.291 -4.94248 105.763 3.43813 92.1106L54.6701 8.6451C59.4477 0.861509 69.6799 -1.59247 76.9339 3.9949C95.7566 18.4932 111.279 36.8768 122.442 57.8921C126.744 65.991 122.655 75.7212 114.223 79.1767L23.8029 116.23Z" />
        </clipPath>
        <radialGradient
          id="paint0_radial_530_1317"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-11.9119 83.4289) rotate(-21.8896) scale(123.312 98.1119)"
        >
          <stop stopColor="#27DAF9" />
          <stop offset="1" stop-color="#3900D5" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default SectionWheelSvg;
