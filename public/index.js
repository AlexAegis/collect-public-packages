import require$$0 from "os";
import require$$0$1 from "fs";
import require$$0$3 from "path";
import require$$2$1 from "http";
import require$$3 from "https";
import "net";
import require$$1 from "tls";
import require$$4 from "events";
import require$$5 from "assert";
import require$$0$2 from "util";
import require$$0$4 from "string_decoder";
import require$$2$2 from "child_process";
import require$$6 from "timers";
import fs$a, { existsSync } from "node:fs";
import path$d, { join, relative, normalize } from "node:path";
import { readFile } from "node:fs/promises";
import require$$0$5 from "stream";
import process$1 from "node:process";
import { fileURLToPath } from "node:url";
import "node:stream";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f2 = n.default;
  if (typeof f2 == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f2, args);
        return new Ctor();
      }
      return f2.apply(this, arguments);
    };
    a.prototype = f2.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var core$1 = {};
var command = {};
var utils$l = {};
Object.defineProperty(utils$l, "__esModule", { value: true });
utils$l.toCommandProperties = utils$l.toCommandValue = void 0;
function toCommandValue(input) {
  if (input === null || input === void 0) {
    return "";
  } else if (typeof input === "string" || input instanceof String) {
    return input;
  }
  return JSON.stringify(input);
}
utils$l.toCommandValue = toCommandValue;
function toCommandProperties(annotationProperties) {
  if (!Object.keys(annotationProperties).length) {
    return {};
  }
  return {
    title: annotationProperties.title,
    file: annotationProperties.file,
    line: annotationProperties.startLine,
    endLine: annotationProperties.endLine,
    col: annotationProperties.startColumn,
    endColumn: annotationProperties.endColumn
  };
}
utils$l.toCommandProperties = toCommandProperties;
var __createBinding$4 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$4 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$4 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.hasOwnProperty.call(mod, k))
        __createBinding$4(result, mod, k);
  }
  __setModuleDefault$4(result, mod);
  return result;
};
Object.defineProperty(command, "__esModule", { value: true });
command.issue = command.issueCommand = void 0;
const os$3 = __importStar$4(require$$0);
const utils_1$1 = utils$l;
function issueCommand(command2, properties, message) {
  const cmd = new Command(command2, properties, message);
  process.stdout.write(cmd.toString() + os$3.EOL);
}
command.issueCommand = issueCommand;
function issue(name, message = "") {
  issueCommand(name, {}, message);
}
command.issue = issue;
const CMD_STRING = "::";
class Command {
  constructor(command2, properties, message) {
    if (!command2) {
      command2 = "missing.command";
    }
    this.command = command2;
    this.properties = properties;
    this.message = message;
  }
  toString() {
    let cmdStr = CMD_STRING + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      cmdStr += " ";
      let first = true;
      for (const key in this.properties) {
        if (this.properties.hasOwnProperty(key)) {
          const val = this.properties[key];
          if (val) {
            if (first) {
              first = false;
            } else {
              cmdStr += ",";
            }
            cmdStr += `${key}=${escapeProperty(val)}`;
          }
        }
      }
    }
    cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
    return cmdStr;
  }
}
function escapeData(s) {
  return utils_1$1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escapeProperty(s) {
  return utils_1$1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
var fileCommand = {};
var getRandomValues$1;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues$1) {
    getRandomValues$1 = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues$1) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues$1(rnds8);
}
const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i$1 = 0; i$1 < 256; ++i$1) {
  byteToHex.push((i$1 + 256).toString(16).substr(1));
}
function stringify$5(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var _nodeId;
var _clockseq;
var _lastMSecs = 0;
var _lastNSecs = 0;
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify$5(b);
}
function parse$4(uuid) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
function stringToBytes(str2) {
  str2 = unescape(encodeURIComponent(str2));
  var bytes = [];
  for (var i = 0; i < str2.length; ++i) {
    bytes.push(str2.charCodeAt(i));
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL$1 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse$4(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify$5(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL$1;
  return generateUUID;
}
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 255;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var v3 = v35("v3", 48, md5);
const v3$1 = v3;
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify$5(rnds);
}
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var v5 = v35("v5", 80, sha1);
const v5$1 = v5;
const nil = "00000000-0000-0000-0000-000000000000";
function version(uuid) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
const esmBrowser = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NIL: nil,
  parse: parse$4,
  stringify: stringify$5,
  v1,
  v3: v3$1,
  v4,
  v5: v5$1,
  validate,
  version
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(esmBrowser);
var __createBinding$3 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$3 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$3 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.hasOwnProperty.call(mod, k))
        __createBinding$3(result, mod, k);
  }
  __setModuleDefault$3(result, mod);
  return result;
};
Object.defineProperty(fileCommand, "__esModule", { value: true });
fileCommand.prepareKeyValueMessage = fileCommand.issueFileCommand = void 0;
const fs$9 = __importStar$3(require$$0$1);
const os$2 = __importStar$3(require$$0);
const uuid_1 = require$$2;
const utils_1 = utils$l;
function issueFileCommand(command2, message) {
  const filePath = process.env[`GITHUB_${command2}`];
  if (!filePath) {
    throw new Error(`Unable to find environment variable for file command ${command2}`);
  }
  if (!fs$9.existsSync(filePath)) {
    throw new Error(`Missing file at path: ${filePath}`);
  }
  fs$9.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os$2.EOL}`, {
    encoding: "utf8"
  });
}
fileCommand.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
  const delimiter = `ghadelimiter_${uuid_1.v4()}`;
  const convertedValue = utils_1.toCommandValue(value);
  if (key.includes(delimiter)) {
    throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
  }
  if (convertedValue.includes(delimiter)) {
    throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
  }
  return `${key}<<${delimiter}${os$2.EOL}${convertedValue}${os$2.EOL}${delimiter}`;
}
fileCommand.prepareKeyValueMessage = prepareKeyValueMessage;
var oidcUtils = {};
var lib = {};
var proxy = {};
Object.defineProperty(proxy, "__esModule", { value: true });
proxy.checkBypass = proxy.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
  const usingSsl = reqUrl.protocol === "https:";
  if (checkBypass(reqUrl)) {
    return void 0;
  }
  const proxyVar = (() => {
    if (usingSsl) {
      return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
    } else {
      return process.env["http_proxy"] || process.env["HTTP_PROXY"];
    }
  })();
  if (proxyVar) {
    return new URL(proxyVar);
  } else {
    return void 0;
  }
}
proxy.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
  if (!reqUrl.hostname) {
    return false;
  }
  const reqHost = reqUrl.hostname;
  if (isLoopbackAddress(reqHost)) {
    return true;
  }
  const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
  if (!noProxy) {
    return false;
  }
  let reqPort;
  if (reqUrl.port) {
    reqPort = Number(reqUrl.port);
  } else if (reqUrl.protocol === "http:") {
    reqPort = 80;
  } else if (reqUrl.protocol === "https:") {
    reqPort = 443;
  }
  const upperReqHosts = [reqUrl.hostname.toUpperCase()];
  if (typeof reqPort === "number") {
    upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
  }
  for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
    if (upperNoProxyItem === "*" || upperReqHosts.some((x) => x === upperNoProxyItem || x.endsWith(`.${upperNoProxyItem}`) || upperNoProxyItem.startsWith(".") && x.endsWith(`${upperNoProxyItem}`))) {
      return true;
    }
  }
  return false;
}
proxy.checkBypass = checkBypass;
function isLoopbackAddress(host) {
  const hostLower = host.toLowerCase();
  return hostLower === "localhost" || hostLower.startsWith("127.") || hostLower.startsWith("[::1]") || hostLower.startsWith("[0:0:0:0:0:0:0:1]");
}
var tunnel$1 = {};
var tls = require$$1;
var http = require$$2$1;
var https = require$$3;
var events$1 = require$$4;
var util$2 = require$$0$2;
tunnel$1.httpOverHttp = httpOverHttp;
tunnel$1.httpsOverHttp = httpsOverHttp;
tunnel$1.httpOverHttps = httpOverHttps;
tunnel$1.httpsOverHttps = httpsOverHttps;
function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}
function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}
function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}
function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}
function TunnelingAgent(options) {
  var self2 = this;
  self2.options = options || {};
  self2.proxyOptions = self2.options.proxy || {};
  self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
  self2.requests = [];
  self2.sockets = [];
  self2.on("free", function onFree(socket, host, port, localAddress) {
    var options2 = toOptions(host, port, localAddress);
    for (var i = 0, len = self2.requests.length; i < len; ++i) {
      var pending = self2.requests[i];
      if (pending.host === options2.host && pending.port === options2.port) {
        self2.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self2.removeSocket(socket);
  });
}
util$2.inherits(TunnelingAgent, events$1.EventEmitter);
TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self2 = this;
  var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
  if (self2.sockets.length >= this.maxSockets) {
    self2.requests.push(options);
    return;
  }
  self2.createSocket(options, function(socket) {
    socket.on("free", onFree);
    socket.on("close", onCloseOrRemove);
    socket.on("agentRemove", onCloseOrRemove);
    req.onSocket(socket);
    function onFree() {
      self2.emit("free", socket, options);
    }
    function onCloseOrRemove(err) {
      self2.removeSocket(socket);
      socket.removeListener("free", onFree);
      socket.removeListener("close", onCloseOrRemove);
      socket.removeListener("agentRemove", onCloseOrRemove);
    }
  });
};
TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self2 = this;
  var placeholder = {};
  self2.sockets.push(placeholder);
  var connectOptions = mergeOptions({}, self2.proxyOptions, {
    method: "CONNECT",
    path: options.host + ":" + options.port,
    agent: false,
    headers: {
      host: options.host + ":" + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
  }
  debug("making CONNECT request");
  var connectReq = self2.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false;
  connectReq.once("response", onResponse);
  connectReq.once("upgrade", onUpgrade);
  connectReq.once("connect", onConnect);
  connectReq.once("error", onError);
  connectReq.end();
  function onResponse(res) {
    res.upgrade = true;
  }
  function onUpgrade(res, socket, head) {
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }
  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();
    if (res.statusCode !== 200) {
      debug(
        "tunneling socket could not be established, statusCode=%d",
        res.statusCode
      );
      socket.destroy();
      var error2 = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
      error2.code = "ECONNRESET";
      options.request.emit("error", error2);
      self2.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug("got illegal response body from proxy");
      socket.destroy();
      var error2 = new Error("got illegal response body from proxy");
      error2.code = "ECONNRESET";
      options.request.emit("error", error2);
      self2.removeSocket(placeholder);
      return;
    }
    debug("tunneling connection has established");
    self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }
  function onError(cause) {
    connectReq.removeAllListeners();
    debug(
      "tunneling socket could not be established, cause=%s\n",
      cause.message,
      cause.stack
    );
    var error2 = new Error("tunneling socket could not be established, cause=" + cause.message);
    error2.code = "ECONNRESET";
    options.request.emit("error", error2);
    self2.removeSocket(placeholder);
  }
};
TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket);
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);
  var pending = this.requests.shift();
  if (pending) {
    this.createSocket(pending, function(socket2) {
      pending.request.onSocket(socket2);
    });
  }
};
function createSecureSocket(options, cb) {
  var self2 = this;
  TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
    var hostHeader = options.request.getHeader("host");
    var tlsOptions = mergeOptions({}, self2.options, {
      socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
    });
    var secureSocket = tls.connect(0, tlsOptions);
    self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}
function toOptions(host, port, localAddress) {
  if (typeof host === "string") {
    return {
      host,
      port,
      localAddress
    };
  }
  return host;
}
function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === "object") {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== void 0) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}
var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === "string") {
      args[0] = "TUNNEL: " + args[0];
    } else {
      args.unshift("TUNNEL:");
    }
    console.error.apply(console, args);
  };
} else {
  debug = function() {
  };
}
tunnel$1.debug = debug;
var tunnel = tunnel$1;
(function(exports) {
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
  const http2 = __importStar2(require$$2$1);
  const https2 = __importStar2(require$$3);
  const pm = __importStar2(proxy);
  const tunnel$12 = __importStar2(tunnel);
  var HttpCodes;
  (function(HttpCodes2) {
    HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
    HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
    HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
    HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
    HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
    HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
    HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
    HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
    HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
    HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
    HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
  })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
  var Headers;
  (function(Headers2) {
    Headers2["Accept"] = "accept";
    Headers2["ContentType"] = "content-type";
  })(Headers = exports.Headers || (exports.Headers = {}));
  var MediaTypes;
  (function(MediaTypes2) {
    MediaTypes2["ApplicationJson"] = "application/json";
  })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
  function getProxyUrl2(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : "";
  }
  exports.getProxyUrl = getProxyUrl2;
  const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
  ];
  const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
  ];
  const RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
  const ExponentialBackoffCeiling = 10;
  const ExponentialBackoffTimeSlice = 5;
  class HttpClientError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = "HttpClientError";
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, HttpClientError.prototype);
    }
  }
  exports.HttpClientError = HttpClientError;
  class HttpClientResponse {
    constructor(message) {
      this.message = message;
    }
    readBody() {
      return __awaiter2(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter2(this, void 0, void 0, function* () {
          let output = Buffer.alloc(0);
          this.message.on("data", (chunk) => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on("end", () => {
            resolve(output.toString());
          });
        }));
      });
    }
  }
  exports.HttpClientResponse = HttpClientResponse;
  function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === "https:";
  }
  exports.isHttps = isHttps;
  class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
      this._ignoreSslError = false;
      this._allowRedirects = true;
      this._allowRedirectDowngrade = false;
      this._maxRedirects = 50;
      this._allowRetries = false;
      this._maxRetries = 1;
      this._keepAlive = false;
      this._disposed = false;
      this.userAgent = userAgent;
      this.handlers = handlers || [];
      this.requestOptions = requestOptions;
      if (requestOptions) {
        if (requestOptions.ignoreSslError != null) {
          this._ignoreSslError = requestOptions.ignoreSslError;
        }
        this._socketTimeout = requestOptions.socketTimeout;
        if (requestOptions.allowRedirects != null) {
          this._allowRedirects = requestOptions.allowRedirects;
        }
        if (requestOptions.allowRedirectDowngrade != null) {
          this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
        }
        if (requestOptions.maxRedirects != null) {
          this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
        }
        if (requestOptions.keepAlive != null) {
          this._keepAlive = requestOptions.keepAlive;
        }
        if (requestOptions.allowRetries != null) {
          this._allowRetries = requestOptions.allowRetries;
        }
        if (requestOptions.maxRetries != null) {
          this._maxRetries = requestOptions.maxRetries;
        }
      }
    }
    options(requestUrl, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
      });
    }
    get(requestUrl, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request("GET", requestUrl, null, additionalHeaders || {});
      });
    }
    del(requestUrl, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request("DELETE", requestUrl, null, additionalHeaders || {});
      });
    }
    post(requestUrl, data, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request("POST", requestUrl, data, additionalHeaders || {});
      });
    }
    patch(requestUrl, data, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request("PATCH", requestUrl, data, additionalHeaders || {});
      });
    }
    put(requestUrl, data, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request("PUT", requestUrl, data, additionalHeaders || {});
      });
    }
    head(requestUrl, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request("HEAD", requestUrl, null, additionalHeaders || {});
      });
    }
    sendStream(verb, requestUrl, stream2, additionalHeaders) {
      return __awaiter2(this, void 0, void 0, function* () {
        return this.request(verb, requestUrl, stream2, additionalHeaders);
      });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        const res = yield this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        const data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        const res = yield this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        const data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        const res = yield this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        const data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        const res = yield this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
      return __awaiter2(this, void 0, void 0, function* () {
        if (this._disposed) {
          throw new Error("Client has already been disposed.");
        }
        const parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        do {
          response = yield this.requestRaw(info, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (const handler of this.handlers) {
              if (handler.canHandleAuthentication(response)) {
                authenticationHandler = handler;
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers["location"];
            if (!redirectUrl) {
              break;
            }
            const parsedRedirectUrl = new URL(redirectUrl);
            if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            }
            yield response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (const header in headers) {
                if (header.toLowerCase() === "authorization") {
                  delete headers[header];
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = yield this.requestRaw(info, data);
            redirectsRemaining--;
          }
          if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            yield response.readBody();
            yield this._performExponentialBackoff(numTries);
          }
        } while (numTries < maxTries);
        return response;
      });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
      if (this._agent) {
        this._agent.destroy();
      }
      this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
      return __awaiter2(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
          function callbackForResult(err, res) {
            if (err) {
              reject(err);
            } else if (!res) {
              reject(new Error("Unknown error"));
            } else {
              resolve(res);
            }
          }
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
      if (typeof data === "string") {
        if (!info.options.headers) {
          info.options.headers = {};
        }
        info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
      }
      let callbackCalled = false;
      function handleResult(err, res) {
        if (!callbackCalled) {
          callbackCalled = true;
          onResult(err, res);
        }
      }
      const req = info.httpModule.request(info.options, (msg) => {
        const res = new HttpClientResponse(msg);
        handleResult(void 0, res);
      });
      let socket;
      req.on("socket", (sock) => {
        socket = sock;
      });
      req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
        if (socket) {
          socket.end();
        }
        handleResult(new Error(`Request timeout: ${info.options.path}`));
      });
      req.on("error", function(err) {
        handleResult(err);
      });
      if (data && typeof data === "string") {
        req.write(data, "utf8");
      }
      if (data && typeof data !== "string") {
        data.on("close", function() {
          req.end();
        });
        data.pipe(req);
      } else {
        req.end();
      }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
      const parsedUrl = new URL(serverUrl);
      return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
      const info = {};
      info.parsedUrl = requestUrl;
      const usingSsl = info.parsedUrl.protocol === "https:";
      info.httpModule = usingSsl ? https2 : http2;
      const defaultPort = usingSsl ? 443 : 80;
      info.options = {};
      info.options.host = info.parsedUrl.hostname;
      info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
      info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
      info.options.method = method;
      info.options.headers = this._mergeHeaders(headers);
      if (this.userAgent != null) {
        info.options.headers["user-agent"] = this.userAgent;
      }
      info.options.agent = this._getAgent(info.parsedUrl);
      if (this.handlers) {
        for (const handler of this.handlers) {
          handler.prepareRequest(info.options);
        }
      }
      return info;
    }
    _mergeHeaders(headers) {
      if (this.requestOptions && this.requestOptions.headers) {
        return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
      }
      return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default2) {
      let clientHeader;
      if (this.requestOptions && this.requestOptions.headers) {
        clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
      }
      return additionalHeaders[header] || clientHeader || _default2;
    }
    _getAgent(parsedUrl) {
      let agent;
      const proxyUrl = pm.getProxyUrl(parsedUrl);
      const useProxy = proxyUrl && proxyUrl.hostname;
      if (this._keepAlive && useProxy) {
        agent = this._proxyAgent;
      }
      if (this._keepAlive && !useProxy) {
        agent = this._agent;
      }
      if (agent) {
        return agent;
      }
      const usingSsl = parsedUrl.protocol === "https:";
      let maxSockets = 100;
      if (this.requestOptions) {
        maxSockets = this.requestOptions.maxSockets || http2.globalAgent.maxSockets;
      }
      if (proxyUrl && proxyUrl.hostname) {
        const agentOptions = {
          maxSockets,
          keepAlive: this._keepAlive,
          proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
            proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
          }), { host: proxyUrl.hostname, port: proxyUrl.port })
        };
        let tunnelAgent;
        const overHttps = proxyUrl.protocol === "https:";
        if (usingSsl) {
          tunnelAgent = overHttps ? tunnel$12.httpsOverHttps : tunnel$12.httpsOverHttp;
        } else {
          tunnelAgent = overHttps ? tunnel$12.httpOverHttps : tunnel$12.httpOverHttp;
        }
        agent = tunnelAgent(agentOptions);
        this._proxyAgent = agent;
      }
      if (this._keepAlive && !agent) {
        const options = { keepAlive: this._keepAlive, maxSockets };
        agent = usingSsl ? new https2.Agent(options) : new http2.Agent(options);
        this._agent = agent;
      }
      if (!agent) {
        agent = usingSsl ? https2.globalAgent : http2.globalAgent;
      }
      if (usingSsl && this._ignoreSslError) {
        agent.options = Object.assign(agent.options || {}, {
          rejectUnauthorized: false
        });
      }
      return agent;
    }
    _performExponentialBackoff(retryNumber) {
      return __awaiter2(this, void 0, void 0, function* () {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      });
    }
    _processResponse(res, options) {
      return __awaiter2(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter2(this, void 0, void 0, function* () {
          const statusCode = res.message.statusCode || 0;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode === HttpCodes.NotFound) {
            resolve(response);
          }
          function dateTimeDeserializer(key, value) {
            if (typeof value === "string") {
              const a = new Date(value);
              if (!isNaN(a.valueOf())) {
                return a;
              }
            }
            return value;
          }
          let obj;
          let contents;
          try {
            contents = yield res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {
          }
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = `Failed request: (${statusCode})`;
            }
            const err = new HttpClientError(msg, statusCode);
            err.result = response.result;
            reject(err);
          } else {
            resolve(response);
          }
        }));
      });
    }
  }
  exports.HttpClient = HttpClient;
  const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
})(lib);
var auth = {};
var __awaiter$3 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(auth, "__esModule", { value: true });
auth.PersonalAccessTokenCredentialHandler = auth.BearerCredentialHandler = auth.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  prepareRequest(options) {
    if (!options.headers) {
      throw Error("The request has no headers");
    }
    options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter$3(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
auth.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
  constructor(token) {
    this.token = token;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(options) {
    if (!options.headers) {
      throw Error("The request has no headers");
    }
    options.headers["Authorization"] = `Bearer ${this.token}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter$3(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
auth.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
  constructor(token) {
    this.token = token;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(options) {
    if (!options.headers) {
      throw Error("The request has no headers");
    }
    options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter$3(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
auth.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
var hasRequiredOidcUtils;
function requireOidcUtils() {
  if (hasRequiredOidcUtils)
    return oidcUtils;
  hasRequiredOidcUtils = 1;
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(oidcUtils, "__esModule", { value: true });
  oidcUtils.OidcClient = void 0;
  const http_client_1 = lib;
  const auth_1 = auth;
  const core_1 = requireCore();
  class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
      const requestOptions = {
        allowRetries: allowRetry,
        maxRetries: maxRetry
      };
      return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
      const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
      if (!token) {
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
      }
      return token;
    }
    static getIDTokenUrl() {
      const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
      if (!runtimeUrl) {
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
      }
      return runtimeUrl;
    }
    static getCall(id_token_url) {
      var _a;
      return __awaiter2(this, void 0, void 0, function* () {
        const httpclient = OidcClient.createHttpClient();
        const res = yield httpclient.getJson(id_token_url).catch((error2) => {
          throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error2.statusCode}
 
        Error Message: ${error2.result.message}`);
        });
        const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
        if (!id_token) {
          throw new Error("Response json body do not have ID Token field");
        }
        return id_token;
      });
    }
    static getIDToken(audience) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let id_token_url = OidcClient.getIDTokenUrl();
          if (audience) {
            const encodedAudience = encodeURIComponent(audience);
            id_token_url = `${id_token_url}&audience=${encodedAudience}`;
          }
          core_1.debug(`ID token url is ${id_token_url}`);
          const id_token = yield OidcClient.getCall(id_token_url);
          core_1.setSecret(id_token);
          return id_token;
        } catch (error2) {
          throw new Error(`Error message: ${error2.message}`);
        }
      });
    }
  }
  oidcUtils.OidcClient = OidcClient;
  return oidcUtils;
}
var summary = {};
var hasRequiredSummary;
function requireSummary() {
  if (hasRequiredSummary)
    return summary;
  hasRequiredSummary = 1;
  (function(exports) {
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
    const os_1 = require$$0;
    const fs_1 = require$$0$1;
    const { access, appendFile, writeFile } = fs_1.promises;
    exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    class Summary {
      constructor() {
        this._buffer = "";
      }
      /**
       * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
       * Also checks r/w permissions.
       *
       * @returns step summary file path
       */
      filePath() {
        return __awaiter2(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      /**
       * Wraps content in an HTML tag, adding any HTML attributes
       *
       * @param {string} tag HTML tag to wrap
       * @param {string | null} content content within the tag
       * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
       *
       * @returns {string} content wrapped in HTML element
       */
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      /**
       * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
       *
       * @param {SummaryWriteOptions} [options] (optional) options for write operation
       *
       * @returns {Promise<Summary>} summary instance
       */
      write(options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      /**
       * Clears the summary buffer and wipes the summary file
       *
       * @returns {Summary} summary instance
       */
      clear() {
        return __awaiter2(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      /**
       * Returns the current summary buffer as a string
       *
       * @returns {string} string of summary buffer
       */
      stringify() {
        return this._buffer;
      }
      /**
       * If the summary buffer is empty
       *
       * @returns {boolen} true if the buffer is empty
       */
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      /**
       * Resets the summary buffer without writing to summary file
       *
       * @returns {Summary} summary instance
       */
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      /**
       * Adds raw text to the summary buffer
       *
       * @param {string} text content to add
       * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
       *
       * @returns {Summary} summary instance
       */
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      /**
       * Adds the operating system-specific end-of-line marker to the buffer
       *
       * @returns {Summary} summary instance
       */
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      /**
       * Adds an HTML codeblock to the summary buffer
       *
       * @param {string} code content to render within fenced code block
       * @param {string} lang (optional) language to syntax highlight code
       *
       * @returns {Summary} summary instance
       */
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML list to the summary buffer
       *
       * @param {string[]} items list of items to render
       * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
       *
       * @returns {Summary} summary instance
       */
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML table to the summary buffer
       *
       * @param {SummaryTableCell[]} rows table rows
       *
       * @returns {Summary} summary instance
       */
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML image tag to the summary buffer
       *
       * @param {string} src path to the image you to embed
       * @param {string} alt text description of the image
       * @param {SummaryImageOptions} options (optional) addition image attributes
       *
       * @returns {Summary} summary instance
       */
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML thematic break (<hr>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML line break (<br>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML blockquote to the summary buffer
       *
       * @param {string} text quote text
       * @param {string} cite (optional) citation url
       *
       * @returns {Summary} summary instance
       */
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML anchor tag to the summary buffer
       *
       * @param {string} text link text/content
       * @param {string} href hyperlink
       *
       * @returns {Summary} summary instance
       */
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    }
    const _summary = new Summary();
    exports.markdownSummary = _summary;
    exports.summary = _summary;
  })(summary);
  return summary;
}
var pathUtils = {};
var hasRequiredPathUtils;
function requirePathUtils() {
  if (hasRequiredPathUtils)
    return pathUtils;
  hasRequiredPathUtils = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  Object.defineProperty(pathUtils, "__esModule", { value: true });
  pathUtils.toPlatformPath = pathUtils.toWin32Path = pathUtils.toPosixPath = void 0;
  const path2 = __importStar2(require$$0$3);
  function toPosixPath(pth) {
    return pth.replace(/[\\]/g, "/");
  }
  pathUtils.toPosixPath = toPosixPath;
  function toWin32Path(pth) {
    return pth.replace(/[/]/g, "\\");
  }
  pathUtils.toWin32Path = toWin32Path;
  function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path2.sep);
  }
  pathUtils.toPlatformPath = toPlatformPath;
  return pathUtils;
}
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore)
    return core$1;
  hasRequiredCore = 1;
  (function(exports) {
    var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    const command_1 = command;
    const file_command_1 = fileCommand;
    const utils_12 = utils$l;
    const os2 = __importStar2(require$$0);
    const path2 = __importStar2(require$$0$3);
    const oidc_utils_1 = requireOidcUtils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_12.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("ENV", file_command_1.prepareKeyValueMessage(name, val));
      }
      command_1.issueCommand("set-env", { name }, convertedVal);
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueFileCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path2.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput;
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options).split("\n").filter((x) => x !== "");
      if (options && options.trimWhitespace === false) {
        return inputs;
      }
      return inputs.map((input) => input.trim());
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      const filePath = process.env["GITHUB_OUTPUT"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("OUTPUT", file_command_1.prepareKeyValueMessage(name, value));
      }
      process.stdout.write(os2.EOL);
      command_1.issueCommand("set-output", { name }, utils_12.toCommandValue(value));
    }
    exports.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error2(message);
    }
    exports.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug2(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug2;
    function error2(message, properties = {}) {
      command_1.issueCommand("error", utils_12.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error2;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_12.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_12.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info(message) {
      process.stdout.write(message + os2.EOL);
    }
    exports.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter2(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      const filePath = process.env["GITHUB_STATE"] || "";
      if (filePath) {
        return file_command_1.issueFileCommand("STATE", file_command_1.prepareKeyValueMessage(name, value));
      }
      command_1.issueCommand("save-state", { name }, utils_12.toCommandValue(value));
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter2(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
    var summary_1 = requireSummary();
    Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = requireSummary();
    Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = requirePathUtils();
    Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
  })(core$1);
  return core$1;
}
var coreExports = requireCore();
var exec$1 = {};
var toolrunner = {};
var io$1 = {};
var ioUtil$2 = {};
(function(exports) {
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.READONLY = exports.UV_FS_O_EXLOCK = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rm = exports.rename = exports.readlink = exports.readdir = exports.open = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
  const fs2 = __importStar2(require$$0$1);
  const path2 = __importStar2(require$$0$3);
  _a = fs2.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.open = _a.open, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rm = _a.rm, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
  exports.IS_WINDOWS = process.platform === "win32";
  exports.UV_FS_O_EXLOCK = 268435456;
  exports.READONLY = fs2.constants.O_RDONLY;
  function exists(fsPath) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        yield exports.stat(fsPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          return false;
        }
        throw err;
      }
      return true;
    });
  }
  exports.exists = exists;
  function isDirectory(fsPath, useStat = false) {
    return __awaiter2(this, void 0, void 0, function* () {
      const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
      return stats.isDirectory();
    });
  }
  exports.isDirectory = isDirectory;
  function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
      throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
      return p.startsWith("\\") || /^[A-Z]:/i.test(p);
    }
    return p.startsWith("/");
  }
  exports.isRooted = isRooted;
  function tryGetExecutablePath(filePath, extensions) {
    return __awaiter2(this, void 0, void 0, function* () {
      let stats = void 0;
      try {
        stats = yield exports.stat(filePath);
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
      }
      if (stats && stats.isFile()) {
        if (exports.IS_WINDOWS) {
          const upperExt = path2.extname(filePath).toUpperCase();
          if (extensions.some((validExt) => validExt.toUpperCase() === upperExt)) {
            return filePath;
          }
        } else {
          if (isUnixExecutable(stats)) {
            return filePath;
          }
        }
      }
      const originalFilePath = filePath;
      for (const extension of extensions) {
        filePath = originalFilePath + extension;
        stats = void 0;
        try {
          stats = yield exports.stat(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
          }
        }
        if (stats && stats.isFile()) {
          if (exports.IS_WINDOWS) {
            try {
              const directory = path2.dirname(filePath);
              const upperName = path2.basename(filePath).toUpperCase();
              for (const actualName of yield exports.readdir(directory)) {
                if (upperName === actualName.toUpperCase()) {
                  filePath = path2.join(directory, actualName);
                  break;
                }
              }
            } catch (err) {
              console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
            }
            return filePath;
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
      }
      return "";
    });
  }
  exports.tryGetExecutablePath = tryGetExecutablePath;
  function normalizeSeparators(p) {
    p = p || "";
    if (exports.IS_WINDOWS) {
      p = p.replace(/\//g, "\\");
      return p.replace(/\\\\+/g, "\\");
    }
    return p.replace(/\/\/+/g, "/");
  }
  function isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
  }
  function getCmdPath() {
    var _a2;
    return (_a2 = process.env["COMSPEC"]) !== null && _a2 !== void 0 ? _a2 : `cmd.exe`;
  }
  exports.getCmdPath = getCmdPath;
})(ioUtil$2);
var __createBinding$2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.hasOwnProperty.call(mod, k))
        __createBinding$2(result, mod, k);
  }
  __setModuleDefault$2(result, mod);
  return result;
};
var __awaiter$2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(io$1, "__esModule", { value: true });
io$1.findInPath = io$1.which = io$1.mkdirP = io$1.rmRF = io$1.mv = io$1.cp = void 0;
const assert_1 = require$$5;
const path$c = __importStar$2(require$$0$3);
const ioUtil$1 = __importStar$2(ioUtil$2);
function cp(source, dest, options = {}) {
  return __awaiter$2(this, void 0, void 0, function* () {
    const { force, recursive, copySourceDirectory } = readCopyOptions(options);
    const destStat = (yield ioUtil$1.exists(dest)) ? yield ioUtil$1.stat(dest) : null;
    if (destStat && destStat.isFile() && !force) {
      return;
    }
    const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? path$c.join(dest, path$c.basename(source)) : dest;
    if (!(yield ioUtil$1.exists(source))) {
      throw new Error(`no such file or directory: ${source}`);
    }
    const sourceStat = yield ioUtil$1.stat(source);
    if (sourceStat.isDirectory()) {
      if (!recursive) {
        throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
      } else {
        yield cpDirRecursive(source, newDest, 0, force);
      }
    } else {
      if (path$c.relative(source, newDest) === "") {
        throw new Error(`'${newDest}' and '${source}' are the same file`);
      }
      yield copyFile(source, newDest, force);
    }
  });
}
io$1.cp = cp;
function mv(source, dest, options = {}) {
  return __awaiter$2(this, void 0, void 0, function* () {
    if (yield ioUtil$1.exists(dest)) {
      let destExists = true;
      if (yield ioUtil$1.isDirectory(dest)) {
        dest = path$c.join(dest, path$c.basename(source));
        destExists = yield ioUtil$1.exists(dest);
      }
      if (destExists) {
        if (options.force == null || options.force) {
          yield rmRF(dest);
        } else {
          throw new Error("Destination already exists");
        }
      }
    }
    yield mkdirP(path$c.dirname(dest));
    yield ioUtil$1.rename(source, dest);
  });
}
io$1.mv = mv;
function rmRF(inputPath) {
  return __awaiter$2(this, void 0, void 0, function* () {
    if (ioUtil$1.IS_WINDOWS) {
      if (/[*"<>|]/.test(inputPath)) {
        throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
      }
    }
    try {
      yield ioUtil$1.rm(inputPath, {
        force: true,
        maxRetries: 3,
        recursive: true,
        retryDelay: 300
      });
    } catch (err) {
      throw new Error(`File was unable to be removed ${err}`);
    }
  });
}
io$1.rmRF = rmRF;
function mkdirP(fsPath) {
  return __awaiter$2(this, void 0, void 0, function* () {
    assert_1.ok(fsPath, "a path argument must be provided");
    yield ioUtil$1.mkdir(fsPath, { recursive: true });
  });
}
io$1.mkdirP = mkdirP;
function which(tool, check) {
  return __awaiter$2(this, void 0, void 0, function* () {
    if (!tool) {
      throw new Error("parameter 'tool' is required");
    }
    if (check) {
      const result = yield which(tool, false);
      if (!result) {
        if (ioUtil$1.IS_WINDOWS) {
          throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
        } else {
          throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
        }
      }
      return result;
    }
    const matches = yield findInPath(tool);
    if (matches && matches.length > 0) {
      return matches[0];
    }
    return "";
  });
}
io$1.which = which;
function findInPath(tool) {
  return __awaiter$2(this, void 0, void 0, function* () {
    if (!tool) {
      throw new Error("parameter 'tool' is required");
    }
    const extensions = [];
    if (ioUtil$1.IS_WINDOWS && process.env["PATHEXT"]) {
      for (const extension of process.env["PATHEXT"].split(path$c.delimiter)) {
        if (extension) {
          extensions.push(extension);
        }
      }
    }
    if (ioUtil$1.isRooted(tool)) {
      const filePath = yield ioUtil$1.tryGetExecutablePath(tool, extensions);
      if (filePath) {
        return [filePath];
      }
      return [];
    }
    if (tool.includes(path$c.sep)) {
      return [];
    }
    const directories = [];
    if (process.env.PATH) {
      for (const p of process.env.PATH.split(path$c.delimiter)) {
        if (p) {
          directories.push(p);
        }
      }
    }
    const matches = [];
    for (const directory of directories) {
      const filePath = yield ioUtil$1.tryGetExecutablePath(path$c.join(directory, tool), extensions);
      if (filePath) {
        matches.push(filePath);
      }
    }
    return matches;
  });
}
io$1.findInPath = findInPath;
function readCopyOptions(options) {
  const force = options.force == null ? true : options.force;
  const recursive = Boolean(options.recursive);
  const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
  return { force, recursive, copySourceDirectory };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
  return __awaiter$2(this, void 0, void 0, function* () {
    if (currentDepth >= 255)
      return;
    currentDepth++;
    yield mkdirP(destDir);
    const files = yield ioUtil$1.readdir(sourceDir);
    for (const fileName of files) {
      const srcFile = `${sourceDir}/${fileName}`;
      const destFile = `${destDir}/${fileName}`;
      const srcFileStat = yield ioUtil$1.lstat(srcFile);
      if (srcFileStat.isDirectory()) {
        yield cpDirRecursive(srcFile, destFile, currentDepth, force);
      } else {
        yield copyFile(srcFile, destFile, force);
      }
    }
    yield ioUtil$1.chmod(destDir, (yield ioUtil$1.stat(sourceDir)).mode);
  });
}
function copyFile(srcFile, destFile, force) {
  return __awaiter$2(this, void 0, void 0, function* () {
    if ((yield ioUtil$1.lstat(srcFile)).isSymbolicLink()) {
      try {
        yield ioUtil$1.lstat(destFile);
        yield ioUtil$1.unlink(destFile);
      } catch (e) {
        if (e.code === "EPERM") {
          yield ioUtil$1.chmod(destFile, "0666");
          yield ioUtil$1.unlink(destFile);
        }
      }
      const symlinkFull = yield ioUtil$1.readlink(srcFile);
      yield ioUtil$1.symlink(symlinkFull, destFile, ioUtil$1.IS_WINDOWS ? "junction" : null);
    } else if (!(yield ioUtil$1.exists(destFile)) || force) {
      yield ioUtil$1.copyFile(srcFile, destFile);
    }
  });
}
var __createBinding$1 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$1 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$1 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.hasOwnProperty.call(mod, k))
        __createBinding$1(result, mod, k);
  }
  __setModuleDefault$1(result, mod);
  return result;
};
var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(toolrunner, "__esModule", { value: true });
toolrunner.argStringToArray = toolrunner.ToolRunner = void 0;
const os$1 = __importStar$1(require$$0);
const events = __importStar$1(require$$4);
const child = __importStar$1(require$$2$2);
const path$b = __importStar$1(require$$0$3);
const io = __importStar$1(io$1);
const ioUtil = __importStar$1(ioUtil$2);
const timers_1 = require$$6;
const IS_WINDOWS = process.platform === "win32";
class ToolRunner extends events.EventEmitter {
  constructor(toolPath, args, options) {
    super();
    if (!toolPath) {
      throw new Error("Parameter 'toolPath' cannot be null or empty.");
    }
    this.toolPath = toolPath;
    this.args = args || [];
    this.options = options || {};
  }
  _debug(message) {
    if (this.options.listeners && this.options.listeners.debug) {
      this.options.listeners.debug(message);
    }
  }
  _getCommandString(options, noPrefix) {
    const toolPath = this._getSpawnFileName();
    const args = this._getSpawnArgs(options);
    let cmd = noPrefix ? "" : "[command]";
    if (IS_WINDOWS) {
      if (this._isCmdFile()) {
        cmd += toolPath;
        for (const a of args) {
          cmd += ` ${a}`;
        }
      } else if (options.windowsVerbatimArguments) {
        cmd += `"${toolPath}"`;
        for (const a of args) {
          cmd += ` ${a}`;
        }
      } else {
        cmd += this._windowsQuoteCmdArg(toolPath);
        for (const a of args) {
          cmd += ` ${this._windowsQuoteCmdArg(a)}`;
        }
      }
    } else {
      cmd += toolPath;
      for (const a of args) {
        cmd += ` ${a}`;
      }
    }
    return cmd;
  }
  _processLineBuffer(data, strBuffer, onLine) {
    try {
      let s = strBuffer + data.toString();
      let n = s.indexOf(os$1.EOL);
      while (n > -1) {
        const line = s.substring(0, n);
        onLine(line);
        s = s.substring(n + os$1.EOL.length);
        n = s.indexOf(os$1.EOL);
      }
      return s;
    } catch (err) {
      this._debug(`error processing line. Failed with error ${err}`);
      return "";
    }
  }
  _getSpawnFileName() {
    if (IS_WINDOWS) {
      if (this._isCmdFile()) {
        return process.env["COMSPEC"] || "cmd.exe";
      }
    }
    return this.toolPath;
  }
  _getSpawnArgs(options) {
    if (IS_WINDOWS) {
      if (this._isCmdFile()) {
        let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
        for (const a of this.args) {
          argline += " ";
          argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
        }
        argline += '"';
        return [argline];
      }
    }
    return this.args;
  }
  _endsWith(str2, end) {
    return str2.endsWith(end);
  }
  _isCmdFile() {
    const upperToolPath = this.toolPath.toUpperCase();
    return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
  }
  _windowsQuoteCmdArg(arg) {
    if (!this._isCmdFile()) {
      return this._uvQuoteCmdArg(arg);
    }
    if (!arg) {
      return '""';
    }
    const cmdSpecialChars = [
      " ",
      "	",
      "&",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "^",
      "=",
      ";",
      "!",
      "'",
      "+",
      ",",
      "`",
      "~",
      "|",
      "<",
      ">",
      '"'
    ];
    let needsQuotes = false;
    for (const char of arg) {
      if (cmdSpecialChars.some((x) => x === char)) {
        needsQuotes = true;
        break;
      }
    }
    if (!needsQuotes) {
      return arg;
    }
    let reverse = '"';
    let quoteHit = true;
    for (let i = arg.length; i > 0; i--) {
      reverse += arg[i - 1];
      if (quoteHit && arg[i - 1] === "\\") {
        reverse += "\\";
      } else if (arg[i - 1] === '"') {
        quoteHit = true;
        reverse += '"';
      } else {
        quoteHit = false;
      }
    }
    reverse += '"';
    return reverse.split("").reverse().join("");
  }
  _uvQuoteCmdArg(arg) {
    if (!arg) {
      return '""';
    }
    if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) {
      return arg;
    }
    if (!arg.includes('"') && !arg.includes("\\")) {
      return `"${arg}"`;
    }
    let reverse = '"';
    let quoteHit = true;
    for (let i = arg.length; i > 0; i--) {
      reverse += arg[i - 1];
      if (quoteHit && arg[i - 1] === "\\") {
        reverse += "\\";
      } else if (arg[i - 1] === '"') {
        quoteHit = true;
        reverse += "\\";
      } else {
        quoteHit = false;
      }
    }
    reverse += '"';
    return reverse.split("").reverse().join("");
  }
  _cloneExecOptions(options) {
    options = options || {};
    const result = {
      cwd: options.cwd || process.cwd(),
      env: options.env || process.env,
      silent: options.silent || false,
      windowsVerbatimArguments: options.windowsVerbatimArguments || false,
      failOnStdErr: options.failOnStdErr || false,
      ignoreReturnCode: options.ignoreReturnCode || false,
      delay: options.delay || 1e4
    };
    result.outStream = options.outStream || process.stdout;
    result.errStream = options.errStream || process.stderr;
    return result;
  }
  _getSpawnOptions(options, toolPath) {
    options = options || {};
    const result = {};
    result.cwd = options.cwd;
    result.env = options.env;
    result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
    if (options.windowsVerbatimArguments) {
      result.argv0 = `"${toolPath}"`;
    }
    return result;
  }
  /**
   * Exec a tool.
   * Output will be streamed to the live console.
   * Returns promise with return code
   *
   * @param     tool     path to tool to exec
   * @param     options  optional exec options.  See ExecOptions
   * @returns   number
   */
  exec() {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (!ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || IS_WINDOWS && this.toolPath.includes("\\"))) {
        this.toolPath = path$b.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
      }
      this.toolPath = yield io.which(this.toolPath, true);
      return new Promise((resolve, reject) => __awaiter$1(this, void 0, void 0, function* () {
        this._debug(`exec tool: ${this.toolPath}`);
        this._debug("arguments:");
        for (const arg of this.args) {
          this._debug(`   ${arg}`);
        }
        const optionsNonNull = this._cloneExecOptions(this.options);
        if (!optionsNonNull.silent && optionsNonNull.outStream) {
          optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os$1.EOL);
        }
        const state = new ExecState(optionsNonNull, this.toolPath);
        state.on("debug", (message) => {
          this._debug(message);
        });
        if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
          return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
        }
        const fileName = this._getSpawnFileName();
        const cp2 = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
        let stdbuffer = "";
        if (cp2.stdout) {
          cp2.stdout.on("data", (data) => {
            if (this.options.listeners && this.options.listeners.stdout) {
              this.options.listeners.stdout(data);
            }
            if (!optionsNonNull.silent && optionsNonNull.outStream) {
              optionsNonNull.outStream.write(data);
            }
            stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
              if (this.options.listeners && this.options.listeners.stdline) {
                this.options.listeners.stdline(line);
              }
            });
          });
        }
        let errbuffer = "";
        if (cp2.stderr) {
          cp2.stderr.on("data", (data) => {
            state.processStderr = true;
            if (this.options.listeners && this.options.listeners.stderr) {
              this.options.listeners.stderr(data);
            }
            if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
              const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
              s.write(data);
            }
            errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
              if (this.options.listeners && this.options.listeners.errline) {
                this.options.listeners.errline(line);
              }
            });
          });
        }
        cp2.on("error", (err) => {
          state.processError = err.message;
          state.processExited = true;
          state.processClosed = true;
          state.CheckComplete();
        });
        cp2.on("exit", (code) => {
          state.processExitCode = code;
          state.processExited = true;
          this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
          state.CheckComplete();
        });
        cp2.on("close", (code) => {
          state.processExitCode = code;
          state.processExited = true;
          state.processClosed = true;
          this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
          state.CheckComplete();
        });
        state.on("done", (error2, exitCode) => {
          if (stdbuffer.length > 0) {
            this.emit("stdline", stdbuffer);
          }
          if (errbuffer.length > 0) {
            this.emit("errline", errbuffer);
          }
          cp2.removeAllListeners();
          if (error2) {
            reject(error2);
          } else {
            resolve(exitCode);
          }
        });
        if (this.options.input) {
          if (!cp2.stdin) {
            throw new Error("child process missing stdin");
          }
          cp2.stdin.end(this.options.input);
        }
      }));
    });
  }
}
toolrunner.ToolRunner = ToolRunner;
function argStringToArray(argString) {
  const args = [];
  let inQuotes = false;
  let escaped2 = false;
  let arg = "";
  function append2(c) {
    if (escaped2 && c !== '"') {
      arg += "\\";
    }
    arg += c;
    escaped2 = false;
  }
  for (let i = 0; i < argString.length; i++) {
    const c = argString.charAt(i);
    if (c === '"') {
      if (!escaped2) {
        inQuotes = !inQuotes;
      } else {
        append2(c);
      }
      continue;
    }
    if (c === "\\" && escaped2) {
      append2(c);
      continue;
    }
    if (c === "\\" && inQuotes) {
      escaped2 = true;
      continue;
    }
    if (c === " " && !inQuotes) {
      if (arg.length > 0) {
        args.push(arg);
        arg = "";
      }
      continue;
    }
    append2(c);
  }
  if (arg.length > 0) {
    args.push(arg.trim());
  }
  return args;
}
toolrunner.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
  constructor(options, toolPath) {
    super();
    this.processClosed = false;
    this.processError = "";
    this.processExitCode = 0;
    this.processExited = false;
    this.processStderr = false;
    this.delay = 1e4;
    this.done = false;
    this.timeout = null;
    if (!toolPath) {
      throw new Error("toolPath must not be empty");
    }
    this.options = options;
    this.toolPath = toolPath;
    if (options.delay) {
      this.delay = options.delay;
    }
  }
  CheckComplete() {
    if (this.done) {
      return;
    }
    if (this.processClosed) {
      this._setResult();
    } else if (this.processExited) {
      this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
    }
  }
  _debug(message) {
    this.emit("debug", message);
  }
  _setResult() {
    let error2;
    if (this.processExited) {
      if (this.processError) {
        error2 = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
      } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
        error2 = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
      } else if (this.processStderr && this.options.failOnStdErr) {
        error2 = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
      }
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.done = true;
    this.emit("done", error2, this.processExitCode);
  }
  static HandleTimeout(state) {
    if (state.done) {
      return;
    }
    if (!state.processClosed && state.processExited) {
      const message = `The STDIO streams did not close within ${state.delay / 1e3} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
      state._debug(message);
    }
    state._setResult();
  }
}
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.hasOwnProperty.call(mod, k))
        __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exec$1, "__esModule", { value: true });
exec$1.getExecOutput = exec_2 = exec$1.exec = void 0;
const string_decoder_1 = require$$0$4;
const tr = __importStar(toolrunner);
function exec(commandLine, args, options) {
  return __awaiter(this, void 0, void 0, function* () {
    const commandArgs = tr.argStringToArray(commandLine);
    if (commandArgs.length === 0) {
      throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
    }
    const toolPath = commandArgs[0];
    args = commandArgs.slice(1).concat(args || []);
    const runner = new tr.ToolRunner(toolPath, args, options);
    return runner.exec();
  });
}
var exec_2 = exec$1.exec = exec;
function getExecOutput(commandLine, args, options) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function* () {
    let stdout = "";
    let stderr = "";
    const stdoutDecoder = new string_decoder_1.StringDecoder("utf8");
    const stderrDecoder = new string_decoder_1.StringDecoder("utf8");
    const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
    const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
    const stdErrListener = (data) => {
      stderr += stderrDecoder.write(data);
      if (originalStdErrListener) {
        originalStdErrListener(data);
      }
    };
    const stdOutListener = (data) => {
      stdout += stdoutDecoder.write(data);
      if (originalStdoutListener) {
        originalStdoutListener(data);
      }
    };
    const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
    const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
    stdout += stdoutDecoder.end();
    stderr += stderrDecoder.end();
    return {
      exitCode,
      stdout,
      stderr
    };
  });
}
exec$1.getExecOutput = getExecOutput;
const isPromiseFulfilled = (promiseResult) => {
  return promiseResult.status === "fulfilled";
};
const asyncFilterMap = async (array2, map2) => {
  const checks = await Promise.allSettled(array2.map(map2));
  return checks.filter(isPromiseFulfilled).map((item) => item.value).filter(isNotNullish);
};
const normalizeRegExpLikeToRegExp = (regExpLike) => {
  return typeof regExpLike === "string" ? new RegExp(regExpLike) : regExpLike;
};
const isNotNullish = (o) => o !== void 0 && o !== null;
const prettyLogStyles = {
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  overline: [53, 55],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  blackBright: [90, 39],
  redBright: [91, 39],
  greenBright: [92, 39],
  yellowBright: [93, 39],
  blueBright: [94, 39],
  magentaBright: [95, 39],
  cyanBright: [96, 39],
  whiteBright: [97, 39],
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  bgBlackBright: [100, 49],
  bgRedBright: [101, 49],
  bgGreenBright: [102, 49],
  bgYellowBright: [103, 49],
  bgBlueBright: [104, 49],
  bgMagentaBright: [105, 49],
  bgCyanBright: [106, 49],
  bgWhiteBright: [107, 49]
};
function formatTemplate(settings2, template, values, hideUnsetPlaceholder = false) {
  const templateString = String(template);
  const ansiColorWrap = (placeholderValue, code) => `\x1B[${code[0]}m${placeholderValue}\x1B[${code[1]}m`;
  const styleWrap = (value, style) => {
    if (style != null && typeof style === "string") {
      return ansiColorWrap(value, prettyLogStyles[style]);
    } else if (style != null && Array.isArray(style)) {
      return style.reduce((prevValue, thisStyle) => styleWrap(prevValue, thisStyle), value);
    } else {
      if (style != null && style[value.trim()] != null) {
        return styleWrap(value, style[value.trim()]);
      } else if (style != null && style["*"] != null) {
        return styleWrap(value, style["*"]);
      } else {
        return value;
      }
    }
  };
  return templateString.replace(/{{(.+?)}}/g, (_, placeholder) => {
    const value = values[placeholder] != null ? values[placeholder] : hideUnsetPlaceholder ? "" : _;
    return settings2.stylePrettyLogs ? styleWrap(value, settings2?.prettyLogStyles?.[placeholder]) + ansiColorWrap("", prettyLogStyles.reset) : value;
  });
}
function jsonStringifyRecursive(obj) {
  const cache = /* @__PURE__ */ new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return "[Circular]";
      }
      cache.add(value);
    }
    return value;
  });
}
function inspect(obj, opts) {
  const ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (opts != null) {
    _extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden))
    ctx.showHidden = false;
  if (isUndefined(ctx.depth))
    ctx.depth = 2;
  if (isUndefined(ctx.colors))
    ctx.colors = true;
  if (isUndefined(ctx.customInspect))
    ctx.customInspect = true;
  if (ctx.colors)
    ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
inspect.colors = prettyLogStyles;
inspect.styles = {
  special: "cyan",
  number: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  date: "magenta",
  regexp: "red"
};
function isBoolean$1(arg) {
  return typeof arg === "boolean";
}
function isUndefined(arg) {
  return arg == null;
}
function stylizeNoColor(str2) {
  return str2;
}
function stylizeWithColor(str2, styleType) {
  const style = inspect.styles[styleType];
  if (style != null && inspect?.colors?.[style]?.[0] != null && inspect?.colors?.[style]?.[1] != null) {
    return "\x1B[" + inspect.colors[style][0] + "m" + str2 + "\x1B[" + inspect.colors[style][1] + "m";
  } else {
    return str2;
  }
}
function isFunction(arg) {
  return typeof arg === "function";
}
function isString$2(arg) {
  return typeof arg === "string";
}
function isNumber$3(arg) {
  return typeof arg === "number";
}
function isNull$1(arg) {
  return arg === null;
}
function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function isRegExp(re) {
  return isObject$3(re) && objectToString(re) === "[object RegExp]";
}
function isObject$3(arg) {
  return typeof arg === "object" && arg !== null;
}
function isError$1(e) {
  return isObject$3(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
}
function isDate(d) {
  return isObject$3(d) && objectToString(d) === "[object Date]";
}
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function arrayToHash(array2) {
  const hash = {};
  array2.forEach((val) => {
    hash[val] = true;
  });
  return hash;
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  const output = [];
  for (let i = 0, l = value.length; i < l; ++i) {
    if (hasOwn(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push("");
    }
  }
  keys.forEach((key) => {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}
function formatError$1(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatValue(ctx, value, recurseTimes = 0) {
  if (ctx.customInspect && value != null && isFunction(value) && value?.inspect !== inspect && !(value?.constructor && value?.constructor.prototype === value)) {
    if (typeof value.inspect !== "function" && value.toString != null) {
      return value.toString();
    }
    let ret = value?.inspect(recurseTimes, ctx);
    if (!isString$2(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }
  const primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }
  let keys = Object.keys(value);
  const visibleKeys = arrayToHash(keys);
  try {
    if (ctx.showHidden && Object.getOwnPropertyNames) {
      keys = Object.getOwnPropertyNames(value);
    }
  } catch (e) {
  }
  if (isError$1(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
    return formatError$1(value);
  }
  if (keys.length === 0) {
    if (isFunction(ctx.stylize)) {
      if (isFunction(value)) {
        const name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError$1(value)) {
        return formatError$1(value);
      }
    } else {
      return value;
    }
  }
  let base = "";
  let array2 = false;
  let braces2 = ["{\n", "\n}"];
  if (Array.isArray(value)) {
    array2 = true;
    braces2 = ["[\n", "\n]"];
  }
  if (isFunction(value)) {
    const n = value.name ? ": " + value.name : "";
    base = " [Function" + n + "]";
  }
  if (isRegExp(value)) {
    base = " " + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base = " " + Date.prototype.toUTCString.call(value);
  }
  if (isError$1(value)) {
    base = " " + formatError$1(value);
  }
  if (keys.length === 0 && (!array2 || value.length == 0)) {
    return braces2[0] + base + braces2[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    } else {
      return ctx.stylize("[Object]", "special");
    }
  }
  ctx.seen.push(value);
  let output;
  if (array2) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map((key) => {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base, braces2);
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2) {
  let name, str2, desc;
  desc = { value: void 0 };
  try {
    desc.value = value[key];
  } catch (e) {
  }
  try {
    if (Object.getOwnPropertyDescriptor) {
      desc = Object.getOwnPropertyDescriptor(value, key) || desc;
    }
  } catch (e) {
  }
  if (desc.get) {
    if (desc.set) {
      str2 = ctx.stylize("[Getter/Setter]", "special");
    } else {
      str2 = ctx.stylize("[Getter]", "special");
    }
  } else {
    if (desc.set) {
      str2 = ctx.stylize("[Setter]", "special");
    }
  }
  if (!hasOwn(visibleKeys, key)) {
    name = "[" + key + "]";
  }
  if (!str2) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull$1(recurseTimes)) {
        str2 = formatValue(ctx, desc.value, void 0);
      } else {
        str2 = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str2.indexOf("\n") > -1) {
        if (array2) {
          str2 = str2.split("\n").map((line) => {
            return "  " + line;
          }).join("\n").substr(2);
        } else {
          str2 = "\n" + str2.split("\n").map((line) => {
            return "   " + line;
          }).join("\n");
        }
      }
    } else {
      str2 = ctx.stylize("[Circular]", "special");
    }
  }
  if (isUndefined(name)) {
    if (array2 && key.match(/^\d+$/)) {
      return str2;
    }
    name = JSON.stringify("" + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, "name");
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, "\\'").replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, "string");
    }
  }
  return name + ": " + str2;
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString$2(value)) {
    const simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, "\\'") + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber$3(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean$1(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull$1(value))
    return ctx.stylize("null", "null");
}
function reduceToSingleString(output, base, braces2) {
  return braces2[0] + (base === "" ? "" : base + "\n") + "  " + output.join(",\n  ") + " " + braces2[1];
}
function _extend(origin, add) {
  if (!add || !isObject$3(add))
    return origin;
  const keys = Object.keys(add);
  let i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function formatWithOptions(inspectOptions, ...args) {
  const ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (inspectOptions != null) {
    _extend(ctx, inspectOptions);
  }
  const first = args[0];
  let a = 0;
  let str2 = "";
  let join2 = "";
  if (typeof first === "string") {
    if (args.length === 1) {
      return first;
    }
    let tempStr;
    let lastPos = 0;
    for (let i = 0; i < first.length - 1; i++) {
      if (first.charCodeAt(i) === 37) {
        const nextChar = first.charCodeAt(++i);
        if (a + 1 !== args.length) {
          switch (nextChar) {
            case 115: {
              const tempArg = args[++a];
              if (typeof tempArg === "number") {
                tempStr = formatPrimitive(ctx, tempArg);
              } else if (typeof tempArg === "bigint") {
                tempStr = formatPrimitive(ctx, tempArg);
              } else if (typeof tempArg !== "object" || tempArg === null) {
                tempStr = String(tempArg);
              } else {
                tempStr = inspect(tempArg, {
                  ...inspectOptions,
                  compact: 3,
                  colors: false,
                  depth: 0
                });
              }
              break;
            }
            case 106:
              tempStr = jsonStringifyRecursive(args[++a]);
              break;
            case 100: {
              const tempNum = args[++a];
              if (typeof tempNum === "bigint") {
                tempStr = formatPrimitive(ctx, tempNum);
              } else if (typeof tempNum === "symbol") {
                tempStr = "NaN";
              } else {
                tempStr = formatPrimitive(ctx, tempNum);
              }
              break;
            }
            case 79:
              tempStr = inspect(args[++a], inspectOptions);
              break;
            case 111:
              tempStr = inspect(args[++a], {
                ...inspectOptions,
                showHidden: true,
                showProxy: true,
                depth: 4
              });
              break;
            case 105: {
              const tempInteger = args[++a];
              if (typeof tempInteger === "bigint") {
                tempStr = formatPrimitive(ctx, tempInteger);
              } else if (typeof tempInteger === "symbol") {
                tempStr = "NaN";
              } else {
                tempStr = formatPrimitive(ctx, parseInt(tempStr));
              }
              break;
            }
            case 102: {
              const tempFloat = args[++a];
              if (typeof tempFloat === "symbol") {
                tempStr = "NaN";
              } else {
                tempStr = formatPrimitive(ctx, parseInt(tempFloat));
              }
              break;
            }
            case 99:
              a += 1;
              tempStr = "";
              break;
            case 37:
              str2 += first.slice(lastPos, i);
              lastPos = i + 1;
              continue;
            default:
              continue;
          }
          if (lastPos !== i - 1) {
            str2 += first.slice(lastPos, i - 1);
          }
          str2 += tempStr;
          lastPos = i + 1;
        } else if (nextChar === 37) {
          str2 += first.slice(lastPos, i);
          lastPos = i + 1;
        }
      }
    }
    if (lastPos !== 0) {
      a++;
      join2 = " ";
      if (lastPos < first.length) {
        str2 += first.slice(lastPos);
      }
    }
  }
  while (a < args.length) {
    const value = args[a];
    str2 += join2;
    str2 += typeof value !== "string" ? inspect(value, inspectOptions) : value;
    join2 = " ";
    a++;
  }
  return str2;
}
const meta = {
  runtime: ![typeof window, typeof document].includes("undefined") ? "Browser" : "Generic",
  browser: globalThis?.["navigator"]?.userAgent
};
const pathRegex = /(?:(?:file|https?|global code|[^@]+)@)?(?:file:)?((?:\/[^:/]+){2,})(?::(\d+))?(?::(\d+))?/;
function getMeta(logLevelId, logLevelName, stackDepthLevel, hideLogPositionForPerformance, name, parentNames) {
  return Object.assign({}, meta, {
    name,
    parentNames,
    date: /* @__PURE__ */ new Date(),
    logLevelId,
    logLevelName,
    path: !hideLogPositionForPerformance ? getCallerStackFrame(stackDepthLevel) : void 0
  });
}
function getCallerStackFrame(stackDepthLevel, error2 = Error()) {
  return stackLineToStackFrame(error2?.stack?.split("\n")?.filter((line) => !line.includes("Error: "))?.[stackDepthLevel]);
}
function getErrorTrace(error2) {
  return error2?.stack?.split("\n")?.filter((line) => !line.includes("Error: "))?.reduce((result, line) => {
    result.push(stackLineToStackFrame(line));
    return result;
  }, []);
}
function stackLineToStackFrame(line) {
  const href = globalThis.location.origin;
  const pathResult = {
    fullFilePath: void 0,
    fileName: void 0,
    fileNameWithLine: void 0,
    fileColumn: void 0,
    fileLine: void 0,
    filePath: void 0,
    filePathWithLine: void 0,
    method: void 0
  };
  if (line != null) {
    const match2 = line.match(pathRegex);
    if (match2) {
      pathResult.filePath = match2[1].replace(/\?.*$/, "");
      pathResult.fullFilePath = `${href}${pathResult.filePath}`;
      const pathParts = pathResult.filePath.split("/");
      pathResult.fileName = pathParts[pathParts.length - 1];
      pathResult.fileLine = match2[2];
      pathResult.fileColumn = match2[3];
      pathResult.filePathWithLine = `${pathResult.filePath}:${pathResult.fileLine}`;
      pathResult.fileNameWithLine = `${pathResult.fileName}:${pathResult.fileLine}`;
    }
  }
  return pathResult;
}
function isError(e) {
  return e instanceof Error;
}
function prettyFormatLogObj(maskedArgs, settings2) {
  return maskedArgs.reduce((result, arg) => {
    isError(arg) ? result.errors.push(prettyFormatErrorObj(arg, settings2)) : result.args.push(arg);
    return result;
  }, { args: [], errors: [] });
}
function prettyFormatErrorObj(error2, settings2) {
  const errorStackStr = getErrorTrace(error2).map((stackFrame) => {
    return formatTemplate(settings2, settings2.prettyErrorStackTemplate, { ...stackFrame }, true);
  });
  const placeholderValuesError = {
    errorName: ` ${error2.name} `,
    errorMessage: error2.message,
    errorStack: errorStackStr.join("\n")
  };
  return formatTemplate(settings2, settings2.prettyErrorTemplate, placeholderValuesError);
}
function transportFormatted(logMetaMarkup, logArgs, logErrors, settings2) {
  const logErrorsStr = (logErrors.length > 0 && logArgs.length > 0 ? "\n" : "") + logErrors.join("\n");
  settings2.prettyInspectOptions.colors = settings2.stylePrettyLogs;
  console.log(logMetaMarkup + formatWithOptions(settings2.prettyInspectOptions, ...logArgs) + logErrorsStr);
}
function transportJSON(json2) {
  console.log(jsonStringifyRecursive(json2));
}
function isBuffer(arg) {
  return arg ? void 0 : void 0;
}
function formatNumberAddZeros(value, digits = 2, addNumber = 0) {
  if (value != null && isNaN(value)) {
    return "";
  }
  value = value != null ? value + addNumber : value;
  return digits === 2 ? value == null ? "--" : value < 10 ? "0" + value : value.toString() : value == null ? "---" : value < 10 ? "00" + value : value < 100 ? "0" + value : value.toString();
}
class BaseLogger {
  constructor(settings2, logObj, stackDepthLevel = 4) {
    this.logObj = logObj;
    this.stackDepthLevel = stackDepthLevel;
    const isBrowser = ![typeof window, typeof document].includes("undefined");
    const isNode = Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
    this.runtime = isBrowser ? "browser" : isNode ? "nodejs" : "unknown";
    const isBrowserBlinkEngine = isBrowser ? ((window?.["chrome"] || window.Intl && Intl?.["v8BreakIterator"]) && "CSS" in window) != null : false;
    const isSafari = isBrowser ? /^((?!chrome|android).)*safari/i.test(navigator?.userAgent) : false;
    this.stackDepthLevel = isSafari ? 4 : this.stackDepthLevel;
    this.settings = {
      type: settings2?.type ?? "pretty",
      name: settings2?.name,
      parentNames: settings2?.parentNames,
      minLevel: settings2?.minLevel ?? 0,
      argumentsArrayName: settings2?.argumentsArrayName,
      hideLogPositionForProduction: settings2?.hideLogPositionForProduction ?? false,
      prettyLogTemplate: settings2?.prettyLogTemplate ?? "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}	{{logLevelName}}	{{filePathWithLine}}{{nameWithDelimiterPrefix}}	",
      prettyErrorTemplate: settings2?.prettyErrorTemplate ?? "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
      prettyErrorStackTemplate: settings2?.prettyErrorStackTemplate ?? "  • {{fileName}}	{{method}}\n	{{filePathWithLine}}",
      prettyErrorParentNamesSeparator: settings2?.prettyErrorParentNamesSeparator ?? ":",
      prettyErrorLoggerNameDelimiter: settings2?.prettyErrorLoggerNameDelimiter ?? "	",
      stylePrettyLogs: settings2?.stylePrettyLogs ?? true,
      prettyLogTimeZone: settings2?.prettyLogTimeZone ?? "UTC",
      prettyLogStyles: settings2?.prettyLogStyles ?? {
        logLevelName: {
          "*": ["bold", "black", "bgWhiteBright", "dim"],
          SILLY: ["bold", "white"],
          TRACE: ["bold", "whiteBright"],
          DEBUG: ["bold", "green"],
          INFO: ["bold", "blue"],
          WARN: ["bold", "yellow"],
          ERROR: ["bold", "red"],
          FATAL: ["bold", "redBright"]
        },
        dateIsoStr: "white",
        filePathWithLine: "white",
        name: ["white", "bold"],
        nameWithDelimiterPrefix: ["white", "bold"],
        nameWithDelimiterSuffix: ["white", "bold"],
        errorName: ["bold", "bgRedBright", "whiteBright"],
        fileName: ["yellow"],
        fileNameWithLine: "white"
      },
      prettyInspectOptions: settings2?.prettyInspectOptions ?? {
        colors: true,
        compact: false,
        depth: Infinity
      },
      metaProperty: settings2?.metaProperty ?? "_meta",
      maskPlaceholder: settings2?.maskPlaceholder ?? "[***]",
      maskValuesOfKeys: settings2?.maskValuesOfKeys ?? ["password"],
      maskValuesOfKeysCaseInsensitive: settings2?.maskValuesOfKeysCaseInsensitive ?? false,
      maskValuesRegEx: settings2?.maskValuesRegEx,
      prefix: [...settings2?.prefix ?? []],
      attachedTransports: [...settings2?.attachedTransports ?? []],
      overwrite: {
        mask: settings2?.overwrite?.mask,
        toLogObj: settings2?.overwrite?.toLogObj,
        addMeta: settings2?.overwrite?.addMeta,
        formatMeta: settings2?.overwrite?.formatMeta,
        formatLogObj: settings2?.overwrite?.formatLogObj,
        transportFormatted: settings2?.overwrite?.transportFormatted,
        transportJSON: settings2?.overwrite?.transportJSON
      }
    };
    this.settings.stylePrettyLogs = this.settings.stylePrettyLogs && isBrowser && !isBrowserBlinkEngine ? false : this.settings.stylePrettyLogs;
  }
  log(logLevelId, logLevelName, ...args) {
    if (logLevelId < this.settings.minLevel) {
      return;
    }
    const logArgs = [...this.settings.prefix, ...args];
    const maskedArgs = this.settings.overwrite?.mask != null ? this.settings.overwrite?.mask(logArgs) : this.settings.maskValuesOfKeys != null && this.settings.maskValuesOfKeys.length > 0 ? this._mask(logArgs) : logArgs;
    const thisLogObj = this.logObj != null ? this._recursiveCloneAndExecuteFunctions(this.logObj) : void 0;
    const logObj = this.settings.overwrite?.toLogObj != null ? this.settings.overwrite?.toLogObj(maskedArgs, thisLogObj) : this._toLogObj(maskedArgs, thisLogObj);
    const logObjWithMeta = this.settings.overwrite?.addMeta != null ? this.settings.overwrite?.addMeta(logObj, logLevelId, logLevelName) : this._addMetaToLogObj(logObj, logLevelId, logLevelName);
    let logMetaMarkup;
    let logArgsAndErrorsMarkup = void 0;
    if (this.settings.overwrite?.formatMeta != null) {
      logMetaMarkup = this.settings.overwrite?.formatMeta(logObjWithMeta?.[this.settings.metaProperty]);
    }
    if (this.settings.overwrite?.formatLogObj != null) {
      logArgsAndErrorsMarkup = this.settings.overwrite?.formatLogObj(maskedArgs, this.settings);
    }
    if (this.settings.type === "pretty") {
      logMetaMarkup = logMetaMarkup ?? this._prettyFormatLogObjMeta(logObjWithMeta?.[this.settings.metaProperty]);
      logArgsAndErrorsMarkup = logArgsAndErrorsMarkup ?? prettyFormatLogObj(maskedArgs, this.settings);
    }
    if (logMetaMarkup != null && logArgsAndErrorsMarkup != null) {
      this.settings.overwrite?.transportFormatted != null ? this.settings.overwrite?.transportFormatted(logMetaMarkup, logArgsAndErrorsMarkup.args, logArgsAndErrorsMarkup.errors, this.settings) : transportFormatted(logMetaMarkup, logArgsAndErrorsMarkup.args, logArgsAndErrorsMarkup.errors, this.settings);
    } else {
      this.settings.overwrite?.transportJSON != null ? this.settings.overwrite?.transportJSON(logObjWithMeta) : this.settings.type !== "hidden" ? transportJSON(logObjWithMeta) : void 0;
    }
    if (this.settings.attachedTransports != null && this.settings.attachedTransports.length > 0) {
      this.settings.attachedTransports.forEach((transportLogger) => {
        transportLogger(logObjWithMeta);
      });
    }
    return logObjWithMeta;
  }
  attachTransport(transportLogger) {
    this.settings.attachedTransports.push(transportLogger);
  }
  getSubLogger(settings2, logObj) {
    const subLoggerSettings = {
      ...this.settings,
      ...settings2,
      parentNames: this.settings?.parentNames != null && this.settings?.name != null ? [...this.settings.parentNames, this.settings.name] : this.settings?.name != null ? [this.settings.name] : void 0,
      prefix: [...this.settings.prefix, ...settings2?.prefix ?? []]
    };
    const subLogger = new this.constructor(subLoggerSettings, logObj ?? this.logObj, this.stackDepthLevel);
    return subLogger;
  }
  _mask(args) {
    const maskValuesOfKeys = this.settings.maskValuesOfKeysCaseInsensitive !== true ? this.settings.maskValuesOfKeys : this.settings.maskValuesOfKeys.map((key) => key.toLowerCase());
    return args?.map((arg) => {
      return this._recursiveCloneAndMaskValuesOfKeys(arg, maskValuesOfKeys);
    });
  }
  _recursiveCloneAndMaskValuesOfKeys(source, keys, seen = []) {
    if (seen.includes(source)) {
      return { ...source };
    }
    if (typeof source === "object" && source != null) {
      seen.push(source);
    }
    return isBuffer(source) ? source : source instanceof Map ? new Map(source) : source instanceof Set ? new Set(source) : Array.isArray(source) ? source.map((item) => this._recursiveCloneAndMaskValuesOfKeys(item, keys, seen)) : source instanceof Date ? new Date(source.getTime()) : isError(source) ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
      o[prop] = keys.includes(this.settings?.maskValuesOfKeysCaseInsensitive !== true ? prop : prop.toLowerCase()) ? this.settings.maskPlaceholder : this._recursiveCloneAndMaskValuesOfKeys(source[prop], keys, seen);
      return o;
    }, this._cloneError(source)) : source != null && typeof source === "object" ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
      o[prop] = keys.includes(this.settings?.maskValuesOfKeysCaseInsensitive !== true ? prop : prop.toLowerCase()) ? this.settings.maskPlaceholder : this._recursiveCloneAndMaskValuesOfKeys(source[prop], keys, seen);
      return o;
    }, Object.create(Object.getPrototypeOf(source))) : ((source2) => {
      this.settings?.maskValuesRegEx?.forEach((regEx) => {
        source2 = source2?.toString()?.replace(regEx, this.settings.maskPlaceholder);
      });
      return source2;
    })(source);
  }
  _recursiveCloneAndExecuteFunctions(source, seen = []) {
    if (seen.includes(source)) {
      return { ...source };
    }
    if (typeof source === "object") {
      seen.push(source);
    }
    return Array.isArray(source) ? source.map((item) => this._recursiveCloneAndExecuteFunctions(item, seen)) : source instanceof Date ? new Date(source.getTime()) : source && typeof source === "object" ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
      Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
      o[prop] = typeof source[prop] === "function" ? source[prop]() : this._recursiveCloneAndExecuteFunctions(source[prop], seen);
      return o;
    }, Object.create(Object.getPrototypeOf(source))) : source;
  }
  _toLogObj(args, clonedLogObj = {}) {
    args = args?.map((arg) => isError(arg) ? this._toErrorObject(arg) : arg);
    if (this.settings.argumentsArrayName == null) {
      if (args.length === 1 && !Array.isArray(args[0]) && isBuffer(args[0]) !== true && !(args[0] instanceof Date)) {
        clonedLogObj = typeof args[0] === "object" && args[0] != null ? { ...args[0], ...clonedLogObj } : { 0: args[0], ...clonedLogObj };
      } else {
        clonedLogObj = { ...clonedLogObj, ...args };
      }
    } else {
      clonedLogObj = {
        ...clonedLogObj,
        [this.settings.argumentsArrayName]: args
      };
    }
    return clonedLogObj;
  }
  _cloneError(error2) {
    const ErrorConstructor = error2.constructor;
    const newError = new ErrorConstructor(error2.message);
    Object.assign(newError, error2);
    const propertyNames = Object.getOwnPropertyNames(newError);
    for (const propName of propertyNames) {
      const propDesc = Object.getOwnPropertyDescriptor(newError, propName);
      if (propDesc) {
        propDesc.writable = true;
        Object.defineProperty(newError, propName, propDesc);
      }
    }
    return newError;
  }
  _toErrorObject(error2) {
    return {
      nativeError: error2,
      name: error2.name ?? "Error",
      message: error2.message,
      stack: getErrorTrace(error2)
    };
  }
  _addMetaToLogObj(logObj, logLevelId, logLevelName) {
    return {
      ...logObj,
      [this.settings.metaProperty]: getMeta(logLevelId, logLevelName, this.stackDepthLevel, this.settings.hideLogPositionForProduction, this.settings.name, this.settings.parentNames)
    };
  }
  _prettyFormatLogObjMeta(logObjMeta) {
    if (logObjMeta == null) {
      return "";
    }
    let template = this.settings.prettyLogTemplate;
    const placeholderValues = {};
    if (template.includes("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}")) {
      template = template.replace("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}", "{{dateIsoStr}}");
    } else {
      if (this.settings.prettyLogTimeZone === "UTC") {
        placeholderValues["yyyy"] = logObjMeta?.date?.getUTCFullYear() ?? "----";
        placeholderValues["mm"] = formatNumberAddZeros(logObjMeta?.date?.getUTCMonth(), 2, 1);
        placeholderValues["dd"] = formatNumberAddZeros(logObjMeta?.date?.getUTCDate(), 2);
        placeholderValues["hh"] = formatNumberAddZeros(logObjMeta?.date?.getUTCHours(), 2);
        placeholderValues["MM"] = formatNumberAddZeros(logObjMeta?.date?.getUTCMinutes(), 2);
        placeholderValues["ss"] = formatNumberAddZeros(logObjMeta?.date?.getUTCSeconds(), 2);
        placeholderValues["ms"] = formatNumberAddZeros(logObjMeta?.date?.getUTCMilliseconds(), 3);
      } else {
        placeholderValues["yyyy"] = logObjMeta?.date?.getFullYear() ?? "----";
        placeholderValues["mm"] = formatNumberAddZeros(logObjMeta?.date?.getMonth(), 2, 1);
        placeholderValues["dd"] = formatNumberAddZeros(logObjMeta?.date?.getDate(), 2);
        placeholderValues["hh"] = formatNumberAddZeros(logObjMeta?.date?.getHours(), 2);
        placeholderValues["MM"] = formatNumberAddZeros(logObjMeta?.date?.getMinutes(), 2);
        placeholderValues["ss"] = formatNumberAddZeros(logObjMeta?.date?.getSeconds(), 2);
        placeholderValues["ms"] = formatNumberAddZeros(logObjMeta?.date?.getMilliseconds(), 3);
      }
    }
    const dateInSettingsTimeZone = this.settings.prettyLogTimeZone === "UTC" ? logObjMeta?.date : new Date(logObjMeta?.date?.getTime() - logObjMeta?.date?.getTimezoneOffset() * 6e4);
    placeholderValues["rawIsoStr"] = dateInSettingsTimeZone?.toISOString();
    placeholderValues["dateIsoStr"] = dateInSettingsTimeZone?.toISOString().replace("T", " ").replace("Z", "");
    placeholderValues["logLevelName"] = logObjMeta?.logLevelName;
    placeholderValues["fileNameWithLine"] = logObjMeta?.path?.fileNameWithLine ?? "";
    placeholderValues["filePathWithLine"] = logObjMeta?.path?.filePathWithLine ?? "";
    placeholderValues["fullFilePath"] = logObjMeta?.path?.fullFilePath ?? "";
    let parentNamesString = this.settings.parentNames?.join(this.settings.prettyErrorParentNamesSeparator);
    parentNamesString = parentNamesString != null && logObjMeta?.name != null ? parentNamesString + this.settings.prettyErrorParentNamesSeparator : void 0;
    placeholderValues["name"] = logObjMeta?.name != null || parentNamesString != null ? (parentNamesString ?? "") + logObjMeta?.name : "";
    placeholderValues["nameWithDelimiterPrefix"] = placeholderValues["name"].length > 0 ? this.settings.prettyErrorLoggerNameDelimiter + placeholderValues["name"] : "";
    placeholderValues["nameWithDelimiterSuffix"] = placeholderValues["name"].length > 0 ? placeholderValues["name"] + this.settings.prettyErrorLoggerNameDelimiter : "";
    return formatTemplate(this.settings, template, placeholderValues);
  }
}
class Logger extends BaseLogger {
  constructor(settings2, logObj) {
    super(settings2, logObj, 5);
  }
  log(logLevelId, logLevelName, ...args) {
    return super.log(logLevelId, logLevelName, ...args);
  }
  silly(...args) {
    return super.log(0, "SILLY", ...args);
  }
  trace(...args) {
    return super.log(1, "TRACE", ...args);
  }
  debug(...args) {
    return super.log(2, "DEBUG", ...args);
  }
  info(...args) {
    return super.log(3, "INFO", ...args);
  }
  warn(...args) {
    return super.log(4, "WARN", ...args);
  }
  error(...args) {
    return super.log(5, "ERROR", ...args);
  }
  fatal(...args) {
    return super.log(6, "FATAL", ...args);
  }
  getSubLogger(settings2, logObj) {
    return super.getSubLogger(settings2, logObj);
  }
}
const prettyLogTemplateTimestamp = "{{dateIsoStr}}	";
const prettyLogTemplateBody = "{{logLevelName}}:{{nameWithDelimiterPrefix}}	";
const normalizeLoggerOptions = (options) => {
  const timestamps = options?.timestamps ?? false;
  return {
    name: "log",
    timestamps,
    prettyLogTemplate: timestamps ? prettyLogTemplateTimestamp + prettyLogTemplateBody : prettyLogTemplateBody,
    ...options
  };
};
const createLogger = (options) => {
  return new Logger(normalizeLoggerOptions(options));
};
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["OFF"] = 1e6] = "OFF";
  LogLevel2[LogLevel2["FATAL"] = 6] = "FATAL";
  LogLevel2[LogLevel2["ERROR"] = 5] = "ERROR";
  LogLevel2[LogLevel2["WARN"] = 4] = "WARN";
  LogLevel2[LogLevel2["INFO"] = 3] = "INFO";
  LogLevel2[LogLevel2["DEBUG"] = 2] = "DEBUG";
  LogLevel2[LogLevel2["TRACE"] = 1] = "TRACE";
  LogLevel2[LogLevel2["SILLY"] = 0] = "SILLY";
  return LogLevel2;
})(LogLevel || {});
Object.values(LogLevel).filter(
  (valueOrKey) => typeof valueOrKey === "string"
);
Object.values(LogLevel).filter(
  (valueOrKey) => typeof valueOrKey === "number"
);
const noopLogger = createLogger({ type: "hidden", minLevel: LogLevel.OFF });
const normalizeLoggerOption = (options) => {
  return {
    logger: options?.logger ?? noopLogger
  };
};
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject$2(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence))
    return sequence;
  else if (isNothing(sequence))
    return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string2, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string2;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject$2;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common$7 = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark)
    return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
function padStart(string2, max) {
  return common$7.repeat(" ", max - string2.length) + string2;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer)
    return null;
  if (!options.maxLength)
    options.maxLength = 79;
  if (typeof options.indent !== "number")
    options.indent = 1;
  if (typeof options.linesBefore !== "number")
    options.linesBefore = 3;
  if (typeof options.linesAfter !== "number")
    options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match2;
  var foundLineNo = -1;
  while (match2 = re.exec(mark.buffer)) {
    lineEnds.push(match2.index);
    lineStarts.push(match2.index + match2[0].length);
    if (mark.position <= match2.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0)
    foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0)
      break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common$7.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common$7.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common$7.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length)
      break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common$7.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit)
      implicit = implicit.concat(definition.implicit);
    if (definition.explicit)
      explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null)
    return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null)
    return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null)
    return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max)
    return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max)
      return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch !== "0" && ch !== "1")
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isHexCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isOctCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_")
    return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_")
      continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_")
    return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-")
      sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0")
    return 0;
  if (ch === "0") {
    if (value[1] === "b")
      return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x")
      return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o")
      return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common$7.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null)
    return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common$7.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common$7.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null)
    return false;
  if (YAML_DATE_REGEXP.exec(data) !== null)
    return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
    return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match2, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match2 = YAML_DATE_REGEXP.exec(data);
  if (match2 === null)
    match2 = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match2 === null)
    throw new Error("Date resolve error");
  year = +match2[1];
  month = +match2[2] - 1;
  day = +match2[3];
  if (!match2[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match2[4];
  minute = +match2[5];
  second = +match2[6];
  if (match2[7]) {
    fraction = match2[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match2[9]) {
    tz_hour = +match2[10];
    tz_minute = +(match2[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match2[9] === "-")
      delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta)
    date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge$1 = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null)
    return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64)
      continue;
    if (code < 0)
      return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null)
    return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]")
      return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey)
          pairHasKey = true;
        else
          return false;
      }
    }
    if (!pairHasKey)
      return false;
    if (objectKeys.indexOf(pairKey) === -1)
      objectKeys.push(pairKey);
    else
      return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null)
    return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]")
      return false;
    keys = Object.keys(pair);
    if (keys.length !== 1)
      return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null)
    return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null)
    return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null)
        return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge$1
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? " " : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
function throwError$1(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match2, major, minor;
    if (state.version !== null) {
      throwError$1(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError$1(state, "YAML directive accepts exactly one argument");
    }
    match2 = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match2 === null) {
      throwError$1(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match2[1], 10);
    minor = parseInt(match2[2], 10);
    if (major !== 1) {
      throwError$1(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError$1(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError$1(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError$1(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError$1(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError$1(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError$1(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError$1(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common$7.isObject(source)) {
    throwError$1(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError$1(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError$1(state, "duplicated mapping key");
    }
    if (keyNode === "__proto__") {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError$1(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common$7.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError$1(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError$1(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError$1(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError$1(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError$1(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError$1(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError$1(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError$1(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError$1(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError$1(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError$1(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError$1(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common$7.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common$7.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common$7.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common$7.repeat("\n", emptyLines);
      }
    } else {
      state.result += common$7.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError$1(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError$1(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1)
    return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError$1(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError$1(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError$1(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError$1(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError$1(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError$1(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33)
    return false;
  if (state.tag !== null) {
    throwError$1(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError$1(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError$1(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError$1(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError$1(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError$1(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError$1(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError$1(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38)
    return false;
  if (state.anchor !== null) {
    throwError$1(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError$1(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42)
    return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError$1(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError$1(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError$1(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError$1(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError$1(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError$1(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError$1(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError$1(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch))
        break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0)
      readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError$1(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError$1(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError$1(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var load = loader.load;
const normalizeCwdOption = (options) => {
  return {
    cwd: options?.cwd ?? process.cwd()
  };
};
const readJson = async (path2, options) => {
  if (path2 === void 0) {
    return void 0;
  }
  const rawJson = await readFile(path2, {
    encoding: "utf8"
  }).catch((error2) => {
    options?.logger?.error("error reading json", error2);
    return void 0;
  });
  if (!rawJson) {
    return void 0;
  }
  try {
    return JSON.parse(rawJson);
  } catch {
    options?.logger?.error("error parsing json");
    return void 0;
  }
};
const readYaml = async (path2) => {
  if (path2 === void 0) {
    return void 0;
  }
  const rawYaml = await readFile(path2, {
    encoding: "utf8"
  }).catch((error2) => {
    console.error("error reading yaml", error2);
    return void 0;
  });
  if (!rawYaml) {
    return void 0;
  }
  const result = load(rawYaml);
  if (typeof result === "string") {
    return void 0;
  }
  return result;
};
const isCustomJsonValueMatcher = (t) => {
  return typeof t === "function";
};
const match = (target, matcher2) => {
  if (typeof matcher2 === "string") {
    return typeof target === "string" && new RegExp(matcher2).test(target);
  } else if (typeof matcher2 === "number") {
    return typeof target === "number" && target === matcher2;
  } else if (typeof matcher2 === "boolean") {
    return typeof target === "boolean" && target === matcher2;
  } else if (matcher2 === void 0) {
    return target === void 0 || target === null;
  } else if (matcher2 === null) {
    return target === null;
  } else if (isCustomJsonValueMatcher(matcher2)) {
    return matcher2(target) ?? false;
  } else if (matcher2 instanceof RegExp) {
    return typeof target === "string" && matcher2.test(target);
  } else if (Array.isArray(matcher2)) {
    return Array.isArray(target) ? matcher2.every((itemMatcher, i) => match(target[i], itemMatcher)) : false;
  } else {
    return Object.entries(matcher2).every(([filterKey, filter]) => {
      return typeof target === "object" && target !== null && // typeof null === 'object'
      !Array.isArray(target) && match(target[filterKey], filter);
    });
  }
};
const Stream = require$$0$5;
const PassThrough = Stream.PassThrough;
const slice = Array.prototype.slice;
var merge2_1 = merge2$1;
function merge2$1() {
  const streamsQueue = [];
  const args = slice.call(arguments);
  let merging = false;
  let options = args[args.length - 1];
  if (options && !Array.isArray(options) && options.pipe == null) {
    args.pop();
  } else {
    options = {};
  }
  const doEnd = options.end !== false;
  const doPipeError = options.pipeError === true;
  if (options.objectMode == null) {
    options.objectMode = true;
  }
  if (options.highWaterMark == null) {
    options.highWaterMark = 64 * 1024;
  }
  const mergedStream = PassThrough(options);
  function addStream() {
    for (let i = 0, len = arguments.length; i < len; i++) {
      streamsQueue.push(pauseStreams(arguments[i], options));
    }
    mergeStream();
    return this;
  }
  function mergeStream() {
    if (merging) {
      return;
    }
    merging = true;
    let streams = streamsQueue.shift();
    if (!streams) {
      process.nextTick(endStream);
      return;
    }
    if (!Array.isArray(streams)) {
      streams = [streams];
    }
    let pipesCount = streams.length + 1;
    function next() {
      if (--pipesCount > 0) {
        return;
      }
      merging = false;
      mergeStream();
    }
    function pipe(stream2) {
      function onend() {
        stream2.removeListener("merge2UnpipeEnd", onend);
        stream2.removeListener("end", onend);
        if (doPipeError) {
          stream2.removeListener("error", onerror);
        }
        next();
      }
      function onerror(err) {
        mergedStream.emit("error", err);
      }
      if (stream2._readableState.endEmitted) {
        return next();
      }
      stream2.on("merge2UnpipeEnd", onend);
      stream2.on("end", onend);
      if (doPipeError) {
        stream2.on("error", onerror);
      }
      stream2.pipe(mergedStream, { end: false });
      stream2.resume();
    }
    for (let i = 0; i < streams.length; i++) {
      pipe(streams[i]);
    }
    next();
  }
  function endStream() {
    merging = false;
    mergedStream.emit("queueDrain");
    if (doEnd) {
      mergedStream.end();
    }
  }
  mergedStream.setMaxListeners(0);
  mergedStream.add = addStream;
  mergedStream.on("unpipe", function(stream2) {
    stream2.emit("merge2UnpipeEnd");
  });
  if (args.length) {
    addStream.apply(null, args);
  }
  return mergedStream;
}
function pauseStreams(streams, options) {
  if (!Array.isArray(streams)) {
    if (!streams._readableState && streams.pipe) {
      streams = streams.pipe(PassThrough(options));
    }
    if (!streams._readableState || !streams.pause || !streams.pipe) {
      throw new Error("Only readable stream can be merged.");
    }
    streams.pause();
  } else {
    for (let i = 0, len = streams.length; i < len; i++) {
      streams[i] = pauseStreams(streams[i], options);
    }
  }
  return streams;
}
var tasks = {};
var utils$k = {};
var array$1 = {};
Object.defineProperty(array$1, "__esModule", { value: true });
array$1.splitWhen = array$1.flatten = void 0;
function flatten(items) {
  return items.reduce((collection, item) => [].concat(collection, item), []);
}
array$1.flatten = flatten;
function splitWhen(items, predicate) {
  const result = [[]];
  let groupIndex = 0;
  for (const item of items) {
    if (predicate(item)) {
      groupIndex++;
      result[groupIndex] = [];
    } else {
      result[groupIndex].push(item);
    }
  }
  return result;
}
array$1.splitWhen = splitWhen;
var errno$1 = {};
Object.defineProperty(errno$1, "__esModule", { value: true });
errno$1.isEnoentCodeError = void 0;
function isEnoentCodeError(error2) {
  return error2.code === "ENOENT";
}
errno$1.isEnoentCodeError = isEnoentCodeError;
var fs$8 = {};
Object.defineProperty(fs$8, "__esModule", { value: true });
fs$8.createDirentFromStats = void 0;
let DirentFromStats$1 = class DirentFromStats {
  constructor(name, stats) {
    this.name = name;
    this.isBlockDevice = stats.isBlockDevice.bind(stats);
    this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
    this.isDirectory = stats.isDirectory.bind(stats);
    this.isFIFO = stats.isFIFO.bind(stats);
    this.isFile = stats.isFile.bind(stats);
    this.isSocket = stats.isSocket.bind(stats);
    this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
  }
};
function createDirentFromStats$1(name, stats) {
  return new DirentFromStats$1(name, stats);
}
fs$8.createDirentFromStats = createDirentFromStats$1;
var path$a = {};
Object.defineProperty(path$a, "__esModule", { value: true });
path$a.convertPosixPathToPattern = path$a.convertWindowsPathToPattern = path$a.convertPathToPattern = path$a.escapePosixPath = path$a.escapeWindowsPath = path$a.escape = path$a.removeLeadingDotSegment = path$a.makeAbsolute = path$a.unixify = void 0;
const os = require$$0;
const path$9 = require$$0$3;
const IS_WINDOWS_PLATFORM = os.platform() === "win32";
const LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
const POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g;
const WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([(){}]|^!|[!+@](?=\())/g;
const DOS_DEVICE_PATH_RE = /^\\\\([.?])/;
const WINDOWS_BACKSLASHES_RE = /\\(?![!()+@{}])/g;
function unixify(filepath) {
  return filepath.replace(/\\/g, "/");
}
path$a.unixify = unixify;
function makeAbsolute(cwd, filepath) {
  return path$9.resolve(cwd, filepath);
}
path$a.makeAbsolute = makeAbsolute;
function removeLeadingDotSegment(entry2) {
  if (entry2.charAt(0) === ".") {
    const secondCharactery = entry2.charAt(1);
    if (secondCharactery === "/" || secondCharactery === "\\") {
      return entry2.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
    }
  }
  return entry2;
}
path$a.removeLeadingDotSegment = removeLeadingDotSegment;
path$a.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
function escapeWindowsPath(pattern2) {
  return pattern2.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
}
path$a.escapeWindowsPath = escapeWindowsPath;
function escapePosixPath(pattern2) {
  return pattern2.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
}
path$a.escapePosixPath = escapePosixPath;
path$a.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
function convertWindowsPathToPattern(filepath) {
  return escapeWindowsPath(filepath).replace(DOS_DEVICE_PATH_RE, "//$1").replace(WINDOWS_BACKSLASHES_RE, "/");
}
path$a.convertWindowsPathToPattern = convertWindowsPathToPattern;
function convertPosixPathToPattern(filepath) {
  return escapePosixPath(filepath);
}
path$a.convertPosixPathToPattern = convertPosixPathToPattern;
var pattern$1 = {};
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var isExtglob$1 = function isExtglob(str2) {
  if (typeof str2 !== "string" || str2 === "") {
    return false;
  }
  var match2;
  while (match2 = /(\\).|([@?!+*]\(.*\))/g.exec(str2)) {
    if (match2[2])
      return true;
    str2 = str2.slice(match2.index + match2[0].length);
  }
  return false;
};
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isExtglob2 = isExtglob$1;
var chars = { "{": "}", "(": ")", "[": "]" };
var strictCheck = function(str2) {
  if (str2[0] === "!") {
    return true;
  }
  var index = 0;
  var pipeIndex = -2;
  var closeSquareIndex = -2;
  var closeCurlyIndex = -2;
  var closeParenIndex = -2;
  var backSlashIndex = -2;
  while (index < str2.length) {
    if (str2[index] === "*") {
      return true;
    }
    if (str2[index + 1] === "?" && /[\].+)]/.test(str2[index])) {
      return true;
    }
    if (closeSquareIndex !== -1 && str2[index] === "[" && str2[index + 1] !== "]") {
      if (closeSquareIndex < index) {
        closeSquareIndex = str2.indexOf("]", index);
      }
      if (closeSquareIndex > index) {
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
        backSlashIndex = str2.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
      }
    }
    if (closeCurlyIndex !== -1 && str2[index] === "{" && str2[index + 1] !== "}") {
      closeCurlyIndex = str2.indexOf("}", index);
      if (closeCurlyIndex > index) {
        backSlashIndex = str2.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
          return true;
        }
      }
    }
    if (closeParenIndex !== -1 && str2[index] === "(" && str2[index + 1] === "?" && /[:!=]/.test(str2[index + 2]) && str2[index + 3] !== ")") {
      closeParenIndex = str2.indexOf(")", index);
      if (closeParenIndex > index) {
        backSlashIndex = str2.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
          return true;
        }
      }
    }
    if (pipeIndex !== -1 && str2[index] === "(" && str2[index + 1] !== "|") {
      if (pipeIndex < index) {
        pipeIndex = str2.indexOf("|", index);
      }
      if (pipeIndex !== -1 && str2[pipeIndex + 1] !== ")") {
        closeParenIndex = str2.indexOf(")", pipeIndex);
        if (closeParenIndex > pipeIndex) {
          backSlashIndex = str2.indexOf("\\", pipeIndex);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
    }
    if (str2[index] === "\\") {
      var open = str2[index + 1];
      index += 2;
      var close = chars[open];
      if (close) {
        var n = str2.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }
      if (str2[index] === "!") {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};
var relaxedCheck = function(str2) {
  if (str2[0] === "!") {
    return true;
  }
  var index = 0;
  while (index < str2.length) {
    if (/[*?{}()[\]]/.test(str2[index])) {
      return true;
    }
    if (str2[index] === "\\") {
      var open = str2[index + 1];
      index += 2;
      var close = chars[open];
      if (close) {
        var n = str2.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }
      if (str2[index] === "!") {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};
var isGlob$1 = function isGlob(str2, options) {
  if (typeof str2 !== "string" || str2 === "") {
    return false;
  }
  if (isExtglob2(str2)) {
    return true;
  }
  var check = strictCheck;
  if (options && options.strict === false) {
    check = relaxedCheck;
  }
  return check(str2);
};
var isGlob2 = isGlob$1;
var pathPosixDirname = require$$0$3.posix.dirname;
var isWin32 = require$$0.platform() === "win32";
var slash$1 = "/";
var backslash = /\\/g;
var enclosure = /[\{\[].*[\}\]]$/;
var globby$1 = /(^|[^\\])([\{\[]|\([^\)]+$)/;
var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
var globParent$1 = function globParent(str2, opts) {
  var options = Object.assign({ flipBackslashes: true }, opts);
  if (options.flipBackslashes && isWin32 && str2.indexOf(slash$1) < 0) {
    str2 = str2.replace(backslash, slash$1);
  }
  if (enclosure.test(str2)) {
    str2 += slash$1;
  }
  str2 += "a";
  do {
    str2 = pathPosixDirname(str2);
  } while (isGlob2(str2) || globby$1.test(str2));
  return str2.replace(escaped, "$1");
};
var utils$j = {};
(function(exports) {
  exports.isInteger = (num) => {
    if (typeof num === "number") {
      return Number.isInteger(num);
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isInteger(Number(num));
    }
    return false;
  };
  exports.find = (node, type2) => node.nodes.find((node2) => node2.type === type2);
  exports.exceedsLimit = (min, max, step = 1, limit) => {
    if (limit === false)
      return false;
    if (!exports.isInteger(min) || !exports.isInteger(max))
      return false;
    return (Number(max) - Number(min)) / Number(step) >= limit;
  };
  exports.escapeNode = (block, n = 0, type2) => {
    let node = block.nodes[n];
    if (!node)
      return;
    if (type2 && node.type === type2 || node.type === "open" || node.type === "close") {
      if (node.escaped !== true) {
        node.value = "\\" + node.value;
        node.escaped = true;
      }
    }
  };
  exports.encloseBrace = (node) => {
    if (node.type !== "brace")
      return false;
    if (node.commas >> 0 + node.ranges >> 0 === 0) {
      node.invalid = true;
      return true;
    }
    return false;
  };
  exports.isInvalidBrace = (block) => {
    if (block.type !== "brace")
      return false;
    if (block.invalid === true || block.dollar)
      return true;
    if (block.commas >> 0 + block.ranges >> 0 === 0) {
      block.invalid = true;
      return true;
    }
    if (block.open !== true || block.close !== true) {
      block.invalid = true;
      return true;
    }
    return false;
  };
  exports.isOpenOrClose = (node) => {
    if (node.type === "open" || node.type === "close") {
      return true;
    }
    return node.open === true || node.close === true;
  };
  exports.reduce = (nodes) => nodes.reduce((acc, node) => {
    if (node.type === "text")
      acc.push(node.value);
    if (node.type === "range")
      node.type = "text";
    return acc;
  }, []);
  exports.flatten = (...args) => {
    const result = [];
    const flat = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        Array.isArray(ele) ? flat(ele) : ele !== void 0 && result.push(ele);
      }
      return result;
    };
    flat(args);
    return result;
  };
})(utils$j);
const utils$i = utils$j;
var stringify$4 = (ast, options = {}) => {
  let stringify2 = (node, parent = {}) => {
    let invalidBlock = options.escapeInvalid && utils$i.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = "";
    if (node.value) {
      if ((invalidBlock || invalidNode) && utils$i.isOpenOrClose(node)) {
        return "\\" + node.value;
      }
      return node.value;
    }
    if (node.value) {
      return node.value;
    }
    if (node.nodes) {
      for (let child2 of node.nodes) {
        output += stringify2(child2);
      }
    }
    return output;
  };
  return stringify2(ast);
};
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var isNumber$2 = function(num) {
  if (typeof num === "number") {
    return num - num === 0;
  }
  if (typeof num === "string" && num.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const isNumber$1 = isNumber$2;
const toRegexRange$1 = (min, max, options) => {
  if (isNumber$1(min) === false) {
    throw new TypeError("toRegexRange: expected the first argument to be a number");
  }
  if (max === void 0 || min === max) {
    return String(min);
  }
  if (isNumber$1(max) === false) {
    throw new TypeError("toRegexRange: expected the second argument to be a number.");
  }
  let opts = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === "boolean") {
    opts.relaxZeros = opts.strictZeros === false;
  }
  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
  if (toRegexRange$1.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange$1.cache[cacheKey].result;
  }
  let a = Math.min(min, max);
  let b = Math.max(min, max);
  if (Math.abs(a - b) === 1) {
    let result = min + "|" + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }
  let isPadded = hasPadding(min) || hasPadding(max);
  let state = { min, max, a, b };
  let positives = [];
  let negatives = [];
  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }
  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }
  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }
  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives);
  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
    state.result = `(?:${state.result})`;
  }
  toRegexRange$1.cache[cacheKey] = state;
  return state.result;
};
function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, "-", false) || [];
  let onlyPositive = filterPatterns(pos, neg, "", false) || [];
  let intersected = filterPatterns(neg, pos, "-?", true) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join("|");
}
function splitToRanges(min, max) {
  let nines = 1;
  let zeros2 = 1;
  let stop = countNines(min, nines);
  let stops = /* @__PURE__ */ new Set([max]);
  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }
  stop = countZeros(max + 1, zeros2) - 1;
  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros2 += 1;
    stop = countZeros(max + 1, zeros2) - 1;
  }
  stops = [...stops];
  stops.sort(compare);
  return stops;
}
function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }
  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern2 = "";
  let count = 0;
  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];
    if (startDigit === stopDigit) {
      pattern2 += startDigit;
    } else if (startDigit !== "0" || stopDigit !== "9") {
      pattern2 += toCharacterClass(startDigit, stopDigit);
    } else {
      count++;
    }
  }
  if (count) {
    pattern2 += options.shorthand === true ? "\\d" : "[0-9]";
  }
  return { pattern: pattern2, count: [count], digits };
}
function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;
  for (let i = 0; i < ranges.length; i++) {
    let max2 = ranges[i];
    let obj = rangeToPattern(String(start), String(max2), options);
    let zeros2 = "";
    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }
      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max2 + 1;
      continue;
    }
    if (tok.isPadded) {
      zeros2 = padZeros(max2, tok, options);
    }
    obj.string = zeros2 + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max2 + 1;
    prev = obj;
  }
  return tokens;
}
function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];
  for (let ele of arr) {
    let { string: string2 } = ele;
    if (!intersection && !contains(comparison, "string", string2)) {
      result.push(prefix + string2);
    }
    if (intersection && contains(comparison, "string", string2)) {
      result.push(prefix + string2);
    }
  }
  return result;
}
function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++)
    arr.push([a[i], b[i]]);
  return arr;
}
function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}
function contains(arr, key, val) {
  return arr.some((ele) => ele[key] === val);
}
function countNines(min, len) {
  return Number(String(min).slice(0, -len) + "9".repeat(len));
}
function countZeros(integer, zeros2) {
  return integer - integer % Math.pow(10, zeros2);
}
function toQuantifier(digits) {
  let [start = 0, stop = ""] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? "," + stop : "")}}`;
  }
  return "";
}
function toCharacterClass(a, b, options) {
  return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
}
function hasPadding(str2) {
  return /^-?(0+)\d/.test(str2);
}
function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }
  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;
  switch (diff) {
    case 0:
      return "";
    case 1:
      return relax ? "0?" : "0";
    case 2:
      return relax ? "0{0,2}" : "00";
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}
toRegexRange$1.cache = {};
toRegexRange$1.clearCache = () => toRegexRange$1.cache = {};
var toRegexRange_1 = toRegexRange$1;
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
const util$1 = require$$0$2;
const toRegexRange = toRegexRange_1;
const isObject$1 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
const transform = (toNumber) => {
  return (value) => toNumber === true ? Number(value) : String(value);
};
const isValidValue = (value) => {
  return typeof value === "number" || typeof value === "string" && value !== "";
};
const isNumber = (num) => Number.isInteger(+num);
const zeros = (input) => {
  let value = `${input}`;
  let index = -1;
  if (value[0] === "-")
    value = value.slice(1);
  if (value === "0")
    return false;
  while (value[++index] === "0")
    ;
  return index > 0;
};
const stringify$3 = (start, end, options) => {
  if (typeof start === "string" || typeof end === "string") {
    return true;
  }
  return options.stringify === true;
};
const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === "-" ? "-" : "";
    if (dash)
      input = input.slice(1);
    input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};
const toMaxLen = (input, maxLength) => {
  let negative = input[0] === "-" ? "-" : "";
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength)
    input = "0" + input;
  return negative ? "-" + input : input;
};
const toSequence = (parts, options) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  let prefix = options.capture ? "" : "?:";
  let positives = "";
  let negatives = "";
  let result;
  if (parts.positives.length) {
    positives = parts.positives.join("|");
  }
  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join("|")})`;
  }
  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }
  if (options.wrap) {
    return `(${prefix}${result})`;
  }
  return result;
};
const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }
  let start = String.fromCharCode(a);
  if (a === b)
    return start;
  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};
const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? "" : "?:";
    return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
  }
  return toRegexRange(start, end, options);
};
const rangeError = (...args) => {
  return new RangeError("Invalid range arguments: " + util$1.inspect(...args));
};
const invalidRange = (start, end, options) => {
  if (options.strictRanges === true)
    throw rangeError([start, end]);
  return [];
};
const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};
const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true)
      throw rangeError([start, end]);
    return [];
  }
  if (a === 0)
    a = 0;
  if (b === 0)
    b = 0;
  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);
  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify$3(start, end, options) === false;
  let format = options.transform || transform(toNumber);
  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }
  let parts = { negatives: [], positives: [] };
  let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
  let range = [];
  let index = 0;
  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }
  if (options.toRegex === true) {
    return step > 1 ? toSequence(parts, options) : toRegex(range, null, { wrap: false, ...options });
  }
  return range;
};
const fillLetters = (start, end, step = 1, options = {}) => {
  if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
    return invalidRange(start, end, options);
  }
  let format = options.transform || ((val) => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);
  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }
  let range = [];
  let index = 0;
  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }
  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }
  return range;
};
const fill$2 = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }
  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }
  if (typeof step === "function") {
    return fill$2(start, end, 1, { transform: step });
  }
  if (isObject$1(step)) {
    return fill$2(start, end, 0, step);
  }
  let opts = { ...options };
  if (opts.capture === true)
    opts.wrap = true;
  step = step || opts.step || 1;
  if (!isNumber(step)) {
    if (step != null && !isObject$1(step))
      return invalidStep(step, opts);
    return fill$2(start, end, 1, step);
  }
  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }
  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};
var fillRange = fill$2;
const fill$1 = fillRange;
const utils$h = utils$j;
const compile$1 = (ast, options = {}) => {
  let walk2 = (node, parent = {}) => {
    let invalidBlock = utils$h.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let invalid = invalidBlock === true || invalidNode === true;
    let prefix = options.escapeInvalid === true ? "\\" : "";
    let output = "";
    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }
    if (node.type === "open") {
      return invalid ? prefix + node.value : "(";
    }
    if (node.type === "close") {
      return invalid ? prefix + node.value : ")";
    }
    if (node.type === "comma") {
      return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
    }
    if (node.value) {
      return node.value;
    }
    if (node.nodes && node.ranges > 0) {
      let args = utils$h.reduce(node.nodes);
      let range = fill$1(...args, { ...options, wrap: false, toRegex: true });
      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }
    if (node.nodes) {
      for (let child2 of node.nodes) {
        output += walk2(child2, node);
      }
    }
    return output;
  };
  return walk2(ast);
};
var compile_1 = compile$1;
const fill = fillRange;
const stringify$2 = stringify$4;
const utils$g = utils$j;
const append = (queue2 = "", stash = "", enclose = false) => {
  let result = [];
  queue2 = [].concat(queue2);
  stash = [].concat(stash);
  if (!stash.length)
    return queue2;
  if (!queue2.length) {
    return enclose ? utils$g.flatten(stash).map((ele) => `{${ele}}`) : stash;
  }
  for (let item of queue2) {
    if (Array.isArray(item)) {
      for (let value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === "string")
          ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
      }
    }
  }
  return utils$g.flatten(result);
};
const expand$1 = (ast, options = {}) => {
  let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
  let walk2 = (node, parent = {}) => {
    node.queue = [];
    let p = parent;
    let q = parent.queue;
    while (p.type !== "brace" && p.type !== "root" && p.parent) {
      p = p.parent;
      q = p.queue;
    }
    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify$2(node, options)));
      return;
    }
    if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ["{}"]));
      return;
    }
    if (node.nodes && node.ranges > 0) {
      let args = utils$g.reduce(node.nodes);
      if (utils$g.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
      }
      let range = fill(...args, options);
      if (range.length === 0) {
        range = stringify$2(node, options);
      }
      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }
    let enclose = utils$g.encloseBrace(node);
    let queue2 = node.queue;
    let block = node;
    while (block.type !== "brace" && block.type !== "root" && block.parent) {
      block = block.parent;
      queue2 = block.queue;
    }
    for (let i = 0; i < node.nodes.length; i++) {
      let child2 = node.nodes[i];
      if (child2.type === "comma" && node.type === "brace") {
        if (i === 1)
          queue2.push("");
        queue2.push("");
        continue;
      }
      if (child2.type === "close") {
        q.push(append(q.pop(), queue2, enclose));
        continue;
      }
      if (child2.value && child2.type !== "open") {
        queue2.push(append(queue2.pop(), child2.value));
        continue;
      }
      if (child2.nodes) {
        walk2(child2, node);
      }
    }
    return queue2;
  };
  return utils$g.flatten(walk2(ast));
};
var expand_1 = expand$1;
var constants$4 = {
  MAX_LENGTH: 1024 * 64,
  // Digits
  CHAR_0: "0",
  /* 0 */
  CHAR_9: "9",
  /* 9 */
  // Alphabet chars.
  CHAR_UPPERCASE_A: "A",
  /* A */
  CHAR_LOWERCASE_A: "a",
  /* a */
  CHAR_UPPERCASE_Z: "Z",
  /* Z */
  CHAR_LOWERCASE_Z: "z",
  /* z */
  CHAR_LEFT_PARENTHESES: "(",
  /* ( */
  CHAR_RIGHT_PARENTHESES: ")",
  /* ) */
  CHAR_ASTERISK: "*",
  /* * */
  // Non-alphabetic chars.
  CHAR_AMPERSAND: "&",
  /* & */
  CHAR_AT: "@",
  /* @ */
  CHAR_BACKSLASH: "\\",
  /* \ */
  CHAR_BACKTICK: "`",
  /* ` */
  CHAR_CARRIAGE_RETURN: "\r",
  /* \r */
  CHAR_CIRCUMFLEX_ACCENT: "^",
  /* ^ */
  CHAR_COLON: ":",
  /* : */
  CHAR_COMMA: ",",
  /* , */
  CHAR_DOLLAR: "$",
  /* . */
  CHAR_DOT: ".",
  /* . */
  CHAR_DOUBLE_QUOTE: '"',
  /* " */
  CHAR_EQUAL: "=",
  /* = */
  CHAR_EXCLAMATION_MARK: "!",
  /* ! */
  CHAR_FORM_FEED: "\f",
  /* \f */
  CHAR_FORWARD_SLASH: "/",
  /* / */
  CHAR_HASH: "#",
  /* # */
  CHAR_HYPHEN_MINUS: "-",
  /* - */
  CHAR_LEFT_ANGLE_BRACKET: "<",
  /* < */
  CHAR_LEFT_CURLY_BRACE: "{",
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: "[",
  /* [ */
  CHAR_LINE_FEED: "\n",
  /* \n */
  CHAR_NO_BREAK_SPACE: " ",
  /* \u00A0 */
  CHAR_PERCENT: "%",
  /* % */
  CHAR_PLUS: "+",
  /* + */
  CHAR_QUESTION_MARK: "?",
  /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: ">",
  /* > */
  CHAR_RIGHT_CURLY_BRACE: "}",
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: "]",
  /* ] */
  CHAR_SEMICOLON: ";",
  /* ; */
  CHAR_SINGLE_QUOTE: "'",
  /* ' */
  CHAR_SPACE: " ",
  /*   */
  CHAR_TAB: "	",
  /* \t */
  CHAR_UNDERSCORE: "_",
  /* _ */
  CHAR_VERTICAL_LINE: "|",
  /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
  /* \uFEFF */
};
const stringify$1 = stringify$4;
const {
  MAX_LENGTH: MAX_LENGTH$1,
  CHAR_BACKSLASH,
  /* \ */
  CHAR_BACKTICK,
  /* ` */
  CHAR_COMMA: CHAR_COMMA$1,
  /* , */
  CHAR_DOT: CHAR_DOT$1,
  /* . */
  CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1,
  /* ( */
  CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1,
  /* ) */
  CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1,
  /* { */
  CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1,
  /* } */
  CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1,
  /* [ */
  CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1,
  /* ] */
  CHAR_DOUBLE_QUOTE,
  /* " */
  CHAR_SINGLE_QUOTE,
  /* ' */
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = constants$4;
const parse$3 = (input, options = {}) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  let opts = options || {};
  let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }
  let ast = { type: "root", input, nodes: [] };
  let stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  let length = input.length;
  let index = 0;
  let depth2 = 0;
  let value;
  const advance = () => input[index++];
  const push = (node) => {
    if (node.type === "text" && prev.type === "dot") {
      prev.type = "text";
    }
    if (prev && prev.type === "text" && node.type === "text") {
      prev.value += node.value;
      return;
    }
    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };
  push({ type: "bos" });
  while (index < length) {
    block = stack[stack.length - 1];
    value = advance();
    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }
    if (value === CHAR_BACKSLASH) {
      push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
      continue;
    }
    if (value === CHAR_RIGHT_SQUARE_BRACKET$1) {
      push({ type: "text", value: "\\" + value });
      continue;
    }
    if (value === CHAR_LEFT_SQUARE_BRACKET$1) {
      brackets++;
      let next;
      while (index < length && (next = advance())) {
        value += next;
        if (next === CHAR_LEFT_SQUARE_BRACKET$1) {
          brackets++;
          continue;
        }
        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }
        if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
          brackets--;
          if (brackets === 0) {
            break;
          }
        }
      }
      push({ type: "text", value });
      continue;
    }
    if (value === CHAR_LEFT_PARENTHESES$1) {
      block = push({ type: "paren", nodes: [] });
      stack.push(block);
      push({ type: "text", value });
      continue;
    }
    if (value === CHAR_RIGHT_PARENTHESES$1) {
      if (block.type !== "paren") {
        push({ type: "text", value });
        continue;
      }
      block = stack.pop();
      push({ type: "text", value });
      block = stack[stack.length - 1];
      continue;
    }
    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
      let open = value;
      let next;
      if (options.keepQuotes !== true) {
        value = "";
      }
      while (index < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }
        if (next === open) {
          if (options.keepQuotes === true)
            value += next;
          break;
        }
        value += next;
      }
      push({ type: "text", value });
      continue;
    }
    if (value === CHAR_LEFT_CURLY_BRACE$1) {
      depth2++;
      let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
      let brace = {
        type: "brace",
        open: true,
        close: false,
        dollar,
        depth: depth2,
        commas: 0,
        ranges: 0,
        nodes: []
      };
      block = push(brace);
      stack.push(block);
      push({ type: "open", value });
      continue;
    }
    if (value === CHAR_RIGHT_CURLY_BRACE$1) {
      if (block.type !== "brace") {
        push({ type: "text", value });
        continue;
      }
      let type2 = "close";
      block = stack.pop();
      block.close = true;
      push({ type: type2, value });
      depth2--;
      block = stack[stack.length - 1];
      continue;
    }
    if (value === CHAR_COMMA$1 && depth2 > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        let open = block.nodes.shift();
        block.nodes = [open, { type: "text", value: stringify$1(block) }];
      }
      push({ type: "comma", value });
      block.commas++;
      continue;
    }
    if (value === CHAR_DOT$1 && depth2 > 0 && block.commas === 0) {
      let siblings = block.nodes;
      if (depth2 === 0 || siblings.length === 0) {
        push({ type: "text", value });
        continue;
      }
      if (prev.type === "dot") {
        block.range = [];
        prev.value += value;
        prev.type = "range";
        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = "text";
          continue;
        }
        block.ranges++;
        block.args = [];
        continue;
      }
      if (prev.type === "range") {
        siblings.pop();
        let before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }
      push({ type: "dot", value });
      continue;
    }
    push({ type: "text", value });
  }
  do {
    block = stack.pop();
    if (block.type !== "root") {
      block.nodes.forEach((node) => {
        if (!node.nodes) {
          if (node.type === "open")
            node.isOpen = true;
          if (node.type === "close")
            node.isClose = true;
          if (!node.nodes)
            node.type = "text";
          node.invalid = true;
        }
      });
      let parent = stack[stack.length - 1];
      let index2 = parent.nodes.indexOf(block);
      parent.nodes.splice(index2, 1, ...block.nodes);
    }
  } while (stack.length > 0);
  push({ type: "eos" });
  return ast;
};
var parse_1$1 = parse$3;
const stringify = stringify$4;
const compile = compile_1;
const expand = expand_1;
const parse$2 = parse_1$1;
const braces$1 = (input, options = {}) => {
  let output = [];
  if (Array.isArray(input)) {
    for (let pattern2 of input) {
      let result = braces$1.create(pattern2, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces$1.create(input, options));
  }
  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};
braces$1.parse = (input, options = {}) => parse$2(input, options);
braces$1.stringify = (input, options = {}) => {
  if (typeof input === "string") {
    return stringify(braces$1.parse(input, options), options);
  }
  return stringify(input, options);
};
braces$1.compile = (input, options = {}) => {
  if (typeof input === "string") {
    input = braces$1.parse(input, options);
  }
  return compile(input, options);
};
braces$1.expand = (input, options = {}) => {
  if (typeof input === "string") {
    input = braces$1.parse(input, options);
  }
  let result = expand(input, options);
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }
  return result;
};
braces$1.create = (input, options = {}) => {
  if (input === "" || input.length < 3) {
    return [input];
  }
  return options.expand !== true ? braces$1.compile(input, options) : braces$1.expand(input, options);
};
var braces_1 = braces$1;
var utils$f = {};
const path$8 = require$$0$3;
const WIN_SLASH = "\\\\/";
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
const DOT_LITERAL = "\\.";
const PLUS_LITERAL = "\\+";
const QMARK_LITERAL = "\\?";
const SLASH_LITERAL = "\\/";
const ONE_CHAR = "(?=.)";
const QMARK = "[^/]";
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;
const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};
const WINDOWS_CHARS = {
  ...POSIX_CHARS,
  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};
const POSIX_REGEX_SOURCE$1 = {
  alnum: "a-zA-Z0-9",
  alpha: "a-zA-Z",
  ascii: "\\x00-\\x7F",
  blank: " \\t",
  cntrl: "\\x00-\\x1F\\x7F",
  digit: "0-9",
  graph: "\\x21-\\x7E",
  lower: "a-z",
  print: "\\x20-\\x7E ",
  punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
  space: " \\t\\r\\n\\v\\f",
  upper: "A-Z",
  word: "A-Za-z0-9_",
  xdigit: "A-Fa-f0-9"
};
var constants$3 = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    "***": "*",
    "**/**": "**",
    "**/**/**": "**"
  },
  // Digits
  CHAR_0: 48,
  /* 0 */
  CHAR_9: 57,
  /* 9 */
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65,
  /* A */
  CHAR_LOWERCASE_A: 97,
  /* a */
  CHAR_UPPERCASE_Z: 90,
  /* Z */
  CHAR_LOWERCASE_Z: 122,
  /* z */
  CHAR_LEFT_PARENTHESES: 40,
  /* ( */
  CHAR_RIGHT_PARENTHESES: 41,
  /* ) */
  CHAR_ASTERISK: 42,
  /* * */
  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38,
  /* & */
  CHAR_AT: 64,
  /* @ */
  CHAR_BACKWARD_SLASH: 92,
  /* \ */
  CHAR_CARRIAGE_RETURN: 13,
  /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94,
  /* ^ */
  CHAR_COLON: 58,
  /* : */
  CHAR_COMMA: 44,
  /* , */
  CHAR_DOT: 46,
  /* . */
  CHAR_DOUBLE_QUOTE: 34,
  /* " */
  CHAR_EQUAL: 61,
  /* = */
  CHAR_EXCLAMATION_MARK: 33,
  /* ! */
  CHAR_FORM_FEED: 12,
  /* \f */
  CHAR_FORWARD_SLASH: 47,
  /* / */
  CHAR_GRAVE_ACCENT: 96,
  /* ` */
  CHAR_HASH: 35,
  /* # */
  CHAR_HYPHEN_MINUS: 45,
  /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60,
  /* < */
  CHAR_LEFT_CURLY_BRACE: 123,
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91,
  /* [ */
  CHAR_LINE_FEED: 10,
  /* \n */
  CHAR_NO_BREAK_SPACE: 160,
  /* \u00A0 */
  CHAR_PERCENT: 37,
  /* % */
  CHAR_PLUS: 43,
  /* + */
  CHAR_QUESTION_MARK: 63,
  /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  /* > */
  CHAR_RIGHT_CURLY_BRACE: 125,
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  /* ] */
  CHAR_SEMICOLON: 59,
  /* ; */
  CHAR_SINGLE_QUOTE: 39,
  /* ' */
  CHAR_SPACE: 32,
  /*   */
  CHAR_TAB: 9,
  /* \t */
  CHAR_UNDERSCORE: 95,
  /* _ */
  CHAR_VERTICAL_LINE: 124,
  /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  /* \uFEFF */
  SEP: path$8.sep,
  /**
   * Create EXTGLOB_CHARS
   */
  extglobChars(chars2) {
    return {
      "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})` },
      "?": { type: "qmark", open: "(?:", close: ")?" },
      "+": { type: "plus", open: "(?:", close: ")+" },
      "*": { type: "star", open: "(?:", close: ")*" },
      "@": { type: "at", open: "(?:", close: ")" }
    };
  },
  /**
   * Create GLOB_CHARS
   */
  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};
(function(exports) {
  const path2 = require$$0$3;
  const win32 = process.platform === "win32";
  const {
    REGEX_BACKSLASH,
    REGEX_REMOVE_BACKSLASH,
    REGEX_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_GLOBAL
  } = constants$3;
  exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  exports.hasRegexChars = (str2) => REGEX_SPECIAL_CHARS.test(str2);
  exports.isRegexChar = (str2) => str2.length === 1 && exports.hasRegexChars(str2);
  exports.escapeRegex = (str2) => str2.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
  exports.toPosixSlashes = (str2) => str2.replace(REGEX_BACKSLASH, "/");
  exports.removeBackslashes = (str2) => {
    return str2.replace(REGEX_REMOVE_BACKSLASH, (match2) => {
      return match2 === "\\" ? "" : match2;
    });
  };
  exports.supportsLookbehinds = () => {
    const segs = process.version.slice(1).split(".").map(Number);
    if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
      return true;
    }
    return false;
  };
  exports.isWindows = (options) => {
    if (options && typeof options.windows === "boolean") {
      return options.windows;
    }
    return win32 === true || path2.sep === "\\";
  };
  exports.escapeLast = (input, char, lastIdx) => {
    const idx = input.lastIndexOf(char, lastIdx);
    if (idx === -1)
      return input;
    if (input[idx - 1] === "\\")
      return exports.escapeLast(input, char, idx - 1);
    return `${input.slice(0, idx)}\\${input.slice(idx)}`;
  };
  exports.removePrefix = (input, state = {}) => {
    let output = input;
    if (output.startsWith("./")) {
      output = output.slice(2);
      state.prefix = "./";
    }
    return output;
  };
  exports.wrapOutput = (input, state = {}, options = {}) => {
    const prepend = options.contains ? "" : "^";
    const append2 = options.contains ? "" : "$";
    let output = `${prepend}(?:${input})${append2}`;
    if (state.negated === true) {
      output = `(?:^(?!${output}).*$)`;
    }
    return output;
  };
})(utils$f);
const utils$e = utils$f;
const {
  CHAR_ASTERISK,
  /* * */
  CHAR_AT,
  /* @ */
  CHAR_BACKWARD_SLASH,
  /* \ */
  CHAR_COMMA,
  /* , */
  CHAR_DOT,
  /* . */
  CHAR_EXCLAMATION_MARK,
  /* ! */
  CHAR_FORWARD_SLASH,
  /* / */
  CHAR_LEFT_CURLY_BRACE,
  /* { */
  CHAR_LEFT_PARENTHESES,
  /* ( */
  CHAR_LEFT_SQUARE_BRACKET,
  /* [ */
  CHAR_PLUS,
  /* + */
  CHAR_QUESTION_MARK,
  /* ? */
  CHAR_RIGHT_CURLY_BRACE,
  /* } */
  CHAR_RIGHT_PARENTHESES,
  /* ) */
  CHAR_RIGHT_SQUARE_BRACKET
  /* ] */
} = constants$3;
const isPathSeparator = (code) => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};
const depth = (token) => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};
const scan$1 = (input, options) => {
  const opts = options || {};
  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];
  let str2 = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob3 = false;
  let isExtglob3 = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let negatedExtglob = false;
  let finished = false;
  let braces2 = 0;
  let prev;
  let code;
  let token = { value: "", depth: 0, isGlob: false };
  const eos = () => index >= length;
  const peek = () => str2.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str2.charCodeAt(++index);
  };
  while (index < length) {
    code = advance();
    let next;
    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();
      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }
    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces2++;
      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces2++;
          continue;
        }
        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob3 = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob3 = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces2--;
          if (braces2 === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: "", depth: 0, isGlob: false };
      if (finished === true)
        continue;
      if (prev === CHAR_DOT && index === start + 1) {
        start += 2;
        continue;
      }
      lastIndex = index + 1;
      continue;
    }
    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob3 = token.isGlob = true;
        isExtglob3 = token.isExtglob = true;
        finished = true;
        if (code === CHAR_EXCLAMATION_MARK && index === start) {
          negatedExtglob = true;
        }
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob3 = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }
    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK)
        isGlobstar = token.isGlobstar = true;
      isGlob3 = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_QUESTION_MARK) {
      isGlob3 = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob3 = token.isGlob = true;
          finished = true;
          break;
        }
      }
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }
    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob3 = token.isGlob = true;
      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }
          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (isGlob3 === true) {
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
  }
  if (opts.noext === true) {
    isExtglob3 = false;
    isGlob3 = false;
  }
  let base = str2;
  let prefix = "";
  let glob = "";
  if (start > 0) {
    prefix = str2.slice(0, start);
    str2 = str2.slice(start);
    lastIndex -= start;
  }
  if (base && isGlob3 === true && lastIndex > 0) {
    base = str2.slice(0, lastIndex);
    glob = str2.slice(lastIndex);
  } else if (isGlob3 === true) {
    base = "";
    glob = str2;
  } else {
    base = str2;
  }
  if (base && base !== "" && base !== "/" && base !== str2) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }
  if (opts.unescape === true) {
    if (glob)
      glob = utils$e.removeBackslashes(glob);
    if (base && backslashes === true) {
      base = utils$e.removeBackslashes(base);
    }
  }
  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob: isGlob3,
    isExtglob: isExtglob3,
    isGlobstar,
    negated,
    negatedExtglob
  };
  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }
  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;
    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== "") {
        parts.push(value);
      }
      prevIndex = i;
    }
    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);
      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }
    state.slashes = slashes;
    state.parts = parts;
  }
  return state;
};
var scan_1 = scan$1;
const constants$2 = constants$3;
const utils$d = utils$f;
const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants$2;
const expandRange = (args, options) => {
  if (typeof options.expandRange === "function") {
    return options.expandRange(...args, options);
  }
  args.sort();
  const value = `[${args.join("-")}]`;
  try {
    new RegExp(value);
  } catch (ex) {
    return args.map((v) => utils$d.escapeRegex(v)).join("..");
  }
  return value;
};
const syntaxError = (type2, char) => {
  return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
};
const parse$1 = (input, options) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  input = REPLACEMENTS[input] || input;
  const opts = { ...options };
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  const bos = { type: "bos", value: "", output: opts.prepend || "" };
  const tokens = [bos];
  const capture = opts.capture ? "" : "?:";
  const win32 = utils$d.isWindows(options);
  const PLATFORM_CHARS = constants$2.globChars(win32);
  const EXTGLOB_CHARS = constants$2.extglobChars(PLATFORM_CHARS);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    PLUS_LITERAL: PLUS_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOT_SLASH: NO_DOT_SLASH2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    QMARK: QMARK2,
    QMARK_NO_DOT: QMARK_NO_DOT2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = PLATFORM_CHARS;
  const globstar = (opts2) => {
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const nodot = opts.dot ? "" : NO_DOT2;
  const qmarkNoDot = opts.dot ? QMARK2 : QMARK_NO_DOT2;
  let star = opts.bash === true ? globstar(opts) : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  if (typeof opts.noext === "boolean") {
    opts.noextglob = opts.noext;
  }
  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: "",
    output: "",
    prefix: "",
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };
  input = utils$d.removePrefix(input, state);
  len = input.length;
  const extglobs = [];
  const braces2 = [];
  const stack = [];
  let prev = bos;
  let value;
  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index] || "";
  const remaining = () => input.slice(state.index + 1);
  const consume = (value2 = "", num = 0) => {
    state.consumed += value2;
    state.index += num;
  };
  const append2 = (token) => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };
  const negate = () => {
    let count = 1;
    while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
      advance();
      state.start++;
      count++;
    }
    if (count % 2 === 0) {
      return false;
    }
    state.negated = true;
    state.start++;
    return true;
  };
  const increment = (type2) => {
    state[type2]++;
    stack.push(type2);
  };
  const decrement = (type2) => {
    state[type2]--;
    stack.pop();
  };
  const push = (tok) => {
    if (prev.type === "globstar") {
      const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
      const isExtglob3 = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
      if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob3) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "star";
        prev.value = "*";
        prev.output = star;
        state.output += prev.output;
      }
    }
    if (extglobs.length && tok.type !== "paren") {
      extglobs[extglobs.length - 1].inner += tok.value;
    }
    if (tok.value || tok.output)
      append2(tok);
    if (prev && prev.type === "text" && tok.type === "text") {
      prev.value += tok.value;
      prev.output = (prev.output || "") + tok.value;
      return;
    }
    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };
  const extglobOpen = (type2, value2) => {
    const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? "(" : "") + token.open;
    increment("parens");
    push({ type: type2, value: value2, output: state.output ? "" : ONE_CHAR2 });
    push({ type: "paren", extglob: true, value: advance(), output });
    extglobs.push(token);
  };
  const extglobClose = (token) => {
    let output = token.close + (opts.capture ? ")" : "");
    let rest;
    if (token.type === "negate") {
      let extglobStar = star;
      if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
        extglobStar = globstar(opts);
      }
      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }
      if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
        const expression = parse$1(rest, { ...options, fastpaths: false }).output;
        output = token.close = `)${expression})${extglobStar})`;
      }
      if (token.prev.type === "bos") {
        state.negatedExtglob = true;
      }
    }
    push({ type: "paren", extglob: true, value, output });
    decrement("parens");
  };
  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;
    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars2, first, rest, index) => {
      if (first === "\\") {
        backslashes = true;
        return m;
      }
      if (first === "?") {
        if (esc) {
          return esc + first + (rest ? QMARK2.repeat(rest.length) : "");
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK2.repeat(rest.length) : "");
        }
        return QMARK2.repeat(chars2.length);
      }
      if (first === ".") {
        return DOT_LITERAL2.repeat(chars2.length);
      }
      if (first === "*") {
        if (esc) {
          return esc + first + (rest ? star : "");
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });
    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, "");
      } else {
        output = output.replace(/\\+/g, (m) => {
          return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
        });
      }
    }
    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }
    state.output = utils$d.wrapOutput(output, state, options);
    return state;
  }
  while (!eos()) {
    value = advance();
    if (value === "\0") {
      continue;
    }
    if (value === "\\") {
      const next = peek();
      if (next === "/" && opts.bash !== true) {
        continue;
      }
      if (next === "." || next === ";") {
        continue;
      }
      if (!next) {
        value += "\\";
        push({ type: "text", value });
        continue;
      }
      const match2 = /^\\+/.exec(remaining());
      let slashes = 0;
      if (match2 && match2[0].length > 2) {
        slashes = match2[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += "\\";
        }
      }
      if (opts.unescape === true) {
        value = advance();
      } else {
        value += advance();
      }
      if (state.brackets === 0) {
        push({ type: "text", value });
        continue;
      }
    }
    if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
      if (opts.posix !== false && value === ":") {
        const inner = prev.value.slice(1);
        if (inner.includes("[")) {
          prev.posix = true;
          if (inner.includes(":")) {
            const idx = prev.value.lastIndexOf("[");
            const pre = prev.value.slice(0, idx);
            const rest2 = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest2];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();
              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR2;
              }
              continue;
            }
          }
        }
      }
      if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
        value = `\\${value}`;
      }
      if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
        value = `\\${value}`;
      }
      if (opts.posix === true && value === "!" && prev.value === "[") {
        value = "^";
      }
      prev.value += value;
      append2({ value });
      continue;
    }
    if (state.quotes === 1 && value !== '"') {
      value = utils$d.escapeRegex(value);
      prev.value += value;
      append2({ value });
      continue;
    }
    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: "text", value });
      }
      continue;
    }
    if (value === "(") {
      increment("parens");
      push({ type: "paren", value });
      continue;
    }
    if (value === ")") {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError("opening", "("));
      }
      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }
      push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
      decrement("parens");
      continue;
    }
    if (value === "[") {
      if (opts.nobracket === true || !remaining().includes("]")) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("closing", "]"));
        }
        value = `\\${value}`;
      } else {
        increment("brackets");
      }
      push({ type: "bracket", value });
      continue;
    }
    if (value === "]") {
      if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
        push({ type: "text", value, output: `\\${value}` });
        continue;
      }
      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "["));
        }
        push({ type: "text", value, output: `\\${value}` });
        continue;
      }
      decrement("brackets");
      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
        value = `/${value}`;
      }
      prev.value += value;
      append2({ value });
      if (opts.literalBrackets === false || utils$d.hasRegexChars(prevValue)) {
        continue;
      }
      const escaped2 = utils$d.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);
      if (opts.literalBrackets === true) {
        state.output += escaped2;
        prev.value = escaped2;
        continue;
      }
      prev.value = `(${capture}${escaped2}|${prev.value})`;
      state.output += prev.value;
      continue;
    }
    if (value === "{" && opts.nobrace !== true) {
      increment("braces");
      const open = {
        type: "brace",
        value,
        output: "(",
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };
      braces2.push(open);
      push(open);
      continue;
    }
    if (value === "}") {
      const brace = braces2[braces2.length - 1];
      if (opts.nobrace === true || !brace) {
        push({ type: "text", value, output: value });
        continue;
      }
      let output = ")";
      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];
        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === "brace") {
            break;
          }
          if (arr[i].type !== "dots") {
            range.unshift(arr[i].value);
          }
        }
        output = expandRange(range, opts);
        state.backtrack = true;
      }
      if (brace.comma !== true && brace.dots !== true) {
        const out2 = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = "\\{";
        value = output = "\\}";
        state.output = out2;
        for (const t of toks) {
          state.output += t.output || t.value;
        }
      }
      push({ type: "brace", value, output });
      decrement("braces");
      braces2.pop();
      continue;
    }
    if (value === "|") {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: "text", value });
      continue;
    }
    if (value === ",") {
      let output = value;
      const brace = braces2[braces2.length - 1];
      if (brace && stack[stack.length - 1] === "braces") {
        brace.comma = true;
        output = "|";
      }
      push({ type: "comma", value, output });
      continue;
    }
    if (value === "/") {
      if (prev.type === "dot" && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = "";
        state.output = "";
        tokens.pop();
        prev = bos;
        continue;
      }
      push({ type: "slash", value, output: SLASH_LITERAL2 });
      continue;
    }
    if (value === ".") {
      if (state.braces > 0 && prev.type === "dot") {
        if (prev.value === ".")
          prev.output = DOT_LITERAL2;
        const brace = braces2[braces2.length - 1];
        prev.type = "dots";
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }
      if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
        push({ type: "text", value, output: DOT_LITERAL2 });
        continue;
      }
      push({ type: "dot", value, output: DOT_LITERAL2 });
      continue;
    }
    if (value === "?") {
      const isGroup = prev && prev.value === "(";
      if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("qmark", value);
        continue;
      }
      if (prev && prev.type === "paren") {
        const next = peek();
        let output = value;
        if (next === "<" && !utils$d.supportsLookbehinds()) {
          throw new Error("Node.js v10 or higher is required for regex lookbehinds");
        }
        if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
          output = `\\${value}`;
        }
        push({ type: "text", value, output });
        continue;
      }
      if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
        push({ type: "qmark", value, output: QMARK_NO_DOT2 });
        continue;
      }
      push({ type: "qmark", value, output: QMARK2 });
      continue;
    }
    if (value === "!") {
      if (opts.noextglob !== true && peek() === "(") {
        if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
          extglobOpen("negate", value);
          continue;
        }
      }
      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }
    if (value === "+") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("plus", value);
        continue;
      }
      if (prev && prev.value === "(" || opts.regex === false) {
        push({ type: "plus", value, output: PLUS_LITERAL2 });
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
        push({ type: "plus", value });
        continue;
      }
      push({ type: "plus", value: PLUS_LITERAL2 });
      continue;
    }
    if (value === "@") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        push({ type: "at", extglob: true, value, output: "" });
        continue;
      }
      push({ type: "text", value });
      continue;
    }
    if (value !== "*") {
      if (value === "$" || value === "^") {
        value = `\\${value}`;
      }
      const match2 = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match2) {
        value += match2[0];
        state.index += match2[0].length;
      }
      push({ type: "text", value });
      continue;
    }
    if (prev && (prev.type === "globstar" || prev.star === true)) {
      prev.type = "star";
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }
    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen("star", value);
      continue;
    }
    if (prev.type === "star") {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }
      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === "slash" || prior.type === "bos";
      const afterStar = before && (before.type === "star" || before.type === "globstar");
      if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
        push({ type: "star", value, output: "" });
        continue;
      }
      const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
      const isExtglob3 = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
      if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob3) {
        push({ type: "star", value, output: "" });
        continue;
      }
      while (rest.slice(0, 3) === "/**") {
        const after = input[state.index + 4];
        if (after && after !== "/") {
          break;
        }
        rest = rest.slice(3);
        consume("/**", 3);
      }
      if (prior.type === "bos" && eos()) {
        prev.type = "globstar";
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
        const end = rest[1] !== void 0 ? "|$" : "";
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = `${globstar(opts)}${SLASH_LITERAL2}|${SLASH_LITERAL2}${end})`;
        prev.value += value;
        state.output += prior.output + prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: "slash", value: "/", output: "" });
        continue;
      }
      if (prior.type === "bos" && rest[0] === "/") {
        prev.type = "globstar";
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL2}|${globstar(opts)}${SLASH_LITERAL2})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: "slash", value: "/", output: "" });
        continue;
      }
      state.output = state.output.slice(0, -prev.output.length);
      prev.type = "globstar";
      prev.output = globstar(opts);
      prev.value += value;
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }
    const token = { type: "star", value, output: star };
    if (opts.bash === true) {
      token.output = ".*?";
      if (prev.type === "bos" || prev.type === "slash") {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }
    if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }
    if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
      if (prev.type === "dot") {
        state.output += NO_DOT_SLASH2;
        prev.output += NO_DOT_SLASH2;
      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH2;
        prev.output += NO_DOTS_SLASH2;
      } else {
        state.output += nodot;
        prev.output += nodot;
      }
      if (peek() !== "*") {
        state.output += ONE_CHAR2;
        prev.output += ONE_CHAR2;
      }
    }
    push(token);
  }
  while (state.brackets > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", "]"));
    state.output = utils$d.escapeLast(state.output, "[");
    decrement("brackets");
  }
  while (state.parens > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", ")"));
    state.output = utils$d.escapeLast(state.output, "(");
    decrement("parens");
  }
  while (state.braces > 0) {
    if (opts.strictBrackets === true)
      throw new SyntaxError(syntaxError("closing", "}"));
    state.output = utils$d.escapeLast(state.output, "{");
    decrement("braces");
  }
  if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
    push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL2}?` });
  }
  if (state.backtrack === true) {
    state.output = "";
    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;
      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }
  return state;
};
parse$1.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  input = REPLACEMENTS[input] || input;
  const win32 = utils$d.isWindows(options);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOTS: NO_DOTS2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = constants$2.globChars(win32);
  const nodot = opts.dot ? NO_DOTS2 : NO_DOT2;
  const slashDot = opts.dot ? NO_DOTS_SLASH2 : NO_DOT2;
  const capture = opts.capture ? "" : "?:";
  const state = { negated: false, prefix: "" };
  let star = opts.bash === true ? ".*?" : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  const globstar = (opts2) => {
    if (opts2.noglobstar === true)
      return star;
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const create = (str2) => {
    switch (str2) {
      case "*":
        return `${nodot}${ONE_CHAR2}${star}`;
      case ".*":
        return `${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*.*":
        return `${nodot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*/*":
        return `${nodot}${star}${SLASH_LITERAL2}${ONE_CHAR2}${slashDot}${star}`;
      case "**":
        return nodot + globstar(opts);
      case "**/*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${ONE_CHAR2}${star}`;
      case "**/*.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "**/.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      default: {
        const match2 = /^(.*?)\.(\w+)$/.exec(str2);
        if (!match2)
          return;
        const source2 = create(match2[1]);
        if (!source2)
          return;
        return source2 + DOT_LITERAL2 + match2[2];
      }
    }
  };
  const output = utils$d.removePrefix(input, state);
  let source = create(output);
  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL2}?`;
  }
  return source;
};
var parse_1 = parse$1;
const path$7 = require$$0$3;
const scan = scan_1;
const parse = parse_1;
const utils$c = utils$f;
const constants$1 = constants$3;
const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
const picomatch$2 = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map((input) => picomatch$2(input, options, returnState));
    const arrayMatcher = (str2) => {
      for (const isMatch of fns) {
        const state2 = isMatch(str2);
        if (state2)
          return state2;
      }
      return false;
    };
    return arrayMatcher;
  }
  const isState = isObject(glob) && glob.tokens && glob.input;
  if (glob === "" || typeof glob !== "string" && !isState) {
    throw new TypeError("Expected pattern to be a non-empty string");
  }
  const opts = options || {};
  const posix = utils$c.isWindows(options);
  const regex = isState ? picomatch$2.compileRe(glob, options) : picomatch$2.makeRe(glob, options, false, true);
  const state = regex.state;
  delete regex.state;
  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch$2(opts.ignore, ignoreOpts, returnState);
  }
  const matcher2 = (input, returnObject = false) => {
    const { isMatch, match: match2, output } = picomatch$2.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match: match2, isMatch };
    if (typeof opts.onResult === "function") {
      opts.onResult(result);
    }
    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (isIgnored(input)) {
      if (typeof opts.onIgnore === "function") {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (typeof opts.onMatch === "function") {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };
  if (returnState) {
    matcher2.state = state;
  }
  return matcher2;
};
picomatch$2.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected input to be a string");
  }
  if (input === "") {
    return { isMatch: false, output: "" };
  }
  const opts = options || {};
  const format = opts.format || (posix ? utils$c.toPosixSlashes : null);
  let match2 = input === glob;
  let output = match2 && format ? format(input) : input;
  if (match2 === false) {
    output = format ? format(input) : input;
    match2 = output === glob;
  }
  if (match2 === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match2 = picomatch$2.matchBase(input, regex, options, posix);
    } else {
      match2 = regex.exec(output);
    }
  }
  return { isMatch: Boolean(match2), match: match2, output };
};
picomatch$2.matchBase = (input, glob, options, posix = utils$c.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch$2.makeRe(glob, options);
  return regex.test(path$7.basename(input));
};
picomatch$2.isMatch = (str2, patterns, options) => picomatch$2(patterns, options)(str2);
picomatch$2.parse = (pattern2, options) => {
  if (Array.isArray(pattern2))
    return pattern2.map((p) => picomatch$2.parse(p, options));
  return parse(pattern2, { ...options, fastpaths: false });
};
picomatch$2.scan = (input, options) => scan(input, options);
picomatch$2.compileRe = (state, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return state.output;
  }
  const opts = options || {};
  const prepend = opts.contains ? "" : "^";
  const append2 = opts.contains ? "" : "$";
  let source = `${prepend}(?:${state.output})${append2}`;
  if (state && state.negated === true) {
    source = `^(?!${source}).*$`;
  }
  const regex = picomatch$2.toRegex(source, options);
  if (returnState === true) {
    regex.state = state;
  }
  return regex;
};
picomatch$2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== "string") {
    throw new TypeError("Expected a non-empty string");
  }
  let parsed = { negated: false, fastpaths: true };
  if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
    parsed.output = parse.fastpaths(input, options);
  }
  if (!parsed.output) {
    parsed = parse(input, options);
  }
  return picomatch$2.compileRe(parsed, options, returnOutput, returnState);
};
picomatch$2.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
  } catch (err) {
    if (options && options.debug === true)
      throw err;
    return /$^/;
  }
};
picomatch$2.constants = constants$1;
var picomatch_1 = picomatch$2;
var picomatch$1 = picomatch_1;
const util = require$$0$2;
const braces = braces_1;
const picomatch = picomatch$1;
const utils$b = utils$f;
const isEmptyString = (val) => val === "" || val === "./";
const micromatch$1 = (list, patterns, options) => {
  patterns = [].concat(patterns);
  list = [].concat(list);
  let omit = /* @__PURE__ */ new Set();
  let keep = /* @__PURE__ */ new Set();
  let items = /* @__PURE__ */ new Set();
  let negatives = 0;
  let onResult = (state) => {
    items.add(state.output);
    if (options && options.onResult) {
      options.onResult(state);
    }
  };
  for (let i = 0; i < patterns.length; i++) {
    let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
    let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
    if (negated)
      negatives++;
    for (let item of list) {
      let matched = isMatch(item, true);
      let match2 = negated ? !matched.isMatch : matched.isMatch;
      if (!match2)
        continue;
      if (negated) {
        omit.add(matched.output);
      } else {
        omit.delete(matched.output);
        keep.add(matched.output);
      }
    }
  }
  let result = negatives === patterns.length ? [...items] : [...keep];
  let matches = result.filter((item) => !omit.has(item));
  if (options && matches.length === 0) {
    if (options.failglob === true) {
      throw new Error(`No matches found for "${patterns.join(", ")}"`);
    }
    if (options.nonull === true || options.nullglob === true) {
      return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
    }
  }
  return matches;
};
micromatch$1.match = micromatch$1;
micromatch$1.matcher = (pattern2, options) => picomatch(pattern2, options);
micromatch$1.isMatch = (str2, patterns, options) => picomatch(patterns, options)(str2);
micromatch$1.any = micromatch$1.isMatch;
micromatch$1.not = (list, patterns, options = {}) => {
  patterns = [].concat(patterns).map(String);
  let result = /* @__PURE__ */ new Set();
  let items = [];
  let onResult = (state) => {
    if (options.onResult)
      options.onResult(state);
    items.push(state.output);
  };
  let matches = new Set(micromatch$1(list, patterns, { ...options, onResult }));
  for (let item of items) {
    if (!matches.has(item)) {
      result.add(item);
    }
  }
  return [...result];
};
micromatch$1.contains = (str2, pattern2, options) => {
  if (typeof str2 !== "string") {
    throw new TypeError(`Expected a string: "${util.inspect(str2)}"`);
  }
  if (Array.isArray(pattern2)) {
    return pattern2.some((p) => micromatch$1.contains(str2, p, options));
  }
  if (typeof pattern2 === "string") {
    if (isEmptyString(str2) || isEmptyString(pattern2)) {
      return false;
    }
    if (str2.includes(pattern2) || str2.startsWith("./") && str2.slice(2).includes(pattern2)) {
      return true;
    }
  }
  return micromatch$1.isMatch(str2, pattern2, { ...options, contains: true });
};
micromatch$1.matchKeys = (obj, patterns, options) => {
  if (!utils$b.isObject(obj)) {
    throw new TypeError("Expected the first argument to be an object");
  }
  let keys = micromatch$1(Object.keys(obj), patterns, options);
  let res = {};
  for (let key of keys)
    res[key] = obj[key];
  return res;
};
micromatch$1.some = (list, patterns, options) => {
  let items = [].concat(list);
  for (let pattern2 of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern2), options);
    if (items.some((item) => isMatch(item))) {
      return true;
    }
  }
  return false;
};
micromatch$1.every = (list, patterns, options) => {
  let items = [].concat(list);
  for (let pattern2 of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern2), options);
    if (!items.every((item) => isMatch(item))) {
      return false;
    }
  }
  return true;
};
micromatch$1.all = (str2, patterns, options) => {
  if (typeof str2 !== "string") {
    throw new TypeError(`Expected a string: "${util.inspect(str2)}"`);
  }
  return [].concat(patterns).every((p) => picomatch(p, options)(str2));
};
micromatch$1.capture = (glob, input, options) => {
  let posix = utils$b.isWindows(options);
  let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
  let match2 = regex.exec(posix ? utils$b.toPosixSlashes(input) : input);
  if (match2) {
    return match2.slice(1).map((v) => v === void 0 ? "" : v);
  }
};
micromatch$1.makeRe = (...args) => picomatch.makeRe(...args);
micromatch$1.scan = (...args) => picomatch.scan(...args);
micromatch$1.parse = (patterns, options) => {
  let res = [];
  for (let pattern2 of [].concat(patterns || [])) {
    for (let str2 of braces(String(pattern2), options)) {
      res.push(picomatch.parse(str2, options));
    }
  }
  return res;
};
micromatch$1.braces = (pattern2, options) => {
  if (typeof pattern2 !== "string")
    throw new TypeError("Expected a string");
  if (options && options.nobrace === true || !/\{.*\}/.test(pattern2)) {
    return [pattern2];
  }
  return braces(pattern2, options);
};
micromatch$1.braceExpand = (pattern2, options) => {
  if (typeof pattern2 !== "string")
    throw new TypeError("Expected a string");
  return micromatch$1.braces(pattern2, { ...options, expand: true });
};
var micromatch_1 = micromatch$1;
Object.defineProperty(pattern$1, "__esModule", { value: true });
pattern$1.removeDuplicateSlashes = pattern$1.matchAny = pattern$1.convertPatternsToRe = pattern$1.makeRe = pattern$1.getPatternParts = pattern$1.expandBraceExpansion = pattern$1.expandPatternsWithBraceExpansion = pattern$1.isAffectDepthOfReadingPattern = pattern$1.endsWithSlashGlobStar = pattern$1.hasGlobStar = pattern$1.getBaseDirectory = pattern$1.isPatternRelatedToParentDirectory = pattern$1.getPatternsOutsideCurrentDirectory = pattern$1.getPatternsInsideCurrentDirectory = pattern$1.getPositivePatterns = pattern$1.getNegativePatterns = pattern$1.isPositivePattern = pattern$1.isNegativePattern = pattern$1.convertToNegativePattern = pattern$1.convertToPositivePattern = pattern$1.isDynamicPattern = pattern$1.isStaticPattern = void 0;
const path$6 = require$$0$3;
const globParent2 = globParent$1;
const micromatch = micromatch_1;
const GLOBSTAR = "**";
const ESCAPE_SYMBOL = "\\";
const COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
const REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
const REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
const GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
const BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
const DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
function isStaticPattern(pattern2, options = {}) {
  return !isDynamicPattern(pattern2, options);
}
pattern$1.isStaticPattern = isStaticPattern;
function isDynamicPattern(pattern2, options = {}) {
  if (pattern2 === "") {
    return false;
  }
  if (options.caseSensitiveMatch === false || pattern2.includes(ESCAPE_SYMBOL)) {
    return true;
  }
  if (COMMON_GLOB_SYMBOLS_RE.test(pattern2) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern2) || REGEX_GROUP_SYMBOLS_RE.test(pattern2)) {
    return true;
  }
  if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern2)) {
    return true;
  }
  if (options.braceExpansion !== false && hasBraceExpansion(pattern2)) {
    return true;
  }
  return false;
}
pattern$1.isDynamicPattern = isDynamicPattern;
function hasBraceExpansion(pattern2) {
  const openingBraceIndex = pattern2.indexOf("{");
  if (openingBraceIndex === -1) {
    return false;
  }
  const closingBraceIndex = pattern2.indexOf("}", openingBraceIndex + 1);
  if (closingBraceIndex === -1) {
    return false;
  }
  const braceContent = pattern2.slice(openingBraceIndex, closingBraceIndex);
  return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
}
function convertToPositivePattern(pattern2) {
  return isNegativePattern$1(pattern2) ? pattern2.slice(1) : pattern2;
}
pattern$1.convertToPositivePattern = convertToPositivePattern;
function convertToNegativePattern(pattern2) {
  return "!" + pattern2;
}
pattern$1.convertToNegativePattern = convertToNegativePattern;
function isNegativePattern$1(pattern2) {
  return pattern2.startsWith("!") && pattern2[1] !== "(";
}
pattern$1.isNegativePattern = isNegativePattern$1;
function isPositivePattern(pattern2) {
  return !isNegativePattern$1(pattern2);
}
pattern$1.isPositivePattern = isPositivePattern;
function getNegativePatterns(patterns) {
  return patterns.filter(isNegativePattern$1);
}
pattern$1.getNegativePatterns = getNegativePatterns;
function getPositivePatterns$1(patterns) {
  return patterns.filter(isPositivePattern);
}
pattern$1.getPositivePatterns = getPositivePatterns$1;
function getPatternsInsideCurrentDirectory(patterns) {
  return patterns.filter((pattern2) => !isPatternRelatedToParentDirectory(pattern2));
}
pattern$1.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
function getPatternsOutsideCurrentDirectory(patterns) {
  return patterns.filter(isPatternRelatedToParentDirectory);
}
pattern$1.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
function isPatternRelatedToParentDirectory(pattern2) {
  return pattern2.startsWith("..") || pattern2.startsWith("./..");
}
pattern$1.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
function getBaseDirectory(pattern2) {
  return globParent2(pattern2, { flipBackslashes: false });
}
pattern$1.getBaseDirectory = getBaseDirectory;
function hasGlobStar(pattern2) {
  return pattern2.includes(GLOBSTAR);
}
pattern$1.hasGlobStar = hasGlobStar;
function endsWithSlashGlobStar(pattern2) {
  return pattern2.endsWith("/" + GLOBSTAR);
}
pattern$1.endsWithSlashGlobStar = endsWithSlashGlobStar;
function isAffectDepthOfReadingPattern(pattern2) {
  const basename = path$6.basename(pattern2);
  return endsWithSlashGlobStar(pattern2) || isStaticPattern(basename);
}
pattern$1.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
function expandPatternsWithBraceExpansion(patterns) {
  return patterns.reduce((collection, pattern2) => {
    return collection.concat(expandBraceExpansion(pattern2));
  }, []);
}
pattern$1.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
function expandBraceExpansion(pattern2) {
  const patterns = micromatch.braces(pattern2, { expand: true, nodupes: true });
  patterns.sort((a, b) => a.length - b.length);
  return patterns.filter((pattern3) => pattern3 !== "");
}
pattern$1.expandBraceExpansion = expandBraceExpansion;
function getPatternParts(pattern2, options) {
  let { parts } = micromatch.scan(pattern2, Object.assign(Object.assign({}, options), { parts: true }));
  if (parts.length === 0) {
    parts = [pattern2];
  }
  if (parts[0].startsWith("/")) {
    parts[0] = parts[0].slice(1);
    parts.unshift("");
  }
  return parts;
}
pattern$1.getPatternParts = getPatternParts;
function makeRe(pattern2, options) {
  return micromatch.makeRe(pattern2, options);
}
pattern$1.makeRe = makeRe;
function convertPatternsToRe(patterns, options) {
  return patterns.map((pattern2) => makeRe(pattern2, options));
}
pattern$1.convertPatternsToRe = convertPatternsToRe;
function matchAny(entry2, patternsRe) {
  return patternsRe.some((patternRe) => patternRe.test(entry2));
}
pattern$1.matchAny = matchAny;
function removeDuplicateSlashes(pattern2) {
  return pattern2.replace(DOUBLE_SLASH_RE, "/");
}
pattern$1.removeDuplicateSlashes = removeDuplicateSlashes;
var stream$4 = {};
Object.defineProperty(stream$4, "__esModule", { value: true });
stream$4.merge = void 0;
const merge2 = merge2_1;
function merge(streams) {
  const mergedStream = merge2(streams);
  streams.forEach((stream2) => {
    stream2.once("error", (error2) => mergedStream.emit("error", error2));
  });
  mergedStream.once("close", () => propagateCloseEventToSources(streams));
  mergedStream.once("end", () => propagateCloseEventToSources(streams));
  return mergedStream;
}
stream$4.merge = merge;
function propagateCloseEventToSources(streams) {
  streams.forEach((stream2) => stream2.emit("close"));
}
var string$1 = {};
Object.defineProperty(string$1, "__esModule", { value: true });
string$1.isEmpty = string$1.isString = void 0;
function isString$1(input) {
  return typeof input === "string";
}
string$1.isString = isString$1;
function isEmpty(input) {
  return input === "";
}
string$1.isEmpty = isEmpty;
Object.defineProperty(utils$k, "__esModule", { value: true });
utils$k.string = utils$k.stream = utils$k.pattern = utils$k.path = utils$k.fs = utils$k.errno = utils$k.array = void 0;
const array = array$1;
utils$k.array = array;
const errno = errno$1;
utils$k.errno = errno;
const fs$7 = fs$8;
utils$k.fs = fs$7;
const path$5 = path$a;
utils$k.path = path$5;
const pattern = pattern$1;
utils$k.pattern = pattern;
const stream$3 = stream$4;
utils$k.stream = stream$3;
const string = string$1;
utils$k.string = string;
Object.defineProperty(tasks, "__esModule", { value: true });
tasks.convertPatternGroupToTask = tasks.convertPatternGroupsToTasks = tasks.groupPatternsByBaseDirectory = tasks.getNegativePatternsAsPositive = tasks.getPositivePatterns = tasks.convertPatternsToTasks = tasks.generate = void 0;
const utils$a = utils$k;
function generate(input, settings2) {
  const patterns = processPatterns(input, settings2);
  const ignore2 = processPatterns(settings2.ignore, settings2);
  const positivePatterns = getPositivePatterns(patterns);
  const negativePatterns = getNegativePatternsAsPositive(patterns, ignore2);
  const staticPatterns = positivePatterns.filter((pattern2) => utils$a.pattern.isStaticPattern(pattern2, settings2));
  const dynamicPatterns = positivePatterns.filter((pattern2) => utils$a.pattern.isDynamicPattern(pattern2, settings2));
  const staticTasks = convertPatternsToTasks(
    staticPatterns,
    negativePatterns,
    /* dynamic */
    false
  );
  const dynamicTasks = convertPatternsToTasks(
    dynamicPatterns,
    negativePatterns,
    /* dynamic */
    true
  );
  return staticTasks.concat(dynamicTasks);
}
tasks.generate = generate;
function processPatterns(input, settings2) {
  let patterns = input;
  if (settings2.braceExpansion) {
    patterns = utils$a.pattern.expandPatternsWithBraceExpansion(patterns);
  }
  if (settings2.baseNameMatch) {
    patterns = patterns.map((pattern2) => pattern2.includes("/") ? pattern2 : `**/${pattern2}`);
  }
  return patterns.map((pattern2) => utils$a.pattern.removeDuplicateSlashes(pattern2));
}
function convertPatternsToTasks(positive, negative, dynamic) {
  const tasks2 = [];
  const patternsOutsideCurrentDirectory = utils$a.pattern.getPatternsOutsideCurrentDirectory(positive);
  const patternsInsideCurrentDirectory = utils$a.pattern.getPatternsInsideCurrentDirectory(positive);
  const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
  const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
  tasks2.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
  if ("." in insideCurrentDirectoryGroup) {
    tasks2.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic));
  } else {
    tasks2.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
  }
  return tasks2;
}
tasks.convertPatternsToTasks = convertPatternsToTasks;
function getPositivePatterns(patterns) {
  return utils$a.pattern.getPositivePatterns(patterns);
}
tasks.getPositivePatterns = getPositivePatterns;
function getNegativePatternsAsPositive(patterns, ignore2) {
  const negative = utils$a.pattern.getNegativePatterns(patterns).concat(ignore2);
  const positive = negative.map(utils$a.pattern.convertToPositivePattern);
  return positive;
}
tasks.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
function groupPatternsByBaseDirectory(patterns) {
  const group = {};
  return patterns.reduce((collection, pattern2) => {
    const base = utils$a.pattern.getBaseDirectory(pattern2);
    if (base in collection) {
      collection[base].push(pattern2);
    } else {
      collection[base] = [pattern2];
    }
    return collection;
  }, group);
}
tasks.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
function convertPatternGroupsToTasks(positive, negative, dynamic) {
  return Object.keys(positive).map((base) => {
    return convertPatternGroupToTask(base, positive[base], negative, dynamic);
  });
}
tasks.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
function convertPatternGroupToTask(base, positive, negative, dynamic) {
  return {
    dynamic,
    positive,
    negative,
    base,
    patterns: [].concat(positive, negative.map(utils$a.pattern.convertToNegativePattern))
  };
}
tasks.convertPatternGroupToTask = convertPatternGroupToTask;
var async$7 = {};
var async$6 = {};
var out$3 = {};
var async$5 = {};
var async$4 = {};
var out$2 = {};
var async$3 = {};
var out$1 = {};
var async$2 = {};
Object.defineProperty(async$2, "__esModule", { value: true });
async$2.read = void 0;
function read$3(path2, settings2, callback) {
  settings2.fs.lstat(path2, (lstatError, lstat) => {
    if (lstatError !== null) {
      callFailureCallback$2(callback, lstatError);
      return;
    }
    if (!lstat.isSymbolicLink() || !settings2.followSymbolicLink) {
      callSuccessCallback$2(callback, lstat);
      return;
    }
    settings2.fs.stat(path2, (statError, stat2) => {
      if (statError !== null) {
        if (settings2.throwErrorOnBrokenSymbolicLink) {
          callFailureCallback$2(callback, statError);
          return;
        }
        callSuccessCallback$2(callback, lstat);
        return;
      }
      if (settings2.markSymbolicLink) {
        stat2.isSymbolicLink = () => true;
      }
      callSuccessCallback$2(callback, stat2);
    });
  });
}
async$2.read = read$3;
function callFailureCallback$2(callback, error2) {
  callback(error2);
}
function callSuccessCallback$2(callback, result) {
  callback(null, result);
}
var sync$7 = {};
Object.defineProperty(sync$7, "__esModule", { value: true });
sync$7.read = void 0;
function read$2(path2, settings2) {
  const lstat = settings2.fs.lstatSync(path2);
  if (!lstat.isSymbolicLink() || !settings2.followSymbolicLink) {
    return lstat;
  }
  try {
    const stat2 = settings2.fs.statSync(path2);
    if (settings2.markSymbolicLink) {
      stat2.isSymbolicLink = () => true;
    }
    return stat2;
  } catch (error2) {
    if (!settings2.throwErrorOnBrokenSymbolicLink) {
      return lstat;
    }
    throw error2;
  }
}
sync$7.read = read$2;
var settings$3 = {};
var fs$6 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
  const fs2 = require$$0$1;
  exports.FILE_SYSTEM_ADAPTER = {
    lstat: fs2.lstat,
    stat: fs2.stat,
    lstatSync: fs2.lstatSync,
    statSync: fs2.statSync
  };
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
  }
  exports.createFileSystemAdapter = createFileSystemAdapter;
})(fs$6);
Object.defineProperty(settings$3, "__esModule", { value: true });
const fs$5 = fs$6;
let Settings$2 = class Settings {
  constructor(_options = {}) {
    this._options = _options;
    this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
    this.fs = fs$5.createFileSystemAdapter(this._options.fs);
    this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
    this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
  }
  _getValue(option, value) {
    return option !== null && option !== void 0 ? option : value;
  }
};
settings$3.default = Settings$2;
Object.defineProperty(out$1, "__esModule", { value: true });
out$1.statSync = out$1.stat = out$1.Settings = void 0;
const async$1 = async$2;
const sync$6 = sync$7;
const settings_1$3 = settings$3;
out$1.Settings = settings_1$3.default;
function stat(path2, optionsOrSettingsOrCallback, callback) {
  if (typeof optionsOrSettingsOrCallback === "function") {
    async$1.read(path2, getSettings$2(), optionsOrSettingsOrCallback);
    return;
  }
  async$1.read(path2, getSettings$2(optionsOrSettingsOrCallback), callback);
}
out$1.stat = stat;
function statSync(path2, optionsOrSettings) {
  const settings2 = getSettings$2(optionsOrSettings);
  return sync$6.read(path2, settings2);
}
out$1.statSync = statSync;
function getSettings$2(settingsOrOptions = {}) {
  if (settingsOrOptions instanceof settings_1$3.default) {
    return settingsOrOptions;
  }
  return new settings_1$3.default(settingsOrOptions);
}
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise;
var queueMicrotask_1 = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : commonjsGlobal) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
  throw err;
}, 0));
/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var runParallel_1 = runParallel;
const queueMicrotask$1 = queueMicrotask_1;
function runParallel(tasks2, cb) {
  let results, pending, keys;
  let isSync = true;
  if (Array.isArray(tasks2)) {
    results = [];
    pending = tasks2.length;
  } else {
    keys = Object.keys(tasks2);
    results = {};
    pending = keys.length;
  }
  function done(err) {
    function end() {
      if (cb)
        cb(err, results);
      cb = null;
    }
    if (isSync)
      queueMicrotask$1(end);
    else
      end();
  }
  function each(i, err, result) {
    results[i] = result;
    if (--pending === 0 || err) {
      done(err);
    }
  }
  if (!pending) {
    done(null);
  } else if (keys) {
    keys.forEach(function(key) {
      tasks2[key](function(err, result) {
        each(key, err, result);
      });
    });
  } else {
    tasks2.forEach(function(task, i) {
      task(function(err, result) {
        each(i, err, result);
      });
    });
  }
  isSync = false;
}
var constants = {};
Object.defineProperty(constants, "__esModule", { value: true });
constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
const NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) {
  throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
}
const MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
const MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
const SUPPORTED_MAJOR_VERSION = 10;
const SUPPORTED_MINOR_VERSION = 10;
const IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
const IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
var utils$9 = {};
var fs$4 = {};
Object.defineProperty(fs$4, "__esModule", { value: true });
fs$4.createDirentFromStats = void 0;
class DirentFromStats2 {
  constructor(name, stats) {
    this.name = name;
    this.isBlockDevice = stats.isBlockDevice.bind(stats);
    this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
    this.isDirectory = stats.isDirectory.bind(stats);
    this.isFIFO = stats.isFIFO.bind(stats);
    this.isFile = stats.isFile.bind(stats);
    this.isSocket = stats.isSocket.bind(stats);
    this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
  }
}
function createDirentFromStats(name, stats) {
  return new DirentFromStats2(name, stats);
}
fs$4.createDirentFromStats = createDirentFromStats;
Object.defineProperty(utils$9, "__esModule", { value: true });
utils$9.fs = void 0;
const fs$3 = fs$4;
utils$9.fs = fs$3;
var common$6 = {};
Object.defineProperty(common$6, "__esModule", { value: true });
common$6.joinPathSegments = void 0;
function joinPathSegments$1(a, b, separator) {
  if (a.endsWith(separator)) {
    return a + b;
  }
  return a + separator + b;
}
common$6.joinPathSegments = joinPathSegments$1;
Object.defineProperty(async$3, "__esModule", { value: true });
async$3.readdir = async$3.readdirWithFileTypes = async$3.read = void 0;
const fsStat$5 = out$1;
const rpl = runParallel_1;
const constants_1$1 = constants;
const utils$8 = utils$9;
const common$5 = common$6;
function read$1(directory, settings2, callback) {
  if (!settings2.stats && constants_1$1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
    readdirWithFileTypes$1(directory, settings2, callback);
    return;
  }
  readdir$1(directory, settings2, callback);
}
async$3.read = read$1;
function readdirWithFileTypes$1(directory, settings2, callback) {
  settings2.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
    if (readdirError !== null) {
      callFailureCallback$1(callback, readdirError);
      return;
    }
    const entries = dirents.map((dirent) => ({
      dirent,
      name: dirent.name,
      path: common$5.joinPathSegments(directory, dirent.name, settings2.pathSegmentSeparator)
    }));
    if (!settings2.followSymbolicLinks) {
      callSuccessCallback$1(callback, entries);
      return;
    }
    const tasks2 = entries.map((entry2) => makeRplTaskEntry(entry2, settings2));
    rpl(tasks2, (rplError, rplEntries) => {
      if (rplError !== null) {
        callFailureCallback$1(callback, rplError);
        return;
      }
      callSuccessCallback$1(callback, rplEntries);
    });
  });
}
async$3.readdirWithFileTypes = readdirWithFileTypes$1;
function makeRplTaskEntry(entry2, settings2) {
  return (done) => {
    if (!entry2.dirent.isSymbolicLink()) {
      done(null, entry2);
      return;
    }
    settings2.fs.stat(entry2.path, (statError, stats) => {
      if (statError !== null) {
        if (settings2.throwErrorOnBrokenSymbolicLink) {
          done(statError);
          return;
        }
        done(null, entry2);
        return;
      }
      entry2.dirent = utils$8.fs.createDirentFromStats(entry2.name, stats);
      done(null, entry2);
    });
  };
}
function readdir$1(directory, settings2, callback) {
  settings2.fs.readdir(directory, (readdirError, names) => {
    if (readdirError !== null) {
      callFailureCallback$1(callback, readdirError);
      return;
    }
    const tasks2 = names.map((name) => {
      const path2 = common$5.joinPathSegments(directory, name, settings2.pathSegmentSeparator);
      return (done) => {
        fsStat$5.stat(path2, settings2.fsStatSettings, (error2, stats) => {
          if (error2 !== null) {
            done(error2);
            return;
          }
          const entry2 = {
            name,
            path: path2,
            dirent: utils$8.fs.createDirentFromStats(name, stats)
          };
          if (settings2.stats) {
            entry2.stats = stats;
          }
          done(null, entry2);
        });
      };
    });
    rpl(tasks2, (rplError, entries) => {
      if (rplError !== null) {
        callFailureCallback$1(callback, rplError);
        return;
      }
      callSuccessCallback$1(callback, entries);
    });
  });
}
async$3.readdir = readdir$1;
function callFailureCallback$1(callback, error2) {
  callback(error2);
}
function callSuccessCallback$1(callback, result) {
  callback(null, result);
}
var sync$5 = {};
Object.defineProperty(sync$5, "__esModule", { value: true });
sync$5.readdir = sync$5.readdirWithFileTypes = sync$5.read = void 0;
const fsStat$4 = out$1;
const constants_1 = constants;
const utils$7 = utils$9;
const common$4 = common$6;
function read(directory, settings2) {
  if (!settings2.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
    return readdirWithFileTypes(directory, settings2);
  }
  return readdir(directory, settings2);
}
sync$5.read = read;
function readdirWithFileTypes(directory, settings2) {
  const dirents = settings2.fs.readdirSync(directory, { withFileTypes: true });
  return dirents.map((dirent) => {
    const entry2 = {
      dirent,
      name: dirent.name,
      path: common$4.joinPathSegments(directory, dirent.name, settings2.pathSegmentSeparator)
    };
    if (entry2.dirent.isSymbolicLink() && settings2.followSymbolicLinks) {
      try {
        const stats = settings2.fs.statSync(entry2.path);
        entry2.dirent = utils$7.fs.createDirentFromStats(entry2.name, stats);
      } catch (error2) {
        if (settings2.throwErrorOnBrokenSymbolicLink) {
          throw error2;
        }
      }
    }
    return entry2;
  });
}
sync$5.readdirWithFileTypes = readdirWithFileTypes;
function readdir(directory, settings2) {
  const names = settings2.fs.readdirSync(directory);
  return names.map((name) => {
    const entryPath = common$4.joinPathSegments(directory, name, settings2.pathSegmentSeparator);
    const stats = fsStat$4.statSync(entryPath, settings2.fsStatSettings);
    const entry2 = {
      name,
      path: entryPath,
      dirent: utils$7.fs.createDirentFromStats(name, stats)
    };
    if (settings2.stats) {
      entry2.stats = stats;
    }
    return entry2;
  });
}
sync$5.readdir = readdir;
var settings$2 = {};
var fs$2 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
  const fs2 = require$$0$1;
  exports.FILE_SYSTEM_ADAPTER = {
    lstat: fs2.lstat,
    stat: fs2.stat,
    lstatSync: fs2.lstatSync,
    statSync: fs2.statSync,
    readdir: fs2.readdir,
    readdirSync: fs2.readdirSync
  };
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
  }
  exports.createFileSystemAdapter = createFileSystemAdapter;
})(fs$2);
Object.defineProperty(settings$2, "__esModule", { value: true });
const path$4 = require$$0$3;
const fsStat$3 = out$1;
const fs$1 = fs$2;
let Settings$1 = class Settings2 {
  constructor(_options = {}) {
    this._options = _options;
    this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
    this.fs = fs$1.createFileSystemAdapter(this._options.fs);
    this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$4.sep);
    this.stats = this._getValue(this._options.stats, false);
    this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
    this.fsStatSettings = new fsStat$3.Settings({
      followSymbolicLink: this.followSymbolicLinks,
      fs: this.fs,
      throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
    });
  }
  _getValue(option, value) {
    return option !== null && option !== void 0 ? option : value;
  }
};
settings$2.default = Settings$1;
Object.defineProperty(out$2, "__esModule", { value: true });
out$2.Settings = out$2.scandirSync = out$2.scandir = void 0;
const async = async$3;
const sync$4 = sync$5;
const settings_1$2 = settings$2;
out$2.Settings = settings_1$2.default;
function scandir(path2, optionsOrSettingsOrCallback, callback) {
  if (typeof optionsOrSettingsOrCallback === "function") {
    async.read(path2, getSettings$1(), optionsOrSettingsOrCallback);
    return;
  }
  async.read(path2, getSettings$1(optionsOrSettingsOrCallback), callback);
}
out$2.scandir = scandir;
function scandirSync(path2, optionsOrSettings) {
  const settings2 = getSettings$1(optionsOrSettings);
  return sync$4.read(path2, settings2);
}
out$2.scandirSync = scandirSync;
function getSettings$1(settingsOrOptions = {}) {
  if (settingsOrOptions instanceof settings_1$2.default) {
    return settingsOrOptions;
  }
  return new settings_1$2.default(settingsOrOptions);
}
var queue = { exports: {} };
function reusify$1(Constructor) {
  var head = new Constructor();
  var tail = head;
  function get() {
    var current = head;
    if (current.next) {
      head = current.next;
    } else {
      head = new Constructor();
      tail = head;
    }
    current.next = null;
    return current;
  }
  function release(obj) {
    tail.next = obj;
    tail = obj;
  }
  return {
    get,
    release
  };
}
var reusify_1 = reusify$1;
var reusify = reusify_1;
function fastqueue(context, worker, concurrency) {
  if (typeof context === "function") {
    concurrency = worker;
    worker = context;
    context = null;
  }
  if (concurrency < 1) {
    throw new Error("fastqueue concurrency must be greater than 1");
  }
  var cache = reusify(Task);
  var queueHead = null;
  var queueTail = null;
  var _running = 0;
  var errorHandler = null;
  var self2 = {
    push,
    drain: noop,
    saturated: noop,
    pause,
    paused: false,
    concurrency,
    running,
    resume,
    idle,
    length,
    getQueue,
    unshift,
    empty: noop,
    kill,
    killAndDrain,
    error: error2
  };
  return self2;
  function running() {
    return _running;
  }
  function pause() {
    self2.paused = true;
  }
  function length() {
    var current = queueHead;
    var counter = 0;
    while (current) {
      current = current.next;
      counter++;
    }
    return counter;
  }
  function getQueue() {
    var current = queueHead;
    var tasks2 = [];
    while (current) {
      tasks2.push(current.value);
      current = current.next;
    }
    return tasks2;
  }
  function resume() {
    if (!self2.paused)
      return;
    self2.paused = false;
    for (var i = 0; i < self2.concurrency; i++) {
      _running++;
      release();
    }
  }
  function idle() {
    return _running === 0 && self2.length() === 0;
  }
  function push(value, done) {
    var current = cache.get();
    current.context = context;
    current.release = release;
    current.value = value;
    current.callback = done || noop;
    current.errorHandler = errorHandler;
    if (_running === self2.concurrency || self2.paused) {
      if (queueTail) {
        queueTail.next = current;
        queueTail = current;
      } else {
        queueHead = current;
        queueTail = current;
        self2.saturated();
      }
    } else {
      _running++;
      worker.call(context, current.value, current.worked);
    }
  }
  function unshift(value, done) {
    var current = cache.get();
    current.context = context;
    current.release = release;
    current.value = value;
    current.callback = done || noop;
    if (_running === self2.concurrency || self2.paused) {
      if (queueHead) {
        current.next = queueHead;
        queueHead = current;
      } else {
        queueHead = current;
        queueTail = current;
        self2.saturated();
      }
    } else {
      _running++;
      worker.call(context, current.value, current.worked);
    }
  }
  function release(holder) {
    if (holder) {
      cache.release(holder);
    }
    var next = queueHead;
    if (next) {
      if (!self2.paused) {
        if (queueTail === queueHead) {
          queueTail = null;
        }
        queueHead = next.next;
        next.next = null;
        worker.call(context, next.value, next.worked);
        if (queueTail === null) {
          self2.empty();
        }
      } else {
        _running--;
      }
    } else if (--_running === 0) {
      self2.drain();
    }
  }
  function kill() {
    queueHead = null;
    queueTail = null;
    self2.drain = noop;
  }
  function killAndDrain() {
    queueHead = null;
    queueTail = null;
    self2.drain();
    self2.drain = noop;
  }
  function error2(handler) {
    errorHandler = handler;
  }
}
function noop() {
}
function Task() {
  this.value = null;
  this.callback = noop;
  this.next = null;
  this.release = noop;
  this.context = null;
  this.errorHandler = null;
  var self2 = this;
  this.worked = function worked(err, result) {
    var callback = self2.callback;
    var errorHandler = self2.errorHandler;
    var val = self2.value;
    self2.value = null;
    self2.callback = noop;
    if (self2.errorHandler) {
      errorHandler(err, val);
    }
    callback.call(self2.context, err, result);
    self2.release(self2);
  };
}
function queueAsPromised(context, worker, concurrency) {
  if (typeof context === "function") {
    concurrency = worker;
    worker = context;
    context = null;
  }
  function asyncWrapper(arg, cb) {
    worker.call(this, arg).then(function(res) {
      cb(null, res);
    }, cb);
  }
  var queue2 = fastqueue(context, asyncWrapper, concurrency);
  var pushCb = queue2.push;
  var unshiftCb = queue2.unshift;
  queue2.push = push;
  queue2.unshift = unshift;
  queue2.drained = drained;
  return queue2;
  function push(value) {
    var p = new Promise(function(resolve, reject) {
      pushCb(value, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
    p.catch(noop);
    return p;
  }
  function unshift(value) {
    var p = new Promise(function(resolve, reject) {
      unshiftCb(value, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
    p.catch(noop);
    return p;
  }
  function drained() {
    if (queue2.idle()) {
      return new Promise(function(resolve) {
        resolve();
      });
    }
    var previousDrain = queue2.drain;
    var p = new Promise(function(resolve) {
      queue2.drain = function() {
        previousDrain();
        resolve();
      };
    });
    return p;
  }
}
queue.exports = fastqueue;
queue.exports.promise = queueAsPromised;
var queueExports = queue.exports;
var common$3 = {};
Object.defineProperty(common$3, "__esModule", { value: true });
common$3.joinPathSegments = common$3.replacePathSegmentSeparator = common$3.isAppliedFilter = common$3.isFatalError = void 0;
function isFatalError(settings2, error2) {
  if (settings2.errorFilter === null) {
    return true;
  }
  return !settings2.errorFilter(error2);
}
common$3.isFatalError = isFatalError;
function isAppliedFilter(filter, value) {
  return filter === null || filter(value);
}
common$3.isAppliedFilter = isAppliedFilter;
function replacePathSegmentSeparator(filepath, separator) {
  return filepath.split(/[/\\]/).join(separator);
}
common$3.replacePathSegmentSeparator = replacePathSegmentSeparator;
function joinPathSegments(a, b, separator) {
  if (a === "") {
    return b;
  }
  if (a.endsWith(separator)) {
    return a + b;
  }
  return a + separator + b;
}
common$3.joinPathSegments = joinPathSegments;
var reader$1 = {};
Object.defineProperty(reader$1, "__esModule", { value: true });
const common$2 = common$3;
let Reader$1 = class Reader {
  constructor(_root, _settings) {
    this._root = _root;
    this._settings = _settings;
    this._root = common$2.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
  }
};
reader$1.default = Reader$1;
Object.defineProperty(async$4, "__esModule", { value: true });
const events_1 = require$$4;
const fsScandir$2 = out$2;
const fastq = queueExports;
const common$1 = common$3;
const reader_1$4 = reader$1;
class AsyncReader extends reader_1$4.default {
  constructor(_root, _settings) {
    super(_root, _settings);
    this._settings = _settings;
    this._scandir = fsScandir$2.scandir;
    this._emitter = new events_1.EventEmitter();
    this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
    this._isFatalError = false;
    this._isDestroyed = false;
    this._queue.drain = () => {
      if (!this._isFatalError) {
        this._emitter.emit("end");
      }
    };
  }
  read() {
    this._isFatalError = false;
    this._isDestroyed = false;
    setImmediate(() => {
      this._pushToQueue(this._root, this._settings.basePath);
    });
    return this._emitter;
  }
  get isDestroyed() {
    return this._isDestroyed;
  }
  destroy() {
    if (this._isDestroyed) {
      throw new Error("The reader is already destroyed");
    }
    this._isDestroyed = true;
    this._queue.killAndDrain();
  }
  onEntry(callback) {
    this._emitter.on("entry", callback);
  }
  onError(callback) {
    this._emitter.once("error", callback);
  }
  onEnd(callback) {
    this._emitter.once("end", callback);
  }
  _pushToQueue(directory, base) {
    const queueItem = { directory, base };
    this._queue.push(queueItem, (error2) => {
      if (error2 !== null) {
        this._handleError(error2);
      }
    });
  }
  _worker(item, done) {
    this._scandir(item.directory, this._settings.fsScandirSettings, (error2, entries) => {
      if (error2 !== null) {
        done(error2, void 0);
        return;
      }
      for (const entry2 of entries) {
        this._handleEntry(entry2, item.base);
      }
      done(null, void 0);
    });
  }
  _handleError(error2) {
    if (this._isDestroyed || !common$1.isFatalError(this._settings, error2)) {
      return;
    }
    this._isFatalError = true;
    this._isDestroyed = true;
    this._emitter.emit("error", error2);
  }
  _handleEntry(entry2, base) {
    if (this._isDestroyed || this._isFatalError) {
      return;
    }
    const fullpath = entry2.path;
    if (base !== void 0) {
      entry2.path = common$1.joinPathSegments(base, entry2.name, this._settings.pathSegmentSeparator);
    }
    if (common$1.isAppliedFilter(this._settings.entryFilter, entry2)) {
      this._emitEntry(entry2);
    }
    if (entry2.dirent.isDirectory() && common$1.isAppliedFilter(this._settings.deepFilter, entry2)) {
      this._pushToQueue(fullpath, base === void 0 ? void 0 : entry2.path);
    }
  }
  _emitEntry(entry2) {
    this._emitter.emit("entry", entry2);
  }
}
async$4.default = AsyncReader;
Object.defineProperty(async$5, "__esModule", { value: true });
const async_1$4 = async$4;
class AsyncProvider {
  constructor(_root, _settings) {
    this._root = _root;
    this._settings = _settings;
    this._reader = new async_1$4.default(this._root, this._settings);
    this._storage = [];
  }
  read(callback) {
    this._reader.onError((error2) => {
      callFailureCallback(callback, error2);
    });
    this._reader.onEntry((entry2) => {
      this._storage.push(entry2);
    });
    this._reader.onEnd(() => {
      callSuccessCallback(callback, this._storage);
    });
    this._reader.read();
  }
}
async$5.default = AsyncProvider;
function callFailureCallback(callback, error2) {
  callback(error2);
}
function callSuccessCallback(callback, entries) {
  callback(null, entries);
}
var stream$2 = {};
Object.defineProperty(stream$2, "__esModule", { value: true });
const stream_1$5 = require$$0$5;
const async_1$3 = async$4;
class StreamProvider {
  constructor(_root, _settings) {
    this._root = _root;
    this._settings = _settings;
    this._reader = new async_1$3.default(this._root, this._settings);
    this._stream = new stream_1$5.Readable({
      objectMode: true,
      read: () => {
      },
      destroy: () => {
        if (!this._reader.isDestroyed) {
          this._reader.destroy();
        }
      }
    });
  }
  read() {
    this._reader.onError((error2) => {
      this._stream.emit("error", error2);
    });
    this._reader.onEntry((entry2) => {
      this._stream.push(entry2);
    });
    this._reader.onEnd(() => {
      this._stream.push(null);
    });
    this._reader.read();
    return this._stream;
  }
}
stream$2.default = StreamProvider;
var sync$3 = {};
var sync$2 = {};
Object.defineProperty(sync$2, "__esModule", { value: true });
const fsScandir$1 = out$2;
const common = common$3;
const reader_1$3 = reader$1;
class SyncReader extends reader_1$3.default {
  constructor() {
    super(...arguments);
    this._scandir = fsScandir$1.scandirSync;
    this._storage = [];
    this._queue = /* @__PURE__ */ new Set();
  }
  read() {
    this._pushToQueue(this._root, this._settings.basePath);
    this._handleQueue();
    return this._storage;
  }
  _pushToQueue(directory, base) {
    this._queue.add({ directory, base });
  }
  _handleQueue() {
    for (const item of this._queue.values()) {
      this._handleDirectory(item.directory, item.base);
    }
  }
  _handleDirectory(directory, base) {
    try {
      const entries = this._scandir(directory, this._settings.fsScandirSettings);
      for (const entry2 of entries) {
        this._handleEntry(entry2, base);
      }
    } catch (error2) {
      this._handleError(error2);
    }
  }
  _handleError(error2) {
    if (!common.isFatalError(this._settings, error2)) {
      return;
    }
    throw error2;
  }
  _handleEntry(entry2, base) {
    const fullpath = entry2.path;
    if (base !== void 0) {
      entry2.path = common.joinPathSegments(base, entry2.name, this._settings.pathSegmentSeparator);
    }
    if (common.isAppliedFilter(this._settings.entryFilter, entry2)) {
      this._pushToStorage(entry2);
    }
    if (entry2.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry2)) {
      this._pushToQueue(fullpath, base === void 0 ? void 0 : entry2.path);
    }
  }
  _pushToStorage(entry2) {
    this._storage.push(entry2);
  }
}
sync$2.default = SyncReader;
Object.defineProperty(sync$3, "__esModule", { value: true });
const sync_1$3 = sync$2;
class SyncProvider {
  constructor(_root, _settings) {
    this._root = _root;
    this._settings = _settings;
    this._reader = new sync_1$3.default(this._root, this._settings);
  }
  read() {
    return this._reader.read();
  }
}
sync$3.default = SyncProvider;
var settings$1 = {};
Object.defineProperty(settings$1, "__esModule", { value: true });
const path$3 = require$$0$3;
const fsScandir = out$2;
class Settings3 {
  constructor(_options = {}) {
    this._options = _options;
    this.basePath = this._getValue(this._options.basePath, void 0);
    this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
    this.deepFilter = this._getValue(this._options.deepFilter, null);
    this.entryFilter = this._getValue(this._options.entryFilter, null);
    this.errorFilter = this._getValue(this._options.errorFilter, null);
    this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$3.sep);
    this.fsScandirSettings = new fsScandir.Settings({
      followSymbolicLinks: this._options.followSymbolicLinks,
      fs: this._options.fs,
      pathSegmentSeparator: this._options.pathSegmentSeparator,
      stats: this._options.stats,
      throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
    });
  }
  _getValue(option, value) {
    return option !== null && option !== void 0 ? option : value;
  }
}
settings$1.default = Settings3;
Object.defineProperty(out$3, "__esModule", { value: true });
out$3.Settings = out$3.walkStream = out$3.walkSync = out$3.walk = void 0;
const async_1$2 = async$5;
const stream_1$4 = stream$2;
const sync_1$2 = sync$3;
const settings_1$1 = settings$1;
out$3.Settings = settings_1$1.default;
function walk(directory, optionsOrSettingsOrCallback, callback) {
  if (typeof optionsOrSettingsOrCallback === "function") {
    new async_1$2.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
    return;
  }
  new async_1$2.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
}
out$3.walk = walk;
function walkSync(directory, optionsOrSettings) {
  const settings2 = getSettings(optionsOrSettings);
  const provider2 = new sync_1$2.default(directory, settings2);
  return provider2.read();
}
out$3.walkSync = walkSync;
function walkStream(directory, optionsOrSettings) {
  const settings2 = getSettings(optionsOrSettings);
  const provider2 = new stream_1$4.default(directory, settings2);
  return provider2.read();
}
out$3.walkStream = walkStream;
function getSettings(settingsOrOptions = {}) {
  if (settingsOrOptions instanceof settings_1$1.default) {
    return settingsOrOptions;
  }
  return new settings_1$1.default(settingsOrOptions);
}
var reader = {};
Object.defineProperty(reader, "__esModule", { value: true });
const path$2 = require$$0$3;
const fsStat$2 = out$1;
const utils$6 = utils$k;
class Reader2 {
  constructor(_settings) {
    this._settings = _settings;
    this._fsStatSettings = new fsStat$2.Settings({
      followSymbolicLink: this._settings.followSymbolicLinks,
      fs: this._settings.fs,
      throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
    });
  }
  _getFullEntryPath(filepath) {
    return path$2.resolve(this._settings.cwd, filepath);
  }
  _makeEntry(stats, pattern2) {
    const entry2 = {
      name: pattern2,
      path: pattern2,
      dirent: utils$6.fs.createDirentFromStats(pattern2, stats)
    };
    if (this._settings.stats) {
      entry2.stats = stats;
    }
    return entry2;
  }
  _isFatalError(error2) {
    return !utils$6.errno.isEnoentCodeError(error2) && !this._settings.suppressErrors;
  }
}
reader.default = Reader2;
var stream$1 = {};
Object.defineProperty(stream$1, "__esModule", { value: true });
const stream_1$3 = require$$0$5;
const fsStat$1 = out$1;
const fsWalk$2 = out$3;
const reader_1$2 = reader;
class ReaderStream extends reader_1$2.default {
  constructor() {
    super(...arguments);
    this._walkStream = fsWalk$2.walkStream;
    this._stat = fsStat$1.stat;
  }
  dynamic(root, options) {
    return this._walkStream(root, options);
  }
  static(patterns, options) {
    const filepaths = patterns.map(this._getFullEntryPath, this);
    const stream2 = new stream_1$3.PassThrough({ objectMode: true });
    stream2._write = (index, _enc, done) => {
      return this._getEntry(filepaths[index], patterns[index], options).then((entry2) => {
        if (entry2 !== null && options.entryFilter(entry2)) {
          stream2.push(entry2);
        }
        if (index === filepaths.length - 1) {
          stream2.end();
        }
        done();
      }).catch(done);
    };
    for (let i = 0; i < filepaths.length; i++) {
      stream2.write(i);
    }
    return stream2;
  }
  _getEntry(filepath, pattern2, options) {
    return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern2)).catch((error2) => {
      if (options.errorFilter(error2)) {
        return null;
      }
      throw error2;
    });
  }
  _getStat(filepath) {
    return new Promise((resolve, reject) => {
      this._stat(filepath, this._fsStatSettings, (error2, stats) => {
        return error2 === null ? resolve(stats) : reject(error2);
      });
    });
  }
}
stream$1.default = ReaderStream;
Object.defineProperty(async$6, "__esModule", { value: true });
const fsWalk$1 = out$3;
const reader_1$1 = reader;
const stream_1$2 = stream$1;
class ReaderAsync extends reader_1$1.default {
  constructor() {
    super(...arguments);
    this._walkAsync = fsWalk$1.walk;
    this._readerStream = new stream_1$2.default(this._settings);
  }
  dynamic(root, options) {
    return new Promise((resolve, reject) => {
      this._walkAsync(root, options, (error2, entries) => {
        if (error2 === null) {
          resolve(entries);
        } else {
          reject(error2);
        }
      });
    });
  }
  async static(patterns, options) {
    const entries = [];
    const stream2 = this._readerStream.static(patterns, options);
    return new Promise((resolve, reject) => {
      stream2.once("error", reject);
      stream2.on("data", (entry2) => entries.push(entry2));
      stream2.once("end", () => resolve(entries));
    });
  }
}
async$6.default = ReaderAsync;
var provider = {};
var deep = {};
var partial = {};
var matcher = {};
Object.defineProperty(matcher, "__esModule", { value: true });
const utils$5 = utils$k;
class Matcher {
  constructor(_patterns, _settings, _micromatchOptions) {
    this._patterns = _patterns;
    this._settings = _settings;
    this._micromatchOptions = _micromatchOptions;
    this._storage = [];
    this._fillStorage();
  }
  _fillStorage() {
    for (const pattern2 of this._patterns) {
      const segments = this._getPatternSegments(pattern2);
      const sections = this._splitSegmentsIntoSections(segments);
      this._storage.push({
        complete: sections.length <= 1,
        pattern: pattern2,
        segments,
        sections
      });
    }
  }
  _getPatternSegments(pattern2) {
    const parts = utils$5.pattern.getPatternParts(pattern2, this._micromatchOptions);
    return parts.map((part) => {
      const dynamic = utils$5.pattern.isDynamicPattern(part, this._settings);
      if (!dynamic) {
        return {
          dynamic: false,
          pattern: part
        };
      }
      return {
        dynamic: true,
        pattern: part,
        patternRe: utils$5.pattern.makeRe(part, this._micromatchOptions)
      };
    });
  }
  _splitSegmentsIntoSections(segments) {
    return utils$5.array.splitWhen(segments, (segment) => segment.dynamic && utils$5.pattern.hasGlobStar(segment.pattern));
  }
}
matcher.default = Matcher;
Object.defineProperty(partial, "__esModule", { value: true });
const matcher_1 = matcher;
class PartialMatcher extends matcher_1.default {
  match(filepath) {
    const parts = filepath.split("/");
    const levels = parts.length;
    const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
    for (const pattern2 of patterns) {
      const section = pattern2.sections[0];
      if (!pattern2.complete && levels > section.length) {
        return true;
      }
      const match2 = parts.every((part, index) => {
        const segment = pattern2.segments[index];
        if (segment.dynamic && segment.patternRe.test(part)) {
          return true;
        }
        if (!segment.dynamic && segment.pattern === part) {
          return true;
        }
        return false;
      });
      if (match2) {
        return true;
      }
    }
    return false;
  }
}
partial.default = PartialMatcher;
Object.defineProperty(deep, "__esModule", { value: true });
const utils$4 = utils$k;
const partial_1 = partial;
class DeepFilter {
  constructor(_settings, _micromatchOptions) {
    this._settings = _settings;
    this._micromatchOptions = _micromatchOptions;
  }
  getFilter(basePath, positive, negative) {
    const matcher2 = this._getMatcher(positive);
    const negativeRe = this._getNegativePatternsRe(negative);
    return (entry2) => this._filter(basePath, entry2, matcher2, negativeRe);
  }
  _getMatcher(patterns) {
    return new partial_1.default(patterns, this._settings, this._micromatchOptions);
  }
  _getNegativePatternsRe(patterns) {
    const affectDepthOfReadingPatterns = patterns.filter(utils$4.pattern.isAffectDepthOfReadingPattern);
    return utils$4.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
  }
  _filter(basePath, entry2, matcher2, negativeRe) {
    if (this._isSkippedByDeep(basePath, entry2.path)) {
      return false;
    }
    if (this._isSkippedSymbolicLink(entry2)) {
      return false;
    }
    const filepath = utils$4.path.removeLeadingDotSegment(entry2.path);
    if (this._isSkippedByPositivePatterns(filepath, matcher2)) {
      return false;
    }
    return this._isSkippedByNegativePatterns(filepath, negativeRe);
  }
  _isSkippedByDeep(basePath, entryPath) {
    if (this._settings.deep === Infinity) {
      return false;
    }
    return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
  }
  _getEntryLevel(basePath, entryPath) {
    const entryPathDepth = entryPath.split("/").length;
    if (basePath === "") {
      return entryPathDepth;
    }
    const basePathDepth = basePath.split("/").length;
    return entryPathDepth - basePathDepth;
  }
  _isSkippedSymbolicLink(entry2) {
    return !this._settings.followSymbolicLinks && entry2.dirent.isSymbolicLink();
  }
  _isSkippedByPositivePatterns(entryPath, matcher2) {
    return !this._settings.baseNameMatch && !matcher2.match(entryPath);
  }
  _isSkippedByNegativePatterns(entryPath, patternsRe) {
    return !utils$4.pattern.matchAny(entryPath, patternsRe);
  }
}
deep.default = DeepFilter;
var entry$1 = {};
Object.defineProperty(entry$1, "__esModule", { value: true });
const utils$3 = utils$k;
class EntryFilter {
  constructor(_settings, _micromatchOptions) {
    this._settings = _settings;
    this._micromatchOptions = _micromatchOptions;
    this.index = /* @__PURE__ */ new Map();
  }
  getFilter(positive, negative) {
    const positiveRe = utils$3.pattern.convertPatternsToRe(positive, this._micromatchOptions);
    const negativeRe = utils$3.pattern.convertPatternsToRe(negative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true }));
    return (entry2) => this._filter(entry2, positiveRe, negativeRe);
  }
  _filter(entry2, positiveRe, negativeRe) {
    const filepath = utils$3.path.removeLeadingDotSegment(entry2.path);
    if (this._settings.unique && this._isDuplicateEntry(filepath)) {
      return false;
    }
    if (this._onlyFileFilter(entry2) || this._onlyDirectoryFilter(entry2)) {
      return false;
    }
    if (this._isSkippedByAbsoluteNegativePatterns(filepath, negativeRe)) {
      return false;
    }
    const isDirectory = entry2.dirent.isDirectory();
    const isMatched = this._isMatchToPatterns(filepath, positiveRe, isDirectory) && !this._isMatchToPatterns(filepath, negativeRe, isDirectory);
    if (this._settings.unique && isMatched) {
      this._createIndexRecord(filepath);
    }
    return isMatched;
  }
  _isDuplicateEntry(filepath) {
    return this.index.has(filepath);
  }
  _createIndexRecord(filepath) {
    this.index.set(filepath, void 0);
  }
  _onlyFileFilter(entry2) {
    return this._settings.onlyFiles && !entry2.dirent.isFile();
  }
  _onlyDirectoryFilter(entry2) {
    return this._settings.onlyDirectories && !entry2.dirent.isDirectory();
  }
  _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
    if (!this._settings.absolute) {
      return false;
    }
    const fullpath = utils$3.path.makeAbsolute(this._settings.cwd, entryPath);
    return utils$3.pattern.matchAny(fullpath, patternsRe);
  }
  _isMatchToPatterns(filepath, patternsRe, isDirectory) {
    const isMatched = utils$3.pattern.matchAny(filepath, patternsRe);
    if (!isMatched && isDirectory) {
      return utils$3.pattern.matchAny(filepath + "/", patternsRe);
    }
    return isMatched;
  }
}
entry$1.default = EntryFilter;
var error = {};
Object.defineProperty(error, "__esModule", { value: true });
const utils$2 = utils$k;
class ErrorFilter {
  constructor(_settings) {
    this._settings = _settings;
  }
  getFilter() {
    return (error2) => this._isNonFatalError(error2);
  }
  _isNonFatalError(error2) {
    return utils$2.errno.isEnoentCodeError(error2) || this._settings.suppressErrors;
  }
}
error.default = ErrorFilter;
var entry = {};
Object.defineProperty(entry, "__esModule", { value: true });
const utils$1 = utils$k;
class EntryTransformer {
  constructor(_settings) {
    this._settings = _settings;
  }
  getTransformer() {
    return (entry2) => this._transform(entry2);
  }
  _transform(entry2) {
    let filepath = entry2.path;
    if (this._settings.absolute) {
      filepath = utils$1.path.makeAbsolute(this._settings.cwd, filepath);
      filepath = utils$1.path.unixify(filepath);
    }
    if (this._settings.markDirectories && entry2.dirent.isDirectory()) {
      filepath += "/";
    }
    if (!this._settings.objectMode) {
      return filepath;
    }
    return Object.assign(Object.assign({}, entry2), { path: filepath });
  }
}
entry.default = EntryTransformer;
Object.defineProperty(provider, "__esModule", { value: true });
const path$1 = require$$0$3;
const deep_1 = deep;
const entry_1 = entry$1;
const error_1 = error;
const entry_2 = entry;
class Provider {
  constructor(_settings) {
    this._settings = _settings;
    this.errorFilter = new error_1.default(this._settings);
    this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
    this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
    this.entryTransformer = new entry_2.default(this._settings);
  }
  _getRootDirectory(task) {
    return path$1.resolve(this._settings.cwd, task.base);
  }
  _getReaderOptions(task) {
    const basePath = task.base === "." ? "" : task.base;
    return {
      basePath,
      pathSegmentSeparator: "/",
      concurrency: this._settings.concurrency,
      deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
      entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
      errorFilter: this.errorFilter.getFilter(),
      followSymbolicLinks: this._settings.followSymbolicLinks,
      fs: this._settings.fs,
      stats: this._settings.stats,
      throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
      transform: this.entryTransformer.getTransformer()
    };
  }
  _getMicromatchOptions() {
    return {
      dot: this._settings.dot,
      matchBase: this._settings.baseNameMatch,
      nobrace: !this._settings.braceExpansion,
      nocase: !this._settings.caseSensitiveMatch,
      noext: !this._settings.extglob,
      noglobstar: !this._settings.globstar,
      posix: true,
      strictSlashes: false
    };
  }
}
provider.default = Provider;
Object.defineProperty(async$7, "__esModule", { value: true });
const async_1$1 = async$6;
const provider_1$2 = provider;
class ProviderAsync extends provider_1$2.default {
  constructor() {
    super(...arguments);
    this._reader = new async_1$1.default(this._settings);
  }
  async read(task) {
    const root = this._getRootDirectory(task);
    const options = this._getReaderOptions(task);
    const entries = await this.api(root, task, options);
    return entries.map((entry2) => options.transform(entry2));
  }
  api(root, task, options) {
    if (task.dynamic) {
      return this._reader.dynamic(root, options);
    }
    return this._reader.static(task.patterns, options);
  }
}
async$7.default = ProviderAsync;
var stream = {};
Object.defineProperty(stream, "__esModule", { value: true });
const stream_1$1 = require$$0$5;
const stream_2 = stream$1;
const provider_1$1 = provider;
class ProviderStream extends provider_1$1.default {
  constructor() {
    super(...arguments);
    this._reader = new stream_2.default(this._settings);
  }
  read(task) {
    const root = this._getRootDirectory(task);
    const options = this._getReaderOptions(task);
    const source = this.api(root, task, options);
    const destination = new stream_1$1.Readable({ objectMode: true, read: () => {
    } });
    source.once("error", (error2) => destination.emit("error", error2)).on("data", (entry2) => destination.emit("data", options.transform(entry2))).once("end", () => destination.emit("end"));
    destination.once("close", () => source.destroy());
    return destination;
  }
  api(root, task, options) {
    if (task.dynamic) {
      return this._reader.dynamic(root, options);
    }
    return this._reader.static(task.patterns, options);
  }
}
stream.default = ProviderStream;
var sync$1 = {};
var sync = {};
Object.defineProperty(sync, "__esModule", { value: true });
const fsStat = out$1;
const fsWalk = out$3;
const reader_1 = reader;
class ReaderSync extends reader_1.default {
  constructor() {
    super(...arguments);
    this._walkSync = fsWalk.walkSync;
    this._statSync = fsStat.statSync;
  }
  dynamic(root, options) {
    return this._walkSync(root, options);
  }
  static(patterns, options) {
    const entries = [];
    for (const pattern2 of patterns) {
      const filepath = this._getFullEntryPath(pattern2);
      const entry2 = this._getEntry(filepath, pattern2, options);
      if (entry2 === null || !options.entryFilter(entry2)) {
        continue;
      }
      entries.push(entry2);
    }
    return entries;
  }
  _getEntry(filepath, pattern2, options) {
    try {
      const stats = this._getStat(filepath);
      return this._makeEntry(stats, pattern2);
    } catch (error2) {
      if (options.errorFilter(error2)) {
        return null;
      }
      throw error2;
    }
  }
  _getStat(filepath) {
    return this._statSync(filepath, this._fsStatSettings);
  }
}
sync.default = ReaderSync;
Object.defineProperty(sync$1, "__esModule", { value: true });
const sync_1$1 = sync;
const provider_1 = provider;
class ProviderSync extends provider_1.default {
  constructor() {
    super(...arguments);
    this._reader = new sync_1$1.default(this._settings);
  }
  read(task) {
    const root = this._getRootDirectory(task);
    const options = this._getReaderOptions(task);
    const entries = this.api(root, task, options);
    return entries.map(options.transform);
  }
  api(root, task, options) {
    if (task.dynamic) {
      return this._reader.dynamic(root, options);
    }
    return this._reader.static(task.patterns, options);
  }
}
sync$1.default = ProviderSync;
var settings = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
  const fs2 = require$$0$1;
  const os2 = require$$0;
  const CPU_COUNT = Math.max(os2.cpus().length, 1);
  exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
    lstat: fs2.lstat,
    lstatSync: fs2.lstatSync,
    stat: fs2.stat,
    statSync: fs2.statSync,
    readdir: fs2.readdir,
    readdirSync: fs2.readdirSync
  };
  class Settings4 {
    constructor(_options = {}) {
      this._options = _options;
      this.absolute = this._getValue(this._options.absolute, false);
      this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
      this.braceExpansion = this._getValue(this._options.braceExpansion, true);
      this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
      this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
      this.cwd = this._getValue(this._options.cwd, process.cwd());
      this.deep = this._getValue(this._options.deep, Infinity);
      this.dot = this._getValue(this._options.dot, false);
      this.extglob = this._getValue(this._options.extglob, true);
      this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
      this.fs = this._getFileSystemMethods(this._options.fs);
      this.globstar = this._getValue(this._options.globstar, true);
      this.ignore = this._getValue(this._options.ignore, []);
      this.markDirectories = this._getValue(this._options.markDirectories, false);
      this.objectMode = this._getValue(this._options.objectMode, false);
      this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
      this.onlyFiles = this._getValue(this._options.onlyFiles, true);
      this.stats = this._getValue(this._options.stats, false);
      this.suppressErrors = this._getValue(this._options.suppressErrors, false);
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
      this.unique = this._getValue(this._options.unique, true);
      if (this.onlyDirectories) {
        this.onlyFiles = false;
      }
      if (this.stats) {
        this.objectMode = true;
      }
    }
    _getValue(option, value) {
      return option === void 0 ? value : option;
    }
    _getFileSystemMethods(methods = {}) {
      return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
    }
  }
  exports.default = Settings4;
})(settings);
const taskManager = tasks;
const async_1 = async$7;
const stream_1 = stream;
const sync_1 = sync$1;
const settings_1 = settings;
const utils = utils$k;
async function FastGlob(source, options) {
  assertPatternsInput$1(source);
  const works = getWorks(source, async_1.default, options);
  const result = await Promise.all(works);
  return utils.array.flatten(result);
}
(function(FastGlob2) {
  FastGlob2.glob = FastGlob2;
  FastGlob2.globSync = sync2;
  FastGlob2.globStream = stream2;
  FastGlob2.async = FastGlob2;
  function sync2(source, options) {
    assertPatternsInput$1(source);
    const works = getWorks(source, sync_1.default, options);
    return utils.array.flatten(works);
  }
  FastGlob2.sync = sync2;
  function stream2(source, options) {
    assertPatternsInput$1(source);
    const works = getWorks(source, stream_1.default, options);
    return utils.stream.merge(works);
  }
  FastGlob2.stream = stream2;
  function generateTasks2(source, options) {
    assertPatternsInput$1(source);
    const patterns = [].concat(source);
    const settings2 = new settings_1.default(options);
    return taskManager.generate(patterns, settings2);
  }
  FastGlob2.generateTasks = generateTasks2;
  function isDynamicPattern2(source, options) {
    assertPatternsInput$1(source);
    const settings2 = new settings_1.default(options);
    return utils.pattern.isDynamicPattern(source, settings2);
  }
  FastGlob2.isDynamicPattern = isDynamicPattern2;
  function escapePath(source) {
    assertPatternsInput$1(source);
    return utils.path.escape(source);
  }
  FastGlob2.escapePath = escapePath;
  function convertPathToPattern(source) {
    assertPatternsInput$1(source);
    return utils.path.convertPathToPattern(source);
  }
  FastGlob2.convertPathToPattern = convertPathToPattern;
  (function(posix) {
    function escapePath2(source) {
      assertPatternsInput$1(source);
      return utils.path.escapePosixPath(source);
    }
    posix.escapePath = escapePath2;
    function convertPathToPattern2(source) {
      assertPatternsInput$1(source);
      return utils.path.convertPosixPathToPattern(source);
    }
    posix.convertPathToPattern = convertPathToPattern2;
  })(FastGlob2.posix || (FastGlob2.posix = {}));
  (function(win32) {
    function escapePath2(source) {
      assertPatternsInput$1(source);
      return utils.path.escapeWindowsPath(source);
    }
    win32.escapePath = escapePath2;
    function convertPathToPattern2(source) {
      assertPatternsInput$1(source);
      return utils.path.convertWindowsPathToPattern(source);
    }
    win32.convertPathToPattern = convertPathToPattern2;
  })(FastGlob2.win32 || (FastGlob2.win32 = {}));
})(FastGlob || (FastGlob = {}));
function getWorks(source, _Provider, options) {
  const patterns = [].concat(source);
  const settings2 = new settings_1.default(options);
  const tasks2 = taskManager.generate(patterns, settings2);
  const provider2 = new _Provider(settings2);
  return tasks2.map(provider2.read, provider2);
}
function assertPatternsInput$1(input) {
  const source = [].concat(input);
  const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
  if (!isValidSource) {
    throw new TypeError("Patterns must be a string (non empty) or an array of strings");
  }
}
var out = FastGlob;
const fastGlob = /* @__PURE__ */ getDefaultExportFromCjs(out);
var dirGlob$1 = { exports: {} };
var pathType$1 = {};
const { promisify } = require$$0$2;
const fs = require$$0$1;
async function isType(fsStatType, statsMethodName, filePath) {
  if (typeof filePath !== "string") {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }
  try {
    const stats = await promisify(fs[fsStatType])(filePath);
    return stats[statsMethodName]();
  } catch (error2) {
    if (error2.code === "ENOENT") {
      return false;
    }
    throw error2;
  }
}
function isTypeSync(fsStatType, statsMethodName, filePath) {
  if (typeof filePath !== "string") {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }
  try {
    return fs[fsStatType](filePath)[statsMethodName]();
  } catch (error2) {
    if (error2.code === "ENOENT") {
      return false;
    }
    throw error2;
  }
}
pathType$1.isFile = isType.bind(null, "stat", "isFile");
pathType$1.isDirectory = isType.bind(null, "stat", "isDirectory");
pathType$1.isSymlink = isType.bind(null, "lstat", "isSymbolicLink");
pathType$1.isFileSync = isTypeSync.bind(null, "statSync", "isFile");
pathType$1.isDirectorySync = isTypeSync.bind(null, "statSync", "isDirectory");
pathType$1.isSymlinkSync = isTypeSync.bind(null, "lstatSync", "isSymbolicLink");
const path = require$$0$3;
const pathType = pathType$1;
const getExtensions = (extensions) => extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0];
const getPath = (filepath, cwd) => {
  const pth = filepath[0] === "!" ? filepath.slice(1) : filepath;
  return path.isAbsolute(pth) ? pth : path.join(cwd, pth);
};
const addExtensions = (file, extensions) => {
  if (path.extname(file)) {
    return `**/${file}`;
  }
  return `**/${file}.${getExtensions(extensions)}`;
};
const getGlob = (directory, options) => {
  if (options.files && !Array.isArray(options.files)) {
    throw new TypeError(`Expected \`files\` to be of type \`Array\` but received type \`${typeof options.files}\``);
  }
  if (options.extensions && !Array.isArray(options.extensions)) {
    throw new TypeError(`Expected \`extensions\` to be of type \`Array\` but received type \`${typeof options.extensions}\``);
  }
  if (options.files && options.extensions) {
    return options.files.map((x) => path.posix.join(directory, addExtensions(x, options.extensions)));
  }
  if (options.files) {
    return options.files.map((x) => path.posix.join(directory, `**/${x}`));
  }
  if (options.extensions) {
    return [path.posix.join(directory, `**/*.${getExtensions(options.extensions)}`)];
  }
  return [path.posix.join(directory, "**")];
};
dirGlob$1.exports = async (input, options) => {
  options = {
    cwd: process.cwd(),
    ...options
  };
  if (typeof options.cwd !== "string") {
    throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
  }
  const globs = await Promise.all([].concat(input).map(async (x) => {
    const isDirectory = await pathType.isDirectory(getPath(x, options.cwd));
    return isDirectory ? getGlob(x, options) : x;
  }));
  return [].concat.apply([], globs);
};
dirGlob$1.exports.sync = (input, options) => {
  options = {
    cwd: process.cwd(),
    ...options
  };
  if (typeof options.cwd !== "string") {
    throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
  }
  const globs = [].concat(input).map((x) => pathType.isDirectorySync(getPath(x, options.cwd)) ? getGlob(x, options) : x);
  return [].concat.apply([], globs);
};
var dirGlobExports = dirGlob$1.exports;
const dirGlob = /* @__PURE__ */ getDefaultExportFromCjs(dirGlobExports);
function makeArray(subject) {
  return Array.isArray(subject) ? subject : [subject];
}
const EMPTY = "";
const SPACE = " ";
const ESCAPE = "\\";
const REGEX_TEST_BLANK_LINE = /^\s+$/;
const REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
const REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
const REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
const REGEX_SPLITALL_CRLF = /\r?\n/g;
const REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
const SLASH = "/";
let TMP_KEY_IGNORE = "node-ignore";
if (typeof Symbol !== "undefined") {
  TMP_KEY_IGNORE = Symbol.for("node-ignore");
}
const KEY_IGNORE = TMP_KEY_IGNORE;
const define = (object, key, value) => Object.defineProperty(object, key, { value });
const REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
const RETURN_FALSE = () => false;
const sanitizeRange = (range) => range.replace(
  REGEX_REGEXP_RANGE,
  (match2, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match2 : EMPTY
);
const cleanRangeBackSlash = (slashes) => {
  const { length } = slashes;
  return slashes.slice(0, length - length % 2);
};
const REPLACERS = [
  // > Trailing spaces are ignored unless they are quoted with backslash ("\")
  [
    // (a\ ) -> (a )
    // (a  ) -> (a)
    // (a \ ) -> (a  )
    /\\?\s+$/,
    (match2) => match2.indexOf("\\") === 0 ? SPACE : EMPTY
  ],
  // replace (\ ) with ' '
  [
    /\\\s/g,
    () => SPACE
  ],
  // Escape metacharacters
  // which is written down by users but means special for regular expressions.
  // > There are 12 characters with special meanings:
  // > - the backslash \,
  // > - the caret ^,
  // > - the dollar sign $,
  // > - the period or dot .,
  // > - the vertical bar or pipe symbol |,
  // > - the question mark ?,
  // > - the asterisk or star *,
  // > - the plus sign +,
  // > - the opening parenthesis (,
  // > - the closing parenthesis ),
  // > - and the opening square bracket [,
  // > - the opening curly brace {,
  // > These special characters are often called "metacharacters".
  [
    /[\\$.|*+(){^]/g,
    (match2) => `\\${match2}`
  ],
  [
    // > a question mark (?) matches a single character
    /(?!\\)\?/g,
    () => "[^/]"
  ],
  // leading slash
  [
    // > A leading slash matches the beginning of the pathname.
    // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
    // A leading slash matches the beginning of the pathname
    /^\//,
    () => "^"
  ],
  // replace special metacharacter slash after the leading slash
  [
    /\//g,
    () => "\\/"
  ],
  [
    // > A leading "**" followed by a slash means match in all directories.
    // > For example, "**/foo" matches file or directory "foo" anywhere,
    // > the same as pattern "foo".
    // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
    // >   under directory "foo".
    // Notice that the '*'s have been replaced as '\\*'
    /^\^*\\\*\\\*\\\//,
    // '**/foo' <-> 'foo'
    () => "^(?:.*\\/)?"
  ],
  // starting
  [
    // there will be no leading '/'
    //   (which has been replaced by section "leading slash")
    // If starts with '**', adding a '^' to the regular expression also works
    /^(?=[^^])/,
    function startingReplacer() {
      return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
    }
  ],
  // two globstars
  [
    // Use lookahead assertions so that we could match more than one `'/**'`
    /\\\/\\\*\\\*(?=\\\/|$)/g,
    // Zero, one or several directories
    // should not use '*', or it will be replaced by the next replacer
    // Check if it is not the last `'/**'`
    (_, index, str2) => index + 6 < str2.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
  ],
  // normal intermediate wildcards
  [
    // Never replace escaped '*'
    // ignore rule '\*' will match the path '*'
    // 'abc.*/' -> go
    // 'abc.*'  -> skip this rule,
    //    coz trailing single wildcard will be handed by [trailing wildcard]
    /(^|[^\\]+)(\\\*)+(?=.+)/g,
    // '*.js' matches '.js'
    // '*.js' doesn't match 'abc'
    (_, p1, p2) => {
      const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
      return p1 + unescaped;
    }
  ],
  [
    // unescape, revert step 3 except for back slash
    // For example, if a user escape a '\\*',
    // after step 3, the result will be '\\\\\\*'
    /\\\\\\(?=[$.|*+(){^])/g,
    () => ESCAPE
  ],
  [
    // '\\\\' -> '\\'
    /\\\\/g,
    () => ESCAPE
  ],
  [
    // > The range notation, e.g. [a-zA-Z],
    // > can be used to match one of the characters in a range.
    // `\` is escaped by step 3
    /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
    (match2, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
  ],
  // ending
  [
    // 'js' will not match 'js.'
    // 'ab' will not match 'abc'
    /(?:[^*])$/,
    // WTF!
    // https://git-scm.com/docs/gitignore
    // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
    // which re-fixes #24, #38
    // > If there is a separator at the end of the pattern then the pattern
    // > will only match directories, otherwise the pattern can match both
    // > files and directories.
    // 'js*' will not match 'a.js'
    // 'js/' will not match 'a.js'
    // 'js' will match 'a.js' and 'a.js/'
    (match2) => /\/$/.test(match2) ? `${match2}$` : `${match2}(?=$|\\/$)`
  ],
  // trailing wildcard
  [
    /(\^|\\\/)?\\\*$/,
    (_, p1) => {
      const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
      return `${prefix}(?=$|\\/$)`;
    }
  ]
];
const regexCache = /* @__PURE__ */ Object.create(null);
const makeRegex = (pattern2, ignoreCase) => {
  let source = regexCache[pattern2];
  if (!source) {
    source = REPLACERS.reduce(
      (prev, current) => prev.replace(current[0], current[1].bind(pattern2)),
      pattern2
    );
    regexCache[pattern2] = source;
  }
  return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
};
const isString = (subject) => typeof subject === "string";
const checkPattern = (pattern2) => pattern2 && isString(pattern2) && !REGEX_TEST_BLANK_LINE.test(pattern2) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern2) && pattern2.indexOf("#") !== 0;
const splitPattern = (pattern2) => pattern2.split(REGEX_SPLITALL_CRLF);
class IgnoreRule {
  constructor(origin, pattern2, negative, regex) {
    this.origin = origin;
    this.pattern = pattern2;
    this.negative = negative;
    this.regex = regex;
  }
}
const createRule = (pattern2, ignoreCase) => {
  const origin = pattern2;
  let negative = false;
  if (pattern2.indexOf("!") === 0) {
    negative = true;
    pattern2 = pattern2.substr(1);
  }
  pattern2 = pattern2.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
  const regex = makeRegex(pattern2, ignoreCase);
  return new IgnoreRule(
    origin,
    pattern2,
    negative,
    regex
  );
};
const throwError = (message, Ctor) => {
  throw new Ctor(message);
};
const checkPath = (path2, originalPath, doThrow) => {
  if (!isString(path2)) {
    return doThrow(
      `path must be a string, but got \`${originalPath}\``,
      TypeError
    );
  }
  if (!path2) {
    return doThrow(`path must not be empty`, TypeError);
  }
  if (checkPath.isNotRelative(path2)) {
    const r = "`path.relative()`d";
    return doThrow(
      `path should be a ${r} string, but got "${originalPath}"`,
      RangeError
    );
  }
  return true;
};
const isNotRelative = (path2) => REGEX_TEST_INVALID_PATH.test(path2);
checkPath.isNotRelative = isNotRelative;
checkPath.convert = (p) => p;
class Ignore {
  constructor({
    ignorecase = true,
    ignoreCase = ignorecase,
    allowRelativePaths = false
  } = {}) {
    define(this, KEY_IGNORE, true);
    this._rules = [];
    this._ignoreCase = ignoreCase;
    this._allowRelativePaths = allowRelativePaths;
    this._initCache();
  }
  _initCache() {
    this._ignoreCache = /* @__PURE__ */ Object.create(null);
    this._testCache = /* @__PURE__ */ Object.create(null);
  }
  _addPattern(pattern2) {
    if (pattern2 && pattern2[KEY_IGNORE]) {
      this._rules = this._rules.concat(pattern2._rules);
      this._added = true;
      return;
    }
    if (checkPattern(pattern2)) {
      const rule = createRule(pattern2, this._ignoreCase);
      this._added = true;
      this._rules.push(rule);
    }
  }
  // @param {Array<string> | string | Ignore} pattern
  add(pattern2) {
    this._added = false;
    makeArray(
      isString(pattern2) ? splitPattern(pattern2) : pattern2
    ).forEach(this._addPattern, this);
    if (this._added) {
      this._initCache();
    }
    return this;
  }
  // legacy
  addPattern(pattern2) {
    return this.add(pattern2);
  }
  //          |           ignored : unignored
  // negative |   0:0   |   0:1   |   1:0   |   1:1
  // -------- | ------- | ------- | ------- | --------
  //     0    |  TEST   |  TEST   |  SKIP   |    X
  //     1    |  TESTIF |  SKIP   |  TEST   |    X
  // - SKIP: always skip
  // - TEST: always test
  // - TESTIF: only test if checkUnignored
  // - X: that never happen
  // @param {boolean} whether should check if the path is unignored,
  //   setting `checkUnignored` to `false` could reduce additional
  //   path matching.
  // @returns {TestResult} true if a file is ignored
  _testOne(path2, checkUnignored) {
    let ignored = false;
    let unignored = false;
    this._rules.forEach((rule) => {
      const { negative } = rule;
      if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
        return;
      }
      const matched = rule.regex.test(path2);
      if (matched) {
        ignored = !negative;
        unignored = negative;
      }
    });
    return {
      ignored,
      unignored
    };
  }
  // @returns {TestResult}
  _test(originalPath, cache, checkUnignored, slices) {
    const path2 = originalPath && checkPath.convert(originalPath);
    checkPath(
      path2,
      originalPath,
      this._allowRelativePaths ? RETURN_FALSE : throwError
    );
    return this._t(path2, cache, checkUnignored, slices);
  }
  _t(path2, cache, checkUnignored, slices) {
    if (path2 in cache) {
      return cache[path2];
    }
    if (!slices) {
      slices = path2.split(SLASH);
    }
    slices.pop();
    if (!slices.length) {
      return cache[path2] = this._testOne(path2, checkUnignored);
    }
    const parent = this._t(
      slices.join(SLASH) + SLASH,
      cache,
      checkUnignored,
      slices
    );
    return cache[path2] = parent.ignored ? parent : this._testOne(path2, checkUnignored);
  }
  ignores(path2) {
    return this._test(path2, this._ignoreCache, false).ignored;
  }
  createFilter() {
    return (path2) => !this.ignores(path2);
  }
  filter(paths) {
    return makeArray(paths).filter(this.createFilter());
  }
  // @returns {TestResult}
  test(path2) {
    return this._test(path2, this._testCache, true);
  }
}
const factory = (options) => new Ignore(options);
const isPathValid = (path2) => checkPath(path2 && checkPath.convert(path2), path2, RETURN_FALSE);
factory.isPathValid = isPathValid;
factory.default = factory;
var ignore = factory;
if (
  // Detect `process` so that it can run in browsers.
  typeof process !== "undefined" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")
) {
  const makePosix = (str2) => /^\\\\\?\\/.test(str2) || /["<>|\u0000-\u001F]+/u.test(str2) ? str2 : str2.replace(/\\/g, "/");
  checkPath.convert = makePosix;
  const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
  checkPath.isNotRelative = (path2) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path2) || isNotRelative(path2);
}
const gitIgnore = /* @__PURE__ */ getDefaultExportFromCjs(ignore);
function slash(path2) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path2);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path2);
  if (isExtendedLengthPath || hasNonAscii) {
    return path2;
  }
  return path2.replace(/\\/g, "/");
}
const toPath = (urlOrPath) => urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;
const isNegativePattern = (pattern2) => pattern2[0] === "!";
const ignoreFilesGlobOptions = {
  ignore: [
    "**/node_modules",
    "**/flow-typed",
    "**/coverage",
    "**/.git"
  ],
  absolute: true,
  dot: true
};
const GITIGNORE_FILES_PATTERN = "**/.gitignore";
const applyBaseToPattern = (pattern2, base) => isNegativePattern(pattern2) ? "!" + path$d.posix.join(base, pattern2.slice(1)) : path$d.posix.join(base, pattern2);
const parseIgnoreFile = (file, cwd) => {
  const base = slash(path$d.relative(cwd, path$d.dirname(file.filePath)));
  return file.content.split(/\r?\n/).filter((line) => line && !line.startsWith("#")).map((pattern2) => applyBaseToPattern(pattern2, base));
};
const toRelativePath = (fileOrDirectory, cwd) => {
  cwd = slash(cwd);
  if (path$d.isAbsolute(fileOrDirectory)) {
    if (slash(fileOrDirectory).startsWith(cwd)) {
      return path$d.relative(cwd, fileOrDirectory);
    }
    throw new Error(`Path ${fileOrDirectory} is not in cwd ${cwd}`);
  }
  return fileOrDirectory;
};
const getIsIgnoredPredicate = (files, cwd) => {
  const patterns = files.flatMap((file) => parseIgnoreFile(file, cwd));
  const ignores = gitIgnore().add(patterns);
  return (fileOrDirectory) => {
    fileOrDirectory = toPath(fileOrDirectory);
    fileOrDirectory = toRelativePath(fileOrDirectory, cwd);
    return fileOrDirectory ? ignores.ignores(slash(fileOrDirectory)) : false;
  };
};
const normalizeOptions$1 = (options = {}) => ({
  cwd: toPath(options.cwd) || process$1.cwd(),
  suppressErrors: Boolean(options.suppressErrors),
  deep: typeof options.deep === "number" ? options.deep : Number.POSITIVE_INFINITY
});
const isIgnoredByIgnoreFiles = async (patterns, options) => {
  const { cwd, suppressErrors, deep: deep2 } = normalizeOptions$1(options);
  const paths = await fastGlob(patterns, { cwd, suppressErrors, deep: deep2, ...ignoreFilesGlobOptions });
  const files = await Promise.all(
    paths.map(async (filePath) => ({
      filePath,
      content: await fs$a.promises.readFile(filePath, "utf8")
    }))
  );
  return getIsIgnoredPredicate(files, cwd);
};
const assertPatternsInput = (patterns) => {
  if (patterns.some((pattern2) => typeof pattern2 !== "string")) {
    throw new TypeError("Patterns must be a string or an array of strings");
  }
};
const toPatternsArray = (patterns) => {
  patterns = [...new Set([patterns].flat())];
  assertPatternsInput(patterns);
  return patterns;
};
const checkCwdOption = (options) => {
  if (!options.cwd) {
    return;
  }
  let stat2;
  try {
    stat2 = fs$a.statSync(options.cwd);
  } catch {
    return;
  }
  if (!stat2.isDirectory()) {
    throw new Error("The `cwd` option must be a path to a directory");
  }
};
const normalizeOptions = (options = {}) => {
  options = {
    ...options,
    ignore: options.ignore || [],
    expandDirectories: options.expandDirectories === void 0 ? true : options.expandDirectories,
    cwd: toPath(options.cwd)
  };
  checkCwdOption(options);
  return options;
};
const normalizeArguments = (fn) => async (patterns, options) => fn(toPatternsArray(patterns), normalizeOptions(options));
const getIgnoreFilesPatterns = (options) => {
  const { ignoreFiles, gitignore } = options;
  const patterns = ignoreFiles ? toPatternsArray(ignoreFiles) : [];
  if (gitignore) {
    patterns.push(GITIGNORE_FILES_PATTERN);
  }
  return patterns;
};
const getFilter = async (options) => {
  const ignoreFilesPatterns = getIgnoreFilesPatterns(options);
  return createFilterFunction(
    ignoreFilesPatterns.length > 0 && await isIgnoredByIgnoreFiles(ignoreFilesPatterns, options)
  );
};
const createFilterFunction = (isIgnored) => {
  const seen = /* @__PURE__ */ new Set();
  return (fastGlobResult) => {
    const path2 = fastGlobResult.path || fastGlobResult;
    const pathKey = path$d.normalize(path2);
    const seenOrIgnored = seen.has(pathKey) || isIgnored && isIgnored(path2);
    seen.add(pathKey);
    return !seenOrIgnored;
  };
};
const unionFastGlobResults = (results, filter) => results.flat().filter((fastGlobResult) => filter(fastGlobResult));
const convertNegativePatterns = (patterns, options) => {
  const tasks2 = [];
  while (patterns.length > 0) {
    const index = patterns.findIndex((pattern2) => isNegativePattern(pattern2));
    if (index === -1) {
      tasks2.push({ patterns, options });
      break;
    }
    const ignorePattern = patterns[index].slice(1);
    for (const task of tasks2) {
      task.options.ignore.push(ignorePattern);
    }
    if (index !== 0) {
      tasks2.push({
        patterns: patterns.slice(0, index),
        options: {
          ...options,
          ignore: [
            ...options.ignore,
            ignorePattern
          ]
        }
      });
    }
    patterns = patterns.slice(index + 1);
  }
  return tasks2;
};
const getDirGlobOptions = (options, cwd) => ({
  ...cwd ? { cwd } : {},
  ...Array.isArray(options) ? { files: options } : options
});
const generateTasks = async (patterns, options) => {
  const globTasks = convertNegativePatterns(patterns, options);
  const { cwd, expandDirectories } = options;
  if (!expandDirectories) {
    return globTasks;
  }
  const patternExpandOptions = getDirGlobOptions(expandDirectories, cwd);
  const ignoreExpandOptions = cwd ? { cwd } : void 0;
  return Promise.all(
    globTasks.map(async (task) => {
      let { patterns: patterns2, options: options2 } = task;
      [
        patterns2,
        options2.ignore
      ] = await Promise.all([
        dirGlob(patterns2, patternExpandOptions),
        dirGlob(options2.ignore, ignoreExpandOptions)
      ]);
      return { patterns: patterns2, options: options2 };
    })
  );
};
const globby = normalizeArguments(async (patterns, options) => {
  const [
    tasks2,
    filter
  ] = await Promise.all([
    generateTasks(patterns, options),
    getFilter(options)
  ]);
  const results = await Promise.all(tasks2.map((task) => fastGlob(task.patterns, task.options)));
  return unionFastGlobResults(results, filter);
});
const PACKAGE_JSON_NAME = "package.json";
const PNPM_WORKSPACE_FILE_NAME = "pnpm-workspace.yaml";
const NODE_MODULES_DIRECTORY_NAME = "node_modules";
const normalizeGetRootPackageJsonOptions = (options) => {
  return {
    ...normalizeCwdOption(options),
    ...normalizeLoggerOption(options)
  };
};
const collectPackageJsonPathsUpDirectoryTree = (cwd = process.cwd()) => {
  return collectPackageJsonPathsUpDirectoryTreeInternal(cwd);
};
const collectPackageJsonPathsUpDirectoryTreeInternal = (cwd, collection = []) => {
  const path2 = normalize(cwd);
  if (existsSync(join(path2, PACKAGE_JSON_NAME))) {
    collection.unshift(path2);
  }
  const parentPath = join(path2, "..");
  if (parentPath !== path2) {
    return collectPackageJsonPathsUpDirectoryTreeInternal(parentPath, collection);
  }
  return collection;
};
const getWorkspaceRoot = (cwd = process.cwd()) => {
  return collectPackageJsonPathsUpDirectoryTree(cwd)[0];
};
const normalizePackageJsonWorkspacesField = (packageJsonWorkspaces) => {
  if (Array.isArray(packageJsonWorkspaces)) {
    return packageJsonWorkspaces;
  } else if (packageJsonWorkspaces) {
    return [
      ...packageJsonWorkspaces.packages ?? [],
      ...packageJsonWorkspaces.nohoist ?? []
    ];
  } else {
    return [];
  }
};
const getRootPackageJson = async (rawOptions) => {
  const options = normalizeGetRootPackageJsonOptions(rawOptions);
  const rootWorkspace = getWorkspaceRoot(options.cwd);
  if (!rootWorkspace) {
    options.logger.error("No package json was found! Cannot collect workspace packages!");
    return void 0;
  }
  const packageJsonPath = join(rootWorkspace, PACKAGE_JSON_NAME);
  const packageJson = await readJson(packageJsonPath).catch(() => void 0);
  if (!packageJson) {
    options.logger.error("Failed to read packageJson!", packageJsonPath);
    return void 0;
  }
  let workspaces = normalizePackageJsonWorkspacesField(packageJson.workspaces);
  const pnpmWorkspace = await readYaml(
    join(rootWorkspace, PNPM_WORKSPACE_FILE_NAME)
  );
  if (pnpmWorkspace?.packages) {
    workspaces = [...workspaces, ...pnpmWorkspace.packages];
  }
  return {
    packageJson,
    packageKind: "root",
    workspacePackagePatterns: workspaces,
    packageJsonPath,
    packagePath: rootWorkspace,
    packagePathFromRootPackage: "."
  };
};
const normalizeCollectWorkspacePackagesOptions = (options) => {
  return {
    ...normalizeGetRootPackageJsonOptions(options),
    onlyWorkspaceRoot: options?.onlyWorkspaceRoot ?? false,
    skipWorkspaceRoot: options?.skipWorkspaceRoot ?? false,
    dependencyCriteria: options?.dependencyCriteria?.map(normalizeRegExpLikeToRegExp) ?? [],
    packageJsonMatcher: options?.packageJsonMatcher
  };
};
const collectWorkspacePackages = async (rawOptions) => {
  const options = normalizeCollectWorkspacePackagesOptions(rawOptions);
  const rootPackage = await getRootPackageJson(options);
  if (!rootPackage) {
    options.logger.error("No package json was found! Cannot collect workspace packages!");
    return [];
  }
  let result = [];
  if (rootPackage.workspacePackagePatterns.length > 0) {
    const paths = await globby(rootPackage.workspacePackagePatterns, {
      gitignore: true,
      onlyDirectories: true,
      ignore: [NODE_MODULES_DIRECTORY_NAME],
      absolute: true,
      cwd: rootPackage.packagePath
    });
    const subPackages = await asyncFilterMap(paths, (path2) => {
      const packageJsonPath = join(path2, PACKAGE_JSON_NAME);
      return readJson(packageJsonPath).catch(() => void 0).then(
        (packageJson) => packageJson ? {
          packageKind: "regular",
          packageJson,
          packagePath: path2,
          packagePathFromRootPackage: relative(rootPackage.packagePath, path2),
          packageJsonPath
        } : void 0
      );
    });
    if (!options.onlyWorkspaceRoot) {
      result.push(...subPackages);
    }
  }
  if (!options.skipWorkspaceRoot || rootPackage.workspacePackagePatterns.length === 0) {
    result.unshift(rootPackage);
  }
  if (options.packageJsonMatcher) {
    result = result.filter(
      (relativePackage) => match(relativePackage.packageJson, options.packageJsonMatcher)
    );
  }
  if (options.dependencyCriteria.length > 0) {
    result = result.filter((relativePackage) => {
      const packageDependencies = [
        ...Object.keys(relativePackage.packageJson.dependencies ?? {}),
        ...Object.keys(relativePackage.packageJson.devDependencies ?? {})
      ];
      return options.dependencyCriteria.every(
        (dependencyCriteria) => packageDependencies.some((dependency) => dependencyCriteria.test(dependency))
      );
    });
  }
  return result;
};
const getPackageJsonTemplateVariables = (packageJson) => {
  const packageName = packageJson.name ?? "";
  let packageOrg;
  let packageNameWithoutOrg = packageName;
  if (packageName.includes("/")) {
    const [splitPackageOrg, ...splitPackageName] = packageName.split("/");
    packageOrg = splitPackageOrg;
    packageNameWithoutOrg = splitPackageName.join("/");
  }
  return {
    packageOrg: packageOrg ?? "",
    packageName,
    packageNameWithoutOrg
  };
};
var MersenneTwister$1 = function(seed) {
  if (seed == void 0) {
    seed = (/* @__PURE__ */ new Date()).getTime();
  }
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 2567483615;
  this.UPPER_MASK = 2147483648;
  this.LOWER_MASK = 2147483647;
  this.mt = new Array(this.N);
  this.mti = this.N + 1;
  if (seed.constructor == Array) {
    this.init_by_array(seed, seed.length);
  } else {
    this.init_seed(seed);
  }
};
MersenneTwister$1.prototype.init_seed = function(s) {
  this.mt[0] = s >>> 0;
  for (this.mti = 1; this.mti < this.N; this.mti++) {
    var s = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
    this.mt[this.mti] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this.mti;
    this.mt[this.mti] >>>= 0;
  }
};
MersenneTwister$1.prototype.init_by_array = function(init_key, key_length) {
  var i, j, k;
  this.init_seed(19650218);
  i = 1;
  j = 0;
  k = this.N > key_length ? this.N : key_length;
  for (; k; k--) {
    var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
    this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + init_key[j] + j;
    this.mt[i] >>>= 0;
    i++;
    j++;
    if (i >= this.N) {
      this.mt[0] = this.mt[this.N - 1];
      i = 1;
    }
    if (j >= key_length)
      j = 0;
  }
  for (k = this.N - 1; k; k--) {
    var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
    this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - i;
    this.mt[i] >>>= 0;
    i++;
    if (i >= this.N) {
      this.mt[0] = this.mt[this.N - 1];
      i = 1;
    }
  }
  this.mt[0] = 2147483648;
};
MersenneTwister$1.prototype.random_int = function() {
  var y;
  var mag01 = new Array(0, this.MATRIX_A);
  if (this.mti >= this.N) {
    var kk;
    if (this.mti == this.N + 1)
      this.init_seed(5489);
    for (kk = 0; kk < this.N - this.M; kk++) {
      y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
      this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 1];
    }
    for (; kk < this.N - 1; kk++) {
      y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
      this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 1];
    }
    y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
    this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 1];
    this.mti = 0;
  }
  y = this.mt[this.mti++];
  y ^= y >>> 11;
  y ^= y << 7 & 2636928640;
  y ^= y << 15 & 4022730752;
  y ^= y >>> 18;
  return y >>> 0;
};
MersenneTwister$1.prototype.random_int31 = function() {
  return this.random_int() >>> 1;
};
MersenneTwister$1.prototype.random_incl = function() {
  return this.random_int() * (1 / 4294967295);
};
MersenneTwister$1.prototype.random = function() {
  return this.random_int() * (1 / 4294967296);
};
MersenneTwister$1.prototype.random_excl = function() {
  return (this.random_int() + 0.5) * (1 / 4294967296);
};
MersenneTwister$1.prototype.random_long = function() {
  var a = this.random_int() >>> 5, b = this.random_int() >>> 6;
  return (a * 67108864 + b) * (1 / 9007199254740992);
};
var mersenneTwister = MersenneTwister$1;
var MersenneTwister = mersenneTwister;
var twister = new MersenneTwister(Math.random() * Number.MAX_SAFE_INTEGER);
var polyfillCrypto_getrandomvalues = getRandomValues;
function getRandomValues(abv) {
  var l = abv.length;
  while (l--) {
    abv[l] = Math.floor(randomFloat() * 256);
  }
  return abv;
}
function randomFloat() {
  return twister.random();
}
const randomPoly = /* @__PURE__ */ getDefaultExportFromCjs(polyfillCrypto_getrandomvalues);
try {
  globalThis.crypto = {
    getRandomValues: randomPoly
  };
} catch {
  console.log("cant polyfill getRandomValues");
}
class PackageCheckError extends Error {
  workspacePackage;
  constructor(reason) {
    super(reason.message);
    this.workspacePackage = reason.workspacePackage;
  }
}
const getPackageMetadata = async (workspacePackage, registry) => {
  let registryArgument = "";
  if (registry) {
    registryArgument = ` --registry ${registry}`;
  }
  const packageName = workspacePackage.packageJson.name;
  const packageVersion = workspacePackage.packageJson.version;
  if (!packageName && !packageVersion) {
    throw new PackageCheckError({
      workspacePackage,
      message: `both name and version fields are empty in package.json at ${workspacePackage.packagePath}`
    });
  } else if (!packageName) {
    throw new PackageCheckError({
      workspacePackage,
      message: `name field is empty in package.json at ${workspacePackage.packagePath}`
    });
  } else if (!packageVersion) {
    throw new PackageCheckError({
      workspacePackage,
      message: `version field is empty in package.json at ${workspacePackage.packagePath}`
    });
  }
  const variables = getPackageJsonTemplateVariables(workspacePackage.packageJson);
  let code;
  try {
    code = await exec_2(`npm view ${packageName}@${packageVersion}${registryArgument}`);
  } catch {
    code = 1;
  }
  return {
    packageName,
    packageVersion,
    packageNameOnlyOrg: variables.packageOrg,
    packageNameWithoutOrg: variables.packageNameWithoutOrg,
    packagePathFromRootPackage: workspacePackage.packagePathFromRootPackage,
    isPublished: code === 0
  };
};
const changeShallowCasingFromCamelToSnake = (o) => {
  return Object.fromEntries(
    Object.entries(o).map(([key, value]) => [
      key.replaceAll(/[A-Z]/g, (c) => {
        return "_" + c.toLowerCase();
      }),
      value
    ])
  );
};
void (async () => {
  const registryOption = coreExports.getInput("registry");
  coreExports.info("start package collection with the following options:");
  coreExports.info(`- registry: ${registryOption}`);
  try {
    let workspacePackages = await collectWorkspacePackages({
      skipWorkspaceRoot: true,
      // Will let single package repos through, in monorepos, you don't want to publish the workspace itself
      packageJsonMatcher: {
        private: false
        // A package is public when its explicitly not private.
      }
    });
    workspacePackages = workspacePackages.filter((pkg) => !!pkg.packageJson.name);
    coreExports.startGroup("npm output:");
    const packagePublishInformation = await Promise.allSettled(
      workspacePackages.map(
        (workspacePackage) => getPackageMetadata(workspacePackage, registryOption)
      )
    );
    coreExports.endGroup();
    const rejectedChecks = packagePublishInformation.filter(
      (result) => result.status === "rejected"
    );
    if (rejectedChecks.length > 0) {
      coreExports.error("failed to view the following package versions in the npm registry");
      for (const rejection of rejectedChecks) {
        coreExports.error(rejection.reason.message);
      }
    }
    const fulfilledChecks = packagePublishInformation.filter(
      (result) => result.status === "fulfilled"
    );
    const alreadyPublishedPackages = fulfilledChecks.filter((result) => result.value.isPublished).map((result) => result.value);
    const nonPublishedPackages = fulfilledChecks.filter((result) => !result.value.isPublished).map((result) => result.value);
    if (workspacePackages.length > 0) {
      coreExports.startGroup("packages found:");
      for (const publicWorkspacePackage of workspacePackages) {
        coreExports.info(publicWorkspacePackage.packageJson.name);
      }
      coreExports.endGroup();
      coreExports.setOutput(
        "packages",
        fulfilledChecks.map((result) => changeShallowCasingFromCamelToSnake(result.value))
      );
      const publicPackageNames = workspacePackages.map(
        (workspacePackage) => workspacePackage.packageJson.name
      );
      coreExports.setOutput("public_package_names", publicPackageNames);
      if (alreadyPublishedPackages.length > 0) {
        coreExports.startGroup("already_published_packages found:");
        for (const result of alreadyPublishedPackages) {
          coreExports.info(`${result.packageName}@${result.packageVersion}`);
        }
        coreExports.endGroup();
        coreExports.setOutput(
          "already_published_packages",
          alreadyPublishedPackages.map(
            (result) => changeShallowCasingFromCamelToSnake(result)
          )
        );
        coreExports.setOutput(
          "already_published_package_names",
          alreadyPublishedPackages.map((pkg) => pkg.packageName)
        );
      } else {
        coreExports.info("no already_published_packages were found!");
      }
      if (nonPublishedPackages.length > 0) {
        coreExports.startGroup("non_published_packages found:");
        for (const result of nonPublishedPackages) {
          coreExports.info(`${result.packageName}@${result.packageVersion}`);
        }
        coreExports.endGroup();
        coreExports.setOutput(
          "non_published_packages",
          nonPublishedPackages.map(
            (result) => changeShallowCasingFromCamelToSnake(result)
          )
        );
        coreExports.setOutput(
          "non_published_package_names",
          nonPublishedPackages.map((pkg) => pkg.packageName)
        );
      } else {
        coreExports.info("no non_published_packages were found!");
      }
    } else {
      coreExports.info("no packages found within this repository!");
    }
  } catch (error_) {
    if (error_ instanceof Error) {
      coreExports.setFailed("error happened while interpreting the workspace: " + error_.message);
    } else {
      coreExports.setFailed("unknown error happened while interpreting the workspace!");
    }
  }
})();
export {
  getPackageMetadata
};
