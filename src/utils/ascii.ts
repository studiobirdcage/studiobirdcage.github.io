import figlet from "figlet";

export type AsciiFont = figlet.Fonts;

export const DEFAULT_ASCII_FONT: AsciiFont = "Bloody";

export function generateAscii(
  text: string,
  font: AsciiFont | string = DEFAULT_ASCII_FONT,
): Promise<string> {
  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      {
        font: font as AsciiFont,
      },
      (err, data) => {
        if (err) return reject(err);
        resolve(data || "");
      },
    );
  });
}
