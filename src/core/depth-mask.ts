// Types
import {
  Outline,
  ClassifiedObject,
  Opts
} from '../types';

const DEPTH_CLASSIFIER = 'depth_classifier';

const defaultOpts = {
  color: 'black'
};

const depthMask = {
  canvasId: 'lx-depth-cls',
  create: function(opts: Opts<string>) {
    this.opts = Object.assign({}, defaultOpts, opts);
    // remove previous canvas element
    this.remove();
    // create the canvas element
    const canvas = window.document.createElement('canvas');
    canvas.id = this.canvasId;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.zIndex = this.getCanvasZIndex();
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    this.canvas = canvas;
    window.document.body.appendChild(canvas);
  },
  // remove previous canvas element
  remove: function() {
    const prevEl = window.document.getElementById(this.canvasId);
    if (prevEl) {
      prevEl.remove();
    }
  },
  positionClassifierCallback: function({}, classifiedObjects: ClassifiedObject[], {}) {
    classifiedObjects.forEach(o => this.drawShape(o.outline));
  },
  drawShape: function(outline: Outline) {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }
    this.clearCanvas();
    ctx.fillStyle = this.opts.color;
    if (!outline.points || !outline.points.length) {
      return;
    }
    ctx.beginPath();
    outline.points.forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.posX, p.posY);
      } else {
        ctx.lineTo(p.posX, p.posY);
      }
    });
    ctx.fill();
  },
  clearCanvas: function() {
    const ctx = this.getContext();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  getContext: function() {
    if (!this.canvas || !this.canvas.getContext) {
      return false;
    }
    return this.canvas.getContext('2d');
  },
  getRectArea: function() {
    return {
      posX: 0,
      posY: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      classifier: DEPTH_CLASSIFIER
    };
  },
  getCanvasZIndex: function() {
    const maxZIndex = this.maxZIndex();
    const zIndex = Math.ceil(maxZIndex / 100) * 100;
    return (zIndex > maxZIndex) ? zIndex : maxZIndex + 100;
  },
  maxZIndex: function() {
    const arr = Array.from(window.document.querySelectorAll('body *'))
      .map(o => parseFloat(window.getComputedStyle(o).zIndex))
      .filter(o => !isNaN(o));
    return arr.length ? arr.sort().pop() : 0;
  }
};

export {
  DEPTH_CLASSIFIER,
  depthMask
};
