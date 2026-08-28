import { ipcMain as Ye, app as $t, BrowserWindow as En } from "electron";
import { createRequire as qa } from "node:module";
import { fileURLToPath as za } from "node:url";
import Se from "node:path";
import Jt from "http";
import Vs from "fs";
import Qt from "zlib";
import Hs from "path";
import Qe from "stream";
import ct from "crypto";
import Te from "events";
import kn from "tty";
import Sn from "util";
import Cn from "os";
import Wa from "querystring";
import Va from "timers";
import Ha from "https";
import Ga from "net";
import Ka from "tls";
import Ya from "url";
import Ja from "buffer";
var z = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qa(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function Xa(i) {
  if (i.__esModule) return i;
  var e = i.default;
  if (typeof e == "function") {
    var t = function s() {
      return this instanceof s ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(i).forEach(function(s) {
    var n = Object.getOwnPropertyDescriptor(i, s);
    Object.defineProperty(t, s, n.get ? n : {
      enumerable: !0,
      get: function() {
        return i[s];
      }
    });
  }), t;
}
var Bs = { exports: {} }, Gs = { exports: {} }, Ks = { exports: {} };
Ks.exports = Tn;
Ks.exports.preferredCharsets = Tn;
var Za = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function eo(i) {
  for (var e = i.split(","), t = 0, s = 0; t < e.length; t++) {
    var n = to(e[t].trim(), t);
    n && (e[s++] = n);
  }
  return e.length = s, e;
}
function to(i, e) {
  var t = Za.exec(i);
  if (!t) return null;
  var s = t[1], n = 1;
  if (t[2])
    for (var a = t[2].split(";"), o = 0; o < a.length; o++) {
      var r = a[o].trim().split("=");
      if (r[0] === "q") {
        n = parseFloat(r[1]);
        break;
      }
    }
  return {
    charset: s,
    q: n,
    i: e
  };
}
function so(i, e, t) {
  for (var s = { o: -1, q: 0, s: 0 }, n = 0; n < e.length; n++) {
    var a = io(i, e[n], t);
    a && (s.s - a.s || s.q - a.q || s.o - a.o) < 0 && (s = a);
  }
  return s;
}
function io(i, e, t) {
  var s = 0;
  if (e.charset.toLowerCase() === i.toLowerCase())
    s |= 1;
  else if (e.charset !== "*")
    return null;
  return {
    i: t,
    o: e.i,
    q: e.q,
    s
  };
}
function Tn(i, e) {
  var t = eo(i === void 0 ? "*" : i || "");
  if (!e)
    return t.filter(ri).sort(oi).map(no);
  var s = e.map(function(a, o) {
    return so(a, t, o);
  });
  return s.filter(ri).sort(oi).map(function(a) {
    return e[s.indexOf(a)];
  });
}
function oi(i, e) {
  return e.q - i.q || e.s - i.s || i.o - e.o || i.i - e.i || 0;
}
function no(i) {
  return i.charset;
}
function ri(i) {
  return i.q > 0;
}
var ao = Ks.exports, Ys = { exports: {} };
Ys.exports = Rn;
Ys.exports.preferredEncodings = Rn;
var oo = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function ro(i) {
  for (var e = i.split(","), t = !1, s = 1, n = 0, a = 0; n < e.length; n++) {
    var o = co(e[n].trim(), n);
    o && (e[a++] = o, t = t || On("identity", o), s = Math.min(s, o.q || 1));
  }
  return t || (e[a++] = {
    encoding: "identity",
    q: s,
    i: n
  }), e.length = a, e;
}
function co(i, e) {
  var t = oo.exec(i);
  if (!t) return null;
  var s = t[1], n = 1;
  if (t[2])
    for (var a = t[2].split(";"), o = 0; o < a.length; o++) {
      var r = a[o].trim().split("=");
      if (r[0] === "q") {
        n = parseFloat(r[1]);
        break;
      }
    }
  return {
    encoding: s,
    q: n,
    i: e
  };
}
function po(i, e, t) {
  for (var s = { o: -1, q: 0, s: 0 }, n = 0; n < e.length; n++) {
    var a = On(i, e[n], t);
    a && (s.s - a.s || s.q - a.q || s.o - a.o) < 0 && (s = a);
  }
  return s;
}
function On(i, e, t) {
  var s = 0;
  if (e.encoding.toLowerCase() === i.toLowerCase())
    s |= 1;
  else if (e.encoding !== "*")
    return null;
  return {
    i: t,
    o: e.i,
    q: e.q,
    s
  };
}
function Rn(i, e) {
  var t = ro(i || "");
  if (!e)
    return t.filter(pi).sort(ci).map(lo);
  var s = e.map(function(a, o) {
    return po(a, t, o);
  });
  return s.filter(pi).sort(ci).map(function(a) {
    return e[s.indexOf(a)];
  });
}
function ci(i, e) {
  return e.q - i.q || e.s - i.s || i.o - e.o || i.i - e.i || 0;
}
function lo(i) {
  return i.encoding;
}
function pi(i) {
  return i.q > 0;
}
var uo = Ys.exports, Js = { exports: {} };
Js.exports = Pn;
Js.exports.preferredLanguages = Pn;
var mo = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function fo(i) {
  for (var e = i.split(","), t = 0, s = 0; t < e.length; t++) {
    var n = An(e[t].trim(), t);
    n && (e[s++] = n);
  }
  return e.length = s, e;
}
function An(i, e) {
  var t = mo.exec(i);
  if (!t) return null;
  var s = t[1], n = t[2], a = s;
  n && (a += "-" + n);
  var o = 1;
  if (t[3])
    for (var r = t[3].split(";"), p = 0; p < r.length; p++) {
      var c = r[p].split("=");
      c[0] === "q" && (o = parseFloat(c[1]));
    }
  return {
    prefix: s,
    suffix: n,
    q: o,
    i: e,
    full: a
  };
}
function ho(i, e, t) {
  for (var s = { o: -1, q: 0, s: 0 }, n = 0; n < e.length; n++) {
    var a = vo(i, e[n], t);
    a && (s.s - a.s || s.q - a.q || s.o - a.o) < 0 && (s = a);
  }
  return s;
}
function vo(i, e, t) {
  var s = An(i);
  if (!s) return null;
  var n = 0;
  if (e.full.toLowerCase() === s.full.toLowerCase())
    n |= 4;
  else if (e.prefix.toLowerCase() === s.full.toLowerCase())
    n |= 2;
  else if (e.full.toLowerCase() === s.prefix.toLowerCase())
    n |= 1;
  else if (e.full !== "*")
    return null;
  return {
    i: t,
    o: e.i,
    q: e.q,
    s: n
  };
}
function Pn(i, e) {
  var t = fo(i === void 0 ? "*" : i || "");
  if (!e)
    return t.filter(ui).sort(li).map(xo);
  var s = e.map(function(a, o) {
    return ho(a, t, o);
  });
  return s.filter(ui).sort(li).map(function(a) {
    return e[s.indexOf(a)];
  });
}
function li(i, e) {
  return e.q - i.q || e.s - i.s || i.o - e.o || i.i - e.i || 0;
}
function xo(i) {
  return i.full;
}
function ui(i) {
  return i.q > 0;
}
var go = Js.exports, Qs = { exports: {} };
Qs.exports = Nn;
Qs.exports.preferredMediaTypes = Nn;
var bo = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function yo(i) {
  for (var e = So(i), t = 0, s = 0; t < e.length; t++) {
    var n = jn(e[t].trim(), t);
    n && (e[s++] = n);
  }
  return e.length = s, e;
}
function jn(i, e) {
  var t = bo.exec(i);
  if (!t) return null;
  var s = /* @__PURE__ */ Object.create(null), n = 1, a = t[2], o = t[1];
  if (t[3])
    for (var r = Co(t[3]).map(ko), p = 0; p < r.length; p++) {
      var c = r[p], u = c[0].toLowerCase(), l = c[1], d = l && l[0] === '"' && l[l.length - 1] === '"' ? l.substr(1, l.length - 2) : l;
      if (u === "q") {
        n = parseFloat(d);
        break;
      }
      s[u] = d;
    }
  return {
    type: o,
    subtype: a,
    params: s,
    q: n,
    i: e
  };
}
function _o(i, e, t) {
  for (var s = { o: -1, q: 0, s: 0 }, n = 0; n < e.length; n++) {
    var a = wo(i, e[n], t);
    a && (s.s - a.s || s.q - a.q || s.o - a.o) < 0 && (s = a);
  }
  return s;
}
function wo(i, e, t) {
  var s = jn(i), n = 0;
  if (!s)
    return null;
  if (e.type.toLowerCase() == s.type.toLowerCase())
    n |= 4;
  else if (e.type != "*")
    return null;
  if (e.subtype.toLowerCase() == s.subtype.toLowerCase())
    n |= 2;
  else if (e.subtype != "*")
    return null;
  var a = Object.keys(e.params);
  if (a.length > 0)
    if (a.every(function(o) {
      return e.params[o] == "*" || (e.params[o] || "").toLowerCase() == (s.params[o] || "").toLowerCase();
    }))
      n |= 1;
    else
      return null;
  return {
    i: t,
    o: e.i,
    q: e.q,
    s: n
  };
}
function Nn(i, e) {
  var t = yo(i === void 0 ? "*/*" : i || "");
  if (!e)
    return t.filter(mi).sort(di).map(Eo);
  var s = e.map(function(a, o) {
    return _o(a, t, o);
  });
  return s.filter(mi).sort(di).map(function(a) {
    return e[s.indexOf(a)];
  });
}
function di(i, e) {
  return e.q - i.q || e.s - i.s || i.o - e.o || i.i - e.i || 0;
}
function Eo(i) {
  return i.type + "/" + i.subtype;
}
function mi(i) {
  return i.q > 0;
}
function Bn(i) {
  for (var e = 0, t = 0; (t = i.indexOf('"', t)) !== -1; )
    e++, t++;
  return e;
}
function ko(i) {
  var e = i.indexOf("="), t, s;
  return e === -1 ? t = i : (t = i.substr(0, e), s = i.substr(e + 1)), [t, s];
}
function So(i) {
  for (var e = i.split(","), t = 1, s = 0; t < e.length; t++)
    Bn(e[s]) % 2 == 0 ? e[++s] = e[t] : e[s] += "," + e[t];
  return e.length = s + 1, e;
}
function Co(i) {
  for (var e = i.split(";"), t = 1, s = 0; t < e.length; t++)
    Bn(e[s]) % 2 == 0 ? e[++s] = e[t] : e[s] += ";" + e[t];
  e.length = s + 1;
  for (var t = 0; t < e.length; t++)
    e[t] = e[t].trim();
  return e;
}
var To = Qs.exports;
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Oo = ao, Ro = uo, Ao = go, Po = To;
Gs.exports = F;
Gs.exports.Negotiator = F;
function F(i) {
  if (!(this instanceof F))
    return new F(i);
  this.request = i;
}
F.prototype.charset = function(e) {
  var t = this.charsets(e);
  return t && t[0];
};
F.prototype.charsets = function(e) {
  return Oo(this.request.headers["accept-charset"], e);
};
F.prototype.encoding = function(e) {
  var t = this.encodings(e);
  return t && t[0];
};
F.prototype.encodings = function(e) {
  return Ro(this.request.headers["accept-encoding"], e);
};
F.prototype.language = function(e) {
  var t = this.languages(e);
  return t && t[0];
};
F.prototype.languages = function(e) {
  return Ao(this.request.headers["accept-language"], e);
};
F.prototype.mediaType = function(e) {
  var t = this.mediaTypes(e);
  return t && t[0];
};
F.prototype.mediaTypes = function(e) {
  return Po(this.request.headers.accept, e);
};
F.prototype.preferredCharset = F.prototype.charset;
F.prototype.preferredCharsets = F.prototype.charsets;
F.prototype.preferredEncoding = F.prototype.encoding;
F.prototype.preferredEncodings = F.prototype.encodings;
F.prototype.preferredLanguage = F.prototype.language;
F.prototype.preferredLanguages = F.prototype.languages;
F.prototype.preferredMediaType = F.prototype.mediaType;
F.prototype.preferredMediaTypes = F.prototype.mediaTypes;
var jo = Gs.exports, In = {};
const No = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var Bo = No;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(i) {
  var e = Bo, t = Hs.extname, s = /^\s*([^;\s]*)(?:;|\s|$)/, n = /^text\//i;
  i.charset = a, i.charsets = { lookup: a }, i.contentType = o, i.extension = r, i.extensions = /* @__PURE__ */ Object.create(null), i.lookup = p, i.types = /* @__PURE__ */ Object.create(null), c(i.extensions, i.types);
  function a(u) {
    if (!u || typeof u != "string")
      return !1;
    var l = s.exec(u), d = l && e[l[1].toLowerCase()];
    return d && d.charset ? d.charset : l && n.test(l[1]) ? "UTF-8" : !1;
  }
  function o(u) {
    if (!u || typeof u != "string")
      return !1;
    var l = u.indexOf("/") === -1 ? i.lookup(u) : u;
    if (!l)
      return !1;
    if (l.indexOf("charset") === -1) {
      var d = i.charset(l);
      d && (l += "; charset=" + d.toLowerCase());
    }
    return l;
  }
  function r(u) {
    if (!u || typeof u != "string")
      return !1;
    var l = s.exec(u), d = l && i.extensions[l[1].toLowerCase()];
    return !d || !d.length ? !1 : d[0];
  }
  function p(u) {
    if (!u || typeof u != "string")
      return !1;
    var l = t("x." + u).toLowerCase().substr(1);
    return l && i.types[l] || !1;
  }
  function c(u, l) {
    var d = ["nginx", "apache", void 0, "iana"];
    Object.keys(e).forEach(function(m) {
      var h = e[m], x = h.extensions;
      if (!(!x || !x.length)) {
        u[m] = x;
        for (var S = 0; S < x.length; S++) {
          var T = x[S];
          if (l[T]) {
            var I = d.indexOf(e[l[T]].source), B = d.indexOf(h.source);
            if (l[T] !== "application/octet-stream" && (I > B || I === B && l[T].substr(0, 12) === "application/"))
              continue;
          }
          l[T] = m;
        }
      }
    });
  }
})(In);
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Io = jo, Lo = In, Xs = ee;
function ee(i) {
  if (!(this instanceof ee))
    return new ee(i);
  this.headers = i.headers, this.negotiator = new Io(i);
}
ee.prototype.type = ee.prototype.types = function(i) {
  var e = i;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var t = 0; t < e.length; t++)
      e[t] = arguments[t];
  }
  if (!e || e.length === 0)
    return this.negotiator.mediaTypes();
  if (!this.headers.accept)
    return e[0];
  var s = e.map(Fo), n = this.negotiator.mediaTypes(s.filter(Do)), a = n[0];
  return a ? e[s.indexOf(a)] : !1;
};
ee.prototype.encoding = ee.prototype.encodings = function(i) {
  var e = i;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var t = 0; t < e.length; t++)
      e[t] = arguments[t];
  }
  return !e || e.length === 0 ? this.negotiator.encodings() : this.negotiator.encodings(e)[0] || !1;
};
ee.prototype.charset = ee.prototype.charsets = function(i) {
  var e = i;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var t = 0; t < e.length; t++)
      e[t] = arguments[t];
  }
  return !e || e.length === 0 ? this.negotiator.charsets() : this.negotiator.charsets(e)[0] || !1;
};
ee.prototype.lang = ee.prototype.langs = ee.prototype.language = ee.prototype.languages = function(i) {
  var e = i;
  if (e && !Array.isArray(e)) {
    e = new Array(arguments.length);
    for (var t = 0; t < e.length; t++)
      e[t] = arguments[t];
  }
  return !e || e.length === 0 ? this.negotiator.languages() : this.negotiator.languages(e)[0] || !1;
};
function Fo(i) {
  return i.indexOf("/") === -1 ? Lo.lookup(i) : i;
}
function Do(i) {
  return typeof i == "string";
}
var Ln = {}, Fe = {}, Fn = { exports: {} };
/*!
 * base64id v0.1.0
 */
(function(i, e) {
  var t = ct, s = function() {
  };
  s.prototype.getRandomBytes = function(n) {
    var a = 4096, o = this;
    if (n = n || 12, n > a)
      return t.randomBytes(n);
    var r = parseInt(a / n), p = parseInt(r * 0.85);
    if (!p || (this.bytesBufferIndex == null && (this.bytesBufferIndex = -1), this.bytesBufferIndex == r && (this.bytesBuffer = null, this.bytesBufferIndex = -1), (this.bytesBufferIndex == -1 || this.bytesBufferIndex > p) && (this.isGeneratingBytes || (this.isGeneratingBytes = !0, t.randomBytes(a, function(u, l) {
      o.bytesBuffer = l, o.bytesBufferIndex = 0, o.isGeneratingBytes = !1;
    })), this.bytesBufferIndex == -1)))
      return t.randomBytes(n);
    var c = this.bytesBuffer.slice(n * this.bytesBufferIndex, n * (this.bytesBufferIndex + 1));
    return this.bytesBufferIndex++, c;
  }, s.prototype.generateId = function() {
    var n = Buffer.alloc(15);
    return n.writeInt32BE ? (this.sequenceNumber = this.sequenceNumber + 1 | 0, n.writeInt32BE(this.sequenceNumber, 11), t.randomBytes ? this.getRandomBytes(12).copy(n) : [0, 4, 8].forEach(function(a) {
      n.writeInt32BE(Math.random() * Math.pow(2, 32) | 0, a);
    }), n.toString("base64").replace(/\//g, "_").replace(/\+/g, "-")) : Math.abs(Math.random() * Math.random() * Date.now() | 0).toString() + Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
  }, i.exports = new s();
})(Fn);
var Dn = Fn.exports, Xt = {}, pt = {}, ve = {}, lt = {}, $n = {}, ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.ERROR_PACKET = ue.PACKET_TYPES_REVERSE = ue.PACKET_TYPES = void 0;
const de = /* @__PURE__ */ Object.create(null);
ue.PACKET_TYPES = de;
de.open = "0";
de.close = "1";
de.ping = "2";
de.pong = "3";
de.message = "4";
de.upgrade = "5";
de.noop = "6";
const Un = /* @__PURE__ */ Object.create(null);
ue.PACKET_TYPES_REVERSE = Un;
Object.keys(de).forEach((i) => {
  Un[de[i]] = i;
});
const $o = { type: "error", data: "parser error" };
ue.ERROR_PACKET = $o;
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.encodePacket = void 0, i.encodePacketToBinary = a;
  const e = ue, t = ({ type: o, data: r }, p, c) => r instanceof ArrayBuffer || ArrayBuffer.isView(r) ? c(p ? r : "b" + s(r, !0).toString("base64")) : c(e.PACKET_TYPES[o] + (r || ""));
  i.encodePacket = t;
  const s = (o, r) => Buffer.isBuffer(o) || o instanceof Uint8Array && !r ? o : o instanceof ArrayBuffer ? Buffer.from(o) : Buffer.from(o.buffer, o.byteOffset, o.byteLength);
  let n;
  function a(o, r) {
    if (o.data instanceof ArrayBuffer || ArrayBuffer.isView(o.data))
      return r(s(o.data, !1));
    (0, i.encodePacket)(o, !0, (p) => {
      n || (n = new TextEncoder()), r(n.encode(p));
    });
  }
})($n);
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.decodePacket = void 0;
const _t = ue, Uo = (i, e) => {
  if (typeof i != "string")
    return {
      type: "message",
      data: fi(i, e)
    };
  const t = i.charAt(0);
  if (t === "b") {
    const s = Buffer.from(i.substring(1), "base64");
    return {
      type: "message",
      data: fi(s, e)
    };
  }
  return _t.PACKET_TYPES_REVERSE[t] ? i.length > 1 ? {
    type: _t.PACKET_TYPES_REVERSE[t],
    data: i.substring(1)
  } : {
    type: _t.PACKET_TYPES_REVERSE[t]
  } : _t.ERROR_PACKET;
};
Zt.decodePacket = Uo;
const fi = (i, e) => {
  switch (e) {
    case "arraybuffer":
      return i instanceof ArrayBuffer ? i : Buffer.isBuffer(i) ? i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength) : i.buffer;
    case "nodebuffer":
    default:
      return Buffer.isBuffer(i) ? i : Buffer.from(i);
  }
};
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.decodePayload = i.decodePacket = i.encodePayload = i.encodePacket = i.protocol = void 0, i.createPacketEncoderStream = r, i.createPacketDecoderStream = l;
  const e = $n;
  Object.defineProperty(i, "encodePacket", { enumerable: !0, get: function() {
    return e.encodePacket;
  } });
  const t = Zt;
  Object.defineProperty(i, "decodePacket", { enumerable: !0, get: function() {
    return t.decodePacket;
  } });
  const s = ue, n = "", a = (d, v) => {
    const m = d.length, h = new Array(m);
    let x = 0;
    d.forEach((S, T) => {
      (0, e.encodePacket)(S, !1, (I) => {
        h[T] = I, ++x === m && v(h.join(n));
      });
    });
  };
  i.encodePayload = a;
  const o = (d, v) => {
    const m = d.split(n), h = [];
    for (let x = 0; x < m.length; x++) {
      const S = (0, t.decodePacket)(m[x], v);
      if (h.push(S), S.type === "error")
        break;
    }
    return h;
  };
  i.decodePayload = o;
  function r() {
    return new TransformStream({
      transform(d, v) {
        (0, e.encodePacketToBinary)(d, (m) => {
          const h = m.length;
          let x;
          if (h < 126)
            x = new Uint8Array(1), new DataView(x.buffer).setUint8(0, h);
          else if (h < 65536) {
            x = new Uint8Array(3);
            const S = new DataView(x.buffer);
            S.setUint8(0, 126), S.setUint16(1, h);
          } else {
            x = new Uint8Array(9);
            const S = new DataView(x.buffer);
            S.setUint8(0, 127), S.setBigUint64(1, BigInt(h));
          }
          d.data && typeof d.data != "string" && (x[0] |= 128), v.enqueue(x), v.enqueue(m);
        });
      }
    });
  }
  let p;
  function c(d) {
    return d.reduce((v, m) => v + m.length, 0);
  }
  function u(d, v) {
    if (d[0].length === v)
      return d.shift();
    const m = new Uint8Array(v);
    let h = 0;
    for (let x = 0; x < v; x++)
      m[x] = d[0][h++], h === d[0].length && (d.shift(), h = 0);
    return d.length && h < d[0].length && (d[0] = d[0].slice(h)), m;
  }
  function l(d, v) {
    p || (p = new TextDecoder());
    const m = [];
    let h = 0, x = -1, S = !1;
    return new TransformStream({
      transform(T, I) {
        for (m.push(T); ; ) {
          if (h === 0) {
            if (c(m) < 1)
              break;
            const B = u(m, 1);
            S = (B[0] & 128) === 128, x = B[0] & 127, x < 126 ? h = 3 : x === 126 ? h = 1 : h = 2;
          } else if (h === 1) {
            if (c(m) < 2)
              break;
            const B = u(m, 2);
            x = new DataView(B.buffer, B.byteOffset, B.length).getUint16(0), h = 3;
          } else if (h === 2) {
            if (c(m) < 8)
              break;
            const B = u(m, 8), $ = new DataView(B.buffer, B.byteOffset, B.length), g = $.getUint32(0);
            if (g > Math.pow(2, 21) - 1) {
              I.enqueue(s.ERROR_PACKET);
              break;
            }
            x = g * Math.pow(2, 32) + $.getUint32(4), h = 3;
          } else {
            if (c(m) < x)
              break;
            const B = u(m, x);
            I.enqueue((0, t.decodePacket)(S ? B : p.decode(B), v)), h = 0;
          }
          if (x === 0 || x > d) {
            I.enqueue(s.ERROR_PACKET);
            break;
          }
        }
      }
    });
  }
  i.protocol = 4;
})(lt);
var Mn = {};
/*! https://mths.be/utf8js v2.1.2 by @mathias */
var _e = String.fromCharCode;
function qn(i) {
  for (var e = [], t = 0, s = i.length, n, a; t < s; )
    n = i.charCodeAt(t++), n >= 55296 && n <= 56319 && t < s ? (a = i.charCodeAt(t++), (a & 64512) == 56320 ? e.push(((n & 1023) << 10) + (a & 1023) + 65536) : (e.push(n), t--)) : e.push(n);
  return e;
}
function Mo(i) {
  for (var e = i.length, t = -1, s, n = ""; ++t < e; )
    s = i[t], s > 65535 && (s -= 65536, n += _e(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n += _e(s);
  return n;
}
function zn(i, e) {
  if (i >= 55296 && i <= 57343) {
    if (e)
      throw Error("Lone surrogate U+" + i.toString(16).toUpperCase() + " is not a scalar value");
    return !1;
  }
  return !0;
}
function hs(i, e) {
  return _e(i >> e & 63 | 128);
}
function qo(i, e) {
  if (!(i & 4294967168))
    return _e(i);
  var t = "";
  return i & 4294965248 ? i & 4294901760 ? i & 4292870144 || (t = _e(i >> 18 & 7 | 240), t += hs(i, 12), t += hs(i, 6)) : (zn(i, e) || (i = 65533), t = _e(i >> 12 & 15 | 224), t += hs(i, 6)) : t = _e(i >> 6 & 31 | 192), t += _e(i & 63 | 128), t;
}
function zo(i, e) {
  e = e || {};
  for (var t = e.strict !== !1, s = qn(i), n = s.length, a = -1, o, r = ""; ++a < n; )
    o = s[a], r += qo(o, t);
  return r;
}
function Ue() {
  if (Ee >= Mt)
    throw Error("Invalid byte index");
  var i = Ut[Ee] & 255;
  if (Ee++, (i & 192) == 128)
    return i & 63;
  throw Error("Invalid continuation byte");
}
function Wo(i) {
  var e, t, s, n, a;
  if (Ee > Mt)
    throw Error("Invalid byte index");
  if (Ee == Mt)
    return !1;
  if (e = Ut[Ee] & 255, Ee++, !(e & 128))
    return e;
  if ((e & 224) == 192) {
    if (t = Ue(), a = (e & 31) << 6 | t, a >= 128)
      return a;
    throw Error("Invalid continuation byte");
  }
  if ((e & 240) == 224) {
    if (t = Ue(), s = Ue(), a = (e & 15) << 12 | t << 6 | s, a >= 2048)
      return zn(a, i) ? a : 65533;
    throw Error("Invalid continuation byte");
  }
  if ((e & 248) == 240 && (t = Ue(), s = Ue(), n = Ue(), a = (e & 7) << 18 | t << 12 | s << 6 | n, a >= 65536 && a <= 1114111))
    return a;
  throw Error("Invalid UTF-8 detected");
}
var Ut, Mt, Ee;
function Vo(i, e) {
  e = e || {};
  var t = e.strict !== !1;
  Ut = qn(i), Mt = Ut.length, Ee = 0;
  for (var s = [], n; (n = Wo(t)) !== !1; )
    s.push(n);
  return Mo(s);
}
var Ho = {
  version: "2.1.2",
  encode: zo,
  decode: Vo
};
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.packets = i.protocol = void 0, i.encodePacket = o, i.encodeBase64Packet = p, i.decodePacket = c, i.decodeBase64Packet = l, i.encodePayload = d, i.decodePayload = h, i.encodePayloadAsBinary = I, i.decodePayloadAsBinary = $;
  var e = Ho;
  i.protocol = 3;
  const t = (g) => {
    for (const C of g)
      if (C.data instanceof ArrayBuffer || ArrayBuffer.isView(C.data))
        return !0;
    return !1;
  };
  i.packets = {
    open: 0,
    close: 1,
    ping: 2,
    pong: 3,
    message: 4,
    upgrade: 5,
    noop: 6
  };
  var s = Object.keys(i.packets), n = { type: "error", data: "parser error" };
  const a = Buffer.concat([]);
  function o(g, C, w, _) {
    if (typeof C == "function" && (_ = C, C = null), typeof w == "function" && (_ = w, w = null), Buffer.isBuffer(g.data))
      return r(g, C, _);
    if (g.data && (g.data.buffer || g.data) instanceof ArrayBuffer)
      return r({ type: g.type, data: T(g.data) }, C, _);
    var j = i.packets[g.type];
    return g.data !== void 0 && (j += w ? e.encode(String(g.data), { strict: !1 }) : String(g.data)), _("" + j);
  }
  function r(g, C, w) {
    if (!C)
      return p(g, w);
    var _ = g.data, j = Buffer.allocUnsafe(1);
    return j[0] = i.packets[g.type], w(Buffer.concat([j, _]));
  }
  function p(g, C) {
    var w = Buffer.isBuffer(g.data) ? g.data : T(g.data), _ = "b" + i.packets[g.type];
    return _ += w.toString("base64"), C(_);
  }
  function c(g, C, w) {
    if (g === void 0)
      return n;
    let _;
    if (typeof g == "string")
      return _ = g.charAt(0), _ === "b" ? l(g.slice(1), C) : w && (g = u(g), g === !1) || Number(_) != _ || !s[_] ? n : g.length > 1 ? { type: s[_], data: g.slice(1) } : { type: s[_] };
    if (C === "arraybuffer") {
      var j = new Uint8Array(g);
      return _ = j[0], { type: s[_], data: j.buffer.slice(1) };
    }
    return g instanceof ArrayBuffer && (g = T(g)), _ = g[0], { type: s[_], data: g.slice(1) };
  }
  function u(g) {
    try {
      g = e.decode(g, { strict: !1 });
    } catch {
      return !1;
    }
    return g;
  }
  function l(g, C) {
    var w = s[g.charAt(0)], _ = Buffer.from(g.slice(1), "base64");
    if (C === "arraybuffer") {
      for (var j = new Uint8Array(_.length), y = 0; y < j.length; y++)
        j[y] = _[y];
      _ = j.buffer;
    }
    return { type: w, data: _ };
  }
  function d(g, C, w) {
    if (typeof C == "function" && (w = C, C = null), C && t(g))
      return I(g, w);
    if (!g.length)
      return w("0:");
    function _(j, y) {
      o(j, C, !1, function(R) {
        y(null, v(R));
      });
    }
    m(g, _, function(j, y) {
      return w(y.join(""));
    });
  }
  function v(g) {
    return g.length + ":" + g;
  }
  function m(g, C, w) {
    const _ = new Array(g.length);
    let j = 0;
    for (let y = 0; y < g.length; y++)
      C(g[y], (R, E) => {
        _[y] = E, ++j === g.length && w(null, _);
      });
  }
  function h(g, C, w) {
    if (typeof g != "string")
      return $(g, C, w);
    if (typeof C == "function" && (w = C, C = null), g === "")
      return w(n, 0, 1);
    for (var _ = "", j, y, R, E = 0, f = g.length; E < f; E++) {
      var b = g.charAt(E);
      if (b !== ":") {
        _ += b;
        continue;
      }
      if (_ === "" || _ != (j = Number(_)) || (y = g.slice(E + 1, E + 1 + j), _ != y.length))
        return w(n, 0, 1);
      if (y.length) {
        if (R = c(y, C, !1), n.type === R.type && n.data === R.data)
          return w(n, 0, 1);
        var k = w(R, E + j, f);
        if (k === !1)
          return;
      }
      E += j, _ = "";
    }
    if (_ !== "")
      return w(n, 0, 1);
  }
  function x(g) {
    for (var C = "", w = 0, _ = g.length; w < _; w++)
      C += String.fromCharCode(g[w]);
    return C;
  }
  function S(g) {
    for (var C = Buffer.allocUnsafe(g.length), w = 0, _ = g.length; w < _; w++)
      C.writeUInt8(g.charCodeAt(w), w);
    return C;
  }
  function T(g) {
    var C = g.byteLength || g.length, w = g.byteOffset || 0;
    return Buffer.from(g.buffer || g, w, C);
  }
  function I(g, C) {
    if (!g.length)
      return C(a);
    m(g, B, function(w, _) {
      return C(Buffer.concat(_));
    });
  }
  function B(g, C) {
    function w(_) {
      var j = "" + _.length, y;
      if (typeof _ == "string") {
        y = Buffer.allocUnsafe(j.length + 2), y[0] = 0;
        for (var R = 0; R < j.length; R++)
          y[R + 1] = parseInt(j[R], 10);
        return y[y.length - 1] = 255, C(null, Buffer.concat([y, S(_)]));
      }
      y = Buffer.allocUnsafe(j.length + 2), y[0] = 1;
      for (var R = 0; R < j.length; R++)
        y[R + 1] = parseInt(j[R], 10);
      y[y.length - 1] = 255, C(null, Buffer.concat([y, _]));
    }
    o(g, !0, !0, w);
  }
  function $(g, C, w) {
    typeof C == "function" && (w = C, C = null);
    for (var _ = g, j = [], y; _.length > 0; ) {
      var R = "", E = _[0] === 0;
      for (y = 1; _[y] !== 255; y++) {
        if (R.length > 310)
          return w(n, 0, 1);
        R += "" + _[y];
      }
      _ = _.slice(R.length + 1);
      var f = parseInt(R, 10), b = _.slice(1, f + 1);
      E && (b = x(b)), j.push(b), _ = _.slice(f + 1);
    }
    var k = j.length;
    for (y = 0; y < k; y++) {
      var P = j[y];
      w(c(P, C, !0), y, k);
    }
  }
})(Mn);
var Is = { exports: {} }, wt = { exports: {} }, vs, hi;
function Go() {
  if (hi) return vs;
  hi = 1;
  var i = 1e3, e = i * 60, t = e * 60, s = t * 24, n = s * 7, a = s * 365.25;
  vs = function(u, l) {
    l = l || {};
    var d = typeof u;
    if (d === "string" && u.length > 0)
      return o(u);
    if (d === "number" && isFinite(u))
      return l.long ? p(u) : r(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function o(u) {
    if (u = String(u), !(u.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (l) {
        var d = parseFloat(l[1]), v = (l[2] || "ms").toLowerCase();
        switch (v) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * a;
          case "weeks":
          case "week":
          case "w":
            return d * n;
          case "days":
          case "day":
          case "d":
            return d * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * i;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function r(u) {
    var l = Math.abs(u);
    return l >= s ? Math.round(u / s) + "d" : l >= t ? Math.round(u / t) + "h" : l >= e ? Math.round(u / e) + "m" : l >= i ? Math.round(u / i) + "s" : u + "ms";
  }
  function p(u) {
    var l = Math.abs(u);
    return l >= s ? c(u, l, s, "day") : l >= t ? c(u, l, t, "hour") : l >= e ? c(u, l, e, "minute") : l >= i ? c(u, l, i, "second") : u + " ms";
  }
  function c(u, l, d, v) {
    var m = l >= d * 1.5;
    return Math.round(u / d) + " " + v + (m ? "s" : "");
  }
  return vs;
}
var xs, vi;
function Wn() {
  if (vi) return xs;
  vi = 1;
  function i(e) {
    s.debug = s, s.default = s, s.coerce = c, s.disable = r, s.enable = a, s.enabled = p, s.humanize = Go(), s.destroy = u, Object.keys(e).forEach((l) => {
      s[l] = e[l];
    }), s.names = [], s.skips = [], s.formatters = {};
    function t(l) {
      let d = 0;
      for (let v = 0; v < l.length; v++)
        d = (d << 5) - d + l.charCodeAt(v), d |= 0;
      return s.colors[Math.abs(d) % s.colors.length];
    }
    s.selectColor = t;
    function s(l) {
      let d, v = null, m, h;
      function x(...S) {
        if (!x.enabled)
          return;
        const T = x, I = Number(/* @__PURE__ */ new Date()), B = I - (d || I);
        T.diff = B, T.prev = d, T.curr = I, d = I, S[0] = s.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
        let $ = 0;
        S[0] = S[0].replace(/%([a-zA-Z%])/g, (C, w) => {
          if (C === "%%")
            return "%";
          $++;
          const _ = s.formatters[w];
          if (typeof _ == "function") {
            const j = S[$];
            C = _.call(T, j), S.splice($, 1), $--;
          }
          return C;
        }), s.formatArgs.call(T, S), (T.log || s.log).apply(T, S);
      }
      return x.namespace = l, x.useColors = s.useColors(), x.color = s.selectColor(l), x.extend = n, x.destroy = s.destroy, Object.defineProperty(x, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => v !== null ? v : (m !== s.namespaces && (m = s.namespaces, h = s.enabled(l)), h),
        set: (S) => {
          v = S;
        }
      }), typeof s.init == "function" && s.init(x), x;
    }
    function n(l, d) {
      const v = s(this.namespace + (typeof d > "u" ? ":" : d) + l);
      return v.log = this.log, v;
    }
    function a(l) {
      s.save(l), s.namespaces = l, s.names = [], s.skips = [];
      const d = (typeof l == "string" ? l : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const v of d)
        v[0] === "-" ? s.skips.push(v.slice(1)) : s.names.push(v);
    }
    function o(l, d) {
      let v = 0, m = 0, h = -1, x = 0;
      for (; v < l.length; )
        if (m < d.length && (d[m] === l[v] || d[m] === "*"))
          d[m] === "*" ? (h = m, x = v, m++) : (v++, m++);
        else if (h !== -1)
          m = h + 1, x++, v = x;
        else
          return !1;
      for (; m < d.length && d[m] === "*"; )
        m++;
      return m === d.length;
    }
    function r() {
      const l = [
        ...s.names,
        ...s.skips.map((d) => "-" + d)
      ].join(",");
      return s.enable(""), l;
    }
    function p(l) {
      for (const d of s.skips)
        if (o(l, d))
          return !1;
      for (const d of s.names)
        if (o(l, d))
          return !0;
      return !1;
    }
    function c(l) {
      return l instanceof Error ? l.stack || l.message : l;
    }
    function u() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return s.enable(s.load()), s;
  }
  return xs = i, xs;
}
var xi;
function Ko() {
  return xi || (xi = 1, function(i, e) {
    e.formatArgs = s, e.save = n, e.load = a, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
      let p = !1;
      return () => {
        p || (p = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), e.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function t() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let p;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (p = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(p[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function s(p) {
      if (p[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + p[0] + (this.useColors ? "%c " : " ") + "+" + i.exports.humanize(this.diff), !this.useColors)
        return;
      const c = "color: " + this.color;
      p.splice(1, 0, c, "color: inherit");
      let u = 0, l = 0;
      p[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (u++, d === "%c" && (l = u));
      }), p.splice(l, 0, c);
    }
    e.log = console.debug || console.log || (() => {
    });
    function n(p) {
      try {
        p ? e.storage.setItem("debug", p) : e.storage.removeItem("debug");
      } catch {
      }
    }
    function a() {
      let p;
      try {
        p = e.storage.getItem("debug") || e.storage.getItem("DEBUG");
      } catch {
      }
      return !p && typeof process < "u" && "env" in process && (p = process.env.DEBUG), p;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    i.exports = Wn()(e);
    const { formatters: r } = i.exports;
    r.j = function(p) {
      try {
        return JSON.stringify(p);
      } catch (c) {
        return "[UnexpectedJSONParseError]: " + c.message;
      }
    };
  }(wt, wt.exports)), wt.exports;
}
var Et = { exports: {} }, gs, gi;
function Yo() {
  return gi || (gi = 1, gs = (i, e = process.argv) => {
    const t = i.startsWith("-") ? "" : i.length === 1 ? "-" : "--", s = e.indexOf(t + i), n = e.indexOf("--");
    return s !== -1 && (n === -1 || s < n);
  }), gs;
}
var bs, bi;
function Jo() {
  if (bi) return bs;
  bi = 1;
  const i = Cn, e = kn, t = Yo(), { env: s } = process;
  let n;
  t("no-color") || t("no-colors") || t("color=false") || t("color=never") ? n = 0 : (t("color") || t("colors") || t("color=true") || t("color=always")) && (n = 1), "FORCE_COLOR" in s && (s.FORCE_COLOR === "true" ? n = 1 : s.FORCE_COLOR === "false" ? n = 0 : n = s.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(s.FORCE_COLOR, 10), 3));
  function a(p) {
    return p === 0 ? !1 : {
      level: p,
      hasBasic: !0,
      has256: p >= 2,
      has16m: p >= 3
    };
  }
  function o(p, c) {
    if (n === 0)
      return 0;
    if (t("color=16m") || t("color=full") || t("color=truecolor"))
      return 3;
    if (t("color=256"))
      return 2;
    if (p && !c && n === void 0)
      return 0;
    const u = n || 0;
    if (s.TERM === "dumb")
      return u;
    if (process.platform === "win32") {
      const l = i.release().split(".");
      return Number(l[0]) >= 10 && Number(l[2]) >= 10586 ? Number(l[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in s)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((l) => l in s) || s.CI_NAME === "codeship" ? 1 : u;
    if ("TEAMCITY_VERSION" in s)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(s.TEAMCITY_VERSION) ? 1 : 0;
    if (s.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in s) {
      const l = parseInt((s.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (s.TERM_PROGRAM) {
        case "iTerm.app":
          return l >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(s.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(s.TERM) || "COLORTERM" in s ? 1 : u;
  }
  function r(p) {
    const c = o(p, p && p.isTTY);
    return a(c);
  }
  return bs = {
    supportsColor: r,
    stdout: a(o(!0, e.isatty(1))),
    stderr: a(o(!0, e.isatty(2)))
  }, bs;
}
var yi;
function Qo() {
  return yi || (yi = 1, function(i, e) {
    const t = kn, s = Sn;
    e.init = u, e.log = r, e.formatArgs = a, e.save = p, e.load = c, e.useColors = n, e.destroy = s.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), e.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = Jo();
      d && (d.stderr || d).level >= 2 && (e.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    e.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, v) => {
      const m = v.substring(6).toLowerCase().replace(/_([a-z])/g, (x, S) => S.toUpperCase());
      let h = process.env[v];
      return /^(yes|on|true|enabled)$/i.test(h) ? h = !0 : /^(no|off|false|disabled)$/i.test(h) ? h = !1 : h === "null" ? h = null : h = Number(h), d[m] = h, d;
    }, {});
    function n() {
      return "colors" in e.inspectOpts ? !!e.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function a(d) {
      const { namespace: v, useColors: m } = this;
      if (m) {
        const h = this.color, x = "\x1B[3" + (h < 8 ? h : "8;5;" + h), S = `  ${x};1m${v} \x1B[0m`;
        d[0] = S + d[0].split(`
`).join(`
` + S), d.push(x + "m+" + i.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = o() + v + " " + d[0];
    }
    function o() {
      return e.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function r(...d) {
      return process.stderr.write(s.formatWithOptions(e.inspectOpts, ...d) + `
`);
    }
    function p(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function c() {
      return process.env.DEBUG;
    }
    function u(d) {
      d.inspectOpts = {};
      const v = Object.keys(e.inspectOpts);
      for (let m = 0; m < v.length; m++)
        d.inspectOpts[v[m]] = e.inspectOpts[v[m]];
    }
    i.exports = Wn()(e);
    const { formatters: l } = i.exports;
    l.o = function(d) {
      return this.inspectOpts.colors = this.useColors, s.inspect(d, this.inspectOpts).split(`
`).map((v) => v.trim()).join(" ");
    }, l.O = function(d) {
      return this.inspectOpts.colors = this.useColors, s.inspect(d, this.inspectOpts);
    };
  }(Et, Et.exports)), Et.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Is.exports = Ko() : Is.exports = Qo();
var K = Is.exports;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.Transport = void 0;
const Xo = Te, Zo = lt, er = Mn, tr = K, _i = (0, tr.default)("engine:transport");
function sr() {
}
class Vn extends Xo.EventEmitter {
  get readyState() {
    return this._readyState;
  }
  set readyState(e) {
    _i("readyState updated from %s to %s (%s)", this._readyState, e, this.name), this._readyState = e;
  }
  /**
   * Transport constructor.
   *
   * @param {EngineRequest} req
   */
  constructor(e) {
    super(), this.writable = !1, this._readyState = "open", this.discarded = !1, this.protocol = e._query.EIO === "4" ? 4 : 3, this.parser = this.protocol === 4 ? Zo : er, this.supportsBinary = !(e._query && e._query.b64);
  }
  /**
   * Flags the transport as discarded.
   *
   * @package
   */
  discard() {
    this.discarded = !0;
  }
  /**
   * Called with an incoming HTTP request.
   *
   * @param req
   * @package
   */
  onRequest(e) {
  }
  /**
   * Closes the transport.
   *
   * @package
   */
  close(e) {
    this.readyState === "closed" || this.readyState === "closing" || (this.readyState = "closing", this.doClose(e || sr));
  }
  /**
   * Called with a transport error.
   *
   * @param {String} msg - message error
   * @param {Object} desc - error description
   * @protected
   */
  onError(e, t) {
    if (this.listeners("error").length) {
      const s = new Error(e);
      s.type = "TransportError", s.description = t, this.emit("error", s);
    } else
      _i("ignored transport error %s (%s)", e, t);
  }
  /**
   * Called with parsed out a packets from the data stream.
   *
   * @param {Object} packet
   * @protected
   */
  onPacket(e) {
    this.emit("packet", e);
  }
  /**
   * Called with the encoded packet data.
   *
   * @param data
   * @protected
   */
  onData(e) {
    this.onPacket(this.parser.decodePacket(e));
  }
  /**
   * Called upon transport close.
   *
   * @protected
   */
  onClose() {
    this.readyState = "closed", this.emit("close");
  }
}
ve.Transport = Vn;
Vn.upgradesTo = [];
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.Polling = void 0;
const ir = ve, wi = Qt, nr = Xs, ar = K, X = (0, ar.default)("engine:polling"), or = {
  gzip: wi.createGzip,
  deflate: wi.createDeflate
};
let rr = class extends ir.Transport {
  /**
   * HTTP polling constructor.
   */
  constructor(e) {
    super(e), this.closeTimeout = 30 * 1e3;
  }
  /**
   * Transport name
   */
  get name() {
    return "polling";
  }
  /**
   * Overrides onRequest.
   *
   * @param {EngineRequest} req
   * @package
   */
  onRequest(e) {
    const t = e.res;
    e.res = null, e.method === "GET" ? this.onPollRequest(e, t) : e.method === "POST" ? this.onDataRequest(e, t) : (t.writeHead(500), t.end());
  }
  /**
   * The client sends a request awaiting for us to send data.
   *
   * @private
   */
  onPollRequest(e, t) {
    if (this.req) {
      X("request overlap"), this.onError("overlap from client"), t.writeHead(400), t.end();
      return;
    }
    X("setting request"), this.req = e, this.res = t;
    const s = () => {
      this.onError("poll connection closed prematurely");
    }, n = () => {
      e.removeListener("close", s), this.req = this.res = null;
    };
    e.cleanup = n, e.on("close", s), this.writable = !0, this.emit("ready"), this.writable && this.shouldClose && (X("triggering empty send to append close packet"), this.send([{ type: "noop" }]));
  }
  /**
   * The client sends a request with data.
   *
   * @private
   */
  onDataRequest(e, t) {
    if (this.dataReq) {
      this.onError("data request overlap from client"), t.writeHead(400), t.end();
      return;
    }
    const s = e.headers["content-type"] === "application/octet-stream";
    if (s && this.protocol === 4)
      return this.onError("invalid content"), t.writeHead(400).end();
    this.dataReq = e, this.dataRes = t;
    let n = s ? Buffer.concat([]) : "";
    const a = () => {
      e.removeListener("data", r), e.removeListener("end", p), e.removeListener("close", o), this.dataReq = this.dataRes = n = null;
    }, o = () => {
      a(), this.onError("data request connection closed prematurely");
    }, r = (c) => {
      let u;
      s ? (n = Buffer.concat([n, c]), u = n.length) : (n += c, u = Buffer.byteLength(n)), u > this.maxHttpBufferSize && (t.writeHead(413).end(), a());
    }, p = () => {
      this.onData(n);
      const c = {
        // text/html is required instead of text/plain to avoid an
        // unwanted download dialog on certain user-agents (GH-43)
        "Content-Type": "text/html",
        "Content-Length": "2"
      };
      t.writeHead(200, this.headers(e, c)), t.end("ok"), a();
    };
    e.on("close", o), s || e.setEncoding("utf8"), e.on("data", r), e.on("end", p);
  }
  /**
   * Processes the incoming data payload.
   *
   * @param data - encoded payload
   * @protected
   */
  onData(e) {
    X('received "%s"', e);
    const t = (s) => {
      if (s.type === "close")
        return X("got xhr close packet"), this.onClose(), !1;
      this.onPacket(s);
    };
    this.protocol === 3 ? this.parser.decodePayload(e, t) : this.parser.decodePayload(e).forEach(t);
  }
  /**
   * Overrides onClose.
   *
   * @private
   */
  onClose() {
    this.writable && this.send([{ type: "noop" }]), super.onClose();
  }
  send(e) {
    this.writable = !1, this.shouldClose && (X("appending close packet to payload"), e.push({ type: "close" }), this.shouldClose(), this.shouldClose = null);
    const t = (s) => {
      const n = e.some((a) => a.options && a.options.compress);
      this.write(s, { compress: n });
    };
    this.protocol === 3 ? this.parser.encodePayload(e, this.supportsBinary, t) : this.parser.encodePayload(e, t);
  }
  /**
   * Writes data as response to poll request.
   *
   * @param {String} data
   * @param {Object} options
   * @private
   */
  write(e, t) {
    X('writing "%s"', e), this.doWrite(e, t, () => {
      this.req.cleanup(), this.emit("drain");
    });
  }
  /**
   * Performs the write.
   *
   * @protected
   */
  doWrite(e, t, s) {
    const n = typeof e == "string", o = {
      "Content-Type": n ? "text/plain; charset=UTF-8" : "application/octet-stream"
    }, r = (u) => {
      o["Content-Length"] = typeof u == "string" ? Buffer.byteLength(u) : u.length, this.res.writeHead(200, this.headers(this.req, o)), this.res.end(u), s();
    };
    if (!this.httpCompression || !t.compress) {
      r(e);
      return;
    }
    if ((n ? Buffer.byteLength(e) : e.length) < this.httpCompression.threshold) {
      r(e);
      return;
    }
    const c = nr(this.req).encodings(["gzip", "deflate"]);
    if (!c) {
      r(e);
      return;
    }
    this.compress(e, c, (u, l) => {
      if (u) {
        this.res.writeHead(500), this.res.end(), s(u);
        return;
      }
      o["Content-Encoding"] = c, r(l);
    });
  }
  /**
   * Compresses data.
   *
   * @private
   */
  compress(e, t, s) {
    X("compressing");
    const n = [];
    let a = 0;
    or[t](this.httpCompression).on("error", s).on("data", function(o) {
      n.push(o), a += o.length;
    }).on("end", function() {
      s(null, Buffer.concat(n, a));
    }).end(e);
  }
  /**
   * Closes the transport.
   *
   * @private
   */
  doClose(e) {
    X("closing");
    let t;
    this.dataReq && (X("aborting ongoing data request"), this.dataReq.destroy());
    const s = () => {
      clearTimeout(t), e(), this.onClose();
    };
    this.writable ? (X("transport writable - closing right away"), this.send([{ type: "close" }]), s()) : this.discarded ? (X("transport discarded - closing right away"), s()) : (X("transport not writable - buffering orderly close"), this.shouldClose = s, t = setTimeout(s, this.closeTimeout));
  }
  /**
   * Returns headers for a response.
   *
   * @param {http.IncomingMessage} req
   * @param {Object} headers - extra headers
   * @private
   */
  headers(e, t = {}) {
    const s = e.headers["user-agent"];
    return s && (~s.indexOf(";MSIE") || ~s.indexOf("Trident/")) && (t["X-XSS-Protection"] = "0"), t["cache-control"] = "no-store", this.emit("headers", t, e), t;
  }
};
pt.Polling = rr;
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.JSONP = void 0;
const cr = pt, pr = Wa, lr = /\\\\n/g, ur = /(\\)?\\n/g;
class dr extends cr.Polling {
  /**
   * JSON-P polling transport.
   */
  constructor(e) {
    super(e), this.head = "___eio[" + (e._query.j || "").replace(/[^0-9]/g, "") + "](", this.foot = ");";
  }
  onData(e) {
    e = pr.parse(e).d, typeof e == "string" && (e = e.replace(ur, function(t, s) {
      return s ? t : `
`;
    }), super.onData(e.replace(lr, "\\n")));
  }
  doWrite(e, t, s) {
    const n = JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    e = this.head + n + this.foot, super.doWrite(e, t, s);
  }
}
es.JSONP = dr;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.WebSocket = void 0;
const mr = ve, fr = K, Ei = (0, fr.default)("engine:ws");
let hr = class extends mr.Transport {
  /**
   * WebSocket transport
   *
   * @param {EngineRequest} req
   */
  constructor(e) {
    super(e), this._doSend = (t) => {
      this.socket.send(t, this._onSent);
    }, this._doSendLast = (t) => {
      this.socket.send(t, this._onSentLast);
    }, this._onSent = (t) => {
      t && this.onError("write error", t.stack);
    }, this._onSentLast = (t) => {
      t ? this.onError("write error", t.stack) : (this.emit("drain"), this.writable = !0, this.emit("ready"));
    }, this.socket = e.websocket, this.socket.on("message", (t, s) => {
      const n = s ? t : t.toString();
      Ei('received "%s"', n), super.onData(n);
    }), this.socket.once("close", this.onClose.bind(this)), this.socket.on("error", this.onError.bind(this)), this.writable = !0, this.perMessageDeflate = null;
  }
  /**
   * Transport name
   */
  get name() {
    return "websocket";
  }
  /**
   * Advertise upgrade support.
   */
  get handlesUpgrades() {
    return !0;
  }
  send(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const s = e[t], n = t + 1 === e.length;
      this._canSendPreEncodedFrame(s) ? this.socket._sender.sendFrame(s.options.wsPreEncodedFrame, n ? this._onSentLast : this._onSent) : this.parser.encodePacket(s, this.supportsBinary, n ? this._doSendLast : this._doSend);
    }
  }
  /**
   * Whether the encoding of the WebSocket frame can be skipped.
   * @param packet
   * @private
   */
  _canSendPreEncodedFrame(e) {
    var t, s, n;
    return !this.perMessageDeflate && // @ts-expect-error use of untyped member
    typeof ((s = (t = this.socket) === null || t === void 0 ? void 0 : t._sender) === null || s === void 0 ? void 0 : s.sendFrame) == "function" && ((n = e.options) === null || n === void 0 ? void 0 : n.wsPreEncodedFrame) !== void 0;
  }
  doClose(e) {
    Ei("closing"), this.socket.close(), e && e();
  }
};
ts.WebSocket = hr;
var ut = {};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.WebTransport = void 0;
const vr = ve, xr = K, gr = lt, Me = (0, xr.default)("engine:webtransport");
class br extends vr.Transport {
  constructor(e, t, s) {
    super({ _query: { EIO: "4" } }), this.session = e;
    const n = (0, gr.createPacketEncoderStream)();
    n.readable.pipeTo(t.writable).catch(() => {
      Me("the stream was closed");
    }), this.writer = n.writable.getWriter(), (async () => {
      try {
        for (; ; ) {
          const { value: a, done: o } = await s.read();
          if (o) {
            Me("session is closed");
            break;
          }
          Me("received chunk: %o", a), this.onPacket(a);
        }
      } catch (a) {
        Me("error while reading: %s", a.message);
      }
    })(), e.closed.then(() => this.onClose()), this.writable = !0;
  }
  get name() {
    return "webtransport";
  }
  async send(e) {
    this.writable = !1;
    try {
      for (let t = 0; t < e.length; t++) {
        const s = e[t];
        await this.writer.write(s);
      }
    } catch (t) {
      Me("error while writing: %s", t.message);
    }
    this.emit("drain"), this.writable = !0, this.emit("ready");
  }
  doClose(e) {
    Me("closing WebTransport session"), this.session.close(), e && e();
  }
}
ut.WebTransport = br;
Object.defineProperty(Xt, "__esModule", { value: !0 });
const yr = pt, _r = es, wr = ts, Er = ut;
Xt.default = {
  polling: Hn,
  websocket: wr.WebSocket,
  webtransport: Er.WebTransport
};
function Hn(i) {
  return typeof i._query.j == "string" ? new _r.JSONP(i) : new yr.Polling(i);
}
Hn.upgradesTo = ["websocket", "webtransport"];
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.Socket = void 0;
const kr = Te, Sr = K, me = Va, V = (0, Sr.default)("engine:socket");
let Cr = class extends kr.EventEmitter {
  get readyState() {
    return this._readyState;
  }
  set readyState(e) {
    V("readyState updated from %s to %s", this._readyState, e), this._readyState = e;
  }
  constructor(e, t, s, n, a) {
    super(), this._readyState = "opening", this.upgrading = !1, this.upgraded = !1, this.writeBuffer = [], this.packetsFn = [], this.sentCallbackFn = [], this.cleanupFn = [], this.id = e, this.server = t, this.request = n, this.protocol = a, n && (n.websocket && n.websocket._socket ? this.remoteAddress = n.websocket._socket.remoteAddress : this.remoteAddress = n.connection.remoteAddress), this.pingTimeoutTimer = null, this.pingIntervalTimer = null, this.setTransport(s), this.onOpen();
  }
  /**
   * Called upon transport considered open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", this.transport.sid = this.id, this.sendPacket("open", JSON.stringify({
      sid: this.id,
      upgrades: this.getAvailableUpgrades(),
      pingInterval: this.server.opts.pingInterval,
      pingTimeout: this.server.opts.pingTimeout,
      maxPayload: this.server.opts.maxHttpBufferSize
    })), this.server.opts.initialPacket && this.sendPacket("message", this.server.opts.initialPacket), this.emit("open"), this.protocol === 3 ? this.resetPingTimeout() : this.schedulePing();
  }
  /**
   * Called upon transport packet.
   *
   * @param {Object} packet
   * @private
   */
  onPacket(e) {
    if (this.readyState !== "open")
      return V("packet received with closed socket");
    switch (V(`received packet ${e.type}`), this.emit("packet", e), e.type) {
      case "ping":
        if (this.transport.protocol !== 3) {
          this.onError(new Error("invalid heartbeat direction"));
          return;
        }
        V("got ping"), this.pingTimeoutTimer.refresh(), this.sendPacket("pong"), this.emit("heartbeat");
        break;
      case "pong":
        if (this.transport.protocol === 3) {
          this.onError(new Error("invalid heartbeat direction"));
          return;
        }
        V("got pong"), (0, me.clearTimeout)(this.pingTimeoutTimer), this.pingIntervalTimer.refresh(), this.emit("heartbeat");
        break;
      case "error":
        this.onClose("parse error");
        break;
      case "message":
        this.emit("data", e.data), this.emit("message", e.data);
        break;
    }
  }
  /**
   * Called upon transport error.
   *
   * @param {Error} err - error object
   * @private
   */
  onError(e) {
    V("transport error"), this.onClose("transport error", e);
  }
  /**
   * Pings client every `this.pingInterval` and expects response
   * within `this.pingTimeout` or closes connection.
   *
   * @private
   */
  schedulePing() {
    this.pingIntervalTimer = (0, me.setTimeout)(() => {
      V("writing ping packet - expecting pong within %sms", this.server.opts.pingTimeout), this.sendPacket("ping"), this.resetPingTimeout();
    }, this.server.opts.pingInterval);
  }
  /**
   * Resets ping timeout.
   *
   * @private
   */
  resetPingTimeout() {
    (0, me.clearTimeout)(this.pingTimeoutTimer), this.pingTimeoutTimer = (0, me.setTimeout)(() => {
      this.readyState !== "closed" && this.onClose("ping timeout");
    }, this.protocol === 3 ? this.server.opts.pingInterval + this.server.opts.pingTimeout : this.server.opts.pingTimeout);
  }
  /**
   * Attaches handlers for the given transport.
   *
   * @param {Transport} transport
   * @private
   */
  setTransport(e) {
    const t = this.onError.bind(this), s = () => this.flush(), n = this.onPacket.bind(this), a = this.onDrain.bind(this), o = this.onClose.bind(this, "transport close");
    this.transport = e, this.transport.once("error", t), this.transport.on("ready", s), this.transport.on("packet", n), this.transport.on("drain", a), this.transport.once("close", o), this.cleanupFn.push(function() {
      e.removeListener("error", t), e.removeListener("ready", s), e.removeListener("packet", n), e.removeListener("drain", a), e.removeListener("close", o);
    });
  }
  /**
   * Upon transport "drain" event
   *
   * @private
   */
  onDrain() {
    if (this.sentCallbackFn.length > 0) {
      V("executing batch send callback");
      const e = this.sentCallbackFn.shift();
      if (e)
        for (let t = 0; t < e.length; t++)
          e[t](this.transport);
    }
  }
  /**
   * Upgrades socket to the given transport
   *
   * @param {Transport} transport
   * @private
   */
  /* private */
  _maybeUpgrade(e) {
    V('might upgrade socket transport from "%s" to "%s"', this.transport.name, e.name), this.upgrading = !0;
    const t = (0, me.setTimeout)(() => {
      V("client did not complete upgrade - closing transport"), o(), e.readyState === "open" && e.close();
    }, this.server.opts.upgradeTimeout);
    let s;
    const n = (u) => {
      u.type === "ping" && u.data === "probe" ? (V("got probe ping packet, sending pong"), e.send([{ type: "pong", data: "probe" }]), this.emit("upgrading", e), clearInterval(s), s = setInterval(a, 100)) : u.type === "upgrade" && this.readyState !== "closed" ? (V("got upgrade packet - upgrading"), o(), this.transport.discard(), this.upgraded = !0, this.clearTransport(), this.setTransport(e), this.emit("upgrade", e), this.flush(), this.readyState === "closing" && e.close(() => {
        this.onClose("forced close");
      })) : (o(), e.close());
    }, a = () => {
      this.transport.name === "polling" && this.transport.writable && (V("writing a noop packet to polling for fast upgrade"), this.transport.send([{ type: "noop" }]));
    }, o = () => {
      this.upgrading = !1, clearInterval(s), (0, me.clearTimeout)(t), e.removeListener("packet", n), e.removeListener("close", p), e.removeListener("error", r), this.removeListener("close", c);
    }, r = (u) => {
      V("client did not complete upgrade - %s", u), o(), e.close(), e = null;
    }, p = () => {
      r("transport closed");
    }, c = () => {
      r("socket closed");
    };
    e.on("packet", n), e.once("close", p), e.once("error", r), this.once("close", c);
  }
  /**
   * Clears listeners and timers associated with current transport.
   *
   * @private
   */
  clearTransport() {
    let e;
    const t = this.cleanupFn.length;
    for (let s = 0; s < t; s++)
      e = this.cleanupFn.shift(), e();
    this.transport.on("error", function() {
      V("error triggered by discarded transport");
    }), this.transport.close(), (0, me.clearTimeout)(this.pingTimeoutTimer);
  }
  /**
   * Called upon transport considered closed.
   * Possible reasons: `ping timeout`, `client error`, `parse error`,
   * `transport error`, `server close`, `transport close`
   */
  onClose(e, t) {
    this.readyState !== "closed" && (this.readyState = "closed", (0, me.clearTimeout)(this.pingIntervalTimer), (0, me.clearTimeout)(this.pingTimeoutTimer), process.nextTick(() => {
      this.writeBuffer = [];
    }), this.packetsFn = [], this.sentCallbackFn = [], this.clearTransport(), this.emit("close", e, t));
  }
  /**
   * Sends a message packet.
   *
   * @param {Object} data
   * @param {Object} options
   * @param {Function} callback
   * @return {Socket} for chaining
   */
  send(e, t, s) {
    return this.sendPacket("message", e, t, s), this;
  }
  /**
   * Alias of {@link send}.
   *
   * @param data
   * @param options
   * @param callback
   */
  write(e, t, s) {
    return this.sendPacket("message", e, t, s), this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type - packet type
   * @param {String} data
   * @param {Object} options
   * @param {Function} callback
   *
   * @private
   */
  sendPacket(e, t, s = {}, n) {
    if (typeof s == "function" && (n = s, s = {}), this.readyState !== "closing" && this.readyState !== "closed") {
      V('sending packet "%s" (%s)', e, t), s.compress = s.compress !== !1;
      const a = {
        type: e,
        options: s
      };
      t && (a.data = t), this.emit("packetCreate", a), this.writeBuffer.push(a), typeof n == "function" && this.packetsFn.push(n), this.flush();
    }
  }
  /**
   * Attempts to flush the packets buffer.
   *
   * @private
   */
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && this.writeBuffer.length) {
      V("flushing buffer to transport"), this.emit("flush", this.writeBuffer), this.server.emit("flush", this, this.writeBuffer);
      const e = this.writeBuffer;
      this.writeBuffer = [], this.packetsFn.length ? (this.sentCallbackFn.push(this.packetsFn), this.packetsFn = []) : this.sentCallbackFn.push(null), this.transport.send(e), this.emit("drain"), this.server.emit("drain", this);
    }
  }
  /**
   * Get available upgrades for this socket.
   *
   * @private
   */
  getAvailableUpgrades() {
    const e = [], t = this.server.upgrades(this.transport.name);
    for (let s = 0; s < t.length; ++s) {
      const n = t[s];
      this.server.opts.transports.indexOf(n) !== -1 && e.push(n);
    }
    return e;
  }
  /**
   * Closes the socket and underlying transport.
   *
   * @param {Boolean} discard - optional, discard the transport
   * @return {Socket} for chaining
   */
  close(e) {
    if (e && (this.readyState === "open" || this.readyState === "closing"))
      return this.closeTransport(e);
    if (this.readyState === "open") {
      if (this.readyState = "closing", this.writeBuffer.length) {
        V("there are %d remaining packets in the buffer, waiting for the 'drain' event", this.writeBuffer.length), this.once("drain", () => {
          V("all packets have been sent, closing the transport"), this.closeTransport(e);
        });
        return;
      }
      V("the buffer is empty, closing the transport right away"), this.closeTransport(e);
    }
  }
  /**
   * Closes the underlying transport.
   *
   * @param {Boolean} discard
   * @private
   */
  closeTransport(e) {
    V("closing the transport (discard? %s)", !!e), e && this.transport.discard(), this.transport.close(this.onClose.bind(this, "forced close"));
  }
};
dt.Socket = Cr;
var Zs = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
Zs.parse = Nr;
Zs.serialize = Br;
var Tr = Object.prototype.toString, Or = Object.prototype.hasOwnProperty, Rr = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, Ar = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, Pr = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, jr = /^[\u0020-\u003A\u003D-\u007E]*$/;
function Nr(i, e) {
  if (typeof i != "string")
    throw new TypeError("argument str must be a string");
  var t = {}, s = i.length;
  if (s < 2) return t;
  var n = e && e.decode || Ir, a = 0, o = 0, r = 0;
  do {
    if (o = i.indexOf("=", a), o === -1) break;
    if (r = i.indexOf(";", a), r === -1)
      r = s;
    else if (o > r) {
      a = i.lastIndexOf(";", o - 1) + 1;
      continue;
    }
    var p = ki(i, a, o), c = Si(i, o, p), u = i.slice(p, c);
    if (!Or.call(t, u)) {
      var l = ki(i, o + 1, r), d = Si(i, r, l);
      i.charCodeAt(l) === 34 && i.charCodeAt(d - 1) === 34 && (l++, d--);
      var v = i.slice(l, d);
      t[u] = Fr(v, n);
    }
    a = r + 1;
  } while (a < s);
  return t;
}
function ki(i, e, t) {
  do {
    var s = i.charCodeAt(e);
    if (s !== 32 && s !== 9) return e;
  } while (++e < t);
  return t;
}
function Si(i, e, t) {
  for (; e > t; ) {
    var s = i.charCodeAt(--e);
    if (s !== 32 && s !== 9) return e + 1;
  }
  return t;
}
function Br(i, e, t) {
  var s = t && t.encode || encodeURIComponent;
  if (typeof s != "function")
    throw new TypeError("option encode is invalid");
  if (!Rr.test(i))
    throw new TypeError("argument name is invalid");
  var n = s(e);
  if (!Ar.test(n))
    throw new TypeError("argument val is invalid");
  var a = i + "=" + n;
  if (!t) return a;
  if (t.maxAge != null) {
    var o = Math.floor(t.maxAge);
    if (!isFinite(o))
      throw new TypeError("option maxAge is invalid");
    a += "; Max-Age=" + o;
  }
  if (t.domain) {
    if (!Pr.test(t.domain))
      throw new TypeError("option domain is invalid");
    a += "; Domain=" + t.domain;
  }
  if (t.path) {
    if (!jr.test(t.path))
      throw new TypeError("option path is invalid");
    a += "; Path=" + t.path;
  }
  if (t.expires) {
    var r = t.expires;
    if (!Lr(r) || isNaN(r.valueOf()))
      throw new TypeError("option expires is invalid");
    a += "; Expires=" + r.toUTCString();
  }
  if (t.httpOnly && (a += "; HttpOnly"), t.secure && (a += "; Secure"), t.partitioned && (a += "; Partitioned"), t.priority) {
    var p = typeof t.priority == "string" ? t.priority.toLowerCase() : t.priority;
    switch (p) {
      case "low":
        a += "; Priority=Low";
        break;
      case "medium":
        a += "; Priority=Medium";
        break;
      case "high":
        a += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (t.sameSite) {
    var c = typeof t.sameSite == "string" ? t.sameSite.toLowerCase() : t.sameSite;
    switch (c) {
      case !0:
        a += "; SameSite=Strict";
        break;
      case "lax":
        a += "; SameSite=Lax";
        break;
      case "strict":
        a += "; SameSite=Strict";
        break;
      case "none":
        a += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return a;
}
function Ir(i) {
  return i.indexOf("%") !== -1 ? decodeURIComponent(i) : i;
}
function Lr(i) {
  return Tr.call(i) === "[object Date]";
}
function Fr(i, e) {
  try {
    return e(i);
  } catch {
    return i;
  }
}
var qt = { exports: {} };
const Gn = ["nodebuffer", "arraybuffer", "fragments"], Kn = typeof Blob < "u";
Kn && Gn.push("blob");
var Oe = {
  BINARY_TYPES: Gn,
  CLOSE_TIMEOUT: 3e4,
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
  hasBlob: Kn,
  kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
  kListener: Symbol("kListener"),
  kStatusCode: Symbol("status-code"),
  kWebSocket: Symbol("websocket"),
  NOOP: () => {
  }
}, kt = { exports: {} };
function Yn(i) {
  throw new Error('Could not dynamically require "' + i + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var St = { exports: {} }, ys, Ci;
function Dr() {
  if (Ci) return ys;
  Ci = 1;
  var i = Vs, e = Hs, t = Cn, s = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Yn, n = process.config && process.config.variables || {}, a = !!process.env.PREBUILDS_ONLY, o = process.versions.modules, r = _() ? "electron" : w() ? "node-webkit" : "node", p = process.env.npm_config_arch || t.arch(), c = process.env.npm_config_platform || t.platform(), u = process.env.LIBC || (j(c) ? "musl" : "glibc"), l = process.env.ARM_VERSION || (p === "arm64" ? "8" : n.arm_version) || "", d = (process.versions.uv || "").split(".")[0];
  ys = v;
  function v(y) {
    return s(v.resolve(y));
  }
  v.resolve = v.path = function(y) {
    y = e.resolve(y || ".");
    try {
      var R = s(e.join(y, "package.json")).name.toUpperCase().replace(/-/g, "_");
      process.env[R + "_PREBUILD"] && (y = process.env[R + "_PREBUILD"]);
    } catch {
    }
    if (!a) {
      var E = h(e.join(y, "build/Release"), x);
      if (E) return E;
      var f = h(e.join(y, "build/Debug"), x);
      if (f) return f;
    }
    var b = D(y);
    if (b) return b;
    var k = D(e.dirname(process.execPath));
    if (k) return k;
    var P = [
      "platform=" + c,
      "arch=" + p,
      "runtime=" + r,
      "abi=" + o,
      "uv=" + d,
      l ? "armv=" + l : "",
      "libc=" + u,
      "node=" + process.versions.node,
      process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ == "function" ? "webpack=true" : ""
      // eslint-disable-line
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + P + `
    loaded from: ` + y + `
`);
    function D(H) {
      var te = m(e.join(H, "prebuilds")).map(S), oe = te.filter(T(c, p)).sort(I)[0];
      if (oe) {
        var ge = e.join(H, "prebuilds", oe.name), fs = m(ge).map(B), et = fs.filter($(r, o)), yt = et.sort(C(r))[0];
        if (yt) return e.join(ge, yt.file);
      }
    }
  };
  function m(y) {
    try {
      return i.readdirSync(y);
    } catch {
      return [];
    }
  }
  function h(y, R) {
    var E = m(y).filter(R);
    return E[0] && e.join(y, E[0]);
  }
  function x(y) {
    return /\.node$/.test(y);
  }
  function S(y) {
    var R = y.split("-");
    if (R.length === 2) {
      var E = R[0], f = R[1].split("+");
      if (E && f.length && f.every(Boolean))
        return { name: y, platform: E, architectures: f };
    }
  }
  function T(y, R) {
    return function(E) {
      return E == null || E.platform !== y ? !1 : E.architectures.includes(R);
    };
  }
  function I(y, R) {
    return y.architectures.length - R.architectures.length;
  }
  function B(y) {
    var R = y.split("."), E = R.pop(), f = { file: y, specificity: 0 };
    if (E === "node") {
      for (var b = 0; b < R.length; b++) {
        var k = R[b];
        if (k === "node" || k === "electron" || k === "node-webkit")
          f.runtime = k;
        else if (k === "napi")
          f.napi = !0;
        else if (k.slice(0, 3) === "abi")
          f.abi = k.slice(3);
        else if (k.slice(0, 2) === "uv")
          f.uv = k.slice(2);
        else if (k.slice(0, 4) === "armv")
          f.armv = k.slice(4);
        else if (k === "glibc" || k === "musl")
          f.libc = k;
        else
          continue;
        f.specificity++;
      }
      return f;
    }
  }
  function $(y, R) {
    return function(E) {
      return !(E == null || E.runtime && E.runtime !== y && !g(E) || E.abi && E.abi !== R && !E.napi || E.uv && E.uv !== d || E.armv && E.armv !== l || E.libc && E.libc !== u);
    };
  }
  function g(y) {
    return y.runtime === "node" && y.napi;
  }
  function C(y) {
    return function(R, E) {
      return R.runtime !== E.runtime ? R.runtime === y ? -1 : 1 : R.abi !== E.abi ? R.abi ? -1 : 1 : R.specificity !== E.specificity ? R.specificity > E.specificity ? -1 : 1 : 0;
    };
  }
  function w() {
    return !!(process.versions && process.versions.nw);
  }
  function _() {
    return process.versions && process.versions.electron || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < "u" && window.process && window.process.type === "renderer";
  }
  function j(y) {
    return y === "linux" && i.existsSync("/etc/alpine-release");
  }
  return v.parseTags = B, v.matchTags = $, v.compareTags = C, v.parseTuple = S, v.matchTuple = T, v.compareTuples = I, ys;
}
var Ti;
function Jn() {
  if (Ti) return St.exports;
  Ti = 1;
  const i = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Yn;
  return typeof i.addon == "function" ? St.exports = i.addon.bind(i) : St.exports = Dr(), St.exports;
}
var _s, Oi;
function $r() {
  return Oi || (Oi = 1, _s = { mask: (t, s, n, a, o) => {
    for (var r = 0; r < o; r++)
      n[a + r] = t[r] ^ s[r & 3];
  }, unmask: (t, s) => {
    const n = t.length;
    for (var a = 0; a < n; a++)
      t[a] ^= s[a & 3];
  } }), _s;
}
var Ri;
function Ur() {
  if (Ri) return kt.exports;
  Ri = 1;
  try {
    kt.exports = Jn()(__dirname);
  } catch {
    kt.exports = $r();
  }
  return kt.exports;
}
var Mr, qr;
const { EMPTY_BUFFER: zr } = Oe, Ls = Buffer[Symbol.species];
function Wr(i, e) {
  if (i.length === 0) return zr;
  if (i.length === 1) return i[0];
  const t = Buffer.allocUnsafe(e);
  let s = 0;
  for (let n = 0; n < i.length; n++) {
    const a = i[n];
    t.set(a, s), s += a.length;
  }
  return s < e ? new Ls(t.buffer, t.byteOffset, s) : t;
}
function Qn(i, e, t, s, n) {
  for (let a = 0; a < n; a++)
    t[s + a] = i[a] ^ e[a & 3];
}
function Xn(i, e) {
  for (let t = 0; t < i.length; t++)
    i[t] ^= e[t & 3];
}
function Vr(i) {
  return i.length === i.buffer.byteLength ? i.buffer : i.buffer.slice(i.byteOffset, i.byteOffset + i.length);
}
function Fs(i) {
  if (Fs.readOnly = !0, Buffer.isBuffer(i)) return i;
  let e;
  return i instanceof ArrayBuffer ? e = new Ls(i) : ArrayBuffer.isView(i) ? e = new Ls(i.buffer, i.byteOffset, i.byteLength) : (e = Buffer.from(i), Fs.readOnly = !1), e;
}
qt.exports = {
  concat: Wr,
  mask: Qn,
  toArrayBuffer: Vr,
  toBuffer: Fs,
  unmask: Xn
};
if (!process.env.WS_NO_BUFFER_UTIL)
  try {
    const i = Ur();
    qr = qt.exports.mask = function(e, t, s, n, a) {
      a < 48 ? Qn(e, t, s, n, a) : i.mask(e, t, s, n, a);
    }, Mr = qt.exports.unmask = function(e, t) {
      e.length < 32 ? Xn(e, t) : i.unmask(e, t);
    };
  } catch {
  }
var ss = qt.exports;
const Ai = Symbol("kDone"), ws = Symbol("kRun");
let Hr = class {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(e) {
    this[Ai] = () => {
      this.pending--, this[ws]();
    }, this.concurrency = e || 1 / 0, this.jobs = [], this.pending = 0;
  }
  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(e) {
    this.jobs.push(e), this[ws]();
  }
  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [ws]() {
    if (this.pending !== this.concurrency && this.jobs.length) {
      const e = this.jobs.shift();
      this.pending++, e(this[Ai]);
    }
  }
};
var Gr = Hr;
const tt = Qt, Pi = ss, Kr = Gr, { kStatusCode: Zn } = Oe, Yr = Buffer[Symbol.species], Jr = Buffer.from([0, 0, 255, 255]), zt = Symbol("permessage-deflate"), fe = Symbol("total-length"), Ve = Symbol("callback"), ye = Symbol("buffers"), Je = Symbol("error");
let Ct, Qr = class {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {Boolean} [options.isServer=false] Create the instance in either
   *     server or client mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   */
  constructor(e) {
    if (this._options = e || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._maxPayload = this._options.maxPayload | 0, this._isServer = !!this._options.isServer, this._deflate = null, this._inflate = null, this.params = null, !Ct) {
      const t = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
      Ct = new Kr(t);
    }
  }
  /**
   * @type {String}
   */
  static get extensionName() {
    return "permessage-deflate";
  }
  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const e = {};
    return this._options.serverNoContextTakeover && (e.server_no_context_takeover = !0), this._options.clientNoContextTakeover && (e.client_no_context_takeover = !0), this._options.serverMaxWindowBits && (e.server_max_window_bits = this._options.serverMaxWindowBits), this._options.clientMaxWindowBits ? e.client_max_window_bits = this._options.clientMaxWindowBits : this._options.clientMaxWindowBits == null && (e.client_max_window_bits = !0), e;
  }
  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(e) {
    return e = this.normalizeParams(e), this.params = this._isServer ? this.acceptAsServer(e) : this.acceptAsClient(e), this.params;
  }
  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate && (this._inflate.close(), this._inflate = null), this._deflate) {
      const e = this._deflate[Ve];
      this._deflate.close(), this._deflate = null, e && e(
        new Error(
          "The deflate stream was closed while data was being processed"
        )
      );
    }
  }
  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(e) {
    const t = this._options, s = e.find((n) => !(t.serverNoContextTakeover === !1 && n.server_no_context_takeover || n.server_max_window_bits && (t.serverMaxWindowBits === !1 || typeof t.serverMaxWindowBits == "number" && t.serverMaxWindowBits > n.server_max_window_bits) || typeof t.clientMaxWindowBits == "number" && (typeof n.client_max_window_bits == "number" ? t.clientMaxWindowBits > n.client_max_window_bits : !n.client_max_window_bits)));
    if (!s)
      throw new Error("None of the extension offers can be accepted");
    return t.serverNoContextTakeover && (s.server_no_context_takeover = !0), t.clientNoContextTakeover && (s.client_no_context_takeover = !0), typeof t.serverMaxWindowBits == "number" && (s.server_max_window_bits = t.serverMaxWindowBits), typeof t.clientMaxWindowBits == "number" ? s.client_max_window_bits = t.clientMaxWindowBits : (s.client_max_window_bits === !0 || t.clientMaxWindowBits === !1) && delete s.client_max_window_bits, s;
  }
  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(e) {
    const t = e[0];
    if (this._options.clientNoContextTakeover === !1 && t.client_no_context_takeover)
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    if (!t.client_max_window_bits)
      typeof this._options.clientMaxWindowBits == "number" && (t.client_max_window_bits = this._options.clientMaxWindowBits);
    else if (this._options.clientMaxWindowBits === !1 || typeof this._options.clientMaxWindowBits == "number" && t.client_max_window_bits > this._options.clientMaxWindowBits)
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    return t;
  }
  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(e) {
    return e.forEach((t) => {
      Object.keys(t).forEach((s) => {
        let n = t[s];
        if (n.length > 1)
          throw new Error(`Parameter "${s}" must have only a single value`);
        if (n = n[0], s === "client_max_window_bits") {
          if (n !== !0) {
            const a = +n;
            if (!Number.isInteger(a) || a < 8 || a > 15)
              throw new TypeError(
                `Invalid value for parameter "${s}": ${n}`
              );
            n = a;
          } else if (!this._isServer)
            throw new TypeError(
              `Invalid value for parameter "${s}": ${n}`
            );
        } else if (s === "server_max_window_bits") {
          const a = +n;
          if (!Number.isInteger(a) || a < 8 || a > 15)
            throw new TypeError(
              `Invalid value for parameter "${s}": ${n}`
            );
          n = a;
        } else if (s === "client_no_context_takeover" || s === "server_no_context_takeover") {
          if (n !== !0)
            throw new TypeError(
              `Invalid value for parameter "${s}": ${n}`
            );
        } else
          throw new Error(`Unknown parameter "${s}"`);
        t[s] = n;
      });
    }), e;
  }
  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(e, t, s) {
    Ct.add((n) => {
      this._decompress(e, t, (a, o) => {
        n(), s(a, o);
      });
    });
  }
  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(e, t, s) {
    Ct.add((n) => {
      this._compress(e, t, (a, o) => {
        n(), s(a, o);
      });
    });
  }
  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(e, t, s) {
    const n = this._isServer ? "client" : "server";
    if (!this._inflate) {
      const a = `${n}_max_window_bits`, o = typeof this.params[a] != "number" ? tt.Z_DEFAULT_WINDOWBITS : this.params[a];
      this._inflate = tt.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits: o
      }), this._inflate[zt] = this, this._inflate[fe] = 0, this._inflate[ye] = [], this._inflate.on("error", Zr), this._inflate.on("data", ea);
    }
    this._inflate[Ve] = s, this._inflate.write(e), t && this._inflate.write(Jr), this._inflate.flush(() => {
      const a = this._inflate[Je];
      if (a) {
        this._inflate.close(), this._inflate = null, s(a);
        return;
      }
      const o = Pi.concat(
        this._inflate[ye],
        this._inflate[fe]
      );
      this._inflate._readableState.endEmitted ? (this._inflate.close(), this._inflate = null) : (this._inflate[fe] = 0, this._inflate[ye] = [], t && this.params[`${n}_no_context_takeover`] && this._inflate.reset()), s(null, o);
    });
  }
  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(e, t, s) {
    const n = this._isServer ? "server" : "client";
    if (!this._deflate) {
      const a = `${n}_max_window_bits`, o = typeof this.params[a] != "number" ? tt.Z_DEFAULT_WINDOWBITS : this.params[a];
      this._deflate = tt.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits: o
      }), this._deflate[fe] = 0, this._deflate[ye] = [], this._deflate.on("data", Xr);
    }
    this._deflate[Ve] = s, this._deflate.write(e), this._deflate.flush(tt.Z_SYNC_FLUSH, () => {
      if (!this._deflate)
        return;
      let a = Pi.concat(
        this._deflate[ye],
        this._deflate[fe]
      );
      t && (a = new Yr(a.buffer, a.byteOffset, a.length - 4)), this._deflate[Ve] = null, this._deflate[fe] = 0, this._deflate[ye] = [], t && this.params[`${n}_no_context_takeover`] && this._deflate.reset(), s(null, a);
    });
  }
};
var mt = Qr;
function Xr(i) {
  this[ye].push(i), this[fe] += i.length;
}
function ea(i) {
  if (this[fe] += i.length, this[zt]._maxPayload < 1 || this[fe] <= this[zt]._maxPayload) {
    this[ye].push(i);
    return;
  }
  this[Je] = new RangeError("Max payload size exceeded"), this[Je].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[Je][Zn] = 1009, this.removeListener("data", ea), this.reset();
}
function Zr(i) {
  if (this[zt]._inflate = null, this[Je]) {
    this[Ve](this[Je]);
    return;
  }
  i[Zn] = 1007, this[Ve](i);
}
var Wt = { exports: {} }, Tt = { exports: {} }, Es, ji;
function ec() {
  if (ji) return Es;
  ji = 1;
  function i(e) {
    const t = e.length;
    let s = 0;
    for (; s < t; )
      if (!(e[s] & 128))
        s++;
      else if ((e[s] & 224) === 192) {
        if (s + 1 === t || (e[s + 1] & 192) !== 128 || (e[s] & 254) === 192)
          return !1;
        s += 2;
      } else if ((e[s] & 240) === 224) {
        if (s + 2 >= t || (e[s + 1] & 192) !== 128 || (e[s + 2] & 192) !== 128 || e[s] === 224 && (e[s + 1] & 224) === 128 || // overlong
        e[s] === 237 && (e[s + 1] & 224) === 160)
          return !1;
        s += 3;
      } else if ((e[s] & 248) === 240) {
        if (s + 3 >= t || (e[s + 1] & 192) !== 128 || (e[s + 2] & 192) !== 128 || (e[s + 3] & 192) !== 128 || e[s] === 240 && (e[s + 1] & 240) === 128 || // overlong
        e[s] === 244 && e[s + 1] > 143 || e[s] > 244)
          return !1;
        s += 4;
      } else
        return !1;
    return !0;
  }
  return Es = i, Es;
}
var Ni;
function tc() {
  if (Ni) return Tt.exports;
  Ni = 1;
  try {
    Tt.exports = Jn()(__dirname);
  } catch {
    Tt.exports = ec();
  }
  return Tt.exports;
}
var Bi;
const { isUtf8: Ii } = Ja, { hasBlob: sc } = Oe, ic = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 16 - 31
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  // 48 - 63
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 64 - 79
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  // 80 - 95
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 96 - 111
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0
  // 112 - 127
];
function nc(i) {
  return i >= 1e3 && i <= 1014 && i !== 1004 && i !== 1005 && i !== 1006 || i >= 3e3 && i <= 4999;
}
function Ds(i) {
  const e = i.length;
  let t = 0;
  for (; t < e; )
    if (!(i[t] & 128))
      t++;
    else if ((i[t] & 224) === 192) {
      if (t + 1 === e || (i[t + 1] & 192) !== 128 || (i[t] & 254) === 192)
        return !1;
      t += 2;
    } else if ((i[t] & 240) === 224) {
      if (t + 2 >= e || (i[t + 1] & 192) !== 128 || (i[t + 2] & 192) !== 128 || i[t] === 224 && (i[t + 1] & 224) === 128 || // Overlong
      i[t] === 237 && (i[t + 1] & 224) === 160)
        return !1;
      t += 3;
    } else if ((i[t] & 248) === 240) {
      if (t + 3 >= e || (i[t + 1] & 192) !== 128 || (i[t + 2] & 192) !== 128 || (i[t + 3] & 192) !== 128 || i[t] === 240 && (i[t + 1] & 240) === 128 || // Overlong
      i[t] === 244 && i[t + 1] > 143 || i[t] > 244)
        return !1;
      t += 4;
    } else
      return !1;
  return !0;
}
function ac(i) {
  return sc && typeof i == "object" && typeof i.arrayBuffer == "function" && typeof i.type == "string" && typeof i.stream == "function" && (i[Symbol.toStringTag] === "Blob" || i[Symbol.toStringTag] === "File");
}
Wt.exports = {
  isBlob: ac,
  isValidStatusCode: nc,
  isValidUTF8: Ds,
  tokenChars: ic
};
if (Ii)
  Bi = Wt.exports.isValidUTF8 = function(i) {
    return i.length < 24 ? Ds(i) : Ii(i);
  };
else if (!process.env.WS_NO_UTF_8_VALIDATE)
  try {
    const i = tc();
    Bi = Wt.exports.isValidUTF8 = function(e) {
      return e.length < 32 ? Ds(e) : i(e);
    };
  } catch {
  }
var ft = Wt.exports;
const { Writable: oc } = Qe, Li = mt, {
  BINARY_TYPES: rc,
  EMPTY_BUFFER: Fi,
  kStatusCode: cc,
  kWebSocket: pc
} = Oe, { concat: ks, toArrayBuffer: lc, unmask: uc } = ss, { isValidStatusCode: dc, isValidUTF8: Di } = ft, Ot = Buffer[Symbol.species], se = 0, $i = 1, Ui = 2, Mi = 3, Ss = 4, Cs = 5, Rt = 6;
let mc = class extends oc {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxBufferedChunks=0] The maximum number of
   *     buffered data chunks
   * @param {Number} [options.maxFragments=0] The maximum number of message
   *     fragments
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(e = {}) {
    super(), this._allowSynchronousEvents = e.allowSynchronousEvents !== void 0 ? e.allowSynchronousEvents : !0, this._binaryType = e.binaryType || rc[0], this._extensions = e.extensions || {}, this._isServer = !!e.isServer, this._maxBufferedChunks = e.maxBufferedChunks | 0, this._maxFragments = e.maxFragments | 0, this._maxPayload = e.maxPayload | 0, this._skipUTF8Validation = !!e.skipUTF8Validation, this[pc] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._numFragments = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = se;
  }
  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(e, t, s) {
    if (this._opcode === 8 && this._state == se) return s();
    if (this._maxBufferedChunks > 0 && this._buffers.length >= this._maxBufferedChunks) {
      s(
        this.createError(
          RangeError,
          "Too many buffered chunks",
          !1,
          1008,
          "WS_ERR_TOO_MANY_BUFFERED_PARTS"
        )
      );
      return;
    }
    this._bufferedBytes += e.length, this._buffers.push(e), this.startLoop(s);
  }
  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(e) {
    if (this._bufferedBytes -= e, e === this._buffers[0].length) return this._buffers.shift();
    if (e < this._buffers[0].length) {
      const s = this._buffers[0];
      return this._buffers[0] = new Ot(
        s.buffer,
        s.byteOffset + e,
        s.length - e
      ), new Ot(s.buffer, s.byteOffset, e);
    }
    const t = Buffer.allocUnsafe(e);
    do {
      const s = this._buffers[0], n = t.length - e;
      e >= s.length ? t.set(this._buffers.shift(), n) : (t.set(new Uint8Array(s.buffer, s.byteOffset, e), n), this._buffers[0] = new Ot(
        s.buffer,
        s.byteOffset + e,
        s.length - e
      )), e -= s.length;
    } while (e > 0);
    return t;
  }
  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(e) {
    this._loop = !0;
    do
      switch (this._state) {
        case se:
          this.getInfo(e);
          break;
        case $i:
          this.getPayloadLength16(e);
          break;
        case Ui:
          this.getPayloadLength64(e);
          break;
        case Mi:
          this.getMask();
          break;
        case Ss:
          this.getData(e);
          break;
        case Cs:
        case Rt:
          this._loop = !1;
          return;
      }
    while (this._loop);
    this._errored || e();
  }
  /**
   * Reads the first two bytes of a frame.
   *
   * @param {Function} cb Callback
   * @private
   */
  getInfo(e) {
    if (this._bufferedBytes < 2) {
      this._loop = !1;
      return;
    }
    const t = this.consume(2);
    if (t[0] & 48) {
      const n = this.createError(
        RangeError,
        "RSV2 and RSV3 must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_RSV_2_3"
      );
      e(n);
      return;
    }
    const s = (t[0] & 64) === 64;
    if (s && !this._extensions[Li.extensionName]) {
      const n = this.createError(
        RangeError,
        "RSV1 must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_RSV_1"
      );
      e(n);
      return;
    }
    if (this._fin = (t[0] & 128) === 128, this._opcode = t[0] & 15, this._payloadLength = t[1] & 127, this._opcode === 0) {
      if (s) {
        const n = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        e(n);
        return;
      }
      if (!this._fragmented) {
        const n = this.createError(
          RangeError,
          "invalid opcode 0",
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        e(n);
        return;
      }
      this._opcode = this._fragmented;
    } else if (this._opcode === 1 || this._opcode === 2) {
      if (this._fragmented) {
        const n = this.createError(
          RangeError,
          `invalid opcode ${this._opcode}`,
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        e(n);
        return;
      }
      this._compressed = s;
    } else if (this._opcode > 7 && this._opcode < 11) {
      if (!this._fin) {
        const n = this.createError(
          RangeError,
          "FIN must be set",
          !0,
          1002,
          "WS_ERR_EXPECTED_FIN"
        );
        e(n);
        return;
      }
      if (s) {
        const n = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        e(n);
        return;
      }
      if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
        const n = this.createError(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          !0,
          1002,
          "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
        );
        e(n);
        return;
      }
    } else {
      const n = this.createError(
        RangeError,
        `invalid opcode ${this._opcode}`,
        !0,
        1002,
        "WS_ERR_INVALID_OPCODE"
      );
      e(n);
      return;
    }
    if (!this._fin && !this._fragmented && (this._fragmented = this._opcode), this._masked = (t[1] & 128) === 128, this._isServer) {
      if (!this._masked) {
        const n = this.createError(
          RangeError,
          "MASK must be set",
          !0,
          1002,
          "WS_ERR_EXPECTED_MASK"
        );
        e(n);
        return;
      }
    } else if (this._masked) {
      const n = this.createError(
        RangeError,
        "MASK must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_MASK"
      );
      e(n);
      return;
    }
    this._payloadLength === 126 ? this._state = $i : this._payloadLength === 127 ? this._state = Ui : this.haveLength(e);
  }
  /**
   * Gets extended payload length (7+16).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength16(e) {
    if (this._bufferedBytes < 2) {
      this._loop = !1;
      return;
    }
    this._payloadLength = this.consume(2).readUInt16BE(0), this.haveLength(e);
  }
  /**
   * Gets extended payload length (7+64).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength64(e) {
    if (this._bufferedBytes < 8) {
      this._loop = !1;
      return;
    }
    const t = this.consume(8), s = t.readUInt32BE(0);
    if (s > Math.pow(2, 21) - 1) {
      const n = this.createError(
        RangeError,
        "Unsupported WebSocket frame: payload length > 2^53 - 1",
        !1,
        1009,
        "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
      );
      e(n);
      return;
    }
    this._payloadLength = s * Math.pow(2, 32) + t.readUInt32BE(4), this.haveLength(e);
  }
  /**
   * Payload length has been read.
   *
   * @param {Function} cb Callback
   * @private
   */
  haveLength(e) {
    if (this._payloadLength && this._opcode < 8 && (this._totalPayloadLength += this._payloadLength, this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
      const t = this.createError(
        RangeError,
        "Max payload size exceeded",
        !1,
        1009,
        "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
      );
      e(t);
      return;
    }
    this._masked ? this._state = Mi : this._state = Ss;
  }
  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = !1;
      return;
    }
    this._mask = this.consume(4), this._state = Ss;
  }
  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @private
   */
  getData(e) {
    let t = Fi;
    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = !1;
        return;
      }
      t = this.consume(this._payloadLength), this._masked && this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] && uc(t, this._mask);
    }
    if (this._opcode > 7) {
      this.controlMessage(t, e);
      return;
    }
    if (this._maxFragments > 0 && ++this._numFragments > this._maxFragments) {
      const s = this.createError(
        RangeError,
        "Too many message fragments",
        !1,
        1008,
        "WS_ERR_TOO_MANY_BUFFERED_PARTS"
      );
      e(s);
      return;
    }
    if (this._compressed) {
      this._state = Cs, this.decompress(t, e);
      return;
    }
    t.length && (this._messageLength = this._totalPayloadLength, this._fragments.push(t)), this.dataMessage(e);
  }
  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(e, t) {
    this._extensions[Li.extensionName].decompress(e, this._fin, (n, a) => {
      if (n) return t(n);
      if (a.length) {
        if (this._messageLength += a.length, this._messageLength > this._maxPayload && this._maxPayload > 0) {
          const o = this.createError(
            RangeError,
            "Max payload size exceeded",
            !1,
            1009,
            "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
          );
          t(o);
          return;
        }
        this._fragments.push(a);
      }
      this.dataMessage(t), this._state === se && this.startLoop(t);
    });
  }
  /**
   * Handles a data message.
   *
   * @param {Function} cb Callback
   * @private
   */
  dataMessage(e) {
    if (!this._fin) {
      this._state = se;
      return;
    }
    const t = this._messageLength, s = this._fragments;
    if (this._totalPayloadLength = 0, this._messageLength = 0, this._fragmented = 0, this._numFragments = 0, this._fragments = [], this._opcode === 2) {
      let n;
      this._binaryType === "nodebuffer" ? n = ks(s, t) : this._binaryType === "arraybuffer" ? n = lc(ks(s, t)) : this._binaryType === "blob" ? n = new Blob(s) : n = s, this._allowSynchronousEvents ? (this.emit("message", n, !0), this._state = se) : (this._state = Rt, setImmediate(() => {
        this.emit("message", n, !0), this._state = se, this.startLoop(e);
      }));
    } else {
      const n = ks(s, t);
      if (!this._skipUTF8Validation && !Di(n)) {
        const a = this.createError(
          Error,
          "invalid UTF-8 sequence",
          !0,
          1007,
          "WS_ERR_INVALID_UTF8"
        );
        e(a);
        return;
      }
      this._state === Cs || this._allowSynchronousEvents ? (this.emit("message", n, !1), this._state = se) : (this._state = Rt, setImmediate(() => {
        this.emit("message", n, !1), this._state = se, this.startLoop(e);
      }));
    }
  }
  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(e, t) {
    if (this._opcode === 8) {
      if (e.length === 0)
        this._loop = !1, this.emit("conclude", 1005, Fi), this.end();
      else {
        const s = e.readUInt16BE(0);
        if (!dc(s)) {
          const a = this.createError(
            RangeError,
            `invalid status code ${s}`,
            !0,
            1002,
            "WS_ERR_INVALID_CLOSE_CODE"
          );
          t(a);
          return;
        }
        const n = new Ot(
          e.buffer,
          e.byteOffset + 2,
          e.length - 2
        );
        if (!this._skipUTF8Validation && !Di(n)) {
          const a = this.createError(
            Error,
            "invalid UTF-8 sequence",
            !0,
            1007,
            "WS_ERR_INVALID_UTF8"
          );
          t(a);
          return;
        }
        this._loop = !1, this.emit("conclude", s, n), this.end();
      }
      this._state = se;
      return;
    }
    this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", e), this._state = se) : (this._state = Rt, setImmediate(() => {
      this.emit(this._opcode === 9 ? "ping" : "pong", e), this._state = se, this.startLoop(t);
    }));
  }
  /**
   * Builds an error object.
   *
   * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
   * @param {String} message The error message
   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
   *     `message`
   * @param {Number} statusCode The status code
   * @param {String} errorCode The exposed error code
   * @return {(Error|RangeError)} The error
   * @private
   */
  createError(e, t, s, n, a) {
    this._loop = !1, this._errored = !0;
    const o = new e(
      s ? `Invalid WebSocket frame: ${t}` : t
    );
    return Error.captureStackTrace(o, this.createError), o.code = a, o[cc] = n, o;
  }
};
var ta = mc;
const { Duplex: Fu } = Qe, { randomFillSync: fc } = ct, {
  types: { isUint8Array: hc }
} = Sn, qi = mt, { EMPTY_BUFFER: vc, kWebSocket: xc, NOOP: gc } = Oe, { isBlob: qe, isValidStatusCode: bc } = ft, { mask: zi, toBuffer: Re } = ss, ie = Symbol("kByteLength"), yc = Buffer.alloc(4), Nt = 8 * 1024;
let Ae, ze = Nt;
const re = 0, _c = 1, wc = 2;
let Ec = class Ne {
  /**
   * Creates a Sender instance.
   *
   * @param {Duplex} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(e, t, s) {
    this._extensions = t || {}, s && (this._generateMask = s, this._maskBuffer = Buffer.alloc(4)), this._socket = e, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = re, this.onerror = gc, this[xc] = void 0;
  }
  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(e, t) {
    let s, n = !1, a = 2, o = !1;
    t.mask && (s = t.maskBuffer || yc, t.generateMask ? t.generateMask(s) : (ze === Nt && (Ae === void 0 && (Ae = Buffer.alloc(Nt)), fc(Ae, 0, Nt), ze = 0), s[0] = Ae[ze++], s[1] = Ae[ze++], s[2] = Ae[ze++], s[3] = Ae[ze++]), o = (s[0] | s[1] | s[2] | s[3]) === 0, a = 6);
    let r;
    typeof e == "string" ? (!t.mask || o) && t[ie] !== void 0 ? r = t[ie] : (e = Buffer.from(e), r = e.length) : (r = e.length, n = t.mask && t.readOnly && !o);
    let p = r;
    r >= 65536 ? (a += 8, p = 127) : r > 125 && (a += 2, p = 126);
    const c = Buffer.allocUnsafe(n ? r + a : a);
    return c[0] = t.fin ? t.opcode | 128 : t.opcode, t.rsv1 && (c[0] |= 64), c[1] = p, p === 126 ? c.writeUInt16BE(r, 2) : p === 127 && (c[2] = c[3] = 0, c.writeUIntBE(r, 4, 6)), t.mask ? (c[1] |= 128, c[a - 4] = s[0], c[a - 3] = s[1], c[a - 2] = s[2], c[a - 1] = s[3], o ? [c, e] : n ? (zi(e, s, c, a, r), [c]) : (zi(e, s, e, 0, r), [c, e])) : [c, e];
  }
  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(e, t, s, n) {
    let a;
    if (e === void 0)
      a = vc;
    else {
      if (typeof e != "number" || !bc(e))
        throw new TypeError("First argument must be a valid error code number");
      if (t === void 0 || !t.length)
        a = Buffer.allocUnsafe(2), a.writeUInt16BE(e, 0);
      else {
        const r = Buffer.byteLength(t);
        if (r > 123)
          throw new RangeError("The message must not be greater than 123 bytes");
        if (a = Buffer.allocUnsafe(2 + r), a.writeUInt16BE(e, 0), typeof t == "string")
          a.write(t, 2);
        else if (hc(t))
          a.set(t, 2);
        else
          throw new TypeError("Second argument must be a string or a Uint8Array");
      }
    }
    const o = {
      [ie]: a.length,
      fin: !0,
      generateMask: this._generateMask,
      mask: s,
      maskBuffer: this._maskBuffer,
      opcode: 8,
      readOnly: !1,
      rsv1: !1
    };
    this._state !== re ? this.enqueue([this.dispatch, a, !1, o, n]) : this.sendFrame(Ne.frame(a, o), n);
  }
  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(e, t, s) {
    let n, a;
    if (typeof e == "string" ? (n = Buffer.byteLength(e), a = !1) : qe(e) ? (n = e.size, a = !1) : (e = Re(e), n = e.length, a = Re.readOnly), n > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const o = {
      [ie]: n,
      fin: !0,
      generateMask: this._generateMask,
      mask: t,
      maskBuffer: this._maskBuffer,
      opcode: 9,
      readOnly: a,
      rsv1: !1
    };
    qe(e) ? this._state !== re ? this.enqueue([this.getBlobData, e, !1, o, s]) : this.getBlobData(e, !1, o, s) : this._state !== re ? this.enqueue([this.dispatch, e, !1, o, s]) : this.sendFrame(Ne.frame(e, o), s);
  }
  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(e, t, s) {
    let n, a;
    if (typeof e == "string" ? (n = Buffer.byteLength(e), a = !1) : qe(e) ? (n = e.size, a = !1) : (e = Re(e), n = e.length, a = Re.readOnly), n > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const o = {
      [ie]: n,
      fin: !0,
      generateMask: this._generateMask,
      mask: t,
      maskBuffer: this._maskBuffer,
      opcode: 10,
      readOnly: a,
      rsv1: !1
    };
    qe(e) ? this._state !== re ? this.enqueue([this.getBlobData, e, !1, o, s]) : this.getBlobData(e, !1, o, s) : this._state !== re ? this.enqueue([this.dispatch, e, !1, o, s]) : this.sendFrame(Ne.frame(e, o), s);
  }
  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(e, t, s) {
    const n = this._extensions[qi.extensionName];
    let a = t.binary ? 2 : 1, o = t.compress, r, p;
    typeof e == "string" ? (r = Buffer.byteLength(e), p = !1) : qe(e) ? (r = e.size, p = !1) : (e = Re(e), r = e.length, p = Re.readOnly), this._firstFragment ? (this._firstFragment = !1, o && n && n.params[n._isServer ? "server_no_context_takeover" : "client_no_context_takeover"] && (o = r >= n._threshold), this._compress = o) : (o = !1, a = 0), t.fin && (this._firstFragment = !0);
    const c = {
      [ie]: r,
      fin: t.fin,
      generateMask: this._generateMask,
      mask: t.mask,
      maskBuffer: this._maskBuffer,
      opcode: a,
      readOnly: p,
      rsv1: o
    };
    qe(e) ? this._state !== re ? this.enqueue([this.getBlobData, e, this._compress, c, s]) : this.getBlobData(e, this._compress, c, s) : this._state !== re ? this.enqueue([this.dispatch, e, this._compress, c, s]) : this.dispatch(e, this._compress, c, s);
  }
  /**
   * Gets the contents of a blob as binary data.
   *
   * @param {Blob} blob The blob
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     the data
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  getBlobData(e, t, s, n) {
    this._bufferedBytes += s[ie], this._state = wc, e.arrayBuffer().then((a) => {
      if (this._socket.destroyed) {
        const r = new Error(
          "The socket was closed while the blob was being read"
        );
        process.nextTick($s, this, r, n);
        return;
      }
      this._bufferedBytes -= s[ie];
      const o = Re(a);
      t ? this.dispatch(o, t, s, n) : (this._state = re, this.sendFrame(Ne.frame(o, s), n), this.dequeue());
    }).catch((a) => {
      process.nextTick(kc, this, a, n);
    });
  }
  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(e, t, s, n) {
    if (!t) {
      this.sendFrame(Ne.frame(e, s), n);
      return;
    }
    const a = this._extensions[qi.extensionName];
    this._bufferedBytes += s[ie], this._state = _c, a.compress(e, s.fin, (o, r) => {
      if (this._socket.destroyed) {
        const p = new Error(
          "The socket was closed while data was being compressed"
        );
        $s(this, p, n);
        return;
      }
      this._bufferedBytes -= s[ie], this._state = re, s.readOnly = !1, this.sendFrame(Ne.frame(r, s), n), this.dequeue();
    });
  }
  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    for (; this._state === re && this._queue.length; ) {
      const e = this._queue.shift();
      this._bufferedBytes -= e[3][ie], Reflect.apply(e[0], this, e.slice(1));
    }
  }
  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(e) {
    this._bufferedBytes += e[3][ie], this._queue.push(e);
  }
  /**
   * Sends a frame.
   *
   * @param {(Buffer | String)[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(e, t) {
    e.length === 2 ? (this._socket.cork(), this._socket.write(e[0]), this._socket.write(e[1], t), this._socket.uncork()) : this._socket.write(e[0], t);
  }
};
var sa = Ec;
function $s(i, e, t) {
  typeof t == "function" && t(e);
  for (let s = 0; s < i._queue.length; s++) {
    const n = i._queue[s], a = n[n.length - 1];
    typeof a == "function" && a(e);
  }
}
function kc(i, e, t) {
  $s(i, e, t), i.onerror(e);
}
const { kForOnEventAttribute: st, kListener: Ts } = Oe, Wi = Symbol("kCode"), Vi = Symbol("kData"), Hi = Symbol("kError"), Gi = Symbol("kMessage"), Ki = Symbol("kReason"), He = Symbol("kTarget"), Yi = Symbol("kType"), Ji = Symbol("kWasClean");
class Xe {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(e) {
    this[He] = null, this[Yi] = e;
  }
  /**
   * @type {*}
   */
  get target() {
    return this[He];
  }
  /**
   * @type {String}
   */
  get type() {
    return this[Yi];
  }
}
Object.defineProperty(Xe.prototype, "target", { enumerable: !0 });
Object.defineProperty(Xe.prototype, "type", { enumerable: !0 });
class is extends Xe {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(e, t = {}) {
    super(e), this[Wi] = t.code === void 0 ? 0 : t.code, this[Ki] = t.reason === void 0 ? "" : t.reason, this[Ji] = t.wasClean === void 0 ? !1 : t.wasClean;
  }
  /**
   * @type {Number}
   */
  get code() {
    return this[Wi];
  }
  /**
   * @type {String}
   */
  get reason() {
    return this[Ki];
  }
  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[Ji];
  }
}
Object.defineProperty(is.prototype, "code", { enumerable: !0 });
Object.defineProperty(is.prototype, "reason", { enumerable: !0 });
Object.defineProperty(is.prototype, "wasClean", { enumerable: !0 });
class ei extends Xe {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(e, t = {}) {
    super(e), this[Hi] = t.error === void 0 ? null : t.error, this[Gi] = t.message === void 0 ? "" : t.message;
  }
  /**
   * @type {*}
   */
  get error() {
    return this[Hi];
  }
  /**
   * @type {String}
   */
  get message() {
    return this[Gi];
  }
}
Object.defineProperty(ei.prototype, "error", { enumerable: !0 });
Object.defineProperty(ei.prototype, "message", { enumerable: !0 });
class ia extends Xe {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(e, t = {}) {
    super(e), this[Vi] = t.data === void 0 ? null : t.data;
  }
  /**
   * @type {*}
   */
  get data() {
    return this[Vi];
  }
}
Object.defineProperty(ia.prototype, "data", { enumerable: !0 });
const Sc = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {(Function|Object)} handler The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(i, e, t = {}) {
    for (const n of this.listeners(i))
      if (!t[st] && n[Ts] === e && !n[st])
        return;
    let s;
    if (i === "message")
      s = function(a, o) {
        const r = new ia("message", {
          data: o ? a : a.toString()
        });
        r[He] = this, At(e, this, r);
      };
    else if (i === "close")
      s = function(a, o) {
        const r = new is("close", {
          code: a,
          reason: o.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });
        r[He] = this, At(e, this, r);
      };
    else if (i === "error")
      s = function(a) {
        const o = new ei("error", {
          error: a,
          message: a.message
        });
        o[He] = this, At(e, this, o);
      };
    else if (i === "open")
      s = function() {
        const a = new Xe("open");
        a[He] = this, At(e, this, a);
      };
    else
      return;
    s[st] = !!t[st], s[Ts] = e, t.once ? this.once(i, s) : this.on(i, s);
  },
  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {(Function|Object)} handler The listener to remove
   * @public
   */
  removeEventListener(i, e) {
    for (const t of this.listeners(i))
      if (t[Ts] === e && !t[st]) {
        this.removeListener(i, t);
        break;
      }
  }
};
var Cc = {
  EventTarget: Sc
};
function At(i, e, t) {
  typeof i == "object" && i.handleEvent ? i.handleEvent.call(i, t) : i.call(e, t);
}
const { tokenChars: it } = ft;
function le(i, e, t) {
  i[e] === void 0 ? i[e] = [t] : i[e].push(t);
}
function Tc(i) {
  const e = /* @__PURE__ */ Object.create(null);
  let t = /* @__PURE__ */ Object.create(null), s = !1, n = !1, a = !1, o, r, p = -1, c = -1, u = -1, l = 0;
  for (; l < i.length; l++)
    if (c = i.charCodeAt(l), o === void 0)
      if (u === -1 && it[c] === 1)
        p === -1 && (p = l);
      else if (l !== 0 && (c === 32 || c === 9))
        u === -1 && p !== -1 && (u = l);
      else if (c === 59 || c === 44) {
        if (p === -1)
          throw new SyntaxError(`Unexpected character at index ${l}`);
        u === -1 && (u = l);
        const v = i.slice(p, u);
        c === 44 ? (le(e, v, t), t = /* @__PURE__ */ Object.create(null)) : o = v, p = u = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${l}`);
    else if (r === void 0)
      if (u === -1 && it[c] === 1)
        p === -1 && (p = l);
      else if (c === 32 || c === 9)
        u === -1 && p !== -1 && (u = l);
      else if (c === 59 || c === 44) {
        if (p === -1)
          throw new SyntaxError(`Unexpected character at index ${l}`);
        u === -1 && (u = l), le(t, i.slice(p, u), !0), c === 44 && (le(e, o, t), t = /* @__PURE__ */ Object.create(null), o = void 0), p = u = -1;
      } else if (c === 61 && p !== -1 && u === -1)
        r = i.slice(p, l), p = u = -1;
      else
        throw new SyntaxError(`Unexpected character at index ${l}`);
    else if (n) {
      if (it[c] !== 1)
        throw new SyntaxError(`Unexpected character at index ${l}`);
      p === -1 ? p = l : s || (s = !0), n = !1;
    } else if (a)
      if (it[c] === 1)
        p === -1 && (p = l);
      else if (c === 34 && p !== -1)
        a = !1, u = l;
      else if (c === 92)
        n = !0;
      else
        throw new SyntaxError(`Unexpected character at index ${l}`);
    else if (c === 34 && i.charCodeAt(l - 1) === 61)
      a = !0;
    else if (u === -1 && it[c] === 1)
      p === -1 && (p = l);
    else if (p !== -1 && (c === 32 || c === 9))
      u === -1 && (u = l);
    else if (c === 59 || c === 44) {
      if (p === -1)
        throw new SyntaxError(`Unexpected character at index ${l}`);
      u === -1 && (u = l);
      let v = i.slice(p, u);
      s && (v = v.replace(/\\/g, ""), s = !1), le(t, r, v), c === 44 && (le(e, o, t), t = /* @__PURE__ */ Object.create(null), o = void 0), r = void 0, p = u = -1;
    } else
      throw new SyntaxError(`Unexpected character at index ${l}`);
  if (p === -1 || a || c === 32 || c === 9)
    throw new SyntaxError("Unexpected end of input");
  u === -1 && (u = l);
  const d = i.slice(p, u);
  return o === void 0 ? le(e, d, t) : (r === void 0 ? le(t, d, !0) : s ? le(t, r, d.replace(/\\/g, "")) : le(t, r, d), le(e, o, t)), e;
}
function Oc(i) {
  return Object.keys(i).map((e) => {
    let t = i[e];
    return Array.isArray(t) || (t = [t]), t.map((s) => [e].concat(
      Object.keys(s).map((n) => {
        let a = s[n];
        return Array.isArray(a) || (a = [a]), a.map((o) => o === !0 ? n : `${n}=${o}`).join("; ");
      })
    ).join("; ")).join(", ");
  }).join(", ");
}
var ti = { format: Oc, parse: Tc };
const Rc = Te, Ac = Ha, Pc = Jt, na = Ga, jc = Ka, { randomBytes: Nc, createHash: Bc } = ct, { Duplex: Du, Readable: $u } = Qe, { URL: Os } = Ya, we = mt, Ic = ta, Lc = sa, { isBlob: Fc } = ft, {
  BINARY_TYPES: Qi,
  CLOSE_TIMEOUT: Dc,
  EMPTY_BUFFER: Pt,
  GUID: $c,
  kForOnEventAttribute: Rs,
  kListener: Uc,
  kStatusCode: Mc,
  kWebSocket: G,
  NOOP: aa
} = Oe, {
  EventTarget: { addEventListener: qc, removeEventListener: zc }
} = Cc, { format: Wc, parse: Vc } = ti, { toBuffer: Hc } = ss, oa = Symbol("kAborted"), As = [8, 13], xe = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], Gc = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
let W = class q extends Rc {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(e, t, s) {
    super(), this._binaryType = Qi[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = Pt, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = q.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, e !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, t === void 0 ? t = [] : Array.isArray(t) || (typeof t == "object" && t !== null ? (s = t, t = []) : t = [t]), ca(this, e, t, s)) : (this._autoPong = s.autoPong, this._closeTimeout = s.closeTimeout, this._isServer = !0);
  }
  /**
   * For historical reasons, the custom "nodebuffer" type is used by the default
   * instead of "blob".
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }
  set binaryType(e) {
    Qi.includes(e) && (this._binaryType = e, this._receiver && (this._receiver._binaryType = e));
  }
  /**
   * @type {Number}
   */
  get bufferedAmount() {
    return this._socket ? this._socket._writableState.length + this._sender._bufferedBytes : this._bufferedAmount;
  }
  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }
  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }
  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }
  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }
  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }
  /**
   * Set up the socket and the internal resources.
   *
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxBufferedChunks=0] The maximum number of
   *     buffered data chunks
   * @param {Number} [options.maxFragments=0] The maximum number of message
   *     fragments
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(e, t, s) {
    const n = new Ic({
      allowSynchronousEvents: s.allowSynchronousEvents,
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxBufferedChunks: s.maxBufferedChunks,
      maxFragments: s.maxFragments,
      maxPayload: s.maxPayload,
      skipUTF8Validation: s.skipUTF8Validation
    }), a = new Lc(e, this._extensions, s.generateMask);
    this._receiver = n, this._sender = a, this._socket = e, n[G] = this, a[G] = this, e[G] = this, n.on("conclude", Jc), n.on("drain", Qc), n.on("error", Xc), n.on("message", Zc), n.on("ping", ep), n.on("pong", tp), a.onerror = sp, e.setTimeout && e.setTimeout(0), e.setNoDelay && e.setNoDelay(), t.length > 0 && e.unshift(t), e.on("close", ua), e.on("data", ns), e.on("end", da), e.on("error", ma), this._readyState = q.OPEN, this.emit("open");
  }
  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = q.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
      return;
    }
    this._extensions[we.extensionName] && this._extensions[we.extensionName].cleanup(), this._receiver.removeAllListeners(), this._readyState = q.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
  }
  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(e, t) {
    if (this.readyState !== q.CLOSED) {
      if (this.readyState === q.CONNECTING) {
        Z(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      if (this.readyState === q.CLOSING) {
        this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
        return;
      }
      this._readyState = q.CLOSING, this._sender.close(e, t, !this._isServer, (s) => {
        s || (this._closeFrameSent = !0, (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
      }), la(this);
    }
  }
  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    this.readyState === q.CONNECTING || this.readyState === q.CLOSED || (this._paused = !0, this._socket.pause());
  }
  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(e, t, s) {
    if (this.readyState === q.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof e == "function" ? (s = e, e = t = void 0) : typeof t == "function" && (s = t, t = void 0), typeof e == "number" && (e = e.toString()), this.readyState !== q.OPEN) {
      Ps(this, e, s);
      return;
    }
    t === void 0 && (t = !this._isServer), this._sender.ping(e || Pt, t, s);
  }
  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(e, t, s) {
    if (this.readyState === q.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof e == "function" ? (s = e, e = t = void 0) : typeof t == "function" && (s = t, t = void 0), typeof e == "number" && (e = e.toString()), this.readyState !== q.OPEN) {
      Ps(this, e, s);
      return;
    }
    t === void 0 && (t = !this._isServer), this._sender.pong(e || Pt, t, s);
  }
  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    this.readyState === q.CONNECTING || this.readyState === q.CLOSED || (this._paused = !1, this._receiver._writableState.needDrain || this._socket.resume());
  }
  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(e, t, s) {
    if (this.readyState === q.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof t == "function" && (s = t, t = {}), typeof e == "number" && (e = e.toString()), this.readyState !== q.OPEN) {
      Ps(this, e, s);
      return;
    }
    const n = {
      binary: typeof e != "string",
      mask: !this._isServer,
      compress: !0,
      fin: !0,
      ...t
    };
    this._extensions[we.extensionName] || (n.compress = !1), this._sender.send(e || Pt, n, s);
  }
  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState !== q.CLOSED) {
      if (this.readyState === q.CONNECTING) {
        Z(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      this._socket && (this._readyState = q.CLOSING, this._socket.destroy());
    }
  }
};
Object.defineProperty(W, "CONNECTING", {
  enumerable: !0,
  value: xe.indexOf("CONNECTING")
});
Object.defineProperty(W.prototype, "CONNECTING", {
  enumerable: !0,
  value: xe.indexOf("CONNECTING")
});
Object.defineProperty(W, "OPEN", {
  enumerable: !0,
  value: xe.indexOf("OPEN")
});
Object.defineProperty(W.prototype, "OPEN", {
  enumerable: !0,
  value: xe.indexOf("OPEN")
});
Object.defineProperty(W, "CLOSING", {
  enumerable: !0,
  value: xe.indexOf("CLOSING")
});
Object.defineProperty(W.prototype, "CLOSING", {
  enumerable: !0,
  value: xe.indexOf("CLOSING")
});
Object.defineProperty(W, "CLOSED", {
  enumerable: !0,
  value: xe.indexOf("CLOSED")
});
Object.defineProperty(W.prototype, "CLOSED", {
  enumerable: !0,
  value: xe.indexOf("CLOSED")
});
[
  "binaryType",
  "bufferedAmount",
  "extensions",
  "isPaused",
  "protocol",
  "readyState",
  "url"
].forEach((i) => {
  Object.defineProperty(W.prototype, i, { enumerable: !0 });
});
["open", "error", "close", "message"].forEach((i) => {
  Object.defineProperty(W.prototype, `on${i}`, {
    enumerable: !0,
    get() {
      for (const e of this.listeners(i))
        if (e[Rs]) return e[Uc];
      return null;
    },
    set(e) {
      for (const t of this.listeners(i))
        if (t[Rs]) {
          this.removeListener(i, t);
          break;
        }
      typeof e == "function" && this.addEventListener(i, e, {
        [Rs]: !0
      });
    }
  });
});
W.prototype.addEventListener = qc;
W.prototype.removeEventListener = zc;
var ra = W;
function ca(i, e, t, s) {
  const n = {
    allowSynchronousEvents: !0,
    autoPong: !0,
    closeTimeout: Dc,
    protocolVersion: As[1],
    maxBufferedChunks: 262144,
    maxFragments: 16384,
    maxPayload: 104857600,
    skipUTF8Validation: !1,
    perMessageDeflate: !0,
    followRedirects: !1,
    maxRedirects: 10,
    ...s,
    socketPath: void 0,
    hostname: void 0,
    protocol: void 0,
    timeout: void 0,
    method: "GET",
    host: void 0,
    path: void 0,
    port: void 0
  };
  if (i._autoPong = n.autoPong, i._closeTimeout = n.closeTimeout, !As.includes(n.protocolVersion))
    throw new RangeError(
      `Unsupported protocol version: ${n.protocolVersion} (supported versions: ${As.join(", ")})`
    );
  let a;
  if (e instanceof Os)
    a = e;
  else
    try {
      a = new Os(e);
    } catch {
      throw new SyntaxError(`Invalid URL: ${e}`);
    }
  a.protocol === "http:" ? a.protocol = "ws:" : a.protocol === "https:" && (a.protocol = "wss:"), i._url = a.href;
  const o = a.protocol === "wss:", r = a.protocol === "ws+unix:";
  let p;
  if (a.protocol !== "ws:" && !o && !r ? p = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"` : r && !a.pathname ? p = "The URL's pathname is empty" : a.hash && (p = "The URL contains a fragment identifier"), p) {
    const h = new SyntaxError(p);
    if (i._redirects === 0)
      throw h;
    Bt(i, h);
    return;
  }
  const c = o ? 443 : 80, u = Nc(16).toString("base64"), l = o ? Ac.request : Pc.request, d = /* @__PURE__ */ new Set();
  let v;
  if (n.createConnection = n.createConnection || (o ? Yc : Kc), n.defaultPort = n.defaultPort || c, n.port = a.port || c, n.host = a.hostname.startsWith("[") ? a.hostname.slice(1, -1) : a.hostname, n.headers = {
    ...n.headers,
    "Sec-WebSocket-Version": n.protocolVersion,
    "Sec-WebSocket-Key": u,
    Connection: "Upgrade",
    Upgrade: "websocket"
  }, n.path = a.pathname + a.search, n.timeout = n.handshakeTimeout, n.perMessageDeflate && (v = new we({
    ...n.perMessageDeflate,
    isServer: !1,
    maxPayload: n.maxPayload
  }), n.headers["Sec-WebSocket-Extensions"] = Wc({
    [we.extensionName]: v.offer()
  })), t.length) {
    for (const h of t) {
      if (typeof h != "string" || !Gc.test(h) || d.has(h))
        throw new SyntaxError(
          "An invalid or duplicated subprotocol was specified"
        );
      d.add(h);
    }
    n.headers["Sec-WebSocket-Protocol"] = t.join(",");
  }
  if (n.origin && (n.protocolVersion < 13 ? n.headers["Sec-WebSocket-Origin"] = n.origin : n.headers.Origin = n.origin), (a.username || a.password) && (n.auth = `${a.username}:${a.password}`), r) {
    const h = n.path.split(":");
    n.socketPath = h[0], n.path = h[1];
  }
  let m;
  if (n.followRedirects) {
    if (i._redirects === 0) {
      i._originalIpc = r, i._originalSecure = o, i._originalHostOrSocketPath = r ? n.socketPath : a.host;
      const h = s && s.headers;
      if (s = { ...s, headers: {} }, h)
        for (const [x, S] of Object.entries(h))
          s.headers[x.toLowerCase()] = S;
    } else if (i.listenerCount("redirect") === 0) {
      const h = r ? i._originalIpc ? n.socketPath === i._originalHostOrSocketPath : !1 : i._originalIpc ? !1 : a.host === i._originalHostOrSocketPath;
      (!h || i._originalSecure && !o) && (delete n.headers.authorization, delete n.headers.cookie, h || delete n.headers.host, n.auth = void 0);
    }
    n.auth && !s.headers.authorization && (s.headers.authorization = "Basic " + Buffer.from(n.auth).toString("base64")), m = i._req = l(n), i._redirects && i.emit("redirect", i.url, m);
  } else
    m = i._req = l(n);
  n.timeout && m.on("timeout", () => {
    Z(i, m, "Opening handshake has timed out");
  }), m.on("error", (h) => {
    m === null || m[oa] || (m = i._req = null, Bt(i, h));
  }), m.on("response", (h) => {
    const x = h.headers.location, S = h.statusCode;
    if (x && n.followRedirects && S >= 300 && S < 400) {
      if (++i._redirects > n.maxRedirects) {
        Z(i, m, "Maximum redirects exceeded");
        return;
      }
      m.abort();
      let T;
      try {
        T = new Os(x, e);
      } catch {
        const B = new SyntaxError(`Invalid URL: ${x}`);
        Bt(i, B);
        return;
      }
      ca(i, T, t, s);
    } else i.emit("unexpected-response", m, h) || Z(
      i,
      m,
      `Unexpected server response: ${h.statusCode}`
    );
  }), m.on("upgrade", (h, x, S) => {
    if (i.emit("upgrade", h), i.readyState !== W.CONNECTING) return;
    m = i._req = null;
    const T = h.headers.upgrade;
    if (T === void 0 || T.toLowerCase() !== "websocket") {
      Z(i, x, "Invalid Upgrade header");
      return;
    }
    const I = Bc("sha1").update(u + $c).digest("base64");
    if (h.headers["sec-websocket-accept"] !== I) {
      Z(i, x, "Invalid Sec-WebSocket-Accept header");
      return;
    }
    const B = h.headers["sec-websocket-protocol"];
    let $;
    if (B !== void 0 ? d.size ? d.has(B) || ($ = "Server sent an invalid subprotocol") : $ = "Server sent a subprotocol but none was requested" : d.size && ($ = "Server sent no subprotocol"), $) {
      Z(i, x, $);
      return;
    }
    B && (i._protocol = B);
    const g = h.headers["sec-websocket-extensions"];
    if (g !== void 0) {
      if (!v) {
        Z(i, x, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
        return;
      }
      let C;
      try {
        C = Vc(g);
      } catch {
        Z(i, x, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      const w = Object.keys(C);
      if (w.length !== 1 || w[0] !== we.extensionName) {
        Z(i, x, "Server indicated an extension that was not requested");
        return;
      }
      try {
        v.accept(C[we.extensionName]);
      } catch {
        Z(i, x, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      i._extensions[we.extensionName] = v;
    }
    i.setSocket(x, S, {
      allowSynchronousEvents: n.allowSynchronousEvents,
      generateMask: n.generateMask,
      maxBufferedChunks: n.maxBufferedChunks,
      maxFragments: n.maxFragments,
      maxPayload: n.maxPayload,
      skipUTF8Validation: n.skipUTF8Validation
    });
  }), n.finishRequest ? n.finishRequest(m, i) : m.end();
}
function Bt(i, e) {
  i._readyState = W.CLOSING, i._errorEmitted = !0, i.emit("error", e), i.emitClose();
}
function Kc(i) {
  return i.path = i.socketPath, na.connect(i);
}
function Yc(i) {
  return i.path = void 0, !i.servername && i.servername !== "" && (i.servername = na.isIP(i.host) ? "" : i.host), jc.connect(i);
}
function Z(i, e, t) {
  i._readyState = W.CLOSING;
  const s = new Error(t);
  Error.captureStackTrace(s, Z), e.setHeader ? (e[oa] = !0, e.abort(), e.socket && !e.socket.destroyed && e.socket.destroy(), process.nextTick(Bt, i, s)) : (e.destroy(s), e.once("error", i.emit.bind(i, "error")), e.once("close", i.emitClose.bind(i)));
}
function Ps(i, e, t) {
  if (e) {
    const s = Fc(e) ? e.size : Hc(e).length;
    i._socket ? i._sender._bufferedBytes += s : i._bufferedAmount += s;
  }
  if (t) {
    const s = new Error(
      `WebSocket is not open: readyState ${i.readyState} (${xe[i.readyState]})`
    );
    process.nextTick(t, s);
  }
}
function Jc(i, e) {
  const t = this[G];
  t._closeFrameReceived = !0, t._closeMessage = e, t._closeCode = i, t._socket[G] !== void 0 && (t._socket.removeListener("data", ns), process.nextTick(pa, t._socket), i === 1005 ? t.close() : t.close(i, e));
}
function Qc() {
  const i = this[G];
  i.isPaused || i._socket.resume();
}
function Xc(i) {
  const e = this[G];
  e._socket[G] !== void 0 && (e._socket.removeListener("data", ns), process.nextTick(pa, e._socket), e.close(i[Mc])), e._errorEmitted || (e._errorEmitted = !0, e.emit("error", i));
}
function Xi() {
  this[G].emitClose();
}
function Zc(i, e) {
  this[G].emit("message", i, e);
}
function ep(i) {
  const e = this[G];
  e._autoPong && e.pong(i, !this._isServer, aa), e.emit("ping", i);
}
function tp(i) {
  this[G].emit("pong", i);
}
function pa(i) {
  i.resume();
}
function sp(i) {
  const e = this[G];
  e.readyState !== W.CLOSED && (e.readyState === W.OPEN && (e._readyState = W.CLOSING, la(e)), this._socket.end(), e._errorEmitted || (e._errorEmitted = !0, e.emit("error", i)));
}
function la(i) {
  i._closeTimer = setTimeout(
    i._socket.destroy.bind(i._socket),
    i._closeTimeout
  );
}
function ua() {
  const i = this[G];
  if (this.removeListener("close", ua), this.removeListener("data", ns), this.removeListener("end", da), i._readyState = W.CLOSING, !this._readableState.endEmitted && !i._closeFrameReceived && !i._receiver._writableState.errorEmitted && this._readableState.length !== 0) {
    const e = this.read(this._readableState.length);
    i._receiver.write(e);
  }
  i._receiver.end(), this[G] = void 0, clearTimeout(i._closeTimer), i._receiver._writableState.finished || i._receiver._writableState.errorEmitted ? i.emitClose() : (i._receiver.on("error", Xi), i._receiver.on("finish", Xi));
}
function ns(i) {
  this[G]._receiver.write(i) || this.pause();
}
function da() {
  const i = this[G];
  i._readyState = W.CLOSING, i._receiver.end(), this.end();
}
function ma() {
  const i = this[G];
  this.removeListener("error", ma), this.on("error", aa), i && (i._readyState = W.CLOSING, this.destroy());
}
const { Duplex: ip } = Qe;
function Zi(i) {
  i.emit("close");
}
function np() {
  !this.destroyed && this._writableState.finished && this.destroy();
}
function fa(i) {
  this.removeListener("error", fa), this.destroy(), this.listenerCount("error") === 0 && this.emit("error", i);
}
function ap(i, e) {
  let t = !0;
  const s = new ip({
    ...e,
    autoDestroy: !1,
    emitClose: !1,
    objectMode: !1,
    writableObjectMode: !1
  });
  return i.on("message", function(a, o) {
    const r = !o && s._readableState.objectMode ? a.toString() : a;
    s.push(r) || i.pause();
  }), i.once("error", function(a) {
    s.destroyed || (t = !1, s.destroy(a));
  }), i.once("close", function() {
    s.destroyed || s.push(null);
  }), s._destroy = function(n, a) {
    if (i.readyState === i.CLOSED) {
      a(n), process.nextTick(Zi, s);
      return;
    }
    let o = !1;
    i.once("error", function(p) {
      o = !0, a(p);
    }), i.once("close", function() {
      o || a(n), process.nextTick(Zi, s);
    }), t && i.terminate();
  }, s._final = function(n) {
    if (i.readyState === i.CONNECTING) {
      i.once("open", function() {
        s._final(n);
      });
      return;
    }
    i._socket !== null && (i._socket._writableState.finished ? (n(), s._readableState.endEmitted && s.destroy()) : (i._socket.once("finish", function() {
      n();
    }), i.close()));
  }, s._read = function() {
    i.isPaused && i.resume();
  }, s._write = function(n, a, o) {
    if (i.readyState === i.CONNECTING) {
      i.once("open", function() {
        s._write(n, a, o);
      });
      return;
    }
    i.send(n, o);
  }, s.on("end", np), s.on("error", fa), s;
}
var op = ap;
const { tokenChars: rp } = ft;
function cp(i) {
  const e = /* @__PURE__ */ new Set();
  let t = -1, s = -1, n = 0;
  for (n; n < i.length; n++) {
    const o = i.charCodeAt(n);
    if (s === -1 && rp[o] === 1)
      t === -1 && (t = n);
    else if (n !== 0 && (o === 32 || o === 9))
      s === -1 && t !== -1 && (s = n);
    else if (o === 44) {
      if (t === -1)
        throw new SyntaxError(`Unexpected character at index ${n}`);
      s === -1 && (s = n);
      const r = i.slice(t, s);
      if (e.has(r))
        throw new SyntaxError(`The "${r}" subprotocol is duplicated`);
      e.add(r), t = s = -1;
    } else
      throw new SyntaxError(`Unexpected character at index ${n}`);
  }
  if (t === -1 || s !== -1)
    throw new SyntaxError("Unexpected end of input");
  const a = i.slice(t, n);
  if (e.has(a))
    throw new SyntaxError(`The "${a}" subprotocol is duplicated`);
  return e.add(a), e;
}
var ha = { parse: cp };
const pp = Te, Vt = Jt, { Duplex: Uu } = Qe, { createHash: lp } = ct, en = ti, Pe = mt, up = ha, dp = ra, { CLOSE_TIMEOUT: mp, GUID: fp, kWebSocket: hp } = Oe, vp = /^[+/0-9A-Za-z]{22}==$/, tn = 0, sn = 1, va = 2;
let xp = class extends pp {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {Boolean} [options.autoPong=true] Specifies whether or not to
   *     automatically send a pong in response to a ping
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
   *     wait for the closing handshake to finish after `websocket.close()` is
   *     called
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxBufferedChunks=262144] The maximum number of
   *     buffered data chunks
   * @param {Number} [options.maxFragments=16384] The maximum number of message
   *     fragments
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(e, t) {
    if (super(), e = {
      allowSynchronousEvents: !0,
      autoPong: !0,
      maxBufferedChunks: 256 * 1024,
      maxFragments: 16 * 1024,
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: !1,
      perMessageDeflate: !1,
      handleProtocols: null,
      clientTracking: !0,
      closeTimeout: mp,
      verifyClient: null,
      noServer: !1,
      backlog: null,
      // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket: dp,
      ...e
    }, e.port == null && !e.server && !e.noServer || e.port != null && (e.server || e.noServer) || e.server && e.noServer)
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options must be specified'
      );
    if (e.port != null ? (this._server = Vt.createServer((s, n) => {
      const a = Vt.STATUS_CODES[426];
      n.writeHead(426, {
        "Content-Length": a.length,
        "Content-Type": "text/plain"
      }), n.end(a);
    }), this._server.listen(
      e.port,
      e.host,
      e.backlog,
      t
    )) : e.server && (this._server = e.server), this._server) {
      const s = this.emit.bind(this, "connection");
      this._removeListeners = bp(this._server, {
        listening: this.emit.bind(this, "listening"),
        error: this.emit.bind(this, "error"),
        upgrade: (n, a, o) => {
          this.handleUpgrade(n, a, o, s);
        }
      });
    }
    e.perMessageDeflate === !0 && (e.perMessageDeflate = {}), e.clientTracking && (this.clients = /* @__PURE__ */ new Set(), this._shouldEmitClose = !1), this.options = e, this._state = tn;
  }
  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer)
      throw new Error('The server is operating in "noServer" mode');
    return this._server ? this._server.address() : null;
  }
  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(e) {
    if (this._state === va) {
      e && this.once("close", () => {
        e(new Error("The server is not running"));
      }), process.nextTick(nt, this);
      return;
    }
    if (e && this.once("close", e), this._state !== sn)
      if (this._state = sn, this.options.noServer || this.options.server)
        this._server && (this._removeListeners(), this._removeListeners = this._server = null), this.clients ? this.clients.size ? this._shouldEmitClose = !0 : process.nextTick(nt, this) : process.nextTick(nt, this);
      else {
        const t = this._server;
        this._removeListeners(), this._removeListeners = this._server = null, t.close(() => {
          nt(this);
        });
      }
  }
  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(e) {
    if (this.options.path) {
      const t = e.url.indexOf("?");
      if ((t !== -1 ? e.url.slice(0, t) : e.url) !== this.options.path) return !1;
    }
    return !0;
  }
  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(e, t, s, n) {
    t.on("error", nn);
    const a = e.headers["sec-websocket-key"], o = e.headers.upgrade, r = +e.headers["sec-websocket-version"];
    if (e.method !== "GET") {
      Be(this, e, t, 405, "Invalid HTTP method");
      return;
    }
    if (o === void 0 || o.toLowerCase() !== "websocket") {
      Be(this, e, t, 400, "Invalid Upgrade header");
      return;
    }
    if (a === void 0 || !vp.test(a)) {
      Be(this, e, t, 400, "Missing or invalid Sec-WebSocket-Key header");
      return;
    }
    if (r !== 13 && r !== 8) {
      Be(this, e, t, 400, "Missing or invalid Sec-WebSocket-Version header", {
        "Sec-WebSocket-Version": "13, 8"
      });
      return;
    }
    if (!this.shouldHandle(e)) {
      ot(t, 400);
      return;
    }
    const p = e.headers["sec-websocket-protocol"];
    let c = /* @__PURE__ */ new Set();
    if (p !== void 0)
      try {
        c = up.parse(p);
      } catch {
        Be(this, e, t, 400, "Invalid Sec-WebSocket-Protocol header");
        return;
      }
    const u = e.headers["sec-websocket-extensions"], l = {};
    if (this.options.perMessageDeflate && u !== void 0) {
      const d = new Pe({
        ...this.options.perMessageDeflate,
        isServer: !0,
        maxPayload: this.options.maxPayload
      });
      try {
        const v = en.parse(u);
        v[Pe.extensionName] && (d.accept(v[Pe.extensionName]), l[Pe.extensionName] = d);
      } catch {
        Be(this, e, t, 400, "Invalid or unacceptable Sec-WebSocket-Extensions header");
        return;
      }
    }
    if (this.options.verifyClient) {
      const d = {
        origin: e.headers[`${r === 8 ? "sec-websocket-origin" : "origin"}`],
        secure: !!(e.socket.authorized || e.socket.encrypted),
        req: e
      };
      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(d, (v, m, h, x) => {
          if (!v)
            return ot(t, m || 401, h, x);
          this.completeUpgrade(
            l,
            a,
            c,
            e,
            t,
            s,
            n
          );
        });
        return;
      }
      if (!this.options.verifyClient(d)) return ot(t, 401);
    }
    this.completeUpgrade(l, a, c, e, t, s, n);
  }
  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(e, t, s, n, a, o, r) {
    if (!a.readable || !a.writable) return a.destroy();
    if (a[hp])
      throw new Error(
        "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
      );
    if (this._state > tn) return ot(a, 503);
    const c = [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${lp("sha1").update(t + fp).digest("base64")}`
    ], u = new this.options.WebSocket(null, void 0, this.options);
    if (s.size) {
      const l = this.options.handleProtocols ? this.options.handleProtocols(s, n) : s.values().next().value;
      l && (c.push(`Sec-WebSocket-Protocol: ${l}`), u._protocol = l);
    }
    if (e[Pe.extensionName]) {
      const l = e[Pe.extensionName].params, d = en.format({
        [Pe.extensionName]: [l]
      });
      c.push(`Sec-WebSocket-Extensions: ${d}`), u._extensions = e;
    }
    this.emit("headers", c, n), a.write(c.concat(`\r
`).join(`\r
`)), a.removeListener("error", nn), u.setSocket(a, o, {
      allowSynchronousEvents: this.options.allowSynchronousEvents,
      maxBufferedChunks: this.options.maxBufferedChunks,
      maxFragments: this.options.maxFragments,
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    }), this.clients && (this.clients.add(u), u.on("close", () => {
      this.clients.delete(u), this._shouldEmitClose && !this.clients.size && process.nextTick(nt, this);
    })), r(u, n);
  }
};
var gp = xp;
function bp(i, e) {
  for (const t of Object.keys(e)) i.on(t, e[t]);
  return function() {
    for (const s of Object.keys(e))
      i.removeListener(s, e[s]);
  };
}
function nt(i) {
  i._state = va, i.emit("close");
}
function nn() {
  this.destroy();
}
function ot(i, e, t, s) {
  t = t || Vt.STATUS_CODES[e], s = {
    Connection: "close",
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(t),
    ...s
  }, i.once("finish", i.destroy), i.end(
    `HTTP/1.1 ${e} ${Vt.STATUS_CODES[e]}\r
` + Object.keys(s).map((n) => `${n}: ${s[n]}`).join(`\r
`) + `\r
\r
` + t
  );
}
function Be(i, e, t, s, n, a) {
  if (i.listenerCount("wsClientError")) {
    const o = new Error(n);
    Error.captureStackTrace(o, Be), i.emit("wsClientError", o, t, e);
  } else
    ot(t, s, n, a);
}
const yp = op, _p = ti, wp = mt, Ep = ta, kp = sa, Sp = ha, pe = ra, xa = gp;
pe.createWebSocketStream = yp;
pe.extension = _p;
pe.PerMessageDeflate = wp;
pe.Receiver = Ep;
pe.Sender = kp;
pe.Server = xa;
pe.subprotocol = Sp;
pe.WebSocket = pe;
pe.WebSocketServer = xa;
var ga = pe, ba = { exports: {} };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var an = Object.getOwnPropertySymbols, Cp = Object.prototype.hasOwnProperty, Tp = Object.prototype.propertyIsEnumerable;
function Op(i) {
  if (i == null)
    throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(i);
}
function Rp() {
  try {
    if (!Object.assign)
      return !1;
    var i = new String("abc");
    if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
      return !1;
    for (var e = {}, t = 0; t < 10; t++)
      e["_" + String.fromCharCode(t)] = t;
    var s = Object.getOwnPropertyNames(e).map(function(a) {
      return e[a];
    });
    if (s.join("") !== "0123456789")
      return !1;
    var n = {};
    return "abcdefghijklmnopqrst".split("").forEach(function(a) {
      n[a] = a;
    }), Object.keys(Object.assign({}, n)).join("") === "abcdefghijklmnopqrst";
  } catch {
    return !1;
  }
}
var Ap = Rp() ? Object.assign : function(i, e) {
  for (var t, s = Op(i), n, a = 1; a < arguments.length; a++) {
    t = Object(arguments[a]);
    for (var o in t)
      Cp.call(t, o) && (s[o] = t[o]);
    if (an) {
      n = an(t);
      for (var r = 0; r < n.length; r++)
        Tp.call(t, n[r]) && (s[n[r]] = t[n[r]]);
    }
  }
  return s;
}, si = { exports: {} };
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
si.exports = jp;
si.exports.append = ya;
var Pp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function ya(i, e) {
  if (typeof i != "string")
    throw new TypeError("header argument is required");
  if (!e)
    throw new TypeError("field argument is required");
  for (var t = Array.isArray(e) ? e : on(String(e)), s = 0; s < t.length; s++)
    if (!Pp.test(t[s]))
      throw new TypeError("field argument contains an invalid header name");
  if (i === "*")
    return i;
  var n = i, a = on(i.toLowerCase());
  if (t.indexOf("*") !== -1 || a.indexOf("*") !== -1)
    return "*";
  for (var o = 0; o < t.length; o++) {
    var r = t[o].toLowerCase();
    a.indexOf(r) === -1 && (a.push(r), n = n ? n + ", " + t[o] : t[o]);
  }
  return n;
}
function on(i) {
  for (var e = 0, t = [], s = 0, n = 0, a = i.length; n < a; n++)
    switch (i.charCodeAt(n)) {
      case 32:
        s === e && (s = e = n + 1);
        break;
      case 44:
        t.push(i.substring(s, e)), s = e = n + 1;
        break;
      default:
        e = n + 1;
        break;
    }
  return t.push(i.substring(s, e)), t;
}
function jp(i, e) {
  if (!i || !i.getHeader || !i.setHeader)
    throw new TypeError("res argument is required");
  var t = i.getHeader("Vary") || "", s = Array.isArray(t) ? t.join(", ") : String(t);
  (t = ya(s, e)) && i.setHeader("Vary", t);
}
var Np = si.exports;
(function() {
  var i = Ap, e = Np, t = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: !1,
    optionsSuccessStatus: 204
  };
  function s(m) {
    return typeof m == "string" || m instanceof String;
  }
  function n(m, h) {
    if (Array.isArray(h)) {
      for (var x = 0; x < h.length; ++x)
        if (n(m, h[x]))
          return !0;
      return !1;
    } else return s(h) ? m === h : h instanceof RegExp ? h.test(m) : !!h;
  }
  function a(m, h) {
    var x = h.headers.origin, S = [], T;
    return !m.origin || m.origin === "*" ? S.push([{
      key: "Access-Control-Allow-Origin",
      value: "*"
    }]) : s(m.origin) ? (S.push([{
      key: "Access-Control-Allow-Origin",
      value: m.origin
    }]), S.push([{
      key: "Vary",
      value: "Origin"
    }])) : (T = n(x, m.origin), S.push([{
      key: "Access-Control-Allow-Origin",
      value: T ? x : !1
    }]), S.push([{
      key: "Vary",
      value: "Origin"
    }])), S;
  }
  function o(m) {
    var h = m.methods;
    return h.join && (h = m.methods.join(",")), {
      key: "Access-Control-Allow-Methods",
      value: h
    };
  }
  function r(m) {
    return m.credentials === !0 ? {
      key: "Access-Control-Allow-Credentials",
      value: "true"
    } : null;
  }
  function p(m, h) {
    var x = m.allowedHeaders || m.headers, S = [];
    return x ? x.join && (x = x.join(",")) : (x = h.headers["access-control-request-headers"], S.push([{
      key: "Vary",
      value: "Access-Control-Request-Headers"
    }])), x && x.length && S.push([{
      key: "Access-Control-Allow-Headers",
      value: x
    }]), S;
  }
  function c(m) {
    var h = m.exposedHeaders;
    if (h)
      h.join && (h = h.join(","));
    else return null;
    return h && h.length ? {
      key: "Access-Control-Expose-Headers",
      value: h
    } : null;
  }
  function u(m) {
    var h = (typeof m.maxAge == "number" || m.maxAge) && m.maxAge.toString();
    return h && h.length ? {
      key: "Access-Control-Max-Age",
      value: h
    } : null;
  }
  function l(m, h) {
    for (var x = 0, S = m.length; x < S; x++) {
      var T = m[x];
      T && (Array.isArray(T) ? l(T, h) : T.key === "Vary" && T.value ? e(h, T.value) : T.value && h.setHeader(T.key, T.value));
    }
  }
  function d(m, h, x, S) {
    var T = [], I = h.method && h.method.toUpperCase && h.method.toUpperCase();
    I === "OPTIONS" ? (T.push(a(m, h)), T.push(r(m)), T.push(o(m)), T.push(p(m, h)), T.push(u(m)), T.push(c(m)), l(T, x), m.preflightContinue ? S() : (x.statusCode = m.optionsSuccessStatus, x.setHeader("Content-Length", "0"), x.end())) : (T.push(a(m, h)), T.push(r(m)), T.push(c(m)), l(T, x), S());
  }
  function v(m) {
    var h = null;
    return typeof m == "function" ? h = m : h = function(x, S) {
      S(null, m);
    }, function(S, T, I) {
      h(S, function(B, $) {
        if (B)
          I(B);
        else {
          var g = i({}, t, $), C = null;
          g.origin && typeof g.origin == "function" ? C = g.origin : g.origin && (C = function(w, _) {
            _(null, g.origin);
          }), C ? C(S.headers.origin, function(w, _) {
            w || !_ ? I(w) : (g.origin = _, d(g, S, T, I));
          }) : I();
        }
      });
    };
  }
  ba.exports = v;
})();
var _a = ba.exports;
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.Server = Fe.BaseServer = void 0;
const rn = Dn, It = Xt, Bp = Te, cn = dt, Ip = K, Lp = Zs, Fp = ga, pn = ut, Dp = lt, N = (0, Ip.default)("engine"), Ge = Symbol("responseHeaders");
function $p(i) {
  try {
    const e = JSON.parse(i);
    if (typeof e.sid == "string")
      return e.sid;
  } catch {
  }
}
function js(i, e) {
  return Object.prototype.hasOwnProperty.call(i, e);
}
class as extends Bp.EventEmitter {
  /**
   * Server constructor.
   *
   * @param {Object} opts - options
   */
  constructor(e = {}) {
    super(), this.middlewares = [], this.clients = {}, this.clientsCount = 0, this.opts = Object.assign({
      wsEngine: Fp.Server,
      pingTimeout: 2e4,
      pingInterval: 25e3,
      upgradeTimeout: 1e4,
      maxHttpBufferSize: 1e6,
      transports: ["polling", "websocket"],
      // WebTransport is disabled by default
      allowUpgrades: !0,
      httpCompression: {
        threshold: 1024
      },
      cors: !1,
      allowEIO3: !1
    }, e), e.cookie && (this.opts.cookie = Object.assign({
      name: "io",
      path: "/",
      httpOnly: !0,
      sameSite: "lax"
    }, e.cookie)), this.opts.cors && this.use(_a(this.opts.cors)), e.perMessageDeflate && (this.opts.perMessageDeflate = Object.assign({
      threshold: 1024
    }, e.perMessageDeflate)), this.init();
  }
  /**
   * Compute the pathname of the requests that are handled by the server
   * @param options
   * @protected
   */
  _computePath(e) {
    let t = (e.path || "/engine.io").replace(/\/$/, "");
    return e.addTrailingSlash !== !1 && (t += "/"), t;
  }
  /**
   * Returns a list of available transports for upgrade given a certain transport.
   */
  upgrades(e) {
    return this.opts.allowUpgrades ? It.default[e].upgradesTo || [] : [];
  }
  /**
   * Verifies a request.
   *
   * @param {EngineRequest} req
   * @param upgrade - whether it's an upgrade request
   * @param fn
   * @protected
   * @return whether the request is valid
   */
  verify(e, t, s) {
    const n = e._query.transport;
    if (!~this.opts.transports.indexOf(n) || n === "webtransport")
      return N('unknown transport "%s"', n), s(U.errors.UNKNOWN_TRANSPORT, { transport: n });
    if (Mp(e.headers.origin)) {
      const r = e.headers.origin;
      return e.headers.origin = null, N("origin header invalid"), s(U.errors.BAD_REQUEST, {
        name: "INVALID_ORIGIN",
        origin: r
      });
    }
    const o = e._query.sid;
    if (o) {
      if (!js(this.clients, o))
        return N('unknown sid "%s"', o), s(U.errors.UNKNOWN_SID, {
          sid: o
        });
      const r = this.clients[o].transport.name;
      if (!t && r !== n)
        return N("bad request: unexpected transport without upgrade"), s(U.errors.BAD_REQUEST, {
          name: "TRANSPORT_MISMATCH",
          transport: n,
          previousTransport: r
        });
    } else
      return e.method !== "GET" ? s(U.errors.BAD_HANDSHAKE_METHOD, {
        method: e.method
      }) : n === "websocket" && !t ? (N("invalid transport upgrade"), s(U.errors.BAD_REQUEST, {
        name: "TRANSPORT_HANDSHAKE_ERROR"
      })) : this.opts.allowRequest ? this.opts.allowRequest(e, (r, p) => {
        if (!p)
          return s(U.errors.FORBIDDEN, {
            message: r
          });
        s();
      }) : s();
    s();
  }
  /**
   * Adds a new middleware.
   *
   * @example
   * import helmet from "helmet";
   *
   * engine.use(helmet());
   *
   * @param fn
   */
  use(e) {
    this.middlewares.push(e);
  }
  /**
   * Apply the middlewares to the request.
   *
   * @param req
   * @param res
   * @param callback
   * @protected
   */
  _applyMiddlewares(e, t, s) {
    if (this.middlewares.length === 0)
      return N("no middleware to apply, skipping"), s();
    const n = (a) => {
      N("applying middleware n°%d", a + 1), this.middlewares[a](e, t, (o) => {
        if (o)
          return s(o);
        a + 1 < this.middlewares.length ? n(a + 1) : s();
      });
    };
    n(0);
  }
  /**
   * Closes all clients.
   */
  close() {
    N("closing all open clients");
    for (const e in this.clients)
      js(this.clients, e) && this.clients[e].close(!0);
    return this.cleanup(), this;
  }
  /**
   * generate a socket id.
   * Overwrite this method to generate your custom socket id
   *
   * @param {IncomingMessage} req - the request object
   */
  generateId(e) {
    return rn.generateId();
  }
  /**
   * Handshakes a new client.
   *
   * @param {String} transportName
   * @param {Object} req - the request object
   * @param {Function} closeConnection
   *
   * @protected
   */
  async handshake(e, t, s) {
    const n = t._query.EIO === "4" ? 4 : 3;
    if (n === 3 && !this.opts.allowEIO3) {
      N("unsupported protocol version"), this.emit("connection_error", {
        req: t,
        code: U.errors.UNSUPPORTED_PROTOCOL_VERSION,
        message: U.errorMessages[U.errors.UNSUPPORTED_PROTOCOL_VERSION],
        context: {
          protocol: n
        }
      }), s(U.errors.UNSUPPORTED_PROTOCOL_VERSION);
      return;
    }
    let a;
    try {
      a = await this.generateId(t);
    } catch (p) {
      N("error while generating an id"), this.emit("connection_error", {
        req: t,
        code: U.errors.BAD_REQUEST,
        message: U.errorMessages[U.errors.BAD_REQUEST],
        context: {
          name: "ID_GENERATION_ERROR",
          error: p
        }
      }), s(U.errors.BAD_REQUEST);
      return;
    }
    N('handshaking client "%s"', a);
    try {
      var o = this.createTransport(e, t);
      e === "polling" ? (o.maxHttpBufferSize = this.opts.maxHttpBufferSize, o.httpCompression = this.opts.httpCompression) : e === "websocket" && (o.perMessageDeflate = this.opts.perMessageDeflate);
    } catch (p) {
      N('error handshaking to transport "%s"', e), this.emit("connection_error", {
        req: t,
        code: U.errors.BAD_REQUEST,
        message: U.errorMessages[U.errors.BAD_REQUEST],
        context: {
          name: "TRANSPORT_HANDSHAKE_ERROR",
          error: p
        }
      }), s(U.errors.BAD_REQUEST);
      return;
    }
    const r = new cn.Socket(a, this, o, t, n);
    return o.on("headers", (p, c) => {
      !c._query.sid && (this.opts.cookie && (p["Set-Cookie"] = [
        // @ts-ignore
        (0, Lp.serialize)(this.opts.cookie.name, a, this.opts.cookie)
      ]), this.emit("initial_headers", p, c)), this.emit("headers", p, c);
    }), o.onRequest(t), this.clients[a] = r, this.clientsCount++, r.once("close", () => {
      delete this.clients[a], this.clientsCount--;
    }), this.emit("connection", r), o;
  }
  async onWebTransportSession(e) {
    if (this.middlewares.length > 0)
      return N("closing session since WebTransport is not compatible with middlewares"), e.close();
    const t = setTimeout(() => {
      N("the client failed to establish a bidirectional stream in the given period"), e.close();
    }, this.opts.upgradeTimeout), n = await e.incomingBidirectionalStreams.getReader().read();
    if (n.done) {
      clearTimeout(t), N("session is closed");
      return;
    }
    const a = n.value, o = (0, Dp.createPacketDecoderStream)(this.opts.maxHttpBufferSize, "nodebuffer"), r = a.readable.pipeThrough(o).getReader(), p = async () => {
      try {
        await r.cancel();
      } catch (v) {
        N("error while canceling WebTransport stream reader: %s", v.message);
      }
      r.releaseLock(), e.close();
    }, { value: c, done: u } = await r.read();
    if (clearTimeout(t), u) {
      N("stream is closed"), r.releaseLock();
      return;
    }
    if (c.type !== "open")
      return N("invalid WebTransport handshake"), p();
    if (c.data === void 0) {
      const v = new pn.WebTransport(e, a, r), m = rn.generateId();
      N('handshaking client "%s" (WebTransport)', m);
      const h = new cn.Socket(m, this, v, null, 4);
      this.clients[m] = h, this.clientsCount++, h.once("close", () => {
        delete this.clients[m], this.clientsCount--;
      }), this.emit("connection", h);
      return;
    }
    const l = $p(c.data);
    if (!l || !js(this.clients, l))
      return N("invalid WebTransport handshake"), p();
    const d = this.clients[l];
    if (d) {
      if (d.upgrading)
        return N("transport has already been trying to upgrade"), p();
      if (d.upgraded)
        return N("transport had already been upgraded"), p();
      {
        N("upgrading existing transport");
        const v = new pn.WebTransport(e, a, r);
        d._maybeUpgrade(v);
      }
    } else return N("upgrade attempt for closed client"), p();
  }
}
Fe.BaseServer = as;
as.errors = {
  UNKNOWN_TRANSPORT: 0,
  UNKNOWN_SID: 1,
  BAD_HANDSHAKE_METHOD: 2,
  BAD_REQUEST: 3,
  FORBIDDEN: 4,
  UNSUPPORTED_PROTOCOL_VERSION: 5
};
as.errorMessages = {
  0: "Transport unknown",
  1: "Session ID unknown",
  2: "Bad handshake method",
  3: "Bad request",
  4: "Forbidden",
  5: "Unsupported protocol version"
};
class Up {
  constructor(e, t) {
    this.req = e, this.socket = t, e[Ge] = {};
  }
  setHeader(e, t) {
    this.req[Ge][e] = t;
  }
  getHeader(e) {
    return this.req[Ge][e];
  }
  removeHeader(e) {
    delete this.req[Ge][e];
  }
  write() {
  }
  writeHead() {
  }
  end() {
    this.socket.destroy();
  }
}
let U = class rt extends as {
  /**
   * Initialize websocket server
   *
   * @protected
   */
  init() {
    ~this.opts.transports.indexOf("websocket") && (this.ws && this.ws.close(), this.ws = new this.opts.wsEngine({
      noServer: !0,
      clientTracking: !1,
      perMessageDeflate: this.opts.perMessageDeflate,
      maxPayload: this.opts.maxHttpBufferSize
    }), typeof this.ws.on == "function" && this.ws.on("headers", (e, t) => {
      const s = t[Ge] || {};
      delete t[Ge], !t._query.sid && this.emit("initial_headers", s, t), this.emit("headers", s, t), N("writing headers: %j", s), Object.keys(s).forEach((a) => {
        e.push(`${a}: ${s[a]}`);
      });
    }));
  }
  cleanup() {
    this.ws && (N("closing webSocketServer"), this.ws.close());
  }
  /**
   * Prepares a request by processing the query string.
   *
   * @private
   */
  prepare(e) {
    if (!e._query) {
      const t = new URL(e.url, "https://socket.io");
      e._query = Object.fromEntries(t.searchParams.entries());
    }
  }
  createTransport(e, t) {
    return new It.default[e](t);
  }
  /**
   * Handles an Engine.IO HTTP request.
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  handleRequest(e, t) {
    N('handling "%s" http request "%s"', e.method, e.url);
    const s = e;
    this.prepare(s), s.res = t;
    const n = (a, o) => {
      if (a !== void 0) {
        this.emit("connection_error", {
          req: s,
          code: a,
          message: rt.errorMessages[a],
          context: o
        }), ln(t, a, o);
        return;
      }
      if (s._query.sid)
        N("setting new request for existing client"), this.clients[s._query.sid].transport.onRequest(s);
      else {
        const r = (p, c) => ln(t, p, c);
        this.handshake(s._query.transport, s, r);
      }
    };
    this._applyMiddlewares(s, t, (a) => {
      a ? n(rt.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(s, !1, n);
    });
  }
  /**
   * Handles an Engine.IO HTTP Upgrade.
   */
  handleUpgrade(e, t, s) {
    const n = e;
    this.prepare(n);
    const a = new Up(n, t), o = (r, p) => {
      if (r !== void 0) {
        this.emit("connection_error", {
          req: n,
          code: r,
          message: rt.errorMessages[r],
          context: p
        }), un(t, r, p);
        return;
      }
      const c = Buffer.from(s);
      s = null, a.writeHead(), this.ws.handleUpgrade(n, t, c, (u) => {
        this.onWebSocket(n, t, u);
      });
    };
    this._applyMiddlewares(n, a, (r) => {
      r ? o(rt.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(n, !0, o);
    });
  }
  /**
   * Called upon a ws.io connection.
   * @param req
   * @param socket
   * @param websocket
   * @private
   */
  onWebSocket(e, t, s) {
    if (s.on("error", a), It.default[e._query.transport] !== void 0 && !It.default[e._query.transport].prototype.handlesUpgrades) {
      N("transport doesnt handle upgraded requests"), s.close();
      return;
    }
    const n = e._query.sid;
    if (e.websocket = s, n) {
      const o = this.clients[n];
      if (!o)
        N("upgrade attempt for closed client"), s.close();
      else if (o.upgrading)
        N("transport has already been trying to upgrade"), s.close();
      else if (o.upgraded)
        N("transport had already been upgraded"), s.close();
      else {
        N("upgrading existing transport"), s.removeListener("error", a);
        const r = this.createTransport(e._query.transport, e);
        r.perMessageDeflate = this.opts.perMessageDeflate, o._maybeUpgrade(r);
      }
    } else {
      const o = (r, p) => un(t, r, p);
      this.handshake(e._query.transport, e, o);
    }
    function a() {
      N("websocket error before upgrade");
    }
  }
  /**
   * Captures upgrade requests for a http.Server.
   *
   * @param {http.Server} server
   * @param {Object} options
   */
  attach(e, t = {}) {
    const s = this._computePath(t), n = t.destroyUpgradeTimeout || 1e3;
    function a(r) {
      return s === r.url.slice(0, s.length);
    }
    const o = e.listeners("request").slice(0);
    e.removeAllListeners("request"), e.on("close", this.close.bind(this)), e.on("listening", this.init.bind(this)), e.on("request", (r, p) => {
      if (a(r))
        N('intercepting request for path "%s"', s), this.handleRequest(r, p);
      else {
        let c = 0;
        const u = o.length;
        for (; c < u; c++)
          o[c].call(e, r, p);
      }
    }), ~this.opts.transports.indexOf("websocket") && e.on("upgrade", (r, p, c) => {
      a(r) ? this.handleUpgrade(r, p, c) : t.destroyUpgrade !== !1 && setTimeout(function() {
        if (p.writable && p.bytesWritten <= 0)
          return p.on("error", (u) => {
            N("error while destroying upgrade: %s", u.message);
          }), p.end();
      }, n);
    });
  }
};
Fe.Server = U;
function ln(i, e, t) {
  const s = e === U.errors.FORBIDDEN ? 403 : 400, n = t && t.message ? t.message : U.errorMessages[e];
  i.writeHead(s, { "Content-Type": "application/json" }), i.end(JSON.stringify({
    code: e,
    message: n
  }));
}
function un(i, e, t = {}) {
  if (i.on("error", () => {
    N("ignoring error from closed connection");
  }), i.writable) {
    const s = t.message || U.errorMessages[e], n = Buffer.byteLength(s);
    i.write(`HTTP/1.1 400 Bad Request\r
Connection: close\r
Content-type: text/html\r
Content-Length: ` + n + `\r
\r
` + s);
  }
  i.destroy();
}
const at = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 16 - 31
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 48 - 63
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 64 - 79
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 80 - 95
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 96 - 111
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  // 112 - 127
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 128 ...
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
  // ... 255
];
function Mp(i) {
  if (i += "", i.length < 1)
    return !1;
  if (!at[i.charCodeAt(0)])
    return N('invalid header, index 0, char "%s"', i.charCodeAt(0)), !0;
  if (i.length < 2)
    return !1;
  if (!at[i.charCodeAt(1)])
    return N('invalid header, index 1, char "%s"', i.charCodeAt(1)), !0;
  if (i.length < 3)
    return !1;
  if (!at[i.charCodeAt(2)])
    return N('invalid header, index 2, char "%s"', i.charCodeAt(2)), !0;
  if (i.length < 4)
    return !1;
  if (!at[i.charCodeAt(3)])
    return N('invalid header, index 3, char "%s"', i.charCodeAt(3)), !0;
  for (let e = 4; e < i.length; ++e)
    if (!at[i.charCodeAt(e)])
      return N('invalid header, index "%i", char "%s"', e, i.charCodeAt(e)), !0;
  return !1;
}
var os = {}, ii = {}, rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.Polling = void 0;
const qp = ve, dn = Qt, zp = Xs, Wp = K, ne = (0, Wp.default)("engine:polling"), Vp = {
  gzip: dn.createGzip,
  deflate: dn.createDeflate
};
class Hp extends qp.Transport {
  /**
   * HTTP polling constructor.
   */
  constructor(e) {
    super(e), this.closeTimeout = 30 * 1e3;
  }
  /**
   * Transport name
   */
  get name() {
    return "polling";
  }
  /**
   * Overrides onRequest.
   *
   * @param req
   *
   * @private
   */
  onRequest(e) {
    const t = e.res;
    e.res = null, e.getMethod() === "get" ? this.onPollRequest(e, t) : e.getMethod() === "post" ? this.onDataRequest(e, t) : (t.writeStatus("500 Internal Server Error"), t.end());
  }
  /**
   * The client sends a request awaiting for us to send data.
   *
   * @private
   */
  onPollRequest(e, t) {
    if (this.req) {
      ne("request overlap"), this.onError("overlap from client"), t.writeStatus("500 Internal Server Error"), t.end();
      return;
    }
    ne("setting request"), this.req = e, this.res = t;
    const s = () => {
      this.writable = !1, this.onError("poll connection closed prematurely");
    }, n = () => {
      this.req = this.res = null;
    };
    e.cleanup = n, t.onAborted(s), this.writable = !0, this.emit("ready"), this.writable && this.shouldClose && (ne("triggering empty send to append close packet"), this.send([{ type: "noop" }]));
  }
  /**
   * The client sends a request with data.
   *
   * @private
   */
  onDataRequest(e, t) {
    if (this.dataReq) {
      this.onError("data request overlap from client"), t.writeStatus("500 Internal Server Error"), t.end();
      return;
    }
    const s = Number(e.headers["content-length"]);
    if (!s) {
      this.onError("content-length header required"), t.writeStatus("411 Length Required").end();
      return;
    }
    if (s > this.maxHttpBufferSize) {
      this.onError("payload too large"), t.writeStatus("413 Payload Too Large").end();
      return;
    }
    if (e.headers["content-type"] === "application/octet-stream" && this.protocol === 4)
      return this.onError("invalid content"), t.writeStatus("400 Bad Request").end();
    this.dataReq = e, this.dataRes = t;
    let a, o = 0;
    const r = {
      // text/html is required instead of text/plain to avoid an
      // unwanted download dialog on certain user-agents (GH-43)
      "Content-Type": "text/html"
    };
    this.headers(e, r);
    for (let c in r)
      t.writeHeader(c, String(r[c]));
    const p = (c) => {
      this.onData(c.toString()), this.onDataRequestCleanup(), t.cork(() => {
        t.end("ok");
      });
    };
    t.onAborted(() => {
      this.onDataRequestCleanup(), this.onError("data request connection closed prematurely");
    }), t.onData((c, u) => {
      const l = o + c.byteLength;
      if (l > s) {
        this.onError("content-length mismatch"), t.close();
        return;
      }
      if (!a) {
        if (u) {
          p(Buffer.from(c));
          return;
        }
        a = Buffer.allocUnsafe(s);
      }
      if (Buffer.from(c).copy(a, o), u) {
        if (l != s) {
          this.onError("content-length mismatch"), t.writeStatus("400 Content-Length Mismatch").end(), this.onDataRequestCleanup();
          return;
        }
        p(a);
        return;
      }
      o = l;
    });
  }
  /**
   * Cleanup request.
   *
   * @private
   */
  onDataRequestCleanup() {
    this.dataReq = this.dataRes = null;
  }
  /**
   * Processes the incoming data payload.
   *
   * @param {String} encoded payload
   * @private
   */
  onData(e) {
    ne('received "%s"', e);
    const t = (s) => {
      if (s.type === "close")
        return ne("got xhr close packet"), this.onClose(), !1;
      this.onPacket(s);
    };
    this.protocol === 3 ? this.parser.decodePayload(e, t) : this.parser.decodePayload(e).forEach(t);
  }
  /**
   * Overrides onClose.
   *
   * @private
   */
  onClose() {
    this.writable && this.send([{ type: "noop" }]), super.onClose();
  }
  /**
   * Writes a packet payload.
   *
   * @param {Object} packet
   * @private
   */
  send(e) {
    this.writable = !1, this.shouldClose && (ne("appending close packet to payload"), e.push({ type: "close" }), this.shouldClose(), this.shouldClose = null);
    const t = (s) => {
      const n = e.some((a) => a.options && a.options.compress);
      this.write(s, { compress: n });
    };
    this.protocol === 3 ? this.parser.encodePayload(e, this.supportsBinary, t) : this.parser.encodePayload(e, t);
  }
  /**
   * Writes data as response to poll request.
   *
   * @param {String} data
   * @param {Object} options
   * @private
   */
  write(e, t) {
    ne('writing "%s"', e), this.doWrite(e, t, () => {
      this.req.cleanup(), this.emit("drain");
    });
  }
  /**
   * Performs the write.
   *
   * @private
   */
  doWrite(e, t, s) {
    const n = typeof e == "string", o = {
      "Content-Type": n ? "text/plain; charset=UTF-8" : "application/octet-stream"
    }, r = (u) => {
      this.headers(this.req, o), this.res.cork(() => {
        Object.keys(o).forEach((l) => {
          this.res.writeHeader(l, String(o[l]));
        }), this.res.end(u);
      }), s();
    };
    if (!this.httpCompression || !t.compress) {
      r(e);
      return;
    }
    if ((n ? Buffer.byteLength(e) : e.length) < this.httpCompression.threshold) {
      r(e);
      return;
    }
    const c = zp(this.req).encodings(["gzip", "deflate"]);
    if (!c) {
      r(e);
      return;
    }
    this.compress(e, c, (u, l) => {
      if (u) {
        this.res.writeStatus("500 Internal Server Error"), this.res.end(), s(u);
        return;
      }
      o["Content-Encoding"] = c, r(l);
    });
  }
  /**
   * Compresses data.
   *
   * @private
   */
  compress(e, t, s) {
    ne("compressing");
    const n = [];
    let a = 0;
    Vp[t](this.httpCompression).on("error", s).on("data", function(o) {
      n.push(o), a += o.length;
    }).on("end", function() {
      s(null, Buffer.concat(n, a));
    }).end(e);
  }
  /**
   * Closes the transport.
   *
   * @private
   */
  doClose(e) {
    ne("closing");
    let t;
    const s = () => {
      clearTimeout(t), e(), this.onClose();
    };
    this.writable ? (ne("transport writable - closing right away"), this.send([{ type: "close" }]), s()) : this.discarded ? (ne("transport discarded - closing right away"), s()) : (ne("transport not writable - buffering orderly close"), this.shouldClose = s, t = setTimeout(s, this.closeTimeout));
  }
  /**
   * Returns headers for a response.
   *
   * @param req - request
   * @param {Object} extra headers
   * @private
   */
  headers(e, t) {
    t = t || {};
    const s = e.headers["user-agent"];
    return s && (~s.indexOf(";MSIE") || ~s.indexOf("Trident/")) && (t["X-XSS-Protection"] = "0"), t["cache-control"] = "no-store", this.emit("headers", t, e), t;
  }
}
rs.Polling = Hp;
var cs = {};
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.WebSocket = void 0;
const Gp = ve, Kp = K, mn = (0, Kp.default)("engine:ws");
let Yp = class extends Gp.Transport {
  /**
   * WebSocket transport
   *
   * @param req
   */
  constructor(e) {
    super(e), this.writable = !1, this.perMessageDeflate = null;
  }
  /**
   * Transport name
   */
  get name() {
    return "websocket";
  }
  /**
   * Advertise upgrade support.
   */
  get handlesUpgrades() {
    return !0;
  }
  /**
   * Writes a packet payload.
   *
   * @param {Array} packets
   * @private
   */
  send(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const s = e[t], n = t + 1 === e.length, a = (o) => {
        const r = typeof o != "string", p = this.perMessageDeflate && Buffer.byteLength(o) > this.perMessageDeflate.threshold;
        mn('writing "%s"', o), this.socket.send(o, r, p), n && (this.emit("drain"), this.writable = !0, this.emit("ready"));
      };
      s.options && typeof s.options.wsPreEncoded == "string" ? a(s.options.wsPreEncoded) : this.parser.encodePacket(s, this.supportsBinary, a);
    }
  }
  /**
   * Closes the transport.
   *
   * @private
   */
  doClose(e) {
    mn("closing"), e && e(), this.socket.end();
  }
};
cs.WebSocket = Yp;
Object.defineProperty(ii, "__esModule", { value: !0 });
const Jp = rs, Qp = cs;
ii.default = {
  polling: Jp.Polling,
  websocket: Qp.WebSocket
};
Object.defineProperty(os, "__esModule", { value: !0 });
os.uServer = void 0;
const Xp = K, je = Fe, Zp = ii, be = (0, Xp.default)("engine:uws");
class el extends je.BaseServer {
  init() {
  }
  cleanup() {
  }
  /**
   * Prepares a request by processing the query string.
   *
   * @private
   */
  prepare(e, t) {
    e.method = e.getMethod().toUpperCase(), e.url = e.getUrl();
    const s = new URLSearchParams(e.getQuery());
    e._query = Object.fromEntries(s.entries()), e.headers = {}, e.forEach((n, a) => {
      e.headers[n] = a;
    }), e.connection = {
      remoteAddress: Buffer.from(t.getRemoteAddressAsText()).toString()
    }, t.onAborted(() => {
      be("response has been aborted");
    });
  }
  createTransport(e, t) {
    return new Zp.default[e](t);
  }
  /**
   * Attach the engine to a µWebSockets.js server
   * @param app
   * @param options
   */
  attach(e, t = {}) {
    const s = this._computePath(t);
    e.any(s, this.handleRequest.bind(this)).ws(s, {
      compression: t.compression,
      idleTimeout: t.idleTimeout,
      maxBackpressure: t.maxBackpressure,
      maxPayloadLength: this.opts.maxHttpBufferSize,
      upgrade: this.handleUpgrade.bind(this),
      open: (n) => {
        const a = n.getUserData().transport;
        a.socket = n, a.writable = !0, a.emit("ready");
      },
      message: (n, a, o) => {
        n.getUserData().transport.onData(o ? a : Buffer.from(a).toString());
      },
      close: (n, a, o) => {
        n.getUserData().transport.onClose(a, o);
      }
    });
  }
  _applyMiddlewares(e, t, s) {
    if (this.middlewares.length === 0)
      return s();
    e.res = new tl(t), super._applyMiddlewares(e, e.res, (n) => {
      e.res.writeHead(), s(n);
    });
  }
  handleRequest(e, t) {
    be('handling "%s" http request "%s"', t.getMethod(), t.getUrl()), this.prepare(t, e), t.res = e;
    const s = (n, a) => {
      if (n !== void 0) {
        this.emit("connection_error", {
          req: t,
          code: n,
          message: je.Server.errorMessages[n],
          context: a
        }), this.abortRequest(t.res, n, a);
        return;
      }
      if (t._query.sid)
        be("setting new request for existing client"), this.clients[t._query.sid].transport.onRequest(t);
      else {
        const o = (r, p) => this.abortRequest(e, r, p);
        this.handshake(t._query.transport, t, o);
      }
    };
    this._applyMiddlewares(t, e, (n) => {
      n ? s(je.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(t, !1, s);
    });
  }
  handleUpgrade(e, t, s) {
    be("on upgrade"), this.prepare(t, e), t.res = e;
    const n = async (a, o) => {
      if (a !== void 0) {
        this.emit("connection_error", {
          req: t,
          code: a,
          message: je.Server.errorMessages[a],
          context: o
        }), this.abortRequest(e, a, o);
        return;
      }
      const r = t._query.sid;
      let p;
      if (r) {
        const l = this.clients[r];
        if (l) {
          if (l.upgrading)
            return be("transport has already been trying to upgrade"), e.close();
          if (l.upgraded)
            return be("transport had already been upgraded"), e.close();
          be("upgrading existing transport"), p = this.createTransport(t._query.transport, t), l._maybeUpgrade(p);
        } else return be("upgrade attempt for closed client"), e.close();
      } else if (p = await this.handshake(t._query.transport, t, (l, d) => this.abortRequest(e, l, d)), !p)
        return;
      const c = {};
      !r && this.emit("initial_headers", c, t), this.emit("headers", c, t), t.res.writeStatus("101 Switching Protocols"), Object.keys(c).forEach((l) => {
        t.res.writeHeader(l, c[l]);
      }), e.upgrade({
        transport: p
      }, t.getHeader("sec-websocket-key"), t.getHeader("sec-websocket-protocol"), t.getHeader("sec-websocket-extensions"), s);
    };
    this._applyMiddlewares(t, e, (a) => {
      a ? n(je.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(t, !0, n);
    });
  }
  abortRequest(e, t, s) {
    const n = t === je.Server.errors.FORBIDDEN ? "403 Forbidden" : "400 Bad Request", a = s && s.message ? s.message : je.Server.errorMessages[t];
    e.writeStatus(n), e.writeHeader("Content-Type", "application/json"), e.end(JSON.stringify({
      code: t,
      message: a
    }));
  }
}
os.uServer = el;
class tl {
  constructor(e) {
    this.res = e, this.statusWritten = !1, this.headers = [], this.isAborted = !1;
  }
  set statusCode(e) {
    e && this.writeStatus(e === 200 ? "200 OK" : "204 No Content");
  }
  writeHead(e) {
    this.statusCode = e;
  }
  setHeader(e, t) {
    Array.isArray(t) ? t.forEach((s) => {
      this.writeHeader(e, s);
    }) : this.writeHeader(e, t);
  }
  removeHeader() {
  }
  // needed by vary: https://github.com/jshttp/vary/blob/5d725d059b3871025cf753e9dfa08924d0bcfa8f/index.js#L134
  getHeader() {
  }
  writeStatus(e) {
    if (!this.isAborted)
      return this.res.writeStatus(e), this.statusWritten = !0, this.writeBufferedHeaders(), this;
  }
  writeHeader(e, t) {
    this.isAborted || e !== "Content-Length" && (this.statusWritten ? this.res.writeHeader(e, t) : this.headers.push([e, t]));
  }
  writeBufferedHeaders() {
    this.headers.forEach(([e, t]) => {
      this.res.writeHeader(e, t);
    });
  }
  end(e) {
    this.isAborted || this.res.cork(() => {
      this.statusWritten || this.writeBufferedHeaders(), this.res.end(e);
    });
  }
  onData(e) {
    this.isAborted || this.res.onData(e);
  }
  onAborted(e) {
    this.isAborted || this.res.onAborted(() => {
      this.isAborted = !0, e();
    });
  }
  cork(e) {
    this.isAborted || this.res.cork(e);
  }
}
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.protocol = i.Transport = i.Socket = i.uServer = i.parser = i.transports = i.Server = void 0, i.listen = p, i.attach = c;
  const e = Jt, t = Fe;
  Object.defineProperty(i, "Server", { enumerable: !0, get: function() {
    return t.Server;
  } });
  const s = Xt;
  i.transports = s.default;
  const n = lt;
  i.parser = n;
  var a = os;
  Object.defineProperty(i, "uServer", { enumerable: !0, get: function() {
    return a.uServer;
  } });
  var o = dt;
  Object.defineProperty(i, "Socket", { enumerable: !0, get: function() {
    return o.Socket;
  } });
  var r = ve;
  Object.defineProperty(i, "Transport", { enumerable: !0, get: function() {
    return r.Transport;
  } }), i.protocol = n.protocol;
  function p(u, l, d) {
    typeof l == "function" && (d = l, l = {});
    const v = (0, e.createServer)(function(h, x) {
      x.writeHead(501), x.end("Not Implemented");
    }), m = c(v, l);
    return m.httpServer = v, v.listen(u, d), m;
  }
  function c(u, l) {
    const d = new t.Server(l);
    return d.attach(u, l), d;
  }
})(Ln);
var ps = {}, Q = {};
function J(i) {
  if (i) return sl(i);
}
function sl(i) {
  for (var e in J.prototype)
    i[e] = J.prototype[e];
  return i;
}
J.prototype.on = J.prototype.addEventListener = function(i, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + i] = this._callbacks["$" + i] || []).push(e), this;
};
J.prototype.once = function(i, e) {
  function t() {
    this.off(i, t), e.apply(this, arguments);
  }
  return t.fn = e, this.on(i, t), this;
};
J.prototype.off = J.prototype.removeListener = J.prototype.removeAllListeners = J.prototype.removeEventListener = function(i, e) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var t = this._callbacks["$" + i];
  if (!t) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + i], this;
  for (var s, n = 0; n < t.length; n++)
    if (s = t[n], s === e || s.fn === e) {
      t.splice(n, 1);
      break;
    }
  return t.length === 0 && delete this._callbacks["$" + i], this;
};
J.prototype.emit = function(i) {
  this._callbacks = this._callbacks || {};
  for (var e = new Array(arguments.length - 1), t = this._callbacks["$" + i], s = 1; s < arguments.length; s++)
    e[s - 1] = arguments[s];
  if (t) {
    t = t.slice(0);
    for (var s = 0, n = t.length; s < n; ++s)
      t[s].apply(this, e);
  }
  return this;
};
J.prototype.emitReserved = J.prototype.emit;
J.prototype.listeners = function(i) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + i] || [];
};
J.prototype.hasListeners = function(i) {
  return !!this.listeners(i).length;
};
const il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Emitter: J
}, Symbol.toStringTag, { value: "Module" })), nl = /* @__PURE__ */ Xa(il);
var ls = {}, ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.isBinary = Ea;
ht.hasBinary = Lt;
const al = typeof ArrayBuffer == "function", ol = (i) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(i) : i.buffer instanceof ArrayBuffer, wa = Object.prototype.toString, rl = typeof Blob == "function" || typeof Blob < "u" && wa.call(Blob) === "[object BlobConstructor]", cl = typeof File == "function" || typeof File < "u" && wa.call(File) === "[object FileConstructor]";
function Ea(i) {
  return al && (i instanceof ArrayBuffer || ol(i)) || rl && i instanceof Blob || cl && i instanceof File;
}
function Lt(i, e) {
  if (!i || typeof i != "object")
    return !1;
  if (Array.isArray(i)) {
    for (let t = 0, s = i.length; t < s; t++)
      if (Lt(i[t]))
        return !0;
    return !1;
  }
  if (Ea(i))
    return !0;
  if (i.toJSON && typeof i.toJSON == "function" && arguments.length === 1)
    return Lt(i.toJSON(), !0);
  for (const t in i)
    if (Object.prototype.hasOwnProperty.call(i, t) && Lt(i[t]))
      return !0;
  return !1;
}
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.deconstructPacket = ll;
ls.reconstructPacket = ul;
const pl = ht;
function ll(i) {
  const e = [], t = i.data, s = i;
  return s.data = Ft(t, e), s.attachments = e.length, { packet: s, buffers: e };
}
function Ft(i, e, t) {
  if (!i)
    return i;
  if ((0, pl.isBinary)(i)) {
    const s = { _placeholder: !0, num: e.length };
    return e.push(i), s;
  } else if (Array.isArray(i)) {
    const s = new Array(i.length);
    for (let n = 0; n < i.length; n++)
      s[n] = Ft(i[n], e);
    return s;
  } else if (typeof i == "object" && !(i instanceof Date)) {
    if (i.toJSON && typeof i.toJSON == "function" && !t)
      return Ft(i.toJSON(), e, !0);
    const s = {};
    for (const n in i)
      Object.prototype.hasOwnProperty.call(i, n) && (s[n] = Ft(i[n], e));
    return s;
  }
  return i;
}
function ul(i, e) {
  return i.data = Us(i.data, e), delete i.attachments, i;
}
function Us(i, e) {
  if (!i)
    return i;
  if (i && i._placeholder === !0) {
    if (typeof i.num == "number" && i.num >= 0 && i.num < e.length)
      return e[i.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(i))
    for (let t = 0; t < i.length; t++)
      i[t] = Us(i[t], e);
  else if (typeof i == "object")
    for (const t in i)
      Object.prototype.hasOwnProperty.call(i, t) && (i[t] = Us(i[t], e));
  return i;
}
var dl = z && z.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.Decoder = Q.Encoder = Q.PacketType = Q.protocol = void 0;
Q.isPacketValid = yl;
const ml = nl, ka = ls, Sa = ht, fl = dl(K), Ms = (0, fl.default)("socket.io-parser"), Ca = [
  "connect",
  // used on the client side
  "connect_error",
  // used on the client side
  "disconnect",
  // used on both sides
  "disconnecting",
  // used on the server side
  "newListener",
  // used by the Node.js EventEmitter
  "removeListener"
  // used by the Node.js EventEmitter
];
Q.protocol = 5;
var L;
(function(i) {
  i[i.CONNECT = 0] = "CONNECT", i[i.DISCONNECT = 1] = "DISCONNECT", i[i.EVENT = 2] = "EVENT", i[i.ACK = 3] = "ACK", i[i.CONNECT_ERROR = 4] = "CONNECT_ERROR", i[i.BINARY_EVENT = 5] = "BINARY_EVENT", i[i.BINARY_ACK = 6] = "BINARY_ACK";
})(L || (Q.PacketType = L = {}));
class hl {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(e) {
    this.replacer = e;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(e) {
    return Ms("encoding packet %j", e), (e.type === L.EVENT || e.type === L.ACK) && (0, Sa.hasBinary)(e) ? this.encodeAsBinary({
      type: e.type === L.EVENT ? L.BINARY_EVENT : L.BINARY_ACK,
      nsp: e.nsp,
      data: e.data,
      id: e.id
    }) : [this.encodeAsString(e)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(e) {
    let t = "" + e.type;
    return (e.type === L.BINARY_EVENT || e.type === L.BINARY_ACK) && (t += e.attachments + "-"), e.nsp && e.nsp !== "/" && (t += e.nsp + ","), e.id != null && (t += e.id), e.data != null && (t += JSON.stringify(e.data, this.replacer)), Ms("encoded %j as %s", e, t), t;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const t = (0, ka.deconstructPacket)(e), s = this.encodeAsString(t.packet), n = t.buffers;
    return n.unshift(s), n;
  }
}
Q.Encoder = hl;
class ni extends ml.Emitter {
  /**
   * Decoder constructor
   */
  constructor(e) {
    super(), this.opts = Object.assign({
      reviver: void 0,
      maxAttachments: 10
    }, typeof e == "function" ? { reviver: e } : e);
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(e) {
    let t;
    if (typeof e == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      t = this.decodeString(e);
      const s = t.type === L.BINARY_EVENT;
      s || t.type === L.BINARY_ACK ? (t.type = s ? L.EVENT : L.ACK, this.reconstructor = new vl(t)) : super.emitReserved("decoded", t);
    } else if ((0, Sa.isBinary)(e) || e.base64)
      if (this.reconstructor)
        t = this.reconstructor.takeBinaryData(e), t && (this.reconstructor = null, super.emitReserved("decoded", t));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + e);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(e) {
    let t = 0;
    const s = {
      type: Number(e.charAt(0))
    };
    if (L[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === L.BINARY_EVENT || s.type === L.BINARY_ACK) {
      const a = t + 1;
      for (; e.charAt(++t) !== "-" && t != e.length; )
        ;
      const o = e.substring(a, t);
      if (o != Number(o) || e.charAt(t) !== "-")
        throw new Error("Illegal attachments");
      const r = Number(o);
      if (!Ta(r) || r < 1)
        throw new Error("Illegal attachments");
      if (r > this.opts.maxAttachments)
        throw new Error("too many attachments");
      s.attachments = r;
    }
    if (e.charAt(t + 1) === "/") {
      const a = t + 1;
      for (; ++t && !(e.charAt(t) === "," || t === e.length); )
        ;
      s.nsp = e.substring(a, t);
    } else
      s.nsp = "/";
    const n = e.charAt(t + 1);
    if (n !== "" && Number(n) == n) {
      const a = t + 1;
      for (; ++t; ) {
        const o = e.charAt(t);
        if (o == null || Number(o) != o) {
          --t;
          break;
        }
        if (t === e.length)
          break;
      }
      s.id = Number(e.substring(a, t + 1));
    }
    if (e.charAt(++t)) {
      const a = this.tryParse(e.substr(t));
      if (ni.isPayloadValid(s.type, a))
        s.data = a;
      else
        throw new Error("invalid payload");
    }
    return Ms("decoded %s as %j", e, s), s;
  }
  tryParse(e) {
    try {
      return JSON.parse(e, this.opts.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(e, t) {
    switch (e) {
      case L.CONNECT:
        return Ht(t);
      case L.DISCONNECT:
        return t === void 0;
      case L.CONNECT_ERROR:
        return typeof t == "string" || Ht(t);
      case L.EVENT:
      case L.BINARY_EVENT:
        return Array.isArray(t) && (typeof t[0] == "number" || typeof t[0] == "string" && Ca.indexOf(t[0]) === -1);
      case L.ACK:
      case L.BINARY_ACK:
        return Array.isArray(t);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
Q.Decoder = ni;
class vl {
  constructor(e) {
    this.packet = e, this.buffers = [], this.reconPack = e;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(e) {
    if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
      const t = (0, ka.reconstructPacket)(this.reconPack, this.buffers);
      return this.finishedReconstruction(), t;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null, this.buffers = [];
  }
}
function xl(i) {
  return typeof i == "string";
}
const Ta = Number.isInteger || function(i) {
  return typeof i == "number" && isFinite(i) && Math.floor(i) === i;
};
function gl(i) {
  return i === void 0 || Ta(i);
}
function Ht(i) {
  return Object.prototype.toString.call(i) === "[object Object]";
}
function bl(i, e) {
  switch (i) {
    case L.CONNECT:
      return e === void 0 || Ht(e);
    case L.DISCONNECT:
      return e === void 0;
    case L.EVENT:
      return Array.isArray(e) && (typeof e[0] == "number" || typeof e[0] == "string" && Ca.indexOf(e[0]) === -1);
    case L.ACK:
      return Array.isArray(e);
    case L.CONNECT_ERROR:
      return typeof e == "string" || Ht(e);
    default:
      return !1;
  }
}
function yl(i) {
  return xl(i.nsp) && gl(i.id) && bl(i.type, i.data);
}
var _l = z && z.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(ps, "__esModule", { value: !0 });
ps.Client = void 0;
const jt = Q, wl = _l(K), ce = (0, wl.default)("socket.io:client");
class El {
  /**
   * Client constructor.
   *
   * @param server instance
   * @param conn
   * @package
   */
  constructor(e, t) {
    this.sockets = /* @__PURE__ */ new Map(), this.nsps = /* @__PURE__ */ new Map(), this.server = e, this.conn = t, this.encoder = e.encoder, this.decoder = new e._parser.Decoder(), this.id = t.id, this.setup();
  }
  /**
   * @return the reference to the request that originated the Engine.IO connection
   *
   * @public
   */
  get request() {
    return this.conn.request;
  }
  /**
   * Sets up event listeners.
   *
   * @private
   */
  setup() {
    this.onclose = this.onclose.bind(this), this.ondata = this.ondata.bind(this), this.onerror = this.onerror.bind(this), this.ondecoded = this.ondecoded.bind(this), this.decoder.on("decoded", this.ondecoded), this.conn.on("data", this.ondata), this.conn.on("error", this.onerror), this.conn.on("close", this.onclose), this.connectTimeout = setTimeout(() => {
      this.nsps.size === 0 ? (ce("no namespace joined yet, close the client"), this.close()) : ce("the client has already joined a namespace, nothing to do");
    }, this.server._connectTimeout);
  }
  /**
   * Connects a client to a namespace.
   *
   * @param {String} name - the namespace
   * @param {Object} auth - the auth parameters
   * @private
   */
  connect(e, t = {}) {
    if (this.server._nsps.has(e))
      return ce("connecting to namespace %s", e), this.doConnect(e, t);
    this.server._checkNamespace(e, t, (s) => {
      s ? this.doConnect(e, t) : (ce("creation of namespace %s was denied", e), this._packet({
        type: jt.PacketType.CONNECT_ERROR,
        nsp: e,
        data: {
          message: "Invalid namespace"
        }
      }));
    });
  }
  /**
   * Connects a client to a namespace.
   *
   * @param name - the namespace
   * @param {Object} auth - the auth parameters
   *
   * @private
   */
  doConnect(e, t) {
    const s = this.server.of(e);
    s._add(this, t, (n) => {
      this.sockets.set(n.id, n), this.nsps.set(s.name, n), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0);
    });
  }
  /**
   * Disconnects from all namespaces and closes transport.
   *
   * @private
   */
  _disconnect() {
    for (const e of this.sockets.values())
      e.disconnect();
    this.sockets.clear(), this.close();
  }
  /**
   * Removes a socket. Called by each `Socket`.
   *
   * @private
   */
  _remove(e) {
    if (this.sockets.has(e.id)) {
      const t = this.sockets.get(e.id).nsp.name;
      this.sockets.delete(e.id), this.nsps.delete(t);
    } else
      ce("ignoring remove for %s", e.id);
  }
  /**
   * Closes the underlying connection.
   *
   * @private
   */
  close() {
    this.conn.readyState === "open" && (ce("forcing transport close"), this.conn.close(), this.onclose("forced server close"));
  }
  /**
   * Writes a packet to the transport.
   *
   * @param {Object} packet object
   * @param {Object} opts
   * @private
   */
  _packet(e, t = {}) {
    if (this.conn.readyState !== "open") {
      ce("ignoring packet write %j", e);
      return;
    }
    const s = t.preEncoded ? e : this.encoder.encode(e);
    this.writeToEngine(s, t);
  }
  writeToEngine(e, t) {
    if (t.volatile && !this.conn.transport.writable) {
      ce("volatile packet is discarded since the transport is not currently writable");
      return;
    }
    const s = Array.isArray(e) ? e : [e];
    for (const n of s)
      this.conn.write(n, t);
  }
  /**
   * Called with incoming transport data.
   *
   * @private
   */
  ondata(e) {
    try {
      this.decoder.add(e);
    } catch (t) {
      ce("invalid packet format"), this.onerror(t);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(e) {
    const { namespace: t, authPayload: s } = this._parseNamespace(e), n = this.nsps.get(t);
    !n && e.type === jt.PacketType.CONNECT ? this.connect(t, s) : n && e.type !== jt.PacketType.CONNECT && e.type !== jt.PacketType.CONNECT_ERROR ? process.nextTick(function() {
      n._onpacket(e);
    }) : (ce("invalid state (packet type: %s)", e.type), this.close());
  }
  _parseNamespace(e) {
    if (this.conn.protocol !== 3)
      return {
        namespace: e.nsp,
        authPayload: e.data
      };
    const t = new URL(e.nsp, "https://socket.io");
    return {
      namespace: t.pathname,
      authPayload: Object.fromEntries(t.searchParams.entries())
    };
  }
  /**
   * Handles an error.
   *
   * @param {Object} err object
   * @private
   */
  onerror(e) {
    for (const t of this.sockets.values())
      t._onerror(e);
    this.conn.close();
  }
  /**
   * Called upon transport close.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(e, t) {
    ce("client close with reason %s", e), this.destroy();
    for (const s of this.sockets.values())
      s._onclose(e, t);
    this.sockets.clear(), this.decoder.destroy();
  }
  /**
   * Cleans up event listeners.
   * @private
   */
  destroy() {
    this.conn.removeListener("data", this.ondata), this.conn.removeListener("error", this.onerror), this.conn.removeListener("close", this.onclose), this.decoder.removeListener("decoded", this.ondecoded), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0);
  }
}
ps.Client = El;
var ai = {}, vt = {}, Ze = {};
Object.defineProperty(Ze, "__esModule", { value: !0 });
Ze.StrictEventEmitter = void 0;
const kl = Te;
class Sl extends kl.EventEmitter {
  /**
   * Adds the `listener` function as an event listener for `ev`.
   *
   * @param ev Name of the event
   * @param listener Callback function
   */
  on(e, t) {
    return super.on(e, t);
  }
  /**
   * Adds a one-time `listener` function as an event listener for `ev`.
   *
   * @param ev Name of the event
   * @param listener Callback function
   */
  once(e, t) {
    return super.once(e, t);
  }
  /**
   * Emits an event.
   *
   * @param ev Name of the event
   * @param args Values to send to listeners of this event
   */
  emit(e, ...t) {
    return super.emit(e, ...t);
  }
  /**
   * Emits a reserved event.
   *
   * This method is `protected`, so that only a class extending
   * `StrictEventEmitter` can emit its own reserved events.
   *
   * @param ev Reserved event name
   * @param args Arguments to emit along with the event
   */
  emitReserved(e, ...t) {
    return super.emit(e, ...t);
  }
  /**
   * Emits an event.
   *
   * This method is `protected`, so that only a class extending
   * `StrictEventEmitter` can get around the strict typing. This is useful for
   * calling `emit.apply`, which can be called as `emitUntyped.apply`.
   *
   * @param ev Event name
   * @param args Arguments to emit along with the event
   */
  emitUntyped(e, ...t) {
    return super.emit(e, ...t);
  }
  /**
   * Returns the listeners listening to an event.
   *
   * @param event Event name
   * @returns Array of listeners subscribed to `event`
   */
  listeners(e) {
    return super.listeners(e);
  }
}
Ze.StrictEventEmitter = Sl;
var De = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.RESERVED_EVENTS = void 0;
xt.RESERVED_EVENTS = /* @__PURE__ */ new Set([
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
]);
Object.defineProperty(De, "__esModule", { value: !0 });
De.RemoteSocket = De.BroadcastOperator = void 0;
const Cl = xt, Tl = Q;
class he {
  constructor(e, t = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), n = {}) {
    this.adapter = e, this.rooms = t, this.exceptRooms = s, this.flags = n;
  }
  /**
   * Targets a room when emitting.
   *
   * @example
   * // the “foo” event will be broadcast to all connected clients in the “room-101” room
   * io.to("room-101").emit("foo", "bar");
   *
   * // with an array of rooms (a client will be notified at most once)
   * io.to(["room-101", "room-102"]).emit("foo", "bar");
   *
   * // with multiple chained calls
   * io.to("room-101").to("room-102").emit("foo", "bar");
   *
   * @param room - a room, or an array of rooms
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  to(e) {
    const t = new Set(this.rooms);
    return Array.isArray(e) ? e.forEach((s) => t.add(s)) : t.add(e), new he(this.adapter, t, this.exceptRooms, this.flags);
  }
  /**
   * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
   *
   * @example
   * // disconnect all clients in the "room-101" room
   * io.in("room-101").disconnectSockets();
   *
   * @param room - a room, or an array of rooms
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  in(e) {
    return this.to(e);
  }
  /**
   * Excludes a room when emitting.
   *
   * @example
   * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
   * io.except("room-101").emit("foo", "bar");
   *
   * // with an array of rooms
   * io.except(["room-101", "room-102"]).emit("foo", "bar");
   *
   * // with multiple chained calls
   * io.except("room-101").except("room-102").emit("foo", "bar");
   *
   * @param room - a room, or an array of rooms
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  except(e) {
    const t = new Set(this.exceptRooms);
    return Array.isArray(e) ? e.forEach((s) => t.add(s)) : t.add(e), new he(this.adapter, this.rooms, t, this.flags);
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * io.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return a new BroadcastOperator instance
   */
  compress(e) {
    const t = Object.assign({}, this.flags, { compress: e });
    return new he(this.adapter, this.rooms, this.exceptRooms, t);
  }
  /**
   * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
   * receive messages (because of network slowness or other issues, or because they’re connected through long polling
   * and is in the middle of a request-response cycle).
   *
   * @example
   * io.volatile.emit("hello"); // the clients may or may not receive it
   *
   * @return a new BroadcastOperator instance
   */
  get volatile() {
    const e = Object.assign({}, this.flags, { volatile: !0 });
    return new he(this.adapter, this.rooms, this.exceptRooms, e);
  }
  /**
   * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
   *
   * @example
   * // the “foo” event will be broadcast to all connected clients on this node
   * io.local.emit("foo", "bar");
   *
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  get local() {
    const e = Object.assign({}, this.flags, { local: !0 });
    return new he(this.adapter, this.rooms, this.exceptRooms, e);
  }
  /**
   * Adds a timeout in milliseconds for the next operation
   *
   * @example
   * io.timeout(1000).emit("some-event", (err, responses) => {
   *   if (err) {
   *     // some clients did not acknowledge the event in the given delay
   *   } else {
   *     console.log(responses); // one response per client
   *   }
   * });
   *
   * @param timeout
   */
  timeout(e) {
    const t = Object.assign({}, this.flags, { timeout: e });
    return new he(this.adapter, this.rooms, this.exceptRooms, t);
  }
  /**
   * Emits to all clients.
   *
   * @example
   * // the “foo” event will be broadcast to all connected clients
   * io.emit("foo", "bar");
   *
   * // the “foo” event will be broadcast to all connected clients in the “room-101” room
   * io.to("room-101").emit("foo", "bar");
   *
   * // with an acknowledgement expected from all connected clients
   * io.timeout(1000).emit("some-event", (err, responses) => {
   *   if (err) {
   *     // some clients did not acknowledge the event in the given delay
   *   } else {
   *     console.log(responses); // one response per client
   *   }
   * });
   *
   * @return Always true
   */
  emit(e, ...t) {
    if (Cl.RESERVED_EVENTS.has(e))
      throw new Error(`"${String(e)}" is a reserved event name`);
    const s = [e, ...t], n = {
      type: Tl.PacketType.EVENT,
      data: s
    };
    if (!(typeof s[s.length - 1] == "function"))
      return this.adapter.broadcast(n, {
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }), !0;
    const o = s.pop();
    let r = !1, p = [];
    const c = setTimeout(() => {
      r = !0, o.apply(this, [
        new Error("operation has timed out"),
        this.flags.expectSingleResponse ? null : p
      ]);
    }, this.flags.timeout);
    let u = -1, l = 0, d = 0;
    const v = () => {
      !r && u === l && p.length === d && (clearTimeout(c), o.apply(this, [
        null,
        this.flags.expectSingleResponse ? p[0] : p
      ]));
    };
    return this.adapter.broadcastWithAck(n, {
      rooms: this.rooms,
      except: this.exceptRooms,
      flags: this.flags
    }, (m) => {
      d += m, l++, v();
    }, (m) => {
      p.push(m), v();
    }), this.adapter.serverCount().then((m) => {
      u = m, v();
    }), !0;
  }
  /**
   * Emits an event and waits for an acknowledgement from all clients.
   *
   * @example
   * try {
   *   const responses = await io.timeout(1000).emitWithAck("some-event");
   *   console.log(responses); // one response per client
   * } catch (e) {
   *   // some clients did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when all clients have acknowledged the event
   */
  emitWithAck(e, ...t) {
    return new Promise((s, n) => {
      t.push((a, o) => a ? (a.responses = o, n(a)) : s(o)), this.emit(e, ...t);
    });
  }
  /**
   * Gets a list of clients.
   *
   * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
   * {@link fetchSockets} instead.
   */
  allSockets() {
    if (!this.adapter)
      throw new Error("No adapter for this namespace, are you trying to get the list of clients of a dynamic namespace?");
    return this.adapter.sockets(this.rooms);
  }
  /**
   * Returns the matching socket instances. This method works across a cluster of several Socket.IO servers.
   *
   * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
   *
   * @example
   * // return all Socket instances
   * const sockets = await io.fetchSockets();
   *
   * // return all Socket instances in the "room1" room
   * const sockets = await io.in("room1").fetchSockets();
   *
   * for (const socket of sockets) {
   *   console.log(socket.id);
   *   console.log(socket.handshake);
   *   console.log(socket.rooms);
   *   console.log(socket.data);
   *
   *   socket.emit("hello");
   *   socket.join("room1");
   *   socket.leave("room2");
   *   socket.disconnect();
   * }
   */
  fetchSockets() {
    return this.adapter.fetchSockets({
      rooms: this.rooms,
      except: this.exceptRooms,
      flags: this.flags
    }).then((e) => e.map((t) => t.server ? t : new Oa(this.adapter, t)));
  }
  /**
   * Makes the matching socket instances join the specified rooms.
   *
   * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
   *
   * @example
   *
   * // make all socket instances join the "room1" room
   * io.socketsJoin("room1");
   *
   * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
   * io.in("room1").socketsJoin(["room2", "room3"]);
   *
   * @param room - a room, or an array of rooms
   */
  socketsJoin(e) {
    this.adapter.addSockets({
      rooms: this.rooms,
      except: this.exceptRooms,
      flags: this.flags
    }, Array.isArray(e) ? e : [e]);
  }
  /**
   * Makes the matching socket instances leave the specified rooms.
   *
   * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
   *
   * @example
   * // make all socket instances leave the "room1" room
   * io.socketsLeave("room1");
   *
   * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
   * io.in("room1").socketsLeave(["room2", "room3"]);
   *
   * @param room - a room, or an array of rooms
   */
  socketsLeave(e) {
    this.adapter.delSockets({
      rooms: this.rooms,
      except: this.exceptRooms,
      flags: this.flags
    }, Array.isArray(e) ? e : [e]);
  }
  /**
   * Makes the matching socket instances disconnect.
   *
   * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
   *
   * @example
   * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
   * io.disconnectSockets();
   *
   * // make all socket instances in the "room1" room disconnect and close the underlying connections
   * io.in("room1").disconnectSockets(true);
   *
   * @param close - whether to close the underlying connection
   */
  disconnectSockets(e = !1) {
    this.adapter.disconnectSockets({
      rooms: this.rooms,
      except: this.exceptRooms,
      flags: this.flags
    }, e);
  }
}
De.BroadcastOperator = he;
class Oa {
  constructor(e, t) {
    this.id = t.id, this.handshake = t.handshake, this.rooms = new Set(t.rooms), this.data = t.data, this.operator = new he(e, /* @__PURE__ */ new Set([this.id]), /* @__PURE__ */ new Set(), {
      expectSingleResponse: !0
      // so that remoteSocket.emit() with acknowledgement behaves like socket.emit()
    });
  }
  /**
   * Adds a timeout in milliseconds for the next operation.
   *
   * @example
   * const sockets = await io.fetchSockets();
   *
   * for (const socket of sockets) {
   *   if (someCondition) {
   *     socket.timeout(1000).emit("some-event", (err) => {
   *       if (err) {
   *         // the client did not acknowledge the event in the given delay
   *       }
   *     });
   *   }
   * }
   *
   * // note: if possible, using a room instead of looping over all sockets is preferable
   * io.timeout(1000).to(someConditionRoom).emit("some-event", (err, responses) => {
   *   // ...
   * });
   *
   * @param timeout
   */
  timeout(e) {
    return this.operator.timeout(e);
  }
  emit(e, ...t) {
    return this.operator.emit(e, ...t);
  }
  /**
   * Joins a room.
   *
   * @param {String|Array} room - room or array of rooms
   */
  join(e) {
    return this.operator.socketsJoin(e);
  }
  /**
   * Leaves a room.
   *
   * @param {String} room
   */
  leave(e) {
    return this.operator.socketsLeave(e);
  }
  /**
   * Disconnects this client.
   *
   * @param {Boolean} close - if `true`, closes the underlying connection
   * @return {Socket} self
   */
  disconnect(e = !1) {
    return this.operator.disconnectSockets(e), this;
  }
}
De.RemoteSocket = Oa;
var Ra = z && z.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.Socket = void 0;
const ae = Q, Ol = Ra(K), Rl = Ze, fn = Ra(Dn), Al = De, Pl = xt, Y = (0, Ol.default)("socket.io:socket"), jl = /* @__PURE__ */ new Set([
  "transport error",
  "transport close",
  "forced close",
  "ping timeout",
  "server shutting down",
  "forced server close"
]);
function hn() {
}
let Nl = class extends Rl.StrictEventEmitter {
  /**
   * Interface to a `Client` for a given `Namespace`.
   *
   * @param {Namespace} nsp
   * @param {Client} client
   * @param {Object} auth
   * @package
   */
  constructor(e, t, s, n) {
    super(), this.nsp = e, this.client = t, this.recovered = !1, this.data = {}, this.connected = !1, this.acks = /* @__PURE__ */ new Map(), this.fns = [], this.flags = {}, this.server = e.server, this.adapter = e.adapter, n ? (this.id = n.sid, this.pid = n.pid, n.rooms.forEach((a) => this.join(a)), this.data = n.data, n.missedPackets.forEach((a) => {
      this.packet({
        type: ae.PacketType.EVENT,
        data: a
      });
    }), this.recovered = !0) : (t.conn.protocol === 3 ? this.id = e.name !== "/" ? e.name + "#" + t.id : t.id : this.id = fn.default.generateId(), this.server._opts.connectionStateRecovery && (this.pid = fn.default.generateId())), this.handshake = this.buildHandshake(s), this.on("error", hn);
  }
  /**
   * Builds the `handshake` BC object
   *
   * @private
   */
  buildHandshake(e) {
    var t, s, n, a;
    return {
      headers: ((t = this.request) === null || t === void 0 ? void 0 : t.headers) || {},
      time: /* @__PURE__ */ new Date() + "",
      address: this.conn.remoteAddress,
      xdomain: !!(!((s = this.request) === null || s === void 0) && s.headers.origin),
      // @ts-ignore
      secure: !this.request || !!this.request.connection.encrypted,
      issued: +/* @__PURE__ */ new Date(),
      url: (n = this.request) === null || n === void 0 ? void 0 : n.url,
      // @ts-ignore
      query: ((a = this.request) === null || a === void 0 ? void 0 : a._query) || {},
      auth: e
    };
  }
  /**
   * Emits to this client.
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.emit("hello", "world");
   *
   *   // all serializable datastructures are supported (no need to call JSON.stringify)
   *   socket.emit("hello", 1, "2", { 3: ["4"], 5: Buffer.from([6]) });
   *
   *   // with an acknowledgement from the client
   *   socket.emit("hello", "world", (val) => {
   *     // ...
   *   });
   * });
   *
   * @return Always returns `true`.
   */
  emit(e, ...t) {
    if (Pl.RESERVED_EVENTS.has(e))
      throw new Error(`"${String(e)}" is a reserved event name`);
    const s = [e, ...t], n = {
      type: ae.PacketType.EVENT,
      data: s
    };
    if (typeof s[s.length - 1] == "function") {
      const o = this.nsp._ids++;
      Y("emitting packet with ack id %d", o), this.registerAckCallback(o, s.pop()), n.id = o;
    }
    const a = Object.assign({}, this.flags);
    return this.flags = {}, this.nsp.server.opts.connectionStateRecovery ? this.adapter.broadcast(n, {
      rooms: /* @__PURE__ */ new Set([this.id]),
      except: /* @__PURE__ */ new Set(),
      flags: a
    }) : (this.notifyOutgoingListeners(n), this.packet(n, a)), !0;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * io.on("connection", async (socket) => {
   *   // without timeout
   *   const response = await socket.emitWithAck("hello", "world");
   *
   *   // with a specific timeout
   *   try {
   *     const response = await socket.timeout(1000).emitWithAck("hello", "world");
   *   } catch (err) {
   *     // the client did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @return a Promise that will be fulfilled when the client acknowledges the event
   */
  emitWithAck(e, ...t) {
    const s = this.flags.timeout !== void 0;
    return new Promise((n, a) => {
      t.push((o, r) => s ? o ? a(o) : n(r) : n(o)), this.emit(e, ...t);
    });
  }
  /**
   * @private
   */
  registerAckCallback(e, t) {
    const s = this.flags.timeout;
    if (s === void 0) {
      this.acks.set(e, t);
      return;
    }
    const n = setTimeout(() => {
      Y("event with ack id %d has timed out after %d ms", e, s), this.acks.delete(e), t.call(this, new Error("operation has timed out"));
    }, s);
    this.acks.set(e, (...a) => {
      clearTimeout(n), t.apply(this, [null, ...a]);
    });
  }
  /**
   * Targets a room when broadcasting.
   *
   * @example
   * io.on("connection", (socket) => {
   *   // the “foo” event will be broadcast to all connected clients in the “room-101” room, except this socket
   *   socket.to("room-101").emit("foo", "bar");
   *
   *   // the code above is equivalent to:
   *   io.to("room-101").except(socket.id).emit("foo", "bar");
   *
   *   // with an array of rooms (a client will be notified at most once)
   *   socket.to(["room-101", "room-102"]).emit("foo", "bar");
   *
   *   // with multiple chained calls
   *   socket.to("room-101").to("room-102").emit("foo", "bar");
   * });
   *
   * @param room - a room, or an array of rooms
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  to(e) {
    return this.newBroadcastOperator().to(e);
  }
  /**
   * Targets a room when broadcasting. Similar to `to()`, but might feel clearer in some cases:
   *
   * @example
   * io.on("connection", (socket) => {
   *   // disconnect all clients in the "room-101" room, except this socket
   *   socket.in("room-101").disconnectSockets();
   * });
   *
   * @param room - a room, or an array of rooms
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  in(e) {
    return this.newBroadcastOperator().in(e);
  }
  /**
   * Excludes a room when broadcasting.
   *
   * @example
   * io.on("connection", (socket) => {
   *   // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
   *   // and this socket
   *   socket.except("room-101").emit("foo", "bar");
   *
   *   // with an array of rooms
   *   socket.except(["room-101", "room-102"]).emit("foo", "bar");
   *
   *   // with multiple chained calls
   *   socket.except("room-101").except("room-102").emit("foo", "bar");
   * });
   *
   * @param room - a room, or an array of rooms
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  except(e) {
    return this.newBroadcastOperator().except(e);
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.send("hello");
   *
   *   // this is equivalent to
   *   socket.emit("message", "hello");
   * });
   *
   * @return self
   */
  send(...e) {
    return this.emit("message", ...e), this;
  }
  /**
   * Sends a `message` event. Alias of {@link send}.
   *
   * @return self
   */
  write(...e) {
    return this.emit("message", ...e), this;
  }
  /**
   * Writes a packet.
   *
   * @param {Object} packet - packet object
   * @param {Object} opts - options
   * @private
   */
  packet(e, t = {}) {
    e.nsp = this.nsp.name, t.compress = t.compress !== !1, this.client._packet(e, t);
  }
  /**
   * Joins a room.
   *
   * @example
   * io.on("connection", (socket) => {
   *   // join a single room
   *   socket.join("room1");
   *
   *   // join multiple rooms
   *   socket.join(["room1", "room2"]);
   * });
   *
   * @param {String|Array} rooms - room or array of rooms
   * @return a Promise or nothing, depending on the adapter
   */
  join(e) {
    return Y("join room %s", e), this.adapter.addAll(this.id, new Set(Array.isArray(e) ? e : [e]));
  }
  /**
   * Leaves a room.
   *
   * @example
   * io.on("connection", (socket) => {
   *   // leave a single room
   *   socket.leave("room1");
   *
   *   // leave multiple rooms
   *   socket.leave("room1").leave("room2");
   * });
   *
   * @param {String} room
   * @return a Promise or nothing, depending on the adapter
   */
  leave(e) {
    return Y("leave room %s", e), this.adapter.del(this.id, e);
  }
  /**
   * Leave all rooms.
   *
   * @private
   */
  leaveAll() {
    this.adapter.delAll(this.id);
  }
  /**
   * Called by `Namespace` upon successful
   * middleware execution (ie: authorization).
   * Socket is added to namespace array before
   * call to join, so adapters can access it.
   *
   * @private
   */
  _onconnect() {
    Y("socket connected - writing packet"), this.connected = !0, this.join(this.id), this.conn.protocol === 3 ? this.packet({ type: ae.PacketType.CONNECT }) : this.packet({
      type: ae.PacketType.CONNECT,
      data: { sid: this.id, pid: this.pid }
    });
  }
  /**
   * Called with each packet. Called by `Client`.
   *
   * @param {Object} packet
   * @private
   */
  _onpacket(e) {
    switch (Y("got packet %j", e), e.type) {
      case ae.PacketType.EVENT:
        this.onevent(e);
        break;
      case ae.PacketType.BINARY_EVENT:
        this.onevent(e);
        break;
      case ae.PacketType.ACK:
        this.onack(e);
        break;
      case ae.PacketType.BINARY_ACK:
        this.onack(e);
        break;
      case ae.PacketType.DISCONNECT:
        this.ondisconnect();
        break;
    }
  }
  /**
   * Called upon event packet.
   *
   * @param {Packet} packet - packet object
   * @private
   */
  onevent(e) {
    const t = e.data || [];
    if (Y("emitting event %j", t), e.id != null && (Y("attaching ack callback to event"), t.push(this.ack(e.id))), this._anyListeners && this._anyListeners.length) {
      const s = this._anyListeners.slice();
      for (const n of s)
        n.apply(this, t);
    }
    this.dispatch(t);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @param {Number} id - packet id
   * @private
   */
  ack(e) {
    const t = this;
    let s = !1;
    return function() {
      if (s)
        return;
      const n = Array.prototype.slice.call(arguments);
      Y("sending ack %j", n), t.packet({
        id: e,
        type: ae.PacketType.ACK,
        data: n
      }), s = !0;
    };
  }
  /**
   * Called upon ack packet.
   *
   * @private
   */
  onack(e) {
    const t = this.acks.get(e.id);
    typeof t == "function" ? (Y("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), this.acks.delete(e.id)) : Y("bad ack %s", e.id);
  }
  /**
   * Called upon client disconnect packet.
   *
   * @private
   */
  ondisconnect() {
    Y("got disconnect packet"), this._onclose("client namespace disconnect");
  }
  /**
   * Handles a client error.
   *
   * @private
   */
  _onerror(e) {
    this.emitReserved("error", e);
  }
  /**
   * Called upon closing. Called by `Client`.
   *
   * @param {String} reason
   * @param description
   * @throw {Error} optional error object
   *
   * @private
   */
  _onclose(e, t) {
    if (!this.connected)
      return this;
    Y("closing socket - reason %s", e), this.emitReserved("disconnecting", e, t), this.server._opts.connectionStateRecovery && jl.has(e) && (Y("connection state recovery is enabled for sid %s", this.id), this.adapter.persistSession({
      sid: this.id,
      pid: this.pid,
      rooms: [...this.rooms],
      data: this.data
    })), this._cleanup(), this.client._remove(this), this.connected = !1, this.emitReserved("disconnect", e, t);
  }
  /**
   * Makes the socket leave all the rooms it was part of and prevents it from joining any other room
   *
   * @private
   */
  _cleanup() {
    this.leaveAll(), this.nsp._remove(this), this.join = hn;
  }
  /**
   * Produces an `error` packet.
   *
   * @param {Object} err - error object
   *
   * @private
   */
  _error(e) {
    this.packet({ type: ae.PacketType.CONNECT_ERROR, data: e });
  }
  /**
   * Disconnects this client.
   *
   * @example
   * io.on("connection", (socket) => {
   *   // disconnect this socket (the connection might be kept alive for other namespaces)
   *   socket.disconnect();
   *
   *   // disconnect this socket and close the underlying connection
   *   socket.disconnect(true);
   * })
   *
   * @param {Boolean} close - if `true`, closes the underlying connection
   * @return self
   */
  disconnect(e = !1) {
    return this.connected ? (e ? this.client._disconnect() : (this.packet({ type: ae.PacketType.DISCONNECT }), this._onclose("server namespace disconnect")), this) : this;
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.compress(false).emit("hello");
   * });
   *
   * @param {Boolean} compress - if `true`, compresses the sending data
   * @return {Socket} self
   */
  compress(e) {
    return this.flags.compress = e, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
   * receive messages (because of network slowness or other issues, or because they’re connected through long polling
   * and is in the middle of a request-response cycle).
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.volatile.emit("hello"); // the client may or may not receive it
   * });
   *
   * @return {Socket} self
   */
  get volatile() {
    return this.flags.volatile = !0, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the
   * sender.
   *
   * @example
   * io.on("connection", (socket) => {
   *   // the “foo” event will be broadcast to all connected clients, except this socket
   *   socket.broadcast.emit("foo", "bar");
   * });
   *
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  get broadcast() {
    return this.newBroadcastOperator();
  }
  /**
   * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
   *
   * @example
   * io.on("connection", (socket) => {
   *   // the “foo” event will be broadcast to all connected clients on this node, except this socket
   *   socket.local.emit("foo", "bar");
   * });
   *
   * @return a new {@link BroadcastOperator} instance for chaining
   */
  get local() {
    return this.newBroadcastOperator().local;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the client:
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.timeout(5000).emit("my-event", (err) => {
   *     if (err) {
   *       // the client did not acknowledge the event in the given delay
   *     }
   *   });
   * });
   *
   * @returns self
   */
  timeout(e) {
    return this.flags.timeout = e, this;
  }
  /**
   * Dispatch incoming event to socket listeners.
   *
   * @param {Array} event - event that will get emitted
   * @private
   */
  dispatch(e) {
    Y("dispatching an event %j", e), this.run(e, (t) => {
      process.nextTick(() => {
        if (t)
          return this._onerror(t);
        this.connected ? super.emitUntyped.apply(this, e) : Y("ignore packet received after disconnection");
      });
    });
  }
  /**
   * Sets up socket middleware.
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.use(([event, ...args], next) => {
   *     if (isUnauthorized(event)) {
   *       return next(new Error("unauthorized event"));
   *     }
   *     // do not forget to call next
   *     next();
   *   });
   *
   *   socket.on("error", (err) => {
   *     if (err && err.message === "unauthorized event") {
   *       socket.disconnect();
   *     }
   *   });
   * });
   *
   * @param {Function} fn - middleware function (event, next)
   * @return {Socket} self
   */
  use(e) {
    return this.fns.push(e), this;
  }
  /**
   * Executes the middleware for an incoming event.
   *
   * @param {Array} event - event that will get emitted
   * @param {Function} fn - last fn call in the middleware
   * @private
   */
  run(e, t) {
    if (!this.fns.length)
      return t();
    const s = this.fns.slice(0);
    function n(a) {
      s[a](e, (o) => {
        if (o)
          return t(o);
        if (!s[a + 1])
          return t();
        n(a + 1);
      });
    }
    n(0);
  }
  /**
   * Whether the socket is currently disconnected
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * A reference to the request that originated the underlying Engine.IO Socket.
   */
  get request() {
    return this.client.request;
  }
  /**
   * A reference to the underlying Client transport connection (Engine.IO Socket object).
   *
   * @example
   * io.on("connection", (socket) => {
   *   console.log(socket.conn.transport.name); // prints "polling" or "websocket"
   *
   *   socket.conn.once("upgrade", () => {
   *     console.log(socket.conn.transport.name); // prints "websocket"
   *   });
   * });
   */
  get conn() {
    return this.client.conn;
  }
  /**
   * Returns the rooms the socket is currently in.
   *
   * @example
   * io.on("connection", (socket) => {
   *   console.log(socket.rooms); // Set { <socket.id> }
   *
   *   socket.join("room1");
   *
   *   console.log(socket.rooms); // Set { <socket.id>, "room1" }
   * });
   */
  get rooms() {
    return this.adapter.socketRooms(this.id) || /* @__PURE__ */ new Set();
  }
  /**
   * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
   * the callback.
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.onAny((event, ...args) => {
   *     console.log(`got event ${event}`);
   *   });
   * });
   *
   * @param listener
   */
  onAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
   * the callback. The listener is added to the beginning of the listeners array.
   *
   * @param listener
   */
  prependAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is received.
   *
   * @example
   * io.on("connection", (socket) => {
   *   const catchAllListener = (event, ...args) => {
   *     console.log(`got event ${event}`);
   *   }
   *
   *   socket.onAny(catchAllListener);
   *
   *   // remove a specific listener
   *   socket.offAny(catchAllListener);
   *
   *   // or remove all listeners
   *   socket.offAny();
   * });
   *
   * @param listener
   */
  offAny(e) {
    if (!this._anyListeners)
      return this;
    if (e) {
      const t = this._anyListeners;
      for (let s = 0; s < t.length; s++)
        if (e === t[s])
          return t.splice(s, 1), this;
    } else
      this._anyListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is sent. The event name is passed as the first argument to
   * the callback.
   *
   * Note: acknowledgements sent to the client are not included.
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.onAnyOutgoing((event, ...args) => {
   *     console.log(`sent event ${event}`);
   *   });
   * });
   *
   * @param listener
   */
  onAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * io.on("connection", (socket) => {
   *   socket.prependAnyOutgoing((event, ...args) => {
   *     console.log(`sent event ${event}`);
   *   });
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is sent.
   *
   * @example
   * io.on("connection", (socket) => {
   *   const catchAllListener = (event, ...args) => {
   *     console.log(`sent event ${event}`);
   *   }
   *
   *   socket.onAnyOutgoing(catchAllListener);
   *
   *   // remove a specific listener
   *   socket.offAnyOutgoing(catchAllListener);
   *
   *   // or remove all listeners
   *   socket.offAnyOutgoing();
   * });
   *
   * @param listener - the catch-all listener
   */
  offAnyOutgoing(e) {
    if (!this._anyOutgoingListeners)
      return this;
    if (e) {
      const t = this._anyOutgoingListeners;
      for (let s = 0; s < t.length; s++)
        if (e === t[s])
          return t.splice(s, 1), this;
    } else
      this._anyOutgoingListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent (emit or broadcast)
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(e) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const t = this._anyOutgoingListeners.slice();
      for (const s of t)
        s.apply(this, e.data);
    }
  }
  newBroadcastOperator() {
    const e = Object.assign({}, this.flags);
    return this.flags = {}, new Al.BroadcastOperator(this.adapter, /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set([this.id]), e);
  }
};
vt.Socket = Nl;
(function(i) {
  var e = z && z.__importDefault || function(p) {
    return p && p.__esModule ? p : { default: p };
  };
  Object.defineProperty(i, "__esModule", { value: !0 }), i.Namespace = i.RESERVED_EVENTS = void 0;
  const t = vt, s = Ze, n = e(K), a = De, o = (0, n.default)("socket.io:namespace");
  i.RESERVED_EVENTS = /* @__PURE__ */ new Set(["connect", "connection", "new_namespace"]);
  class r extends s.StrictEventEmitter {
    /**
     * Namespace constructor.
     *
     * @param server instance
     * @param name
     */
    constructor(c, u) {
      super(), this.sockets = /* @__PURE__ */ new Map(), this._preConnectSockets = /* @__PURE__ */ new Map(), this._fns = [], this._ids = 0, this.server = c, this.name = u, this._initAdapter();
    }
    /**
     * Initializes the `Adapter` for this nsp.
     * Run upon changing adapter by `Server#adapter`
     * in addition to the constructor.
     *
     * @private
     */
    _initAdapter() {
      this.adapter = new (this.server.adapter())(this), Promise.resolve(this.adapter.init()).catch((c) => {
        o("error while initializing adapter: %s", c);
      });
    }
    /**
     * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * myNamespace.use((socket, next) => {
     *   // ...
     *   next();
     * });
     *
     * @param fn - the middleware function
     */
    use(c) {
      return this._fns.push(c), this;
    }
    /**
     * Executes the middleware for an incoming client.
     *
     * @param socket - the socket that will get added
     * @param fn - last fn call in the middleware
     * @private
     */
    run(c, u) {
      if (!this._fns.length)
        return u();
      const l = this._fns.slice(0);
      function d(v) {
        l[v](c, (m) => {
          if (m)
            return u(m);
          if (!l[v + 1])
            return u();
          d(v + 1);
        });
      }
      d(0);
    }
    /**
     * Targets a room when emitting.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
     * myNamespace.to("room-101").emit("foo", "bar");
     *
     * // with an array of rooms (a client will be notified at most once)
     * myNamespace.to(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * myNamespace.to("room-101").to("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    to(c) {
      return new a.BroadcastOperator(this.adapter).to(c);
    }
    /**
     * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // disconnect all clients in the "room-101" room
     * myNamespace.in("room-101").disconnectSockets();
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    in(c) {
      return new a.BroadcastOperator(this.adapter).in(c);
    }
    /**
     * Excludes a room when emitting.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
     * myNamespace.except("room-101").emit("foo", "bar");
     *
     * // with an array of rooms
     * myNamespace.except(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * myNamespace.except("room-101").except("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    except(c) {
      return new a.BroadcastOperator(this.adapter).except(c);
    }
    /**
     * Adds a new client.
     *
     * @return {Socket}
     * @private
     */
    async _add(c, u, l) {
      var d;
      o("adding socket to nsp %s", this.name);
      const v = await this._createSocket(c, u);
      if (this._preConnectSockets.set(v.id, v), // @ts-ignore
      !((d = this.server.opts.connectionStateRecovery) === null || d === void 0) && d.skipMiddlewares && v.recovered && c.conn.readyState === "open")
        return this._doConnect(v, l);
      this.run(v, (m) => {
        process.nextTick(() => {
          if (c.conn.readyState !== "open") {
            o("next called after client was closed - ignoring socket"), v._cleanup();
            return;
          }
          if (m)
            return o("middleware error, sending CONNECT_ERROR packet to the client"), v._cleanup(), c.conn.protocol === 3 ? v._error(m.data || m.message) : v._error({
              message: m.message,
              data: m.data
            });
          this._doConnect(v, l);
        });
      });
    }
    async _createSocket(c, u) {
      const l = u.pid, d = u.offset;
      if (
        // @ts-ignore
        this.server.opts.connectionStateRecovery && typeof l == "string" && typeof d == "string"
      ) {
        let v;
        try {
          v = await this.adapter.restoreSession(l, d);
        } catch (m) {
          o("error while restoring session: %s", m);
        }
        if (v)
          return o("connection state recovered for sid %s", v.sid), new t.Socket(this, c, u, v);
      }
      return new t.Socket(this, c, u);
    }
    _doConnect(c, u) {
      this._preConnectSockets.delete(c.id), this.sockets.set(c.id, c), c._onconnect(), u && u(c), this.emitReserved("connect", c), this.emitReserved("connection", c);
    }
    /**
     * Removes a client. Called by each `Socket`.
     *
     * @private
     */
    _remove(c) {
      this.sockets.delete(c.id) || this._preConnectSockets.delete(c.id);
    }
    /**
     * Emits to all connected clients.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * myNamespace.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * myNamespace.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the clients
     * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @return Always true
     */
    emit(c, ...u) {
      return new a.BroadcastOperator(this.adapter).emit(c, ...u);
    }
    /**
     * Sends a `message` event to all clients.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * myNamespace.send("hello");
     *
     * // this is equivalent to
     * myNamespace.emit("message", "hello");
     *
     * @return self
     */
    send(...c) {
      return this.emit("message", ...c), this;
    }
    /**
     * Sends a `message` event to all clients. Sends a `message` event. Alias of {@link send}.
     *
     * @return self
     */
    write(...c) {
      return this.emit("message", ...c), this;
    }
    /**
     * Sends a message to the other Socket.IO servers of the cluster.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * myNamespace.serverSideEmit("hello", "world");
     *
     * myNamespace.on("hello", (arg1) => {
     *   console.log(arg1); // prints "world"
     * });
     *
     * // acknowledgements (without binary content) are supported too:
     * myNamespace.serverSideEmit("ping", (err, responses) => {
     *  if (err) {
     *     // some servers did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per server (except the current one)
     *   }
     * });
     *
     * myNamespace.on("ping", (cb) => {
     *   cb("pong");
     * });
     *
     * @param ev - the event name
     * @param args - an array of arguments, which may include an acknowledgement callback at the end
     */
    serverSideEmit(c, ...u) {
      if (i.RESERVED_EVENTS.has(c))
        throw new Error(`"${String(c)}" is a reserved event name`);
      return u.unshift(c), this.adapter.serverSideEmit(u), !0;
    }
    /**
     * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * try {
     *   const responses = await myNamespace.serverSideEmitWithAck("ping");
     *   console.log(responses); // one response per server (except the current one)
     * } catch (e) {
     *   // some servers did not acknowledge the event in the given delay
     * }
     *
     * @param ev - the event name
     * @param args - an array of arguments
     *
     * @return a Promise that will be fulfilled when all servers have acknowledged the event
     */
    serverSideEmitWithAck(c, ...u) {
      return new Promise((l, d) => {
        u.push((v, m) => v ? (v.responses = m, d(v)) : l(m)), this.serverSideEmit(c, ...u);
      });
    }
    /**
     * Called when a packet is received from another Socket.IO server
     *
     * @param args - an array of arguments, which may include an acknowledgement callback at the end
     *
     * @private
     */
    _onServerSideEmit(c) {
      super.emitUntyped.apply(this, c);
    }
    /**
     * Gets a list of clients.
     *
     * @deprecated this method will be removed in the next major release, please use {@link Namespace#serverSideEmit} or
     * {@link Namespace#fetchSockets} instead.
     */
    allSockets() {
      return new a.BroadcastOperator(this.adapter).allSockets();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * myNamespace.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(c) {
      return new a.BroadcastOperator(this.adapter).compress(c);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * myNamespace.volatile.emit("hello"); // the clients may or may not receive it
     *
     * @return self
     */
    get volatile() {
      return new a.BroadcastOperator(this.adapter).volatile;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // the “foo” event will be broadcast to all connected clients on this node
     * myNamespace.local.emit("foo", "bar");
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get local() {
      return new a.BroadcastOperator(this.adapter).local;
    }
    /**
     * Adds a timeout in milliseconds for the next operation.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @param timeout
     */
    timeout(c) {
      return new a.BroadcastOperator(this.adapter).timeout(c);
    }
    /**
     * Returns the matching socket instances.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // return all Socket instances
     * const sockets = await myNamespace.fetchSockets();
     *
     * // return all Socket instances in the "room1" room
     * const sockets = await myNamespace.in("room1").fetchSockets();
     *
     * for (const socket of sockets) {
     *   console.log(socket.id);
     *   console.log(socket.handshake);
     *   console.log(socket.rooms);
     *   console.log(socket.data);
     *
     *   socket.emit("hello");
     *   socket.join("room1");
     *   socket.leave("room2");
     *   socket.disconnect();
     * }
     */
    fetchSockets() {
      return new a.BroadcastOperator(this.adapter).fetchSockets();
    }
    /**
     * Makes the matching socket instances join the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // make all socket instances join the "room1" room
     * myNamespace.socketsJoin("room1");
     *
     * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
     * myNamespace.in("room1").socketsJoin(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsJoin(c) {
      return new a.BroadcastOperator(this.adapter).socketsJoin(c);
    }
    /**
     * Makes the matching socket instances leave the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // make all socket instances leave the "room1" room
     * myNamespace.socketsLeave("room1");
     *
     * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
     * myNamespace.in("room1").socketsLeave(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsLeave(c) {
      return new a.BroadcastOperator(this.adapter).socketsLeave(c);
    }
    /**
     * Makes the matching socket instances disconnect.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * const myNamespace = io.of("/my-namespace");
     *
     * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
     * myNamespace.disconnectSockets();
     *
     * // make all socket instances in the "room1" room disconnect and close the underlying connections
     * myNamespace.in("room1").disconnectSockets(true);
     *
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(c = !1) {
      return new a.BroadcastOperator(this.adapter).disconnectSockets(c);
    }
  }
  i.Namespace = r;
})(ai);
var us = {}, ds = {}, $e = {}, gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.encode = qs;
gt.decode = Bl;
gt.yeast = Il;
const Aa = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), Gt = 64, Pa = {};
let vn = 0, ke = 0, xn;
function qs(i) {
  let e = "";
  do
    e = Aa[i % Gt] + e, i = Math.floor(i / Gt);
  while (i > 0);
  return e;
}
function Bl(i) {
  let e = 0;
  for (ke = 0; ke < i.length; ke++)
    e = e * Gt + Pa[i.charAt(ke)];
  return e;
}
function Il() {
  const i = qs(+/* @__PURE__ */ new Date());
  return i !== xn ? (vn = 0, xn = i) : i + "." + qs(vn++);
}
for (; ke < Gt; ke++)
  Pa[Aa[ke]] = ke;
var Ns;
Object.defineProperty($e, "__esModule", { value: !0 });
$e.SessionAwareAdapter = $e.Adapter = void 0;
const Ll = Te, Fl = gt, Dt = ga, Dl = typeof ((Ns = Dt == null ? void 0 : Dt.Sender) === null || Ns === void 0 ? void 0 : Ns.frame) == "function";
class ja extends Ll.EventEmitter {
  /**
   * In-memory adapter constructor.
   *
   * @param nsp
   */
  constructor(e) {
    super(), this.nsp = e, this.rooms = /* @__PURE__ */ new Map(), this.sids = /* @__PURE__ */ new Map(), this.encoder = e.server.encoder;
  }
  /**
   * To be overridden
   */
  init() {
  }
  /**
   * To be overridden
   */
  close() {
  }
  /**
   * Returns the number of Socket.IO servers in the cluster
   *
   * @public
   */
  serverCount() {
    return Promise.resolve(1);
  }
  /**
   * Adds a socket to a list of room.
   *
   * @param {SocketId}  id      the socket id
   * @param {Set<Room>} rooms   a set of rooms
   * @public
   */
  addAll(e, t) {
    this.sids.has(e) || this.sids.set(e, /* @__PURE__ */ new Set());
    for (const s of t)
      this.sids.get(e).add(s), this.rooms.has(s) || (this.rooms.set(s, /* @__PURE__ */ new Set()), this.emit("create-room", s)), this.rooms.get(s).has(e) || (this.rooms.get(s).add(e), this.emit("join-room", s, e));
  }
  /**
   * Removes a socket from a room.
   *
   * @param {SocketId} id     the socket id
   * @param {Room}     room   the room name
   */
  del(e, t) {
    this.sids.has(e) && this.sids.get(e).delete(t), this._del(t, e);
  }
  _del(e, t) {
    const s = this.rooms.get(e);
    s != null && (s.delete(t) && this.emit("leave-room", e, t), s.size === 0 && this.rooms.delete(e) && this.emit("delete-room", e));
  }
  /**
   * Removes a socket from all rooms it's joined.
   *
   * @param {SocketId} id   the socket id
   */
  delAll(e) {
    if (this.sids.has(e)) {
      for (const t of this.sids.get(e))
        this._del(t, e);
      this.sids.delete(e);
    }
  }
  /**
   * Broadcasts a packet.
   *
   * Options:
   *  - `flags` {Object} flags for this packet
   *  - `except` {Array} sids that should be excluded
   *  - `rooms` {Array} list of rooms to broadcast to
   *
   * @param {Object} packet   the packet object
   * @param {Object} opts     the options
   * @public
   */
  broadcast(e, t) {
    const s = t.flags || {}, n = {
      preEncoded: !0,
      volatile: s.volatile,
      compress: s.compress
    };
    e.nsp = this.nsp.name;
    const a = this._encode(e, n);
    this.apply(t, (o) => {
      typeof o.notifyOutgoingListeners == "function" && o.notifyOutgoingListeners(e), o.client.writeToEngine(a, n);
    });
  }
  /**
   * Broadcasts a packet and expects multiple acknowledgements.
   *
   * Options:
   *  - `flags` {Object} flags for this packet
   *  - `except` {Array} sids that should be excluded
   *  - `rooms` {Array} list of rooms to broadcast to
   *
   * @param {Object} packet   the packet object
   * @param {Object} opts     the options
   * @param clientCountCallback - the number of clients that received the packet
   * @param ack                 - the callback that will be called for each client response
   *
   * @public
   */
  broadcastWithAck(e, t, s, n) {
    const a = t.flags || {}, o = {
      preEncoded: !0,
      volatile: a.volatile,
      compress: a.compress
    };
    e.nsp = this.nsp.name, e.id = this.nsp._ids++;
    const r = this._encode(e, o);
    let p = 0;
    this.apply(t, (c) => {
      p++, c.acks.set(e.id, n), typeof c.notifyOutgoingListeners == "function" && c.notifyOutgoingListeners(e), c.client.writeToEngine(r, o);
    }), s(p);
  }
  _encode(e, t) {
    const s = this.encoder.encode(e);
    if (Dl && s.length === 1 && typeof s[0] == "string") {
      const n = Buffer.from("4" + s[0]);
      t.wsPreEncodedFrame = Dt.Sender.frame(n, {
        readOnly: !1,
        mask: !1,
        rsv1: !1,
        opcode: 1,
        fin: !0
      });
    }
    return s;
  }
  /**
   * Gets a list of sockets by sid.
   *
   * @param {Set<Room>} rooms   the explicit set of rooms to check.
   */
  sockets(e) {
    const t = /* @__PURE__ */ new Set();
    return this.apply({ rooms: e }, (s) => {
      t.add(s.id);
    }), Promise.resolve(t);
  }
  /**
   * Gets the list of rooms a given socket has joined.
   *
   * @param {SocketId} id   the socket id
   */
  socketRooms(e) {
    return this.sids.get(e);
  }
  /**
   * Returns the matching socket instances
   *
   * @param opts - the filters to apply
   */
  fetchSockets(e) {
    const t = [];
    return this.apply(e, (s) => {
      t.push(s);
    }), Promise.resolve(t);
  }
  /**
   * Makes the matching socket instances join the specified rooms
   *
   * @param opts - the filters to apply
   * @param rooms - the rooms to join
   */
  addSockets(e, t) {
    this.apply(e, (s) => {
      s.join(t);
    });
  }
  /**
   * Makes the matching socket instances leave the specified rooms
   *
   * @param opts - the filters to apply
   * @param rooms - the rooms to leave
   */
  delSockets(e, t) {
    this.apply(e, (s) => {
      t.forEach((n) => s.leave(n));
    });
  }
  /**
   * Makes the matching socket instances disconnect
   *
   * @param opts - the filters to apply
   * @param close - whether to close the underlying connection
   */
  disconnectSockets(e, t) {
    this.apply(e, (s) => {
      s.disconnect(t);
    });
  }
  apply(e, t) {
    const s = e.rooms, n = this.computeExceptSids(e.except);
    if (s.size) {
      const a = /* @__PURE__ */ new Set();
      for (const o of s)
        if (this.rooms.has(o))
          for (const r of this.rooms.get(o)) {
            if (a.has(r) || n.has(r))
              continue;
            const p = this.nsp.sockets.get(r);
            p && (t(p), a.add(r));
          }
    } else
      for (const [a] of this.sids) {
        if (n.has(a))
          continue;
        const o = this.nsp.sockets.get(a);
        o && t(o);
      }
  }
  computeExceptSids(e) {
    const t = /* @__PURE__ */ new Set();
    if (e && e.size > 0)
      for (const s of e)
        this.rooms.has(s) && this.rooms.get(s).forEach((n) => t.add(n));
    return t;
  }
  /**
   * Send a packet to the other Socket.IO servers in the cluster
   * @param packet - an array of arguments, which may include an acknowledgement callback at the end
   */
  serverSideEmit(e) {
    console.warn("this adapter does not support the serverSideEmit() functionality");
  }
  /**
   * Save the client session in order to restore it upon reconnection.
   */
  persistSession(e) {
  }
  /**
   * Restore the session and find the packets that were missed by the client.
   * @param pid
   * @param offset
   */
  restoreSession(e, t) {
    return null;
  }
}
$e.Adapter = ja;
class $l extends ja {
  constructor(e) {
    super(e), this.nsp = e, this.sessions = /* @__PURE__ */ new Map(), this.packets = [], this.maxDisconnectionDuration = e.server.opts.connectionStateRecovery.maxDisconnectionDuration, setInterval(() => {
      const s = Date.now() - this.maxDisconnectionDuration;
      this.sessions.forEach((n, a) => {
        n.disconnectedAt < s && this.sessions.delete(a);
      });
      for (let n = this.packets.length - 1; n >= 0; n--)
        if (this.packets[n].emittedAt < s) {
          this.packets.splice(0, n + 1);
          break;
        }
    }, 60 * 1e3).unref();
  }
  persistSession(e) {
    e.disconnectedAt = Date.now(), this.sessions.set(e.pid, e);
  }
  restoreSession(e, t) {
    const s = this.sessions.get(e);
    if (!s)
      return null;
    if (s.disconnectedAt + this.maxDisconnectionDuration < Date.now())
      return this.sessions.delete(e), null;
    const a = this.packets.findIndex((r) => r.id === t);
    if (a === -1)
      return null;
    const o = [];
    for (let r = a + 1; r < this.packets.length; r++) {
      const p = this.packets[r];
      Ul(s.rooms, p.opts) && o.push(p.data);
    }
    return Promise.resolve(Object.assign(Object.assign({}, s), { missedPackets: o }));
  }
  broadcast(e, t) {
    var s;
    const n = e.type === 2, a = e.id === void 0, o = ((s = t.flags) === null || s === void 0 ? void 0 : s.volatile) === void 0;
    if (n && a && o) {
      const r = (0, Fl.yeast)();
      e.data.push(r), this.packets.push({
        id: r,
        opts: t,
        data: e.data,
        emittedAt: Date.now()
      });
    }
    super.broadcast(e, t);
  }
}
$e.SessionAwareAdapter = $l;
function Ul(i, e) {
  const t = e.rooms.size === 0 || i.some((n) => e.rooms.has(n)), s = i.every((n) => !e.except.has(n));
  return t && s;
}
var Ce = {}, Ml = z && z.__rest || function(i, e) {
  var t = {};
  for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && e.indexOf(s) < 0 && (t[s] = i[s]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, s = Object.getOwnPropertySymbols(i); n < s.length; n++)
      e.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(i, s[n]) && (t[s[n]] = i[s[n]]);
  return t;
};
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.ClusterAdapterWithHeartbeat = Ce.ClusterAdapter = Ce.MessageType = void 0;
const ql = $e, zl = K, Wl = ct, M = (0, zl.debug)("socket.io-adapter"), Vl = "emitter", Kt = 5e3;
function Ke() {
  return (0, Wl.randomBytes)(8).toString("hex");
}
var A;
(function(i) {
  i[i.INITIAL_HEARTBEAT = 1] = "INITIAL_HEARTBEAT", i[i.HEARTBEAT = 2] = "HEARTBEAT", i[i.BROADCAST = 3] = "BROADCAST", i[i.SOCKETS_JOIN = 4] = "SOCKETS_JOIN", i[i.SOCKETS_LEAVE = 5] = "SOCKETS_LEAVE", i[i.DISCONNECT_SOCKETS = 6] = "DISCONNECT_SOCKETS", i[i.FETCH_SOCKETS = 7] = "FETCH_SOCKETS", i[i.FETCH_SOCKETS_RESPONSE = 8] = "FETCH_SOCKETS_RESPONSE", i[i.SERVER_SIDE_EMIT = 9] = "SERVER_SIDE_EMIT", i[i.SERVER_SIDE_EMIT_RESPONSE = 10] = "SERVER_SIDE_EMIT_RESPONSE", i[i.BROADCAST_CLIENT_COUNT = 11] = "BROADCAST_CLIENT_COUNT", i[i.BROADCAST_ACK = 12] = "BROADCAST_ACK", i[i.ADAPTER_CLOSE = 13] = "ADAPTER_CLOSE";
})(A || (Ce.MessageType = A = {}));
function Ie(i) {
  return {
    rooms: [...i.rooms],
    except: [...i.except],
    flags: i.flags
  };
}
function We(i) {
  return {
    rooms: new Set(i.rooms),
    except: new Set(i.except),
    flags: i.flags
  };
}
class Na extends ql.Adapter {
  constructor(e) {
    super(e), this.requests = /* @__PURE__ */ new Map(), this.ackRequests = /* @__PURE__ */ new Map(), this.uid = Ke();
  }
  /**
   * Called when receiving a message from another member of the cluster.
   *
   * @param message
   * @param offset
   * @protected
   */
  onMessage(e, t) {
    if (e.uid === this.uid)
      return M("[%s] ignore message from self", this.uid);
    if (e.nsp !== this.nsp.name)
      return M("[%s] ignore message from another namespace (%s)", this.uid, e.nsp);
    switch (M("[%s] new event of type %d from %s", this.uid, e.type, e.uid), e.type) {
      case A.BROADCAST: {
        if (e.data.requestId !== void 0)
          super.broadcastWithAck(e.data.packet, We(e.data.opts), (n) => {
            M("[%s] waiting for %d client acknowledgements", this.uid, n), this.publishResponse(e.uid, {
              type: A.BROADCAST_CLIENT_COUNT,
              data: {
                requestId: e.data.requestId,
                clientCount: n
              }
            });
          }, (n) => {
            M("[%s] received acknowledgement with value %j", this.uid, n), this.publishResponse(e.uid, {
              type: A.BROADCAST_ACK,
              data: {
                requestId: e.data.requestId,
                packet: n
              }
            });
          });
        else {
          const n = e.data.packet, a = We(e.data.opts);
          this.addOffsetIfNecessary(n, a, t), super.broadcast(n, a);
        }
        break;
      }
      case A.SOCKETS_JOIN:
        super.addSockets(We(e.data.opts), e.data.rooms);
        break;
      case A.SOCKETS_LEAVE:
        super.delSockets(We(e.data.opts), e.data.rooms);
        break;
      case A.DISCONNECT_SOCKETS:
        super.disconnectSockets(We(e.data.opts), e.data.close);
        break;
      case A.FETCH_SOCKETS: {
        M("[%s] calling fetchSockets with opts %j", this.uid, e.data.opts), super.fetchSockets(We(e.data.opts)).then((s) => {
          this.publishResponse(e.uid, {
            type: A.FETCH_SOCKETS_RESPONSE,
            data: {
              requestId: e.data.requestId,
              sockets: s.map((n) => {
                const a = n.handshake, { sessionStore: o } = a, r = Ml(a, ["sessionStore"]);
                return {
                  id: n.id,
                  handshake: r,
                  rooms: [...n.rooms],
                  data: n.data
                };
              })
            }
          });
        });
        break;
      }
      case A.SERVER_SIDE_EMIT: {
        const s = e.data.packet;
        if (!(e.data.requestId !== void 0)) {
          this.nsp._onServerSideEmit(s);
          return;
        }
        let a = !1;
        const o = (r) => {
          a || (a = !0, M("[%s] calling acknowledgement with %j", this.uid, r), this.publishResponse(e.uid, {
            type: A.SERVER_SIDE_EMIT_RESPONSE,
            data: {
              requestId: e.data.requestId,
              packet: r
            }
          }));
        };
        this.nsp._onServerSideEmit([...s, o]);
        break;
      }
      case A.BROADCAST_CLIENT_COUNT:
      case A.BROADCAST_ACK:
      case A.FETCH_SOCKETS_RESPONSE:
      case A.SERVER_SIDE_EMIT_RESPONSE:
        this.onResponse(e);
        break;
      default:
        M("[%s] unknown message type: %s", this.uid, e.type);
    }
  }
  /**
   * Called when receiving a response from another member of the cluster.
   *
   * @param response
   * @protected
   */
  onResponse(e) {
    var t, s;
    const n = e.data.requestId;
    switch (M("[%s] received response %s to request %s", this.uid, e.type, n), e.type) {
      case A.BROADCAST_CLIENT_COUNT: {
        (t = this.ackRequests.get(n)) === null || t === void 0 || t.clientCountCallback(e.data.clientCount);
        break;
      }
      case A.BROADCAST_ACK: {
        (s = this.ackRequests.get(n)) === null || s === void 0 || s.ack(e.data.packet);
        break;
      }
      case A.FETCH_SOCKETS_RESPONSE: {
        const a = this.requests.get(n);
        if (!a)
          return;
        a.current++, e.data.sockets.forEach((o) => a.responses.push(o)), a.current === a.expected && (clearTimeout(a.timeout), a.resolve(a.responses), this.requests.delete(n));
        break;
      }
      case A.SERVER_SIDE_EMIT_RESPONSE: {
        const a = this.requests.get(n);
        if (!a)
          return;
        a.current++, a.responses.push(e.data.packet), a.current === a.expected && (clearTimeout(a.timeout), a.resolve(null, a.responses), this.requests.delete(n));
        break;
      }
      default:
        M("[%s] unknown response type: %s", this.uid, e.type);
    }
  }
  async broadcast(e, t) {
    var s;
    if (!((s = t.flags) === null || s === void 0 ? void 0 : s.local))
      try {
        const a = await this.publishAndReturnOffset({
          type: A.BROADCAST,
          data: {
            packet: e,
            opts: Ie(t)
          }
        });
        this.addOffsetIfNecessary(e, t, a);
      } catch (a) {
        M("[%s] error while broadcasting message: %s", this.uid, a.message);
      }
    super.broadcast(e, t);
  }
  /**
   * Adds an offset at the end of the data array in order to allow the client to receive any missed packets when it
   * reconnects after a temporary disconnection.
   *
   * @param packet
   * @param opts
   * @param offset
   * @private
   */
  addOffsetIfNecessary(e, t, s) {
    var n;
    if (!this.nsp.server.opts.connectionStateRecovery)
      return;
    const a = e.type === 2, o = e.id === void 0, r = ((n = t.flags) === null || n === void 0 ? void 0 : n.volatile) === void 0;
    a && o && r && e.data.push(s);
  }
  broadcastWithAck(e, t, s, n) {
    var a;
    if (!((a = t == null ? void 0 : t.flags) === null || a === void 0 ? void 0 : a.local)) {
      const r = Ke();
      this.ackRequests.set(r, {
        clientCountCallback: s,
        ack: n
      }), this.publish({
        type: A.BROADCAST,
        data: {
          packet: e,
          requestId: r,
          opts: Ie(t)
        }
      }), setTimeout(() => {
        this.ackRequests.delete(r);
      }, t.flags.timeout);
    }
    super.broadcastWithAck(e, t, s, n);
  }
  async addSockets(e, t) {
    var s;
    if (!((s = e.flags) === null || s === void 0 ? void 0 : s.local))
      try {
        await this.publishAndReturnOffset({
          type: A.SOCKETS_JOIN,
          data: {
            opts: Ie(e),
            rooms: t
          }
        });
      } catch (a) {
        M("[%s] error while publishing message: %s", this.uid, a.message);
      }
    super.addSockets(e, t);
  }
  async delSockets(e, t) {
    var s;
    if (!((s = e.flags) === null || s === void 0 ? void 0 : s.local))
      try {
        await this.publishAndReturnOffset({
          type: A.SOCKETS_LEAVE,
          data: {
            opts: Ie(e),
            rooms: t
          }
        });
      } catch (a) {
        M("[%s] error while publishing message: %s", this.uid, a.message);
      }
    super.delSockets(e, t);
  }
  async disconnectSockets(e, t) {
    var s;
    if (!((s = e.flags) === null || s === void 0 ? void 0 : s.local))
      try {
        await this.publishAndReturnOffset({
          type: A.DISCONNECT_SOCKETS,
          data: {
            opts: Ie(e),
            close: t
          }
        });
      } catch (a) {
        M("[%s] error while publishing message: %s", this.uid, a.message);
      }
    super.disconnectSockets(e, t);
  }
  async fetchSockets(e) {
    var t;
    const [s, n] = await Promise.all([
      super.fetchSockets(e),
      this.serverCount()
    ]), a = n - 1;
    if (!((t = e.flags) === null || t === void 0) && t.local || a <= 0)
      return s;
    const o = Ke();
    return new Promise((r, p) => {
      const c = setTimeout(() => {
        const l = this.requests.get(o);
        l && (p(new Error(`timeout reached: only ${l.current} responses received out of ${l.expected}`)), this.requests.delete(o));
      }, e.flags.timeout || Kt), u = {
        type: A.FETCH_SOCKETS,
        resolve: r,
        timeout: c,
        current: 0,
        expected: a,
        responses: s
      };
      this.requests.set(o, u), this.publish({
        type: A.FETCH_SOCKETS,
        data: {
          opts: Ie(e),
          requestId: o
        }
      });
    });
  }
  async serverSideEmit(e) {
    if (!(typeof e[e.length - 1] == "function"))
      return this.publish({
        type: A.SERVER_SIDE_EMIT,
        data: {
          packet: e
        }
      });
    const s = e.pop(), n = await this.serverCount() - 1;
    if (M('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, n), n <= 0)
      return s(null, []);
    const a = Ke(), o = setTimeout(() => {
      const p = this.requests.get(a);
      p && (s(new Error(`timeout reached: only ${p.current} responses received out of ${p.expected}`), p.responses), this.requests.delete(a));
    }, Kt), r = {
      type: A.SERVER_SIDE_EMIT,
      resolve: s,
      timeout: o,
      current: 0,
      expected: n,
      responses: []
    };
    this.requests.set(a, r), this.publish({
      type: A.SERVER_SIDE_EMIT,
      data: {
        requestId: a,
        // the presence of this attribute defines whether an acknowledgement is needed
        packet: e
      }
    });
  }
  publish(e) {
    M("[%s] sending message %s", this.uid, e.type), this.publishAndReturnOffset(e).catch((t) => {
      M("[%s] error while publishing message: %s", this.uid, t);
    });
  }
  publishAndReturnOffset(e) {
    return e.uid = this.uid, e.nsp = this.nsp.name, this.doPublish(e);
  }
  publishResponse(e, t) {
    t.uid = this.uid, t.nsp = this.nsp.name, M("[%s] sending response %s to %s", this.uid, t.type, e), this.doPublishResponse(e, t).catch((s) => {
      M("[%s] error while publishing response: %s", this.uid, s);
    });
  }
}
Ce.ClusterAdapter = Na;
class Hl extends Na {
  constructor(e, t) {
    super(e), this.nodesMap = /* @__PURE__ */ new Map(), this.customRequests = /* @__PURE__ */ new Map(), this._opts = Object.assign({
      heartbeatInterval: 5e3,
      heartbeatTimeout: 1e4
    }, t), this.cleanupTimer = setInterval(() => {
      const s = Date.now();
      this.nodesMap.forEach((n, a) => {
        s - n > this._opts.heartbeatTimeout && (M("[%s] node %s seems down", this.uid, a), this.removeNode(a));
      });
    }, 1e3);
  }
  init() {
    this.publish({
      type: A.INITIAL_HEARTBEAT
    });
  }
  scheduleHeartbeat() {
    this.heartbeatTimer ? this.heartbeatTimer.refresh() : this.heartbeatTimer = setTimeout(() => {
      this.publish({
        type: A.HEARTBEAT
      });
    }, this._opts.heartbeatInterval);
  }
  close() {
    this.publish({
      type: A.ADAPTER_CLOSE
    }), clearTimeout(this.heartbeatTimer), this.cleanupTimer && clearInterval(this.cleanupTimer);
  }
  onMessage(e, t) {
    if (e.uid === this.uid)
      return M("[%s] ignore message from self", this.uid);
    switch (e.uid && e.uid !== Vl && this.nodesMap.set(e.uid, Date.now()), e.type) {
      case A.INITIAL_HEARTBEAT:
        this.publish({
          type: A.HEARTBEAT
        });
        break;
      case A.HEARTBEAT:
        break;
      case A.ADAPTER_CLOSE:
        this.removeNode(e.uid);
        break;
      default:
        super.onMessage(e, t);
    }
  }
  serverCount() {
    return Promise.resolve(1 + this.nodesMap.size);
  }
  publish(e) {
    return this.scheduleHeartbeat(), super.publish(e);
  }
  async serverSideEmit(e) {
    if (!(typeof e[e.length - 1] == "function"))
      return this.publish({
        type: A.SERVER_SIDE_EMIT,
        data: {
          packet: e
        }
      });
    const s = e.pop(), n = this.nodesMap.size;
    if (M('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, n), n <= 0)
      return s(null, []);
    const a = Ke(), o = setTimeout(() => {
      const p = this.customRequests.get(a);
      p && (s(new Error(`timeout reached: missing ${p.missingUids.size} responses`), p.responses), this.customRequests.delete(a));
    }, Kt), r = {
      type: A.SERVER_SIDE_EMIT,
      resolve: s,
      timeout: o,
      missingUids: /* @__PURE__ */ new Set([...this.nodesMap.keys()]),
      responses: []
    };
    this.customRequests.set(a, r), this.publish({
      type: A.SERVER_SIDE_EMIT,
      data: {
        requestId: a,
        // the presence of this attribute defines whether an acknowledgement is needed
        packet: e
      }
    });
  }
  async fetchSockets(e) {
    var t;
    const [s, n] = await Promise.all([
      super.fetchSockets({
        rooms: e.rooms,
        except: e.except,
        flags: {
          local: !0
        }
      }),
      this.serverCount()
    ]), a = n - 1;
    if (!((t = e.flags) === null || t === void 0) && t.local || a <= 0)
      return s;
    const o = Ke();
    return new Promise((r, p) => {
      const c = setTimeout(() => {
        const l = this.customRequests.get(o);
        l && (p(new Error(`timeout reached: missing ${l.missingUids.size} responses`)), this.customRequests.delete(o));
      }, e.flags.timeout || Kt), u = {
        type: A.FETCH_SOCKETS,
        resolve: r,
        timeout: c,
        missingUids: /* @__PURE__ */ new Set([...this.nodesMap.keys()]),
        responses: s
      };
      this.customRequests.set(o, u), this.publish({
        type: A.FETCH_SOCKETS,
        data: {
          opts: Ie(e),
          requestId: o
        }
      });
    });
  }
  onResponse(e) {
    const t = e.data.requestId;
    switch (M("[%s] received response %s to request %s", this.uid, e.type, t), e.type) {
      case A.FETCH_SOCKETS_RESPONSE: {
        const s = this.customRequests.get(t);
        if (!s)
          return;
        e.data.sockets.forEach((n) => s.responses.push(n)), s.missingUids.delete(e.uid), s.missingUids.size === 0 && (clearTimeout(s.timeout), s.resolve(s.responses), this.customRequests.delete(t));
        break;
      }
      case A.SERVER_SIDE_EMIT_RESPONSE: {
        const s = this.customRequests.get(t);
        if (!s)
          return;
        s.responses.push(e.data.packet), s.missingUids.delete(e.uid), s.missingUids.size === 0 && (clearTimeout(s.timeout), s.resolve(null, s.responses), this.customRequests.delete(t));
        break;
      }
      default:
        super.onResponse(e);
    }
  }
  removeNode(e) {
    this.customRequests.forEach((t, s) => {
      t.missingUids.delete(e), t.missingUids.size === 0 && (clearTimeout(t.timeout), t.type === A.FETCH_SOCKETS ? t.resolve(t.responses) : t.type === A.SERVER_SIDE_EMIT && t.resolve(null, t.responses), this.customRequests.delete(s));
    }), this.nodesMap.delete(e);
  }
}
Ce.ClusterAdapterWithHeartbeat = Hl;
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.MessageType = i.ClusterAdapterWithHeartbeat = i.ClusterAdapter = i.SessionAwareAdapter = i.Adapter = void 0;
  var e = $e;
  Object.defineProperty(i, "Adapter", { enumerable: !0, get: function() {
    return e.Adapter;
  } }), Object.defineProperty(i, "SessionAwareAdapter", { enumerable: !0, get: function() {
    return e.SessionAwareAdapter;
  } });
  var t = Ce;
  Object.defineProperty(i, "ClusterAdapter", { enumerable: !0, get: function() {
    return t.ClusterAdapter;
  } }), Object.defineProperty(i, "ClusterAdapterWithHeartbeat", { enumerable: !0, get: function() {
    return t.ClusterAdapterWithHeartbeat;
  } }), Object.defineProperty(i, "MessageType", { enumerable: !0, get: function() {
    return t.MessageType;
  } });
})(ds);
var Gl = z && z.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(us, "__esModule", { value: !0 });
us.ParentNamespace = void 0;
const gn = ai, Kl = ds, Yl = Gl(K), bn = (0, Yl.default)("socket.io:parent-namespace");
class ms extends gn.Namespace {
  constructor(e) {
    super(e, "/_" + ms.count++), this.children = /* @__PURE__ */ new Set();
  }
  /**
   * @private
   */
  _initAdapter() {
    this.adapter = new Jl(this);
  }
  emit(e, ...t) {
    return this.children.forEach((s) => {
      s.emit(e, ...t);
    }), !0;
  }
  createChild(e) {
    bn("creating child namespace %s", e);
    const t = new gn.Namespace(this.server, e);
    if (this._fns.forEach((s) => t.use(s)), this.listeners("connect").forEach((s) => t.on("connect", s)), this.listeners("connection").forEach((s) => t.on("connection", s)), this.children.add(t), this.server._opts.cleanupEmptyChildNamespaces) {
      const s = t._remove;
      t._remove = (n) => {
        s.call(t, n), t.sockets.size === 0 && (bn("closing child namespace %s", e), t.adapter.close(), this.server._nsps.delete(t.name), this.children.delete(t));
      };
    }
    return this.server._nsps.set(e, t), this.server.sockets.emitReserved("new_namespace", t), t;
  }
  fetchSockets() {
    throw new Error("fetchSockets() is not supported on parent namespaces");
  }
}
us.ParentNamespace = ms;
ms.count = 0;
class Jl extends Kl.Adapter {
  broadcast(e, t) {
    this.nsp.children.forEach((s) => {
      s.adapter.broadcast(e, t);
    });
  }
}
var bt = {}, Ql = z && z.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.patchAdapter = Zl;
bt.restoreAdapter = eu;
bt.serveFile = su;
const Le = ds, yn = Vs, Xl = Ql(K), Yt = (0, Xl.default)("socket.io:adapter-uws"), zs = "", { addAll: Ba, del: Ia, broadcast: La } = Le.Adapter.prototype;
function Zl(i) {
  Le.Adapter.prototype.addAll = function(e, t) {
    const s = !this.sids.has(e);
    Ba.call(this, e, t);
    const n = this.nsp.sockets.get(e) || this.nsp._preConnectSockets.get(e);
    if (n) {
      if (n.conn.transport.name === "websocket") {
        _n(this.nsp.name, n, s, t);
        return;
      }
      s && n.conn.on("upgrade", () => {
        const a = this.sids.get(e);
        a && _n(this.nsp.name, n, s, a);
      });
    }
  }, Le.Adapter.prototype.del = function(e, t) {
    Ia.call(this, e, t);
    const s = this.nsp.sockets.get(e) || this.nsp._preConnectSockets.get(e);
    if (s && s.conn.transport.name === "websocket") {
      const n = s.conn.id, a = s.conn.transport.socket, o = `${this.nsp.name}${zs}${t}`;
      Yt("unsubscribe connection %s from topic %s", n, o), a.unsubscribe(o);
    }
  }, Le.Adapter.prototype.broadcast = function(e, t) {
    if (!(t.rooms.size <= 1 && t.except.size === 0)) {
      La.call(this, e, t);
      return;
    }
    const n = t.flags || {}, a = {
      preEncoded: !0,
      volatile: n.volatile,
      compress: n.compress
    };
    e.nsp = this.nsp.name;
    const o = this.encoder.encode(e), r = t.rooms.size === 0 ? this.nsp.name : `${this.nsp.name}${zs}${t.rooms.keys().next().value}`;
    Yt("fast publish to %s", r), o.forEach((p) => {
      const c = typeof p != "string";
      i.publish(r, c ? p : "4" + p, c);
    }), this.apply(t, (p) => {
      p.conn.transport.name !== "websocket" && p.client.writeToEngine(o, a);
    });
  };
}
function _n(i, e, t, s) {
  const n = e.conn.id, a = e.conn.transport.socket;
  t && (Yt("subscribe connection %s to topic %s", n, i), a.subscribe(i)), s.forEach((o) => {
    const r = `${i}${zs}${o}`;
    Yt("subscribe connection %s to topic %s", n, r), a.subscribe(r);
  });
}
function eu() {
  Le.Adapter.prototype.addAll = Ba, Le.Adapter.prototype.del = Ia, Le.Adapter.prototype.broadcast = La;
}
const tu = (i) => {
  const { buffer: e, byteOffset: t, byteLength: s } = i;
  return e.slice(t, t + s);
};
function su(i, e) {
  const { size: t } = (0, yn.statSync)(e), s = (0, yn.createReadStream)(e), n = () => !s.destroyed && s.destroy(), a = (r) => {
    throw n(), r;
  }, o = (r) => {
    const p = tu(r);
    i.cork(() => {
      const c = i.getWriteOffset(), [u, l] = i.tryEnd(p, t);
      !l && !u && (s.pause(), i.onWritable((d) => {
        const [v, m] = i.tryEnd(p.slice(d - c), t);
        return !m && v && s.resume(), v;
      }));
    });
  };
  i.onAborted(n), s.on("data", o).on("error", a).on("end", n);
}
const iu = "4.8.3", nu = {
  version: iu
};
(function(i, e) {
  var t = z && z.__createBinding || (Object.create ? function(E, f, b, k) {
    k === void 0 && (k = b);
    var P = Object.getOwnPropertyDescriptor(f, b);
    (!P || ("get" in P ? !f.__esModule : P.writable || P.configurable)) && (P = { enumerable: !0, get: function() {
      return f[b];
    } }), Object.defineProperty(E, k, P);
  } : function(E, f, b, k) {
    k === void 0 && (k = b), E[k] = f[b];
  }), s = z && z.__setModuleDefault || (Object.create ? function(E, f) {
    Object.defineProperty(E, "default", { enumerable: !0, value: f });
  } : function(E, f) {
    E.default = f;
  }), n = z && z.__importStar || function(E) {
    if (E && E.__esModule) return E;
    var f = {};
    if (E != null) for (var b in E) b !== "default" && Object.prototype.hasOwnProperty.call(E, b) && t(f, E, b);
    return s(f, E), f;
  }, a = z && z.__importDefault || function(E) {
    return E && E.__esModule ? E : { default: E };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Namespace = e.Socket = e.Server = void 0;
  const o = a(Jt), r = Vs, p = Qt, c = Xs, u = Qe, l = Hs, d = Ln, v = ps, m = Te, h = ai;
  Object.defineProperty(e, "Namespace", { enumerable: !0, get: function() {
    return h.Namespace;
  } });
  const x = us, S = ds, T = n(Q), I = a(K), B = vt;
  Object.defineProperty(e, "Socket", { enumerable: !0, get: function() {
    return B.Socket;
  } });
  const $ = Ze, g = bt, C = a(_a), w = (0, I.default)("socket.io:server"), _ = nu.version, j = /\.map/;
  class y extends $.StrictEventEmitter {
    constructor(f, b = {}) {
      super(), this._nsps = /* @__PURE__ */ new Map(), this.parentNsps = /* @__PURE__ */ new Map(), this.parentNamespacesFromRegExp = /* @__PURE__ */ new Map(), typeof f == "object" && f instanceof Object && !f.listen && (b = f, f = void 0), this.path(b.path || "/socket.io"), this.connectTimeout(b.connectTimeout || 45e3), this.serveClient(b.serveClient !== !1), this._parser = b.parser || T, this.encoder = new this._parser.Encoder(), this.opts = b, b.connectionStateRecovery ? (b.connectionStateRecovery = Object.assign({
        maxDisconnectionDuration: 2 * 60 * 1e3,
        skipMiddlewares: !0
      }, b.connectionStateRecovery), this.adapter(b.adapter || S.SessionAwareAdapter)) : this.adapter(b.adapter || S.Adapter), b.cleanupEmptyChildNamespaces = !!b.cleanupEmptyChildNamespaces, this.sockets = this.of("/"), (f || typeof f == "number") && this.attach(f), this.opts.cors && (this._corsMiddleware = (0, C.default)(this.opts.cors));
    }
    get _opts() {
      return this.opts;
    }
    serveClient(f) {
      return arguments.length ? (this._serveClient = f, this) : this._serveClient;
    }
    /**
     * Executes the middleware for an incoming namespace not already created on the server.
     *
     * @param name - name of incoming namespace
     * @param auth - the auth parameters
     * @param fn - callback
     *
     * @private
     */
    _checkNamespace(f, b, k) {
      if (this.parentNsps.size === 0)
        return k(!1);
      const P = this.parentNsps.keys(), D = () => {
        const H = P.next();
        if (H.done)
          return k(!1);
        H.value(f, b, (te, oe) => {
          if (te || !oe)
            return D();
          if (this._nsps.has(f))
            return w("dynamic namespace %s already exists", f), k(this._nsps.get(f));
          const ge = this.parentNsps.get(H.value).createChild(f);
          w("dynamic namespace %s was created", f), k(ge);
        });
      };
      D();
    }
    path(f) {
      if (!arguments.length)
        return this._path;
      this._path = f.replace(/\/$/, "");
      const b = this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      return this.clientPathRegex = new RegExp("^" + b + "/socket\\.io(\\.msgpack|\\.esm)?(\\.min)?\\.js(\\.map)?(?:\\?|$)"), this;
    }
    connectTimeout(f) {
      return f === void 0 ? this._connectTimeout : (this._connectTimeout = f, this);
    }
    adapter(f) {
      if (!arguments.length)
        return this._adapter;
      this._adapter = f;
      for (const b of this._nsps.values())
        b._initAdapter();
      return this;
    }
    /**
     * Attaches socket.io to a server or port.
     *
     * @param srv - server or port
     * @param opts - options passed to engine.io
     * @return self
     */
    listen(f, b = {}) {
      return this.attach(f, b);
    }
    /**
     * Attaches socket.io to a server or port.
     *
     * @param srv - server or port
     * @param opts - options passed to engine.io
     * @return self
     */
    attach(f, b = {}) {
      if (typeof f == "function") {
        const k = "You are trying to attach socket.io to an express request handler function. Please pass a http.Server instance.";
        throw new Error(k);
      }
      if (Number(f) == f && (f = Number(f)), typeof f == "number") {
        w("creating http server and binding to %d", f);
        const k = f;
        f = o.default.createServer((P, D) => {
          D.writeHead(404), D.end();
        }), f.listen(k);
      }
      return Object.assign(b, this.opts), b.path = b.path || this._path, this.initEngine(f, b), this;
    }
    /**
     * Attaches socket.io to a uWebSockets.js app.
     * @param app
     * @param opts
     */
    attachApp(f, b = {}) {
      Object.assign(b, this.opts), b.path = b.path || this._path, w("creating uWebSockets.js-based engine with opts %j", b);
      const k = new d.uServer(b);
      k.attach(f, b), this.bind(k), this._serveClient && f.get(`${this._path}/*`, (P, D) => {
        if (!this.clientPathRegex.test(D.getUrl())) {
          D.setYield(!0);
          return;
        }
        const H = D.getUrl().replace(this._path, "").replace(/\?.*$/, "").replace(/^\//, ""), te = j.test(H), oe = te ? "map" : "source", ge = '"' + _ + '"', fs = "W/" + ge, et = D.getHeader("if-none-match");
        if (et && (ge === et || fs === et)) {
          w("serve client %s 304", oe), P.writeStatus("304 Not Modified"), P.end();
          return;
        }
        w("serve client %s", oe), P.writeHeader("cache-control", "public, max-age=0"), P.writeHeader("content-type", "application/" + (te ? "json" : "javascript") + "; charset=utf-8"), P.writeHeader("etag", ge);
        const yt = l.join(__dirname, "../client-dist/", H);
        (0, g.serveFile)(P, yt);
      }), (0, g.patchAdapter)(f);
    }
    /**
     * Initialize engine
     *
     * @param srv - the server to attach to
     * @param opts - options passed to engine.io
     * @private
     */
    initEngine(f, b) {
      w("creating engine.io instance with opts %j", b), this.eio = (0, d.attach)(f, b), this._serveClient && this.attachServe(f), this.httpServer = f, this.bind(this.eio);
    }
    /**
     * Attaches the static file serving.
     *
     * @param srv http server
     * @private
     */
    attachServe(f) {
      w("attaching client serving req handler");
      const b = f.listeners("request").slice(0);
      f.removeAllListeners("request"), f.on("request", (k, P) => {
        if (this.clientPathRegex.test(k.url))
          this._corsMiddleware ? this._corsMiddleware(k, P, () => {
            this.serve(k, P);
          }) : this.serve(k, P);
        else
          for (let D = 0; D < b.length; D++)
            b[D].call(f, k, P);
      });
    }
    /**
     * Handles a request serving of client source and map
     *
     * @param req
     * @param res
     * @private
     */
    serve(f, b) {
      const k = f.url.replace(this._path, "").replace(/\?.*$/, ""), P = j.test(k), D = P ? "map" : "source", H = '"' + _ + '"', te = "W/" + H, oe = f.headers["if-none-match"];
      if (oe && (H === oe || te === oe)) {
        w("serve client %s 304", D), b.writeHead(304), b.end();
        return;
      }
      w("serve client %s", D), b.setHeader("Cache-Control", "public, max-age=0"), b.setHeader("Content-Type", "application/" + (P ? "json" : "javascript") + "; charset=utf-8"), b.setHeader("ETag", H), y.sendFile(k, f, b);
    }
    /**
     * @param filename
     * @param req
     * @param res
     * @private
     */
    static sendFile(f, b, k) {
      const P = (0, r.createReadStream)(l.join(__dirname, "../client-dist/", f)), D = c(b).encodings(["br", "gzip", "deflate"]), H = (te) => {
        te && k.end();
      };
      switch (D) {
        case "br":
          k.writeHead(200, { "content-encoding": "br" }), (0, u.pipeline)(P, (0, p.createBrotliCompress)(), k, H);
          break;
        case "gzip":
          k.writeHead(200, { "content-encoding": "gzip" }), (0, u.pipeline)(P, (0, p.createGzip)(), k, H);
          break;
        case "deflate":
          k.writeHead(200, { "content-encoding": "deflate" }), (0, u.pipeline)(P, (0, p.createDeflate)(), k, H);
          break;
        default:
          k.writeHead(200), (0, u.pipeline)(P, k, H);
      }
    }
    /**
     * Binds socket.io to an engine.io instance.
     *
     * @param engine engine.io (or compatible) server
     * @return self
     */
    bind(f) {
      return this.engine = f, this.engine.on("connection", this.onconnection.bind(this)), this;
    }
    /**
     * Called with each incoming transport connection.
     *
     * @param {engine.Socket} conn
     * @return self
     * @private
     */
    onconnection(f) {
      w("incoming connection with id %s", f.id);
      const b = new v.Client(this, f);
      return f.protocol === 3 && b.connect("/"), this;
    }
    /**
     * Looks up a namespace.
     *
     * @example
     * // with a simple string
     * const myNamespace = io.of("/my-namespace");
     *
     * // with a regex
     * const dynamicNsp = io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {
     *   const namespace = socket.nsp; // newNamespace.name === "/dynamic-101"
     *
     *   // broadcast to all clients in the given sub-namespace
     *   namespace.emit("hello");
     * });
     *
     * @param name - nsp name
     * @param fn optional, nsp `connection` ev handler
     */
    of(f, b) {
      if (typeof f == "function" || f instanceof RegExp) {
        const P = new x.ParentNamespace(this);
        return w("initializing parent namespace %s", P.name), typeof f == "function" ? this.parentNsps.set(f, P) : (this.parentNsps.set((D, H, te) => te(null, f.test(D)), P), this.parentNamespacesFromRegExp.set(f, P)), b && P.on("connect", b), P;
      }
      String(f)[0] !== "/" && (f = "/" + f);
      let k = this._nsps.get(f);
      if (!k) {
        for (const [P, D] of this.parentNamespacesFromRegExp)
          if (P.test(f))
            return w("attaching namespace %s to parent namespace %s", f, P), D.createChild(f);
        w("initializing namespace %s", f), k = new h.Namespace(this, f), this._nsps.set(f, k), f !== "/" && this.sockets.emitReserved("new_namespace", k);
      }
      return b && k.on("connect", b), k;
    }
    /**
     * Closes server connection
     *
     * @param [fn] optional, called as `fn([err])` on error OR all conns closed
     */
    async close(f) {
      if (await Promise.allSettled([...this._nsps.values()].map(async (b) => {
        b.sockets.forEach((k) => {
          k._onclose("server shutting down");
        }), await b.adapter.close();
      })), this.engine.close(), (0, g.restoreAdapter)(), this.httpServer)
        return new Promise((b) => {
          this.httpServer.close((k) => {
            f && f(k), k && w("server was not running"), b();
          });
        });
      f && f();
    }
    /**
     * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
     *
     * @example
     * io.use((socket, next) => {
     *   // ...
     *   next();
     * });
     *
     * @param fn - the middleware function
     */
    use(f) {
      return this.sockets.use(f), this;
    }
    /**
     * Targets a room when emitting.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
     * io.to("room-101").emit("foo", "bar");
     *
     * // with an array of rooms (a client will be notified at most once)
     * io.to(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * io.to("room-101").to("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    to(f) {
      return this.sockets.to(f);
    }
    /**
     * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
     *
     * @example
     * // disconnect all clients in the "room-101" room
     * io.in("room-101").disconnectSockets();
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    in(f) {
      return this.sockets.in(f);
    }
    /**
     * Excludes a room when emitting.
     *
     * @example
     * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
     * io.except("room-101").emit("foo", "bar");
     *
     * // with an array of rooms
     * io.except(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * io.except("room-101").except("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    except(f) {
      return this.sockets.except(f);
    }
    /**
     * Sends a `message` event to all clients.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * io.send("hello");
     *
     * // this is equivalent to
     * io.emit("message", "hello");
     *
     * @return self
     */
    send(...f) {
      return this.sockets.emit("message", ...f), this;
    }
    /**
     * Sends a `message` event to all clients. Alias of {@link send}.
     *
     * @return self
     */
    write(...f) {
      return this.sockets.emit("message", ...f), this;
    }
    /**
     * Sends a message to the other Socket.IO servers of the cluster.
     *
     * @example
     * io.serverSideEmit("hello", "world");
     *
     * io.on("hello", (arg1) => {
     *   console.log(arg1); // prints "world"
     * });
     *
     * // acknowledgements (without binary content) are supported too:
     * io.serverSideEmit("ping", (err, responses) => {
     *  if (err) {
     *     // some servers did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per server (except the current one)
     *   }
     * });
     *
     * io.on("ping", (cb) => {
     *   cb("pong");
     * });
     *
     * @param ev - the event name
     * @param args - an array of arguments, which may include an acknowledgement callback at the end
     */
    serverSideEmit(f, ...b) {
      return this.sockets.serverSideEmit(f, ...b);
    }
    /**
     * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
     *
     * @example
     * try {
     *   const responses = await io.serverSideEmitWithAck("ping");
     *   console.log(responses); // one response per server (except the current one)
     * } catch (e) {
     *   // some servers did not acknowledge the event in the given delay
     * }
     *
     * @param ev - the event name
     * @param args - an array of arguments
     *
     * @return a Promise that will be fulfilled when all servers have acknowledged the event
     */
    serverSideEmitWithAck(f, ...b) {
      return this.sockets.serverSideEmitWithAck(f, ...b);
    }
    /**
     * Gets a list of socket ids.
     *
     * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
     * {@link Server#fetchSockets} instead.
     */
    allSockets() {
      return this.sockets.allSockets();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * io.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    compress(f) {
      return this.sockets.compress(f);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @example
     * io.volatile.emit("hello"); // the clients may or may not receive it
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get volatile() {
      return this.sockets.volatile;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients on this node
     * io.local.emit("foo", "bar");
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get local() {
      return this.sockets.local;
    }
    /**
     * Adds a timeout in milliseconds for the next operation.
     *
     * @example
     * io.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @param timeout
     */
    timeout(f) {
      return this.sockets.timeout(f);
    }
    /**
     * Returns the matching socket instances.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // return all Socket instances
     * const sockets = await io.fetchSockets();
     *
     * // return all Socket instances in the "room1" room
     * const sockets = await io.in("room1").fetchSockets();
     *
     * for (const socket of sockets) {
     *   console.log(socket.id);
     *   console.log(socket.handshake);
     *   console.log(socket.rooms);
     *   console.log(socket.data);
     *
     *   socket.emit("hello");
     *   socket.join("room1");
     *   socket.leave("room2");
     *   socket.disconnect();
     * }
     */
    fetchSockets() {
      return this.sockets.fetchSockets();
    }
    /**
     * Makes the matching socket instances join the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     *
     * // make all socket instances join the "room1" room
     * io.socketsJoin("room1");
     *
     * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
     * io.in("room1").socketsJoin(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsJoin(f) {
      return this.sockets.socketsJoin(f);
    }
    /**
     * Makes the matching socket instances leave the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // make all socket instances leave the "room1" room
     * io.socketsLeave("room1");
     *
     * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
     * io.in("room1").socketsLeave(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsLeave(f) {
      return this.sockets.socketsLeave(f);
    }
    /**
     * Makes the matching socket instances disconnect.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
     * io.disconnectSockets();
     *
     * // make all socket instances in the "room1" room disconnect and close the underlying connections
     * io.in("room1").disconnectSockets(true);
     *
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(f = !1) {
      return this.sockets.disconnectSockets(f);
    }
  }
  e.Server = y, Object.keys(m.EventEmitter.prototype).filter(function(E) {
    return typeof m.EventEmitter.prototype[E] == "function";
  }).forEach(function(E) {
    y.prototype[E] = function() {
      return this.sockets[E].apply(this.sockets, arguments);
    };
  }), i.exports = (E, f) => new y(E, f), i.exports.Server = y, i.exports.Namespace = h.Namespace, i.exports.Socket = B.Socket;
})(Bs, Bs.exports);
var au = Bs.exports;
const ou = /* @__PURE__ */ Qa(au), { Server: ru, Namespace: Wu, Socket: Vu } = ou, cu = new ru(3e3, {
  cors: { origin: "*" }
}), Fa = qa(import.meta.url), Da = Se.dirname(za(import.meta.url)), $a = Fa("loudness"), wn = Fa("fs"), pu = "0.0.1";
process.env.APP_ROOT = Se.join(Da, "..");
const Ws = process.env.VITE_DEV_SERVER_URL, Hu = Se.join(process.env.APP_ROOT, "dist-electron"), Ua = Se.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ws ? Se.join(process.env.APP_ROOT, "public") : Ua;
let O;
function Ma() {
  O = new En({
    fullscreen: !0,
    frame: !1,
    autoHideMenuBar: !0,
    icon: Se.join(process.env.VITE_PUBLIC, "icon.ico"),
    webPreferences: {
      preload: Se.join(Da, "preload.mjs")
    }
  }), O.once("ready-to-show", () => {
    O == null || O.show(), O == null || O.focus();
  }), O.maximize(), O.webContents.on("did-finish-load", () => {
    O == null || O.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ws ? O.loadURL(Ws) : O.loadFile(Se.join(Ua, "index.html"));
}
Ye.handle("get-usb-dir", () => {
  try {
    if (process.platform === "linux") {
      let i = wn.readFileSync("/media/"), e = JSON.parse(i);
      return console.log(e), e;
    } else if (process.platform === "win32") {
      let i = wn.readFileSync("C:\\USB\\info.json"), e = JSON.parse(i);
      return console.log(e), e;
    }
  } catch {
    return console.error("usb not connected"), null;
  }
});
Ye.handle("get-volume", async () => await $a.getVolume());
Ye.handle("set-volume", async (i, e) => {
  await $a.setVolume(e);
});
cu.on("connection", (i) => {
  console.log("C# Connected"), Ye.on("start-game", (e, t) => {
    console.log("Received from React:", t), i.emit("start-game", {
      Name: t.name,
      ProcessName: t.processName,
      ExePath: t.exePath,
      Args: t.args
    });
  }), Ye.on("check-status", () => {
    i.emit("status", {});
  }), Ye.on("close-game", (e, t) => {
    console.log("Received from React:", t), i.emit("close-game", {
      ProcessName: t.processName
    });
  }), i.on("game-closed", (e) => {
    console.log("C# says:", e), O == null || O.webContents.send("game-closed", e), O == null || O.show();
  }), i.on("game-started", (e) => {
    console.log("C# says:", e), O == null || O.webContents.send("game-started", e), setTimeout(() => {
      O == null || O.hide();
    }, 3e3);
  }), i.on("controller-ps-home", () => {
    O != null && O.isVisible() ? O == null || O.hide() : O == null || O.show();
  }), i.on("ethernet-status", (e) => {
    O == null || O.webContents.send("ethernet-status", e);
  }), i.on("get-storage", (e) => {
    console.log(e), O == null || O.webContents.send("get-storage", e);
  }), i.on("get-version", (e) => {
    console.log(e);
    let t = {
      frontend: pu,
      backend: e.backend
    };
    console.log(t), O == null || O.webContents.send("get-version", t);
  }), i.on("controller-disconnected", (e) => {
    O == null || O.webContents.send("controller-disconnected", e);
  }), i.on("controller-connected", (e) => {
    O == null || O.webContents.send("controller-connected", e);
  });
});
$t.on("window-all-closed", () => {
  process.platform !== "darwin" && ($t.quit(), O = null);
});
$t.on("activate", () => {
  En.getAllWindows().length === 0 && Ma();
});
$t.whenReady().then(Ma);
export {
  Hu as MAIN_DIST,
  Ua as RENDERER_DIST,
  Ws as VITE_DEV_SERVER_URL
};
