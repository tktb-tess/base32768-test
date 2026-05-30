import { encode, decode } from 'base32768';

export async function compressString(text: string) {
  const st = new Blob([text])
    .stream()
    .pipeThrough(new CompressionStream('deflate-raw'));

  const bin = await new Response(st).bytes();

  return encode(bin);
}

export async function decompressString(base32768: string) {
  const bin = decode(base32768);

  const st = new Blob([bin])
    .stream()
    .pipeThrough(new DecompressionStream('deflate-raw'));

  return new Response(st).text();
}
