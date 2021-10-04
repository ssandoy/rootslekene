import React, { RefObject, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { WheelItem } from "./types";
import { clamp } from "./utils";

const Canvas = styled.canvas``;

type Props = {
  items: WheelItem[];
  width: string;
  height: string;
};

const drawWheel = ({
  canvasRef,
  items,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  items: WheelItem[];
}) => {
  const numberOfItems = items.length;
  const canvas = canvasRef.current;
  if (canvas?.getContext("2d")) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // todo move these outside
    const fontSize = 16;
    ctx.font = `bold ${fontSize}px Helvetica, Arial`;
    ctx.clearRect(0, 0, 500, 500); // todo assert
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = 0;
    const arc = Math.PI / (numberOfItems / 2);
    const startAngle = 0;
    // this -10 is padding
    const outsideRadius = canvas.width / 2 - 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // size of inner circle
    const INNER_RADIUS = 0;
    const clampedInsideRadius = clamp(0, 100, INNER_RADIUS);
    const insideRadius = (outsideRadius * clampedInsideRadius) / 100;
    const DEFAULT_TEXT_DISTANCE = 60;
    // todo what
    const clampedTextDistance = clamp(0, 100, DEFAULT_TEXT_DISTANCE);
    const textRadius = (outsideRadius * clampedTextDistance) / 100;

    items.forEach((item, i) => {
      const angle = startAngle + i * arc;
      const { style } = item;
      ctx.fillStyle = style.backgroundColor ?? "black";

      ctx.beginPath();
      ctx.arc(centerX, centerY, outsideRadius, angle, angle + arc, false);
      ctx.arc(centerX, centerY, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();

      // WHEEL RADIUS LINES
      ctx.strokeStyle = "#eeeeee";
      ctx.lineWidth = 4;
      for (let j = 0; j < items.length; j++) {
        const radiusAngle = startAngle + j * arc;
        ctx.beginPath();
        ctx.moveTo(
          centerX + (insideRadius + 1) * Math.cos(radiusAngle),
          centerY + (insideRadius + 1) * Math.sin(radiusAngle)
        );
        ctx.lineTo(
          centerX + (outsideRadius - 1) * Math.cos(radiusAngle),
          centerY + (outsideRadius - 1) * Math.sin(radiusAngle)
        );
        ctx.closePath();
        ctx.stroke();
      }

      const outerBorderColor = "#eeeeee";
      const outerBorderWidth = 0; // fixme granulated pixels if this is set
      const innerBorderColor = "#eeeeee";
      const innerBorderWidth = 10;

      // WHEEL OUTER BORDER
      ctx.strokeStyle =
        outerBorderWidth <= 0 ? "transparent" : outerBorderColor;
      ctx.lineWidth = outerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outsideRadius - ctx.lineWidth / 2,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // WHEEL INNER BORDER
      ctx.strokeStyle =
        innerBorderWidth <= 0 ? "transparent" : innerBorderColor;
      ctx.lineWidth = innerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        insideRadius + ctx.lineWidth / 2 - 1,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // TEXT FILL
      ctx.fillStyle = style?.textColor ?? "white";
      ctx.translate(
        centerX + Math.cos(angle + arc / 2) * textRadius,
        centerY + Math.sin(angle + arc / 2) * textRadius
      );
      const text = item.name;
      const textRotationAngle = angle + arc / 2;
      ctx.rotate(textRotationAngle);
      ctx.fillText(text, -ctx.measureText(text).width / 2, fontSize / 2.7);
      ctx.restore();
    });
  }
};

export const WheelCanvas: React.FC<Props> = ({ items, height, width }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawWheel({ canvasRef, items });
  }, [canvasRef, items]);

  return <Canvas width={width} height={height} ref={canvasRef} />;
};
