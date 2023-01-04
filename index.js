const ffi = require('ffi-napi');
const ref = require('ref-napi');
const path = require('node:path');

const pathToDll = './lib/zlib.dll';

const kernel32 = ffi.Library('kernel32', {
SetDllDirectoryA: [ref.types.bool, [ref.types.CString]],
});
const dllDir = path.dirname(path.resolve(pathToDll));
kernel32.SetDllDirectoryA(dllDir);

const libPath = path.resolve(path.join(__dirname));
process.env.PATH = `${process.env.PATH}${path.delimiter}${libPath}`;

console.log('env path:');
console.log(process.env.PATH);

const example_lib = ffi.Library(pathToDll, {
  zlibVersion: ['string', []]
});

console.log('zlib version:', example_lib.zlibVersion());

module.exports = { example_lib };