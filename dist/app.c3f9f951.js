// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/pieceTypes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  char: '♟︎',
  dirs: ['forward'],
  name: 'Pawn',
  amounts: [1, 2],
  hop: false
}, {
  char: '♝',
  dirs: ['diagonal'],
  name: 'Bishop',
  amounts: [1, 2, 3, 4, 5, 6, 7, 8],
  hop: false
}, {
  char: '♛',
  dirs: ['forward', 'straight', 'diagonal'],
  name: 'Queen',
  amounts: [1, 2, 3, 4, 5, 6, 7, 8],
  hop: false
}, {
  char: '♜',
  dirs: ['forward', 'straight'],
  name: 'Rook',
  amounts: [1, 2, 3, 4, 5, 6, 7, 8],
  hop: false
}, {
  char: '♚',
  dirs: ['forward', 'straight', 'diagonal'],
  name: 'King',
  amounts: [1]
}, {
  char: '♞',
  dirs: ['l-shape'],
  name: 'Knight',
  amounts: [1]
}];
exports.default = _default;
},{}],"js/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateActiveTurn = void 0;
const startTime = 1 * 60 + 10;
let playerTimers = [];

const resetPlayerTimers = () => {
  playerTimers = [startTime, startTime];
};

resetPlayerTimers();
const timerEl = document.getElementById('timer');
window.timerChildren = [document.getElementById('timer-black'), document.getElementById('timer-white')];

const timerTick = () => {
  const timerIndex = playerTurn === 'white' ? 1 : 0;
  playerTimers[timerIndex] -= 0.01;
  updateTimerUI();
};

const updateTimerUI = () => {
  for (let i = 0; i < playerTimers.length; i++) {
    const totalTime = playerTimers[i];
    const minutes = Math.floor(Math.floor(totalTime) / 60);
    const seconds = Math.floor(Math.floor(totalTime) % 60);
    const milli = totalTime % 1;
    const formatted = (minutes > 0 ? `${minutes}:` : '') + `${seconds.toString().padStart(2, '0')}` + (minutes === 0 ? `.${milli.toFixed(1).split('.')[1]}` : '');
    const el = timerChildren[i];
    el.textContent = formatted;
  }
};

const updateActiveTurn = () => {
  const currentTimerIndex = playerTurn === 'white' ? 1 : 0;
  timerChildren[currentTimerIndex].className = 'active';
  timerChildren[currentTimerIndex === 1 ? 0 : 1].className = '';
};

exports.updateActiveTurn = updateActiveTurn;
setInterval(timerTick, 10);
},{}],"js/updateActiveTurn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Timer = _interopRequireWildcard(require("./timer.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const turnTitle = document.getElementById('turn-title');

var _default = () => {
  // Update turn title UI
  turnTitle.style.backgroundColor = `var(--piece-${playerTurn})`;
  turnTitle.style.color = `var(--piece-${playerTurn === 'white' ? 'black' : 'white'})`;
  turnTitle.textContent = playerTurn; // Update active timer UI

  Timer.updateActiveTurn();
};

exports.default = _default;
},{"./timer.js":"js/timer.js"}],"js/movement/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doesPosHavePiece = exports.getBoardPos = exports.getTextPos = void 0;

const getTextPos = el => {
  const boardPos = getBoardPos(el);
  console.log(boardPos);
  return `${String.fromCharCode(97 + boardPos.x)}${boardRows - boardPos.y}`;
};

exports.getTextPos = getTextPos;

const getBoardPos = el => {
  // top left is (0, 0)
  const boardIndex = [...board.children].indexOf(el);
  return {
    x: boardIndex % 8,
    y: Math.floor(boardIndex / 8)
  };
};

exports.getBoardPos = getBoardPos;

const doesPosHavePiece = pos => {
  const index = pos.x + pos.y * 8;
  return board.children[index].className !== '';
};

exports.doesPosHavePiece = doesPosHavePiece;
},{}],"js/movement/core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMoveValid = void 0;

var _pieceTypes = _interopRequireDefault(require("./../pieceTypes.js"));

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isMoveValid = (from, to) => {
  const pieceType = _pieceTypes.default.find(x => x.char === from.textContent);

  const pieceColor = from.className.replace('-piece', '');

  if (pieceColor !== playerTurn) {
    return false;
  }

  const fromBoardPos = (0, _utils.getBoardPos)(from);
  const toBoardPos = (0, _utils.getBoardPos)(to);
  const relativeDiff = pieceColor === 'white' ? {
    x: fromBoardPos.x - toBoardPos.x,
    y: fromBoardPos.y - toBoardPos.y
  } : {
    x: toBoardPos.x - fromBoardPos.x,
    y: toBoardPos.y - fromBoardPos.y
  };
  let dirs = [];
  let amount = 0;

  if (!(relativeDiff.y > 0 && relativeDiff.x === 0) && (relativeDiff.x !== 0 && relativeDiff.y === 0 || relativeDiff.y !== 0 && relativeDiff.x === 0)) {
    dirs.push('straight');
    amount = Math.abs(relativeDiff.x) || Math.abs(relativeDiff.y);
  }

  if (relativeDiff.y > 0 && relativeDiff.x === 0) {
    dirs.push('forward');
    amount = relativeDiff.y;
  }

  if (Math.abs(relativeDiff.x) === Math.abs(relativeDiff.y)) {
    dirs.push('diagonal');
    amount = Math.abs(relativeDiff.x);
  }

  if (Math.abs(relativeDiff.x) === Math.abs(relativeDiff.y) * 2 || Math.abs(relativeDiff.y) === Math.abs(relativeDiff.x) * 2) {
    dirs.push('l-shape');
    amount = Math.min(Math.abs(relativeDiff.x), Math.abs(relativeDiff.y));
  }

  console.log(dirs, amount, relativeDiff);
  let betweenPoses = [];
  let replX = relativeDiff.x;
  let replY = relativeDiff.y;

  while (replX !== 0 || replY !== 0) {
    if (replX > 0) {
      replX--;
    } else if (replX !== 0) {
      replX++;
    }

    if (replY > 0) {
      replY--;
    } else if (replY !== 0) {
      replY++;
    }

    const pos = {
      x: (pieceColor === 'white' ? toBoardPos.x : fromBoardPos.x) + replX,
      y: (pieceColor === 'white' ? toBoardPos.y : fromBoardPos.y) + replY
    };
    if (pos.x === fromBoardPos.x && pos.y === fromBoardPos.y) continue;
    betweenPoses.push(pos);
  }

  const pieceBetween = betweenPoses.some(x => (0, _utils.doesPosHavePiece)(x));
  return !(pieceBetween === true && pieceType.hop === false) && dirs.every(x => pieceType.dirs.includes(x)) && pieceType.amounts.includes(amount);
};

exports.isMoveValid = isMoveValid;
},{"./../pieceTypes.js":"js/pieceTypes.js","./utils.js":"js/movement/utils.js"}],"js/drag.js":[function(require,module,exports) {
"use strict";

var _core = require("./movement/core.js");

var _updateActiveTurn = _interopRequireDefault(require("./updateActiveTurn.js"));

var _utils = require("./movement/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uciLogPanel = document.getElementById('uci-log');
var dragged;
document.addEventListener("drag", function (event) {}, false);
document.addEventListener("dragstart", function (event) {
  dragged = event.target;
  event.target.style.opacity = .5;
}, false);
document.addEventListener("dragend", function (event) {
  event.target.style.opacity = "";
}, false);
/* events fired on the drop targets */

document.addEventListener("dragover", function (event) {
  event.preventDefault();
}, false);
document.addEventListener("dragenter", function (event) {
  if (event.target.parentElement.id === 'board') {
    event.target.style.background = (0, _core.isMoveValid)(dragged, event.target) ? 'green' : 'red';
  }
}, false);
document.addEventListener("dragleave", function (event) {
  if (event.target.parentElement.id === 'board') {
    event.target.style.background = "";
  }
}, false);
document.addEventListener("drop", function (event) {
  event.preventDefault();

  if (event.target.parentElement.id === 'board') {
    event.target.style.background = "";
    if (!(0, _core.isMoveValid)(dragged, event.target)) return;
    playerTurn = playerTurn === 'white' ? 'black' : 'white';
    (0, _updateActiveTurn.default)();
    const uciEl = document.createElement('div');
    uciEl.className = `uci-move-${dragged.className.replace('-piece', '')}`;
    uciEl.textContent = `${dragged.textContent === '♟︎' ? '' : dragged.textContent}${(0, _utils.getTextPos)(event.target)}`; // `${getTextPos(dragged)}${getTextPos(event.target)}`;

    uciLogPanel.appendChild(uciEl);
    const origText = dragged.textContent;
    const origClass = dragged.className;
    dragged.textContent = event.target.textContent;
    dragged.className = event.target.className;
    event.target.textContent = origText;
    event.target.className = origClass;
  }
}, false);
},{"./movement/core.js":"js/movement/core.js","./updateActiveTurn.js":"js/updateActiveTurn.js","./movement/utils.js":"js/movement/utils.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _pieceTypes = _interopRequireDefault(require("./pieceTypes.js"));

var _updateActiveTurn = _interopRequireDefault(require("./updateActiveTurn.js"));

require("./drag.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accentDropdown = document.getElementById('accent-dropdown');

accentDropdown.oninput = () => {
  document.documentElement.style.setProperty('--accent', accentDropdown.value);
};

const boardBaseDropdown = document.getElementById('board-base-dropdown');

boardBaseDropdown.oninput = () => {
  document.documentElement.style.setProperty('--board-base', boardBaseDropdown.value);
};

window.playerTurn = 'white';
(0, _updateActiveTurn.default)();
window.board = document.getElementById('board');
window.boardRows = 8;
window.boardColumns = 8;
const pieces = document.querySelectorAll('#board > div');

const makePieceTypesDebugPanel = () => {
  const el = document.getElementById('d-pt');

  for (const t of _pieceTypes.default) {
    const header = document.createElement('h1');
    header.textContent = t.name;
    el.appendChild(header);
    const con = document.createElement('div');
    con.style.display = 'flex';
    con.style.flexDirection = 'row';
    con.style.flexWrap = 'wrap';
    con.style.gap = '15px';

    for (const k of Object.keys(t)) {
      const par = document.createElement('div');
      par.style.backgroundColor = '#333';
      par.style.padding = '6px';
      const kEl = document.createElement('span');
      kEl.textContent = k;
      const vEl = document.createElement('span');
      vEl.textContent = t[k];
      par.append(kEl, vEl);
      con.appendChild(par);
    }

    el.appendChild(con);
  }
};

makePieceTypesDebugPanel();

for (let p of pieces) {
  p.draggable = true;
}
},{"./pieceTypes.js":"js/pieceTypes.js","./updateActiveTurn.js":"js/updateActiveTurn.js","./drag.js":"js/drag.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36783" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map