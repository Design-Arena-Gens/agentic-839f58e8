declare module "react-signature-canvas" {
  import { Component } from "react";
  import type { CSSProperties } from "react";

  export interface SignatureCanvasProps {
    penColor?: string;
    backgroundColor?: string;
    canvasProps?: Record<string, unknown>;
    clearOnResize?: boolean;
    velocityFilterWeight?: number;
    minDistance?: number;
    dotSize?: number | ((width: number) => number);
    minWidth?: number;
    maxWidth?: number;
    throttle?: number;
    className?: string;
    style?: CSSProperties;
    onEnd?: () => void;
    onBegin?: () => void;
  }

  export default class SignatureCanvas extends Component<SignatureCanvasProps> {
    clear(): void;
    isEmpty(): boolean;
    getTrimmedCanvas(): HTMLCanvasElement;
    fromDataURL(dataURL: string, options?: { ratio?: number; width?: number; height?: number }): void;
  }
}
