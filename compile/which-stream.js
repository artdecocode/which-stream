#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');             
const {Writable:m} = stream;
const n = (a, c = 0, d = !1) => {
  if (0 === c && !d) {
    return a;
  }
  a = a.split("\n", d ? c + 1 : void 0);
  return d ? a[a.length - 1] : a.slice(c).join("\n");
}, p = (a, c = !1) => n(a, 2 + (c ? 1 : 0)), q = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:r} = os;
const t = /\s+at.*(?:\(|\s)(.*)\)?/, u = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, v = r(), w = a => {
  const {pretty:c = !1, ignoredModules:d = ["pirates"]} = {}, e = new RegExp(u.source.replace("IGNORED_MODULES", d.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(b => {
    b = b.match(t);
    if (null === b || !b[1]) {
      return !0;
    }
    b = b[1];
    return b.includes(".app/Contents/Resources/electron.asar") || b.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(b);
  }).filter(b => b.trim()).map(b => c ? b.replace(t, (f, h) => f.replace(h, h.replace(v, "~"))) : b).join("\n");
};
function x(a, c, d = !1) {
  return function(e) {
    var b = q(arguments), {stack:f} = Error();
    const h = n(f, 2, !0), k = (f = e instanceof Error) ? e.message : e;
    b = [`Error: ${k}`, ...null !== b && a === b || d ? [c] : [h, c]].join("\n");
    b = w(b);
    return Object.assign(f ? e : Error(), {message:k, stack:b});
  };
}
;function y(a) {
  var {stack:c} = Error();
  const d = q(arguments);
  c = p(c, a);
  return x(d, c, a);
}
;const z = (a, c) => {
  c.once("error", d => {
    a.emit("error", d);
  });
  return c;
};
class A extends m {
  constructor(a) {
    const {binary:c = !1, rs:d = null, ...e} = a || {}, {f:b = y(!0), proxyError:f} = a || {}, h = (k, l) => b(l);
    super(e);
    this.a = [];
    this.b = new Promise((k, l) => {
      this.on("finish", () => {
        let g;
        c ? g = Buffer.concat(this.a) : g = this.a.join("");
        k(g);
        this.a = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          h`${g}`;
        } else {
          const C = w(g.stack);
          g.stack = C;
          f && h`${g}`;
        }
        l(g);
      });
      d && z(this, d).pipe(this);
    });
  }
  _write(a, c, d) {
    this.a.push(a);
    d();
  }
  get c() {
    return this.b;
  }
}
;const {createReadStream:B, createWriteStream:D} = fs;
const E = async(a, c, d) => {
  if (c.path == a || d == a) {
    ({c:d} = new A({rs:c}));
    const e = await d;
    await new Promise((b, f) => {
      D(a).once("error", f).end(e, b);
    });
  } else {
    await new Promise((e, b) => {
      const f = D(a);
      c.pipe(f);
      f.once("error", b).on("close", e);
    });
  }
};
module.exports = async function(a) {
  const {source:c, destination:d} = a;
  let {readable:e, writable:b} = a;
  if (!c && !e) {
    throw Error("Please give either a source or readable.");
  }
  if (!d && !b) {
    throw Error("Please give either a destination or writable.");
  }
  c && !e && (e = B(c));
  "-" == d ? e.pipe(process.stdout) : d ? await E(d, e, c) : b instanceof m && (e.pipe(b), await new Promise((f, h) => {
    b.on("error", h);
    b.on("finish", f);
  }));
};


//# sourceMappingURL=which-stream.js.map