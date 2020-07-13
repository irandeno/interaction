export const encoder = new TextEncoder();

export function encode(input?: string): Uint8Array {
  return encoder.encode(input);
}

export const decoder = new TextDecoder();

export function decode(input?: Uint8Array): string {
  return decoder.decode(input);
}

export async function write(input: string): Promise<void> {
  await Deno.stdout.write(encode(input));
}

export const bold = (input: string): string => styling(1, input);

export const green = (input: string): string => styling(32, input);

export const darkGray = (input: string): string => styling(90, input);

function styling(colorCode: number, input: string) {
  return `\x1b[${colorCode}m${input}\x1b[0m`;
}
