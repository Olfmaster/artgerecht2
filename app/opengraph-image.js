import { ImageResponse } from "next/og";

export const alt = "artgerecht — visuelle Kommunikation · Birgit Silberg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #ffffff 0%, #fbeff1 55%, #f2dcde 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
          color: "#18181b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#8c4f59",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#b76e79",
              display: "flex",
            }}
          />
          <span style={{ display: "flex" }}>Studio für visuelle Kommunikation</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 132,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ display: "flex" }}>artgerecht</span>
            <span style={{ display: "flex", color: "#b76e79" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontStyle: "italic",
              fontWeight: 300,
              color: "#3f3f46",
              letterSpacing: "-0.01em",
            }}
          >
            Gestaltung, die zu Ihnen passt.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#52525b",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 600, color: "#18181b" }}>Birgit Silberg</span>
            <span>artgerecht.tv</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              fontSize: 18,
              color: "#71717a",
            }}
          >
            <span>Corporate Design</span>
            <span style={{ color: "#d4d4d8" }}>·</span>
            <span>Print</span>
            <span style={{ color: "#d4d4d8" }}>·</span>
            <span>Werbemittel</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
