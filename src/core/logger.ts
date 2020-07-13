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
