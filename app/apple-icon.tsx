import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#022da8",
          borderRadius: 36,
        }}
      >
        <svg width="120" height="92" viewBox="116 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M154.595 28.0066L150.175 21.1597M150.175 21.1597L140.941 6.30305C138.517 1.91051 134.306 1.78136 131.498 6.30305C128.302 11.45 123.076 19.2219 121.034 22.5808C118.354 26.4563 118.176 27.8775 122.055 27.8775C125.934 27.8775 132.179 27.8775 134.816 27.8775C141.834 28.1359 146.945 24.8803 150.175 21.1597Z"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
