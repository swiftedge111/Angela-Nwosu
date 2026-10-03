import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = `data:image/png;base64,${await readFile(join(process.cwd(), "src/assets/logo-white.png"), "base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 96px",
          color: "#f8f5ef",
          background: "radial-gradient(circle at 15% 10%, #2c5f44 0%, #12281c 55%, #0d1c14 100%)",
        }}
      >
        <img src={logo} width={260} height={243} alt="" />
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#d8c193" }}>
            {`${site.name} · ${site.owner}`}
          </div>
          <div style={{ marginTop: 24, fontSize: 68, lineHeight: 1.05 }}>A quieter way to win at life.</div>
          <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.4, color: "#d3dfcf" }}>{site.description}</div>
        </div>
      </div>
    ),
    size,
  );
}
