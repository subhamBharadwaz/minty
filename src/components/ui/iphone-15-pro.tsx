import { ReactNode, SVGProps } from "react";

export interface Iphone15ProProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
  children?: ReactNode;
}

export default function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  children,
  ...props
}: Iphone15ProProps) {
  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Background */}
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          className="fill-[#E5E5E5] dark:fill-[#404040]"
        />

        {/* Screen background */}
        <path
          d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
          className="dark:fill-[#262626] fill-white"
        />

        {/* Rounded screen area */}
        <path
          d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
          className="fill-[#E5E5E5] dark:fill-[#404040] stroke-[#E5E5E5] dark:stroke-[#404040] stroke-[0.5]"
        />

        {/* Clip path for inner content (iPhone screen) */}
        <defs>
          <clipPath id="phone-screen">
            <rect
              x="21.25"
              y="75"
              width="389.5"
              height="733"
              rx="55.75"
              ry="55.75"
            />
          </clipPath>
        </defs>

        {/* Conditionally render the image if provided */}
        {src && (
          <image
            href={src}
            x="21.25"
            y="75"
            width="389.5"
            height="733"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#phone-screen)"
          />
        )}

        {/* Placeholder for the top pill */}
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          className="dark:fill-[#262626] fill-[#F5F5F5]"
        />

        {/* Placeholder for small circle at the top */}
        <path
          d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
          className="dark:fill-[#262626] fill-[#F5F5F5]"
        />
      </svg>

      {/* Render children (e.g. notifications) inside the clipped screen */}
      <div
        className="absolute inset-0"
        style={{ clipPath: "url(#phone-screen)" }}
      >
        {children}
      </div>
    </div>
  );
}
