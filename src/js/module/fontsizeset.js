// JavaScript Document
import { getDeviceType } from '../base/utils.js';

(function (win, lib) {
  var _documentSize = 1920; //  设计稿尺寸
  var documentSize = 1920; //展示设尺寸（最大1440，图片基于1440的）
  var minSize = 320;

  var device = getDeviceType();
  if (device === 'Desktop') {
    _documentSize = 1920;
    documentSize = 1920;
    minSize = 750;
  } else if (device === 'Mobile') {
    _documentSize = 750;
    documentSize = 750;
    minSize = 320;
  }

  var sizeTimes = documentSize / _documentSize; //倍数
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  var tid;
  var flexible = lib.flexible || (lib.flexible = {});

  if (metaEl) {
    // console.warn('将根据已有的meta标签来设置缩放比例');
    var match = metaEl
      .getAttribute('content')
      .match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute('content');
    if (content) {
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }

  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute(
      'content',
      'initial-scale=' +
        scale +
        ', maximum-scale=' +
        scale +
        ', minimum-scale=' +
        scale +
        ', user-scalable=no'
    );
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > documentSize) {
      width = documentSize * dpr;
    }
    if (width >= documentSize) {
      //最大尺寸限制
      var rem = 100 * sizeTimes;
    } else if (width <= minSize) {
      //最小尺寸限制
      var rem = (100 * sizeTimes) / (documentSize / minSize);
    } else {
      //按比例縮小
      var rem = (100 * sizeTimes) / (documentSize / width);
    }
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }

  win.addEventListener(
    'resize',
    function () {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    },
    false
  );
  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    },
    false
  );

  // if (doc.readyState === 'complete') {
  //     doc.body.style.fontSize = 12 * dpr + 'px';
  // } else {
  //     doc.addEventListener('DOMContentLoaded', function(e) {
  //         doc.body.style.fontSize = 12 * dpr + 'px';
  //     }, false);
  // }

  refreshRem();

  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function (d) {
    var val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  };
  flexible.px2rem = function (d) {
    var val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  };
})(window, window['lib'] || (window['lib'] = {}));
