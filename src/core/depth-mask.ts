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

const MAX_Z_INDEX = 2147483647;

const internalClassifiedObjectsState: ClassifiedObject[] = [];

const depthMask = {
  canvasId: 'lx-depth-cls',
  create: function(opts: Opts<string>) {
    this.opts = Object.assign({}, defaultOpts, opts);
    // remove previous canvas element
    this.remove();
    // reset classified objects state
    internalClassifiedObjectsState.splice(0, internalClassifiedObjectsState.length);
    // create the canvas element
    const canvas = window.document.createElement('canvas');
    canvas.id = this.canvasId;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.zIndex = MAX_Z_INDEX.toString();
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
    this.saveDetectedObjectsState(classifiedObjects);
    internalClassifiedObjectsState.forEach(o => this.drawShape(o.outline));
  },
  /** If objects don't have a valid outline, that means they were removed. */
  saveDetectedObjectsState: function(classifiedObjects: ClassifiedObject[]) {
    if (!Array.isArray(classifiedObjects)) {
      return;
    }
    classifiedObjects.forEach(o => {
      const isObjectRemoved = (typeof o.outline !== 'object')
        || (typeof o.outline.points === 'undefined')
        || (!Array.isArray(o.outline.points))
        || (!o.outline.points.length);

      if (isObjectRemoved) {
        const foundIndex = internalClassifiedObjectsState.findIndex(compare => {
          return compare.objectId === o.objectId;
        });
        if (foundIndex !== -1) {
          // remove object from array
          internalClassifiedObjectsState.splice(foundIndex, 1);
        }
      } else {
        // save to hash
        internalClassifiedObjectsState.push(o);
      }
    });
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
  }
};

export {
  DEPTH_CLASSIFIER,
  depthMask
};
