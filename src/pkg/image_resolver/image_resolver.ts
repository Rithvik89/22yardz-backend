export type SupportedImageType = "webp" | "png" | "jpg" | "jpeg" | "pdf";
export abstract class IImageResolver {
  defaultSize: { h: number; w: number };
  defaultFormat: SupportedImageType;
  constructor(
    size: { h: number; w: number },
    format: SupportedImageType
  ) {
    this.defaultSize = size;
    this.defaultFormat = format;
  }
  abstract Convert(
    imageFile: Buffer,
    size?: { h: number; w: number },
    format?: SupportedImageType
  ): Promise<Buffer>;
}
