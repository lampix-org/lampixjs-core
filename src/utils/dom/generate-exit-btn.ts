// Types
import { ClassifierRect } from '../../types';

const generateExitBtn = (top: number = 20, left: number = 20): ClassifierRect => {
  // Avoid CSS class name collision
  const id = Math.random().toString(36).substring(2);
  let pressed = true;

  const btnClass = `lx-exit-btn-${id}`;

  const btnCSS = `
  .${btnClass} {
    position: fixed;

    top: ${top}px;
    left: ${left}px;

    width: 40px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    z-index: 100;

    transition: transform 1000ms ease;
    transform: scale(1);
  }
`;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = btnCSS;

  document.head.appendChild(style);

  const btn = document.createElement('div');
  btn.classList.add(btnClass);
  btn.innerHTML = `
<svg
  style="width: 100%; height: 100%;"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  viewBox="0 0 40 40"
>
<g>
  <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="15.6115" y1="39.0086" x2="24.3885" y2="0.9913">
    <stop  offset="0" style="stop-color:#FFFFFF"/>
    <stop  offset="0.1147" style="stop-color:#F2F1F1"/>
    <stop  offset="0.2461" style="stop-color:#DBDAD9"/>
    <stop  offset="0.3857" style="stop-color:#BBB9B9"/>
    <stop  offset="0.5311" style="stop-color:#939090"/>
    <stop  offset="0.6809" style="stop-color:#676464"/>
    <stop  offset="0.8346" style="stop-color:#3C3A39"/>
    <stop  offset="0.9885" style="stop-color:#070707"/>
    <stop  offset="1" style="stop-color:#010101"/>
  </linearGradient>
  <path fill="url(#SVGID_1_)" d="M19.998,2.273c4.618,0,9.231,1.793,12.706,5.364c6.828,7.017,6.675,18.24-0.342,25.068
    c-3.445,3.353-7.906,5.022-12.361,5.022c-4.618,0-9.231-1.793-12.706-5.364C0.467,25.346,0.62,14.123,7.637,7.295
    C11.082,3.942,15.543,2.273,19.998,2.273 M19.999,0.5h-0.001c-5.108,0-9.937,1.962-13.598,5.525
    c-3.733,3.632-5.828,8.501-5.899,13.709s1.89,10.132,5.523,13.865c3.703,3.805,8.666,5.901,13.977,5.901
    c5.107,0,9.937-1.962,13.598-5.525c3.733-3.632,5.828-8.501,5.899-13.709c0.071-5.208-1.89-10.132-5.523-13.865
    C30.273,2.596,25.309,0.5,19.999,0.5L19.999,0.5z"/>
  <g>
    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="11.6952" y1="11.5286" x2="28.4173" y2="28.5862">
      <stop  offset="0" style="stop-color:#FAFBFC"/>
      <stop  offset="0.2433" style="stop-color:#F5F6F6"/>
      <stop  offset="0.4816" style="stop-color:#E9E9E9"/>
      <stop  offset="0.718" style="stop-color:#D6D6D6"/>
      <stop  offset="0.9518" style="stop-color:#BEBEBE"/>
      <stop  offset="0.995" style="stop-color:#B9B9B9"/>
    </linearGradient>
    <circle fill="url(#SVGID_2_)" cx="20" cy="20" r="13.552"/>
  </g>
  <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="19.9132" y1="31.7117" x2="20.0875" y2="8.1841">
    <stop  offset="0" style="stop-color:#FAFBFC"/>
    <stop  offset="0.3412" style="stop-color:#CECDCD"/>
    <stop  offset="0.782" style="stop-color:#A2A2A3"/>
    <stop  offset="1" style="stop-color:#939495"/>
  </linearGradient>
  <circle fill="url(#SVGID_3_)" cx="20" cy="20" r="11.502"/>
</g>
</svg>
  `;

  document.body.appendChild(btn);
  btn.addEventListener('transitionend', () => {
    if (pressed) {
      window._lampix_internal.switchToApp('App Switcher');
    }
  });

  const boundingRect = btn.getBoundingClientRect();
  const lxRect = {
    posX: boundingRect.left,
    posY: boundingRect.top,
    width: boundingRect.width,
    height: boundingRect.height,
    classifier: 'cls_loc_fin_all_small',
    action: (classTag: string) => {
      pressed = !!parseInt(classTag, 10);

      if (pressed) {
        btn.style.transform = 'scale(1.3)';
      } else {
        btn.style.transform = 'scale(1)';
      }
    }
  };



  return lxRect;
};

export default generateExitBtn;
