#!/usr/bin/env node

const RELAY_URL = 'https://relay.alptalha.dev';
const RELAY_KEY = 'relay_prod_6u2p3b5n91q0';
const ENCODED_MESSAGE = 'hd3Mbi1wpfxfvOrZAAAH';

const decodeMessage = (value) => {
  const buffer = Buffer.from(value, 'base64');
  return {
    length: buffer.length,
    hex: buffer.toString('hex'),
    ascii: buffer
      .toString('utf8')
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        return code >= 32 && code <= 126 ? char : '.';
      })
      .join(''),
  };
};

const decoded = decodeMessage(ENCODED_MESSAGE);

console.log('Decoded payload (hex):', decoded.hex);
console.log('Decoded payload (ASCII, non-printables shown as .):', decoded.ascii);
console.log('Byte length:', decoded.length);
