import { ImageResponse } from "next/og";
import { siteConfig } from "./seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #020617 0%, #0b1220 45%, #0f172a 100%)",
          color: "white",
          padding: "56px 72px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 32,
            padding: "48px 56px",
            background:
              "radial-gradient(circle at top right, rgba(3,66,253,0.30), transparent 34%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 76,
                height: 76,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 22,
                background: "#022da8",
              }}
            >
              <svg width="52" height="40" viewBox="116 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M154.595 28.0066L150.175 21.1597M150.175 21.1597L140.941 6.30305C138.517 1.91051 134.306 1.78136 131.498 6.30305C128.302 11.45 123.076 19.2219 121.034 22.5808C118.354 26.4563 118.176 27.8775 122.055 27.8775C125.934 27.8775 132.179 27.8775 134.816 27.8775C141.834 28.1359 146.945 24.8803 150.175 21.1597Z"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: 42, fontWeight: 800 }}>
                {siteConfig.name}
              </div>
              <div style={{ fontSize: 22, color: "#cbd5e1" }}>
                Product Studio
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 840,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.05em",
              }}
            >
              Building Scalable SaaS, Enterprise, and AI Products
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.35, color: "#cbd5e1" }}>
              {siteConfig.tagline}
            </div>
          </div>

          <div style={{ fontSize: 24, color: "#7db8ff" }}>{siteConfig.url}</div>
        </div>
      </div>
    ),
    size
  );
}
