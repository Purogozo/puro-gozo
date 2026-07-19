// ============================================================
// PURO GOZO · UUID ⇄ código curto (base62)
// ============================================================
// Existe por causa de um limite da Hotmart: os parâmetros de origem do
// checkout são documentados com **máximo de 30 caracteres** e o **underscore
// "_" é PROIBIDO** ("reservado para uso do sistema"). Um UUID canônico tem 36
// caracteres — estoura sozinho, antes de qualquer separador.
//   https://help.hotmart.com/pt-BR/article/216441797
//
// ⚠️ A doc confirma esse limite para `src`/`sck`; para `xcod` ela é OMISSA.
// Tratamos como se valesse, porque o custo de errar é perder a atribuição de
// TODAS as vendas em silêncio.
//
// Formato: 4 blocos de 32 bits → 6 caracteres base62 cada = **24 caracteres**,
// largura fixa, só [0-9A-Za-z]. Sem separador (nada de "_" ou "|"), sem hífen.
//
// Por que blocos de 32 bits e não o inteiro de 128: literais BigInt exigem
// target ES2020 e o projeto está em ES2017. 32 bits cabem com folga em Number
// (2^32 < 2^53), então dá pra fazer com aritmética comum.

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const BASE = ALPHABET.length; // 62
const CHUNK_CHARS = 6; // 62^6 = 56.800.235.584 > 2^32, então 6 sempre bastam
export const SHORT_ID_LENGTH = 24;

function toBase62(n: number): string {
  let out = "";
  let v = n;
  do {
    out = ALPHABET[v % BASE] + out;
    v = Math.floor(v / BASE);
  } while (v > 0);
  return out.padStart(CHUNK_CHARS, "0");
}

function fromBase62(s: string): number | null {
  let n = 0;
  for (const ch of s) {
    const i = ALPHABET.indexOf(ch);
    if (i < 0) return null;
    n = n * BASE + i;
  }
  return n;
}

/** UUID canônico → 24 caracteres alfanuméricos. null se não for UUID. */
export function uuidToShortId(uuid: string): string | null {
  const hex = uuid.replace(/-/g, "").toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) return null;
  let out = "";
  for (let i = 0; i < 32; i += 8) {
    out += toBase62(parseInt(hex.slice(i, i + 8), 16));
  }
  return out;
}

/** 24 caracteres → UUID canônico. null se o código for inválido. */
export function shortIdToUuid(code: string): string | null {
  if (!/^[0-9A-Za-z]{24}$/.test(code)) return null;
  let hex = "";
  for (let i = 0; i < SHORT_ID_LENGTH; i += CHUNK_CHARS) {
    const n = fromBase62(code.slice(i, i + CHUNK_CHARS));
    if (n === null || n > 0xffffffff) return null;
    hex += n.toString(16).padStart(8, "0");
  }
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join("-");
}
