# Minimal example for bug report at jest

This example is made for Windows Powershell and *not* from inside VSCode. Terminals in VSCode will have `.` injected in their PATH.

Install dependencies using `npm install`.

If you run `node index.js`, you should be able to see the version of zlib in the lib folder (1.2.12).

However, if you run `node .\node_modules\jest\bin\jest.js --silent=false`, you should get the following error:

```
 FAIL  ./test.js
  ● Test suite failed to run

    Dynamic Linking Error: Win32 error 126

      17 | console.log(process.env.PATH);
      18 |
    > 19 | const example_lib = ffi.Library(pathToDll, {
         |                         ^
      20 |   zlibVersion: ['string', []]
      21 | });
      22 |

      at new DynamicLibrary (node_modules/ffi-napi/lib/dynamic_library.js:75:11)
      at Object.Library (node_modules/ffi-napi/lib/library.js:47:10)
      at Object.Library (index.js:19:25)
      at Object.require (test.js:1:23)
```

Please note that your current directory should be part of the PATH that is printed before the error.

You can reproduce this error when calling the index.js directly by commenting out line 14 in index.js. This will prevent modifying the PATH variable. The error should then be the same (Dynamic Linking Error: Win32 error 126), but your current path should *not* be in the printed PATH.

However, if you add the current directory to the path (`$env:Path += ';<your/directory>'` in Powershell), the jest command should work nicely. This means (to me) that somehow the modification of PATH in line 14 in index.js is not used in jest, although it is included in the console.log.
