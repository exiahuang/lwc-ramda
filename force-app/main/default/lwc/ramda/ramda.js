//  Ramda v0.27.1
//  https://github.com/ramda/ramda
//  (c) 2013-2020 Scott Sauyet, Michael Hurley, and David Chambers
//  Ramda may be freely distributed under the MIT license.
//  Build By: ExiaHuang 
//  Build Date: 2020-11-28
//  lwc-ramda: https://github.com/exiahuang/lwc-ramda

var F = function() {return false;};

var T = function() {return true;};

var __ = {'@@functional/placeholder': true};

function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
}

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a)
          ? f2
          : _curry1(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? f2
          : _isPlaceholder(a)
            ? _curry1(function(_a) { return fn(_a, b); })
            : _isPlaceholder(b)
              ? _curry1(function(_b) { return fn(a, _b); })
              : fn(a, b);
    }
  };
}

var add = _curry2(function add(a, b) {
  return Number(a) + Number(b);
});

function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
}

function _arity(n, fn) {
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn));
  };
}

var curryN = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});

var addIndex = _curry1(function addIndex(fn) {
  return curryN(fn.length, function() {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function() {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});

function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a)
          ? f3
          : _curry2(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? f3
          : _isPlaceholder(a)
            ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
            : _isPlaceholder(b)
              ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
              : _curry1(function(_c) { return fn(a, b, _c); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c)
          ? f3
          : _isPlaceholder(a) && _isPlaceholder(b)
            ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
            : _isPlaceholder(a) && _isPlaceholder(c)
              ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
              : _isPlaceholder(b) && _isPlaceholder(c)
                ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
                : _isPlaceholder(a)
                  ? _curry1(function(_a) { return fn(_a, b, c); })
                  : _isPlaceholder(b)
                    ? _curry1(function(_b) { return fn(a, _b, c); })
                    : _isPlaceholder(c)
                      ? _curry1(function(_c) { return fn(a, b, _c); })
                      : fn(a, b, c);
    }
  };
}

var adjust = _curry3(function adjust(idx, fn, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});

var _isArray = Array.isArray || function _isArray(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};

function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

function _dispatchable(methodNames, transducerCreator, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var obj = arguments[arguments.length - 1];
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x :
    {
      '@@transducer/value': x,
      '@@transducer/reduced': true
    };
}

var _xfBase = {
  init: function() {
    return this.xf['@@transducer/init']();
  },
  result: function(result) {
    return this.xf['@@transducer/result'](result);
  }
};

function XAll(f, xf) {
  this.xf = xf;
  this.f = f;
  this.all = true;
}
XAll.prototype['@@transducer/init'] = _xfBase.init;
XAll.prototype['@@transducer/result'] = function(result) {
  if (this.all) {
    result = this.xf['@@transducer/step'](result, true);
  }
  return this.xf['@@transducer/result'](result);
};
XAll.prototype['@@transducer/step'] = function(result, input) {
  if (!this.f(input)) {
    this.all = false;
    result = _reduced(this.xf['@@transducer/step'](result, false));
  }
  return result;
};
var _xall = _curry2(function _xall(f, xf) { return new XAll(f, xf); });

var all = _curry2(_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));

var max = _curry2(function max(a, b) { return b > a ? b : a; });

function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

var _isArrayLike = _curry1(function isArrayLike(x) {
  if (_isArray(x)) { return true; }
  if (!x) { return false; }
  if (typeof x !== 'object') { return false; }
  if (_isString(x)) { return false; }
  if (x.length === 0) { return true; }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});

function XWrap(fn) {
  this.f = fn;
}
XWrap.prototype['@@transducer/init'] = function() {
  throw new Error('init not implemented on XWrap');
};
XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
XWrap.prototype['@@transducer/step'] = function(acc, x) {
  return this.f(acc, x);
};
function _xwrap(fn) { return new XWrap(fn); }

var bind = _curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}
function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}
function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}
var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }
  throw new TypeError('reduce: list must be array or iterable');
}

function XMap(f, xf) {
  this.xf = xf;
  this.f = f;
}
XMap.prototype['@@transducer/init'] = _xfBase.init;
XMap.prototype['@@transducer/result'] = _xfBase.result;
XMap.prototype['@@transducer/step'] = function(result, input) {
  return this.xf['@@transducer/step'](result, this.f(input));
};
var _xmap = _curry2(function _xmap(f, xf) { return new XMap(f, xf); });

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var toString = Object.prototype.toString;
var _isArguments = (function() {
  return toString.call(arguments) === '[object Arguments]' ?
    function _isArguments(x) { return toString.call(x) === '[object Arguments]'; } :
    function _isArguments(x) { return _has('callee', x); };
}());

var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
var nonEnumerableProps = [
  'constructor', 'valueOf', 'isPrototypeOf', 'toString',
  'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'
];
var hasArgsEnumBug = (function() {
  return arguments.propertyIsEnumerable('length');
}());
var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
  _curry1(function keys(obj) {
    return Object(obj) !== obj ? [] : Object.keys(obj);
  }) :
  _curry1(function keys(obj) {
    if (Object(obj) !== obj) {
      return [];
    }
    var prop, nIdx;
    var ks = [];
    var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
    for (prop in obj) {
      if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
        ks[ks.length] = prop;
      }
    }
    if (hasEnumBug) {
      nIdx = nonEnumerableProps.length - 1;
      while (nIdx >= 0) {
        prop = nonEnumerableProps[nIdx];
        if (_has(prop, obj) && !contains(ks, prop)) {
          ks[ks.length] = prop;
        }
        nIdx -= 1;
      }
    }
    return ks;
  });

var map = _curry2(_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    default:
      return _map(fn, functor);
  }
}));

var _isInteger = Number.isInteger || function _isInteger(n) {
  return (n << 0) === n;
};

var nth = _curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

var prop = _curry2(function prop(p, obj) {
  if (obj == null) {
    return;
  }
  return _isInteger(p) ? nth(p, obj) : obj[p];
});

var pluck = _curry2(function pluck(p, list) {
  return map(prop(p), list);
});

var reduce = _curry3(_reduce);

var allPass = _curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});

var always = _curry1(function always(val) {
  return function() {
    return val;
  };
});

var and = _curry2(function and(a, b) {
  return a && b;
});

function XAny(f, xf) {
  this.xf = xf;
  this.f = f;
  this.any = false;
}
XAny.prototype['@@transducer/init'] = _xfBase.init;
XAny.prototype['@@transducer/result'] = function(result) {
  if (!this.any) {
    result = this.xf['@@transducer/step'](result, false);
  }
  return this.xf['@@transducer/result'](result);
};
XAny.prototype['@@transducer/step'] = function(result, input) {
  if (this.f(input)) {
    this.any = true;
    result = _reduced(this.xf['@@transducer/step'](result, true));
  }
  return result;
};
var _xany = _curry2(function _xany(f, xf) { return new XAny(f, xf); });

var any = _curry2(_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));

var anyPass = _curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});

var ap = _curry2(function ap(applyF, applyX) {
  return (
    typeof applyX['fantasy-land/ap'] === 'function'
      ? applyX['fantasy-land/ap'](applyF)
      : typeof applyF.ap === 'function'
        ? applyF.ap(applyX)
        : typeof applyF === 'function'
          ? function(x) { return applyF(x)(applyX(x)); }
          : _reduce(function(acc, f) { return _concat(acc, map(f, applyX)); }, [], applyF)
  );
});

function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
}

function XAperture(n, xf) {
  this.xf = xf;
  this.pos = 0;
  this.full = false;
  this.acc = new Array(n);
}
XAperture.prototype['@@transducer/init'] = _xfBase.init;
XAperture.prototype['@@transducer/result'] = function(result) {
  this.acc = null;
  return this.xf['@@transducer/result'](result);
};
XAperture.prototype['@@transducer/step'] = function(result, input) {
  this.store(input);
  return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
};
XAperture.prototype.store = function(input) {
  this.acc[this.pos] = input;
  this.pos += 1;
  if (this.pos === this.acc.length) {
    this.pos = 0;
    this.full = true;
  }
};
XAperture.prototype.getCopy = function() {
  return _concat(Array.prototype.slice.call(this.acc, this.pos),
    Array.prototype.slice.call(this.acc, 0, this.pos)
  );
};
var _xaperture = _curry2(function _xaperture(n, xf) { return new XAperture(n, xf); });

var aperture = _curry2(_dispatchable([], _xaperture, _aperture));

var append = _curry2(function append(el, list) {
  return _concat(list, [el]);
});

var apply = _curry2(function apply(fn, args) {
  return fn.apply(this, args);
});

var values = _curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});

function mapValues(fn, obj) {
  return _isArray(obj)
    ? obj.map(fn)
    : keys(obj).reduce(function(acc, key) {
      acc[key] = fn(obj[key]);
      return acc;
    }, {});
}
var applySpec = _curry1(function applySpec(spec) {
  spec = mapValues(
    function(v) { return typeof v == 'function' ? v : applySpec(v); },
    spec
  );
  return curryN(
    reduce(max, 0, pluck('length', values(spec))),
    function() {
      var args = arguments;
      return mapValues(function(f) { return apply(f, args); }, spec);
    });
});

var applyTo = _curry2(function applyTo(x, f) { return f(x); });

var ascend = _curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

function _assoc(prop, val, obj) {
  if (_isInteger(prop) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[prop] = val;
    return arr;
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
}

var isNil = _curry1(function isNil(x) { return x == null; });

var assocPath = _curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = (!isNil(obj) && _has(idx, obj)) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  return _assoc(idx, val, obj);
});

var assoc = _curry3(function assoc(prop, val, obj) { return assocPath([prop], val, obj); });

var nAry = _curry2(function nAry(n, fn) {
  switch (n) {
    case 0: return function() {return fn.call(this);};
    case 1: return function(a0) {return fn.call(this, a0);};
    case 2: return function(a0, a1) {return fn.call(this, a0, a1);};
    case 3: return function(a0, a1, a2) {return fn.call(this, a0, a1, a2);};
    case 4: return function(a0, a1, a2, a3) {return fn.call(this, a0, a1, a2, a3);};
    case 5: return function(a0, a1, a2, a3, a4) {return fn.call(this, a0, a1, a2, a3, a4);};
    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.call(this, a0, a1, a2, a3, a4, a5);};
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6);};
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);};
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);};
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);};
    default: throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});

var binary = _curry1(function binary(fn) {
  return nAry(2, fn);
});

function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type  === '[object Function]' ||
    type === '[object AsyncFunction]' ||
    type === '[object GeneratorFunction]' ||
    type === '[object AsyncGeneratorFunction]';
}

var liftN = _curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function() {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});

var lift = _curry1(function lift(fn) {
  return liftN(fn.length, fn);
});

var both = _curry2(function both(f, g) {
  return _isFunction(f) ?
    function _both() {
      return f.apply(this, arguments) && g.apply(this, arguments);
    } :
    lift(and)(f, g);
});

var call = _curry1(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});

function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;
    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}

function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

var preservingReduced = function(xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function(result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function(result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
    }
  };
};
var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function(result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function(result, input) {
      return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
    }
  };
};

var _xchain = _curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});

var chain = _curry2(_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function(x) { return fn(monad(x))(x); };
  }
  return _makeFlat(false)(map(fn, monad));
}));

var clamp = _curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  return value < min
    ? min
    : value > max
      ? max
      : value;
});

function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global     ? 'g' : '') +
                                    (pattern.ignoreCase ? 'i' : '') +
                                    (pattern.multiline  ? 'm' : '') +
                                    (pattern.sticky     ? 'y' : '') +
                                    (pattern.unicode    ? 'u' : ''));
}

var type = _curry1(function type(val) {
  return val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1);
});

function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx] = value;
    refTo[idx] = copiedValue;
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
      }
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':  return copy(Object.create(Object.getPrototypeOf(value)));
    case 'Array':   return copy([]);
    case 'Date':    return new Date(value.valueOf());
    case 'RegExp':  return _cloneRegExp(value);
    default:        return value;
  }
}

var clone = _curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ?
    value.clone() :
    _clone(value, [], [], true);
});

var collectBy = _curry2(function collectBy(fn, list) {
  var group = _reduce(function(o, x) {
    var tag = fn(x);
    if (o[tag] === undefined) { o[tag] = []; }
    o[tag].push(x);
    return o;
  }, {}, list);
  var newList = [];
  for (var tag in group) { newList.push(group[tag]); }
  return newList;
});

var comparator = _curry1(function comparator(pred) {
  return function(a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

var not = _curry1(function not(a) {
  return !a;
});

var complement = lift(not);

function _pipe(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
}

function _checkForMethod(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
      fn.apply(this, arguments) :
      obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

var tail = _curry1(_checkForMethod('tail', slice(1, Infinity)));

function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(
    arguments[0].length,
    reduce(_pipe, arguments[0], tail(arguments))
  );
}

var reverse = _curry1(function reverse(list) {
  return _isString(list)
    ? list.split('').reverse().join('')
    : Array.prototype.slice.call(list, 0).reverse();
});

function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
}

var head = nth(0);

function _identity(x) { return x; }

var identity = _curry1(_identity);

var pipeWith = _curry2(function pipeWith(xf, list) {
  if (list.length <= 0) {
    return identity;
  }
  var headList = head(list);
  var tailList = tail(list);
  return _arity(headList.length, function() {
    return _reduce(
      function(result, f) {
        return xf.call(this, f, result);
      },
      headList.apply(this, arguments),
      tailList
    );
  });
});

var composeWith = _curry2(function composeWith(xf, list) {
  return pipeWith.apply(this, [xf, reverse(list)]);
});

function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

function _functionName(f) {
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
var _objectIs$1 = typeof Object.is === 'function' ? Object.is : _objectIs;

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b, aItem) {
    return !_includesWith(eq, aItem, b);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (_objectIs$1(a, b)) {
    return true;
  }
  var typeA = type(a);
  if (typeA !== type(b)) {
    return false;
  }
  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) &&
      typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }
  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) &&
      typeof b.equals === 'function' && b.equals(a);
  }
  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' &&
        _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!_objectIs$1(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source &&
          a.global === b.global &&
          a.ignoreCase === b.ignoreCase &&
          a.multiline === b.multiline &&
          a.sticky === b.sticky &&
          a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      return false;
  }
  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

var equals = _curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

function _indexOf(list, a, idx) {
  var inf, item;
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        return list.indexOf(a, idx);
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);
      case 'object':
        if (a === null) {
          return list.indexOf(a, idx);
        }
    }
  }
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

function _quote(s) {
  var escaped = s
    .replace(/\\/g, '\\\\')
    .replace(/[\b]/g, '\\b')
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\v/g, '\\v')
    .replace(/\0/g, '\\0');
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

var pad = function pad(n) { return (n < 10 ? '0' : '') + n; };
var _toISOString = typeof Date.prototype.toISOString === 'function' ?
  function _toISOString(d) {
    return d.toISOString();
  } :
  function _toISOString(d) {
    return (
      d.getUTCFullYear() + '-' +
      pad(d.getUTCMonth() + 1) + '-' +
      pad(d.getUTCDate()) + 'T' +
      pad(d.getUTCHours()) + ':' +
      pad(d.getUTCMinutes()) + ':' +
      pad(d.getUTCSeconds()) + '.' +
      (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z'
    );
  };

function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}

function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

function XFilter(f, xf) {
  this.xf = xf;
  this.f = f;
}
XFilter.prototype['@@transducer/init'] = _xfBase.init;
XFilter.prototype['@@transducer/result'] = _xfBase.result;
XFilter.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
};
var _xfilter = _curry2(function _xfilter(f, xf) { return new XFilter(f, xf); });

var filter = _curry2(_dispatchable(['fantasy-land/filter', 'filter'], _xfilter, function(pred, filterable) {
  return (
    _isObject(filterable) ?
      _reduce(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys(filterable)) :
      _filter(pred, filterable)
  );
}));

var reject = _curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? '<Circular>' : _toString(y, xs);
  };
  var mapPairs = function(obj, keys) {
    return _map(function(k) { return _quote(k) + ': ' + recur(obj[k]); }, keys.slice().sort());
  };
  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function(k) { return /^\d+$/.test(k); }, keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}

var toString$1 = _curry1(function toString(val) { return _toString(val, []); });

var concat = _curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {
      return a.concat(b);
    }
    throw new TypeError(toString$1(b) + ' is not an array');
  }
  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }
    throw new TypeError(toString$1(b) + ' is not a string');
  }
  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }
  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }
  throw new TypeError(toString$1(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});

var cond = _curry1(function cond(pairs) {
  var arity = reduce(
    max,
    0,
    map(function(pair) { return pair[0].length; }, pairs)
  );
  return _arity(arity, function() {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});

var curry = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

var constructN = _curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }
  if (n === 0) {
    return function() { return new Fn(); };
  }
  return curry(nAry(n, function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case  1: return new Fn($0);
      case  2: return new Fn($0, $1);
      case  3: return new Fn($0, $1, $2);
      case  4: return new Fn($0, $1, $2, $3);
      case  5: return new Fn($0, $1, $2, $3, $4);
      case  6: return new Fn($0, $1, $2, $3, $4, $5);
      case  7: return new Fn($0, $1, $2, $3, $4, $5, $6);
      case  8: return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case  9: return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10: return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});

var construct = _curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});

var converge = _curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function() {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function(fn) {
      return fn.apply(context, args);
    }, fns));
  });
});

function XReduceBy(valueFn, valueAcc, keyFn, xf) {
  this.valueFn = valueFn;
  this.valueAcc = valueAcc;
  this.keyFn = keyFn;
  this.xf = xf;
  this.inputs = {};
}
XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
XReduceBy.prototype['@@transducer/result'] = function(result) {
  var key;
  for (key in this.inputs) {
    if (_has(key, this.inputs)) {
      result = this.xf['@@transducer/step'](result, this.inputs[key]);
      if (result['@@transducer/reduced']) {
        result = result['@@transducer/value'];
        break;
      }
    }
  }
  this.inputs = null;
  return this.xf['@@transducer/result'](result);
};
XReduceBy.prototype['@@transducer/step'] = function(result, input) {
  var key = this.keyFn(input);
  this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
  this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
  return result;
};
var _xreduceBy = _curryN(4, [],
  function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
    return new XReduceBy(valueFn, valueAcc, keyFn, xf);
  }
);

var reduceBy = _curryN(4, [], _dispatchable([], _xreduceBy,
  function reduceBy(valueFn, valueAcc, keyFn, list) {
    return _reduce(function(acc, elt) {
      var key = keyFn(elt);
      acc[key] = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, [], [], false), elt);
      return acc;
    }, {}, list);
  }));

var countBy = reduceBy(function(acc, elem) { return acc + 1; }, 0);

var dec = add(-1);

var defaultTo = _curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

var descend = _curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});

function _Set() {
  this._nativeSet = typeof Set === 'function' ? new Set() : null;
  this._items = {};
}
_Set.prototype.add = function(item) {
  return !hasOrAdd(item, true, this);
};
_Set.prototype.has = function(item) {
  return hasOrAdd(item, false, this);
};
function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;
  switch (type) {
    case 'string':
    case 'number':
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }
          return false;
        }
      }
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }
          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }
          return false;
        }
      }
    case 'boolean':
      if (type in set._items) {
        var bIdx = item ? 1 : 0;
        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }
          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }
        return false;
      }
    case 'function':
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }
          return false;
        }
        if (!_includes(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }
          return false;
        }
        return true;
      }
    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }
        return false;
      }
    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }
          return false;
        }
        return true;
      }
    default:
      type = Object.prototype.toString.call(item);
      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }
        return false;
      }
      if (!_includes(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }
        return false;
      }
      return true;
  }
}

var difference = _curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var secondLen = second.length;
  var toFilterOut = new _Set();
  for (var i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }
  while (idx < firstLen) {
    if (toFilterOut.add(first[idx])) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});

var differenceWith = _curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_includesWith(pred, first[idx], second) &&
        !_includesWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});

var remove = _curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});

function _dissoc(prop, obj) {
  if (obj == null) {
    return obj;
  }
  if (_isInteger(prop) && _isArray(obj)) {
    return remove(prop, 1, obj);
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
}

function _shallowCloneObject(prop, obj) {
  if (_isInteger(prop) && _isArray(obj)) {
    return [].concat(obj);
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  return result;
}
var dissocPath = _curry2(function dissocPath(path, obj) {
  if (obj == null) {
    return obj;
  }
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return _dissoc(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      if (obj[head] == null) {
        return _shallowCloneObject(head, obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }
  }
});

var dissoc = _curry2(function dissoc(prop, obj) { return dissocPath([prop], obj); });

var divide = _curry2(function divide(a, b) { return a / b; });

function XDrop(n, xf) {
  this.xf = xf;
  this.n = n;
}
XDrop.prototype['@@transducer/init'] = _xfBase.init;
XDrop.prototype['@@transducer/result'] = _xfBase.result;
XDrop.prototype['@@transducer/step'] = function(result, input) {
  if (this.n > 0) {
    this.n -= 1;
    return result;
  }
  return this.xf['@@transducer/step'](result, input);
};
var _xdrop = _curry2(function _xdrop(n, xf) { return new XDrop(n, xf); });

var drop = _curry2(_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

function XTake(n, xf) {
  this.xf = xf;
  this.n = n;
  this.i = 0;
}
XTake.prototype['@@transducer/init'] = _xfBase.init;
XTake.prototype['@@transducer/result'] = _xfBase.result;
XTake.prototype['@@transducer/step'] = function(result, input) {
  this.i += 1;
  var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
  return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
};
var _xtake = _curry2(function _xtake(n, xf) { return new XTake(n, xf); });

var take = _curry2(_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));

function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
}

function XDropLast(n, xf) {
  this.xf = xf;
  this.pos = 0;
  this.full = false;
  this.acc = new Array(n);
}
XDropLast.prototype['@@transducer/init'] = _xfBase.init;
XDropLast.prototype['@@transducer/result'] =  function(result) {
  this.acc = null;
  return this.xf['@@transducer/result'](result);
};
XDropLast.prototype['@@transducer/step'] = function(result, input) {
  if (this.full) {
    result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
  }
  this.store(input);
  return result;
};
XDropLast.prototype.store = function(input) {
  this.acc[this.pos] = input;
  this.pos += 1;
  if (this.pos === this.acc.length) {
    this.pos = 0;
    this.full = true;
  }
};
var _xdropLast = _curry2(function _xdropLast(n, xf) { return new XDropLast(n, xf); });

var dropLast$1 = _curry2(_dispatchable([], _xdropLast, dropLast));

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }
  return slice(0, idx + 1, xs);
}

function XDropLastWhile(fn, xf) {
  this.f = fn;
  this.retained = [];
  this.xf = xf;
}
XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
XDropLastWhile.prototype['@@transducer/result'] = function(result) {
  this.retained = null;
  return this.xf['@@transducer/result'](result);
};
XDropLastWhile.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input)
    ? this.retain(result, input)
    : this.flush(result, input);
};
XDropLastWhile.prototype.flush = function(result, input) {
  result = _reduce(
    this.xf['@@transducer/step'],
    result,
    this.retained
  );
  this.retained = [];
  return this.xf['@@transducer/step'](result, input);
};
XDropLastWhile.prototype.retain = function(result, input) {
  this.retained.push(input);
  return result;
};
var _xdropLastWhile = _curry2(function _xdropLastWhile(fn, xf) { return new XDropLastWhile(fn, xf); });

var dropLastWhile$1 = _curry2(_dispatchable([], _xdropLastWhile, dropLastWhile));

function XDropRepeatsWith(pred, xf) {
  this.xf = xf;
  this.pred = pred;
  this.lastValue = undefined;
  this.seenFirstValue = false;
}
XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
XDropRepeatsWith.prototype['@@transducer/step'] = function(result, input) {
  var sameAsLast = false;
  if (!this.seenFirstValue) {
    this.seenFirstValue = true;
  } else if (this.pred(this.lastValue, input)) {
    sameAsLast = true;
  }
  this.lastValue = input;
  return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
};
var _xdropRepeatsWith = _curry2(function _xdropRepeatsWith(pred, xf) { return new XDropRepeatsWith(pred, xf); });

var last = nth(-1);

var dropRepeatsWith = _curry2(_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));

var dropRepeats = _curry1(
  _dispatchable([], _xdropRepeatsWith(equals), dropRepeatsWith(equals))
);

function XDropWhile(f, xf) {
  this.xf = xf;
  this.f = f;
}
XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
XDropWhile.prototype['@@transducer/step'] = function(result, input) {
  if (this.f) {
    if (this.f(input)) {
      return result;
    }
    this.f = null;
  }
  return this.xf['@@transducer/step'](result, input);
};
var _xdropWhile = _curry2(function _xdropWhile(f, xf) { return new XDropWhile(f, xf); });

var dropWhile = _curry2(_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }
  return slice(idx, Infinity, xs);
}));

var or = _curry2(function or(a, b) {
  return a || b;
});

var either = _curry2(function either(f, g) {
  return _isFunction(f) ?
    function _either() {
      return f.apply(this, arguments) || g.apply(this, arguments);
    } :
    lift(or)(f, g);
});

function _isTypedArray(val) {
  var type = Object.prototype.toString.call(val);
  return type === '[object Uint8ClampedArray]' ||
    type === '[object Int8Array]' || type === '[object Uint8Array]' ||
    type === '[object Int16Array]' || type === '[object Uint16Array]' ||
    type === '[object Int32Array]' || type === '[object Uint32Array]' ||
    type === '[object Float32Array]' || type === '[object Float64Array]' ||
    type === '[object BigInt64Array]' || type === '[object BigUint64Array]';
}

var empty = _curry1(function empty(x) {
  return (
    (x != null && typeof x['fantasy-land/empty'] === 'function')
      ? x['fantasy-land/empty']()
      : (x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function')
        ? x.constructor['fantasy-land/empty']()
        : (x != null && typeof x.empty === 'function')
          ? x.empty()
          : (x != null && x.constructor != null && typeof x.constructor.empty === 'function')
            ? x.constructor.empty()
            : _isArray(x)
              ? []
              : _isString(x)
                ? ''
                : _isObject(x)
                  ? {}
                  : _isArguments(x)
                    ? (function() { return arguments; }())
                    : _isTypedArray(x)
                      ? x.constructor.from('')
                      : void 0
  );
});

var takeLast = _curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

var endsWith = _curry2(function(suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});

var eqBy = _curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});

var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});

var evolve = _curry2(function evolve(transformations, object) {
  if (!_isObject(object) && !_isArray(object)) {
    return object;
  }
  var result = object instanceof Array ? [] : {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function'
      ? transformation(object[key])
      : transformation && type === 'object'
        ? evolve(transformation, object[key])
        : object[key];
  }
  return result;
});

function XFind(f, xf) {
  this.xf = xf;
  this.f = f;
  this.found = false;
}
XFind.prototype['@@transducer/init'] = _xfBase.init;
XFind.prototype['@@transducer/result'] = function(result) {
  if (!this.found) {
    result = this.xf['@@transducer/step'](result, void 0);
  }
  return this.xf['@@transducer/result'](result);
};
XFind.prototype['@@transducer/step'] = function(result, input) {
  if (this.f(input)) {
    this.found = true;
    result = _reduced(this.xf['@@transducer/step'](result, input));
  }
  return result;
};
var _xfind = _curry2(function _xfind(f, xf) { return new XFind(f, xf); });

var find = _curry2(_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));

function XFindIndex(f, xf) {
  this.xf = xf;
  this.f = f;
  this.idx = -1;
  this.found = false;
}
XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
XFindIndex.prototype['@@transducer/result'] = function(result) {
  if (!this.found) {
    result = this.xf['@@transducer/step'](result, -1);
  }
  return this.xf['@@transducer/result'](result);
};
XFindIndex.prototype['@@transducer/step'] = function(result, input) {
  this.idx += 1;
  if (this.f(input)) {
    this.found = true;
    result = _reduced(this.xf['@@transducer/step'](result, this.idx));
  }
  return result;
};
var _xfindIndex = _curry2(function _xfindIndex(f, xf) { return new XFindIndex(f, xf); });

var findIndex = _curry2(_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));

function XFindLast(f, xf) {
  this.xf = xf;
  this.f = f;
}
XFindLast.prototype['@@transducer/init'] = _xfBase.init;
XFindLast.prototype['@@transducer/result'] = function(result) {
  return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
};
XFindLast.prototype['@@transducer/step'] = function(result, input) {
  if (this.f(input)) {
    this.last = input;
  }
  return result;
};
var _xfindLast = _curry2(function _xfindLast(f, xf) { return new XFindLast(f, xf); });

var findLast = _curry2(_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));

function XFindLastIndex(f, xf) {
  this.xf = xf;
  this.f = f;
  this.idx = -1;
  this.lastIdx = -1;
}
XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
XFindLastIndex.prototype['@@transducer/result'] = function(result) {
  return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
};
XFindLastIndex.prototype['@@transducer/step'] = function(result, input) {
  this.idx += 1;
  if (this.f(input)) {
    this.lastIdx = this.idx;
  }
  return result;
};
var _xfindLastIndex = _curry2(function _xfindLastIndex(f, xf) { return new XFindLastIndex(f, xf); });

var findLastIndex = _curry2(_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));

var flatten = _curry1(_makeFlat(true));

var flip = _curry1(function flip(fn) {
  return curryN(fn.length, function(a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

var forEach = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));

var forEachObjIndexed = _curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});

var fromPairs = _curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});

var groupBy = _curry2(_checkForMethod('groupBy', reduceBy(function(acc, item) {
  if (acc == null) {
    acc = [];
  }
  acc.push(item);
  return acc;
}, null)));

var groupWith = _curry2(function(fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});

var gt = _curry2(function gt(a, b) { return a > b; });

var gte = _curry2(function gte(a, b) { return a >= b; });

var hasPath = _curry2(function hasPath(_path, obj) {
  if (_path.length === 0 || isNil(obj)) {
    return false;
  }
  var val = obj;
  var idx = 0;
  while (idx < _path.length) {
    if (!isNil(val) && _has(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }
  return true;
});

var has = _curry2(function has(prop, obj) {
  return hasPath([prop], obj);
});

var hasIn = _curry2(function hasIn(prop, obj) {
  if (isNil(obj)) {
    return false;
  }
  return prop in obj;
});

var identical = _curry2(_objectIs$1);

var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length),
    function _ifElse() {
      return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
    }
  );
});

var inc = add(1);

var includes = _curry2(_includes);

var indexBy = reduceBy(function(acc, elem) { return elem; }, null);

var indexOf = _curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ?
    xs.indexOf(target) :
    _indexOf(xs, target, 0);
});

var init = slice(0, -1);

var innerJoin = _curry3(function innerJoin(pred, xs, ys) {
  return _filter(function(x) { return _includesWith(pred, x, ys); }, xs);
});

var insert = _curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

var insertAll = _curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(
    Array.prototype.slice.call(list, 0, idx),
    elts,
    Array.prototype.slice.call(list, idx)
  );
});

var uniqBy = _curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;
  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});

var uniq = uniqBy(identity);

var intersection = _curry2(function intersection(list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  return uniq(_filter(flip(_includes)(lookupList), filteredList));
});

var intersperse = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;
  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }
    idx += 1;
  }
  return out;
}));

function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
var _objectAssign$1 = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

var objOf = _curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function(xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function(a, b) { return a + b; },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function(result, input) {
    return _objectAssign$1(
      result,
      _isArrayLike(input) ? objOf(input[0], input[1]) : input
    );
  },
  '@@transducer/result': _identity
};
function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }
  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }
  if (typeof obj === 'string') {
    return _stepCatString;
  }
  if (typeof obj === 'object') {
    return _stepCatObject;
  }
  throw new Error('Cannot create transformer for ' + obj);
}

var into = _curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ?
    _reduce(xf(acc), acc['@@transducer/init'](), list) :
    _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});

var invert = _curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};
  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : (out[val] = []);
    list[list.length] = key;
    idx += 1;
  }
  return out;
});

var invertObj = _curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};
  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});

var invoker = _curry2(function invoker(arity, method) {
  return curryN(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString$1(target) + ' does not have a method named "' + method + '"');
  });
});

var is = _curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});

var isEmpty = _curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});

var join = invoker(1, 'join');

var juxt = _curry1(function juxt(fns) {
  return converge(function() { return Array.prototype.slice.call(arguments, 0); }, fns);
});

var keysIn = _curry1(function keysIn(obj) {
  var prop;
  var ks = [];
  for (prop in obj) {
    ks[ks.length] = prop;
  }
  return ks;
});

var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});

function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}

var length = _curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});

var lens = _curry2(function lens(getter, setter) {
  return function(toFunctorFn) {
    return function(target) {
      return map(
        function(focus) {
          return setter(focus, target);
        },
        toFunctorFn(getter(target))
      );
    };
  };
});

var update = _curry3(function update(idx, x, list) {
  return adjust(idx, always(x), list);
});

var lensIndex = _curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});

var paths = _curry2(function paths(pathsArray, obj) {
  return pathsArray.map(function(paths) {
    var val = obj;
    var idx = 0;
    var p;
    while (idx < paths.length) {
      if (val == null) {
        return;
      }
      p = paths[idx];
      val = _isInteger(p) ? nth(p, val) : val[p];
      idx += 1;
    }
    return val;
  });
});

var path = _curry2(function path(pathAr, obj) {
  return paths([pathAr], obj)[0];
});

var lensPath = _curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});

var lensProp = _curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});

var lt = _curry2(function lt(a, b) { return a < b; });

var lte = _curry2(function lte(a, b) { return a <= b; });

var mapAccum = _curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});

var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [tuple[0], result];
});

var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});

var match = _curry2(function match(rx, str) {
  return str.match(rx) || [];
});

var mathMod = _curry2(function mathMod(m, p) {
  if (!_isInteger(m)) { return NaN; }
  if (!_isInteger(p) || p < 1) { return NaN; }
  return ((m % p) + p) % p;
});

var maxBy = _curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});

var sum = reduce(add, 0);

var mean = _curry1(function mean(list) {
  return sum(list) / list.length;
});

var median = _curry1(function median(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});

var memoizeWith = _curry2(function memoizeWith(mFn, fn) {
  var cache = {};
  return _arity(fn.length, function() {
    var key = mFn.apply(this, arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});

var mergeAll = _curry1(function mergeAll(list) {
  return _objectAssign$1.apply(null, [{}].concat(list));
});

var mergeWithKey = _curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;
  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }
  for (k in r) {
    if (_has(k, r) && !(_has(k, result))) {
      result[k] = r[k];
    }
  }
  return result;
});

var mergeDeepWithKey = _curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function(k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});

var mergeDeepLeft = _curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function(k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});

var mergeDeepRight = _curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function(k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});

var mergeDeepWith = _curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function(k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});

var mergeLeft = _curry2(function mergeLeft(l, r) {
  return _objectAssign$1({}, r, l);
});

var mergeRight = _curry2(function mergeRight(l, r) {
  return _objectAssign$1({}, l, r);
});

var mergeWith = _curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function(_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});

var min = _curry2(function min(a, b) { return b < a ? b : a; });

var minBy = _curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});

function _modify(prop, fn, obj) {
  if (_isInteger(prop) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[prop] = fn(arr[prop]);
    return arr;
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = fn(result[prop]);
  return result;
}

var modifyPath = _curry3(function modifyPath(path, fn, object) {
  if ((!_isObject(object) && !_isArray(object)) || path.length === 0) {
    return object;
  }
  var idx = path[0];
  if (!_has(idx, object)) {
    return object;
  }
  if (path.length === 1) {
    return _modify(idx, fn, object);
  }
  var val = modifyPath(Array.prototype.slice.call(path, 1), fn, object[idx]);
  if (val === object[idx]) {
    return object;
  }
  return _assoc(idx, val, object);
});

var modify = _curry3(function modify(prop, fn, object) { return modifyPath([prop], fn, object); });

var modulo = _curry2(function modulo(a, b) { return a % b; });

var move = _curry3(function(from, to, list) {
  var length = list.length;
  var result = list.slice();
  var positiveFrom = from < 0 ? length + from : from;
  var positiveTo = to < 0 ? length + to : to;
  var item = result.splice(positiveFrom, 1);
  return positiveFrom < 0 || positiveFrom >= list.length
      || positiveTo   < 0 || positiveTo   >= list.length
    ? list
    : []
      .concat(result.slice(0, positiveTo))
      .concat(item)
      .concat(result.slice(positiveTo, list.length));
});

var multiply = _curry2(function multiply(a, b) { return a * b; });

var partialObject = _curry2((f, o) => (props) => f.call(this, mergeDeepRight(o, props)));

var negate = _curry1(function negate(n) { return -n; });

var none = _curry2(function none(fn, input) {
  return all(_complement(fn), input);
});

var nthArg = _curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function() {
    return nth(n, arguments);
  });
});

var o = _curry3(function o(f, g, x) {
  return f(g(x));
});

function _of(x) { return [x]; }

var of = _curry1(_of);

var omit = _curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }
  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});

var on = _curryN(4, [], function on(f, g, a, b) {
  return f(g(a), g(b));
});

var once = _curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function() {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});

function _assertPromise(name, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
  }
}

var otherwise = _curry2(function otherwise(f, p) {
  _assertPromise('otherwise', p);
  return p.then(null, f);
});

var Identity = function(x) {
  return {value: x, map: function(f) { return Identity(f(x)); }};
};
var over = _curry3(function over(lens, f, x) {
  return lens(function(y) { return Identity(f(y)); })(x).value;
});

var pair = _curry2(function pair(fst, snd) { return [fst, snd]; });

function _createPartialApplicator(concat) {
  return _curry2(function(fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function() {
      return fn.apply(this, concat(args, arguments));
    });
  });
}

var partial = _createPartialApplicator(_concat);

var partialRight = _createPartialApplicator(flip(_concat));

var partition = juxt([filter, reject]);

var pathEq = _curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});

var pathOr = _curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});

var pathSatisfies = _curry3(function pathSatisfies(pred, propPath, obj) {
  return pred(path(propPath, obj));
});

var pick = _curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});

var pickAll = _curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});

var pickBy = _curry2(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});

var prepend = _curry2(function prepend(el, list) {
  return _concat([el], list);
});

var product = reduce(multiply, 1);

var useWith = _curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function() {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});

var project = useWith(_map, [pickAll, identity]);

function _promap(f, g, profunctor) {
  return function(x) {
    return g(profunctor(f(x)));
  };
}

function XPromap(f, g, xf) {
  this.xf = xf;
  this.f = f;
  this.g = g;
}
XPromap.prototype['@@transducer/init'] = _xfBase.init;
XPromap.prototype['@@transducer/result'] = _xfBase.result;
XPromap.prototype['@@transducer/step'] = function(result, input) {
  return this.xf['@@transducer/step'](result, _promap(this.f, this.g, input));
};
var _xpromap = _curry3(function _xpromap(f, g, xf) { return new XPromap(f, g, xf); });

var promap = _curry3(_dispatchable(['fantasy-land/promap', 'promap'], _xpromap, _promap));

var propEq = _curry3(function propEq(name, val, obj) {
  return equals(val, prop(name, obj));
});

var propIs = _curry3(function propIs(type, name, obj) {
  return is(type, prop(name, obj));
});

var propOr = _curry3(function propOr(val, p, obj) {
  return defaultTo(val, prop(p, obj));
});

var propSatisfies = _curry3(function propSatisfies(pred, name, obj) {
  return pred(prop(name, obj));
});

var props = _curry2(function props(ps, obj) {
  return  ps.map(function(p) {
    return path([p], obj);
  });
});

var range = _curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});

var reduceRight = _curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});

var reduceWhile = _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function(acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});

var reduced = _curry1(_reduced);

var times = _curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;
  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});

var repeat = _curry2(function repeat(value, n) {
  return times(always(value), n);
});

var replace = _curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

var scan = _curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
});

var sequence = _curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ?
    traversable.sequence(of) :
    reduceRight(
      function(x, acc) { return ap(map(prepend, x), acc); },
      of([]),
      traversable
    );
});

var set = _curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});

var sort = _curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

var sortBy = _curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

var sortWith = _curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});

var split = invoker(1, 'split');

var splitAt = _curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});

var splitEvery = _curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }
  return result;
});

var splitWhen = _curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];
  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }
  return [prefix, Array.prototype.slice.call(list, idx)];
});

var splitWhenever = _curryN(2, [], function splitWhenever(pred, list) {
  var acc = [];
  var curr = [];
  for (var i = 0;i < list.length;i = i + 1) {
    if (!pred(list[i])) {
      curr.push(list[i]);
    }
    if ((i < list.length - 1 && pred(list[i + 1]) || i === list.length - 1) && curr.length > 0) {
      acc.push(curr);
      curr = [];
    }
  }
  return acc;
});

var startsWith = _curry2(function(prefix, list) {
  return equals(take(prefix.length, list), prefix);
});

var subtract = _curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});

var symmetricDifference = _curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});

var symmetricDifferenceWith = _curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});

var takeLastWhile = _curry2(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }
  return slice(idx + 1, Infinity, xs);
});

function XTakeWhile(f, xf) {
  this.xf = xf;
  this.f = f;
}
XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
XTakeWhile.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
};
var _xtakeWhile = _curry2(function _xtakeWhile(f, xf) { return new XTakeWhile(f, xf); });

var takeWhile = _curry2(_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }
  return slice(0, idx, xs);
}));

function XTap(f, xf) {
  this.xf = xf;
  this.f = f;
}
XTap.prototype['@@transducer/init'] = _xfBase.init;
XTap.prototype['@@transducer/result'] = _xfBase.result;
XTap.prototype['@@transducer/step'] = function(result, input) {
  this.f(input);
  return this.xf['@@transducer/step'](result, input);
};
var _xtap = _curry2(function _xtap(f, xf) { return new XTap(f, xf); });

var tap = _curry2(_dispatchable([], _xtap, function tap(fn, x) {
  fn(x);
  return x;
}));

function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

var test = _curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString$1(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});

var andThen = _curry2(function andThen(f, p) {
  _assertPromise('andThen', p);
  return p.then(f);
});

var toLower = invoker(0, 'toLowerCase');

var toPairs = _curry1(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});

var toPairsIn = _curry1(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});

var toUpper = invoker(0, 'toUpperCase');

var transduce = curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});

var transpose = _curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});

var traverse = _curry3(function traverse(of, f, traversable) {
  return (
    typeof traversable['fantasy-land/traverse'] === 'function'
      ? traversable['fantasy-land/traverse'](f, of)
      : typeof traversable.traverse === 'function'
        ? traversable.traverse(f, of)
        : sequence(of, map(f, traversable))
  );
});

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
         '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
         '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = (typeof String.prototype.trim === 'function');
var trim = !hasProtoTrim || (ws.trim() || !zeroWidth.trim()) ?
  _curry1(function trim(str) {
    var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
    var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
    return str.replace(beginRx, '').replace(endRx, '');
  }) :
  _curry1(function trim(str) {
    return str.trim();
  });

var tryCatch = _curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function() {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});

var unapply = _curry1(function unapply(fn) {
  return function() {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});

var unary = _curry1(function unary(fn) {
  return nAry(1, fn);
});

var uncurryN = _curry2(function uncurryN(depth, fn) {
  return curryN(depth, function() {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});

var unfold = _curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});

var union = _curry2(compose(uniq, _concat));

var uniqWith = _curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!_includesWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});

var unionWith = _curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});

var unless = _curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});

var unnest = chain(_identity);

var until = _curry3(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});

var valuesIn = _curry1(function valuesIn(obj) {
  var prop;
  var vs = [];
  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }
  return vs;
});

var Const = function(x) {
  return {value: x, 'fantasy-land/map': function() { return this; }};
};
var view = _curry2(function view(lens, x) {
  return lens(Const)(x).value;
});

var when = _curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});

var where = _curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }
  return true;
});

var whereAny = _curry2(function whereAny(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && spec[prop](testObj[prop])) {
      return true;
    }
  }
  return false;
});

var whereEq = _curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});

var without = _curry2(function(xs, list) {
  return reject(flip(_includes)(xs), list);
});

var xor = _curry2(function xor(a, b) {
  return Boolean(!a ^ !b);
});

var xprod = _curry2(function xprod(a, b) {
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];
  while (idx < ilen) {
    j = 0;
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }
    idx += 1;
  }
  return result;
});

var zip = _curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});

var zipObj = _curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});

var zipWith = _curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});

var thunkify = _curry1(function thunkify(fn) {
  return curryN(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});

export { F, T, __, add, addIndex, adjust, all, allPass, always, and, andThen, any, anyPass, ap, aperture, append, apply, applySpec, applyTo, ascend, assoc, assocPath, binary, bind, both, call, chain, clamp, clone, collectBy, comparator, complement, compose, composeWith, concat, cond, construct, constructN, converge, countBy, curry, curryN, dec, defaultTo, descend, difference, differenceWith, dissoc, dissocPath, divide, drop, dropLast$1 as dropLast, dropLastWhile$1 as dropLastWhile, dropRepeats, dropRepeatsWith, dropWhile, either, empty, endsWith, eqBy, eqProps, equals, evolve, filter, find, findIndex, findLast, findLastIndex, flatten, flip, forEach, forEachObjIndexed, fromPairs, groupBy, groupWith, gt, gte, has, hasIn, hasPath, head, identical, identity, ifElse, inc, includes, indexBy, indexOf, init, innerJoin, insert, insertAll, intersection, intersperse, into, invert, invertObj, invoker, is, isEmpty, isNil, join, juxt, keys, keysIn, last, lastIndexOf, length, lens, lensIndex, lensPath, lensProp, lift, liftN, lt, lte, map, mapAccum, mapAccumRight, mapObjIndexed, match, mathMod, max, maxBy, mean, median, memoizeWith, mergeAll, mergeDeepLeft, mergeDeepRight, mergeDeepWith, mergeDeepWithKey, mergeLeft, mergeRight, mergeWith, mergeWithKey, min, minBy, modify, modifyPath, modulo, move, multiply, nAry, negate, none, not, nth, nthArg, o, objOf, of, omit, on, once, or, otherwise, over, pair, partial, partialObject, partialRight, partition, path, pathEq, pathOr, pathSatisfies, paths, pick, pickAll, pickBy, pipe, pipeWith, pluck, prepend, product, project, promap, prop, propEq, propIs, propOr, propSatisfies, props, range, reduce, reduceBy, reduceRight, reduceWhile, reduced, reject, remove, repeat, replace, reverse, scan, sequence, set, slice, sort, sortBy, sortWith, split, splitAt, splitEvery, splitWhen, splitWhenever, startsWith, subtract, sum, symmetricDifference, symmetricDifferenceWith, tail, take, takeLast, takeLastWhile, takeWhile, tap, test, thunkify, times, toLower, toPairs, toPairsIn, toString$1 as toString, toUpper, transduce, transpose, traverse, trim, tryCatch, type, unapply, unary, uncurryN, unfold, union, unionWith, uniq, uniqBy, uniqWith, unless, unnest, until, update, useWith, values, valuesIn, view, when, where, whereAny, whereEq, without, xor, xprod, zip, zipObj, zipWith };
