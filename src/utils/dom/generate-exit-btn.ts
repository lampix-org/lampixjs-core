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
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	x="0px"
	y="0px"
	viewBox="0 0 40 40" style="width: 100%; height: 100%;"
>
<style type="text/css">
.st0{fill:url(#SVGID_1_);}
.st1{fill:url(#SVGID_2_);}
.st2{fill:url(#SVGID_3_);}
</style>
<g>

<linearGradient
  id="SVGID_1_"
  gradientUnits="userSpaceOnUse"
  x1="15.611"
  y1="2.267"
  x2="24.388"
  y2="40.2843"
  gradientTransform="matrix(1 0 0 -1 0 41.2756)"
>
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
<path
  class="st0"
  d="M20,2.3c4.6,0,9.2,1.8,12.7,5.4c6.8,7,6.7,18.2-0.3,25.1c-3.4,3.4-7.9,5-12.4,5c-4.6,0-9.2-1.8-12.7-5.4
  c-6.8-7-6.7-18.2,0.3-25.1C11.1,3.9,15.5,2.3,20,2.3 M20,0.5L20,0.5c-5.1,0-9.9,2-13.6,5.5c-3.7,3.6-5.8,8.5-5.9,13.7
  S2.4,29.9,6,33.6c3.7,3.8,8.7,5.9,14,5.9c5.1,0,9.9-2,13.6-5.5c3.7-3.6,5.8-8.5,5.9-13.7c0.1-5.2-1.9-10.1-5.5-13.9
  C30.3,2.6,25.3,0.5,20,0.5L20,0.5z"
/>
<g>

<linearGradient
  id="SVGID_2_"
  gradientUnits="userSpaceOnUse"
  x1="11.6952"
  y1="29.747"
  x2="28.4173"
  y2="12.6894"
  gradientTransform="matrix(1 0 0 -1 0 41.2756)"
>
<stop  offset="0" style="stop-color:#FAFBFC"/>
<stop  offset="0.2433" style="stop-color:#F5F6F6"/>
<stop  offset="0.4816" style="stop-color:#E9E9E9"/>
<stop  offset="0.718" style="stop-color:#D6D6D6"/>
<stop  offset="0.9518" style="stop-color:#BEBEBE"/>
<stop  offset="0.995" style="stop-color:#B9B9B9"/>
</linearGradient>
<circle class="st1" cx="20" cy="20" r="13.6"/>
</g>

<linearGradient
id="SVGID_3_"
gradientUnits="userSpaceOnUse"
x1="19.9132"
y1="9.5639"
x2="20.0875"
y2="33.0915"
gradientTransform="matrix(1 0 0 -1 0 41.2756)"
>
<stop  offset="0" style="stop-color:#FAFBFC"/>
<stop  offset="0.3412" style="stop-color:#CECDCD"/>
<stop  offset="0.782" style="stop-color:#A2A2A3"/>
<stop  offset="1" style="stop-color:#939495"/>
</linearGradient>
<circle class="st2" cx="20" cy="20" r="11.5"/>
</g>
<polygon
id="x-mark-1"
points="26.2,24.2 21.9,20 26.1,15.7 24.2,13.8 20,18.1 15.7,13.9 13.8,15.8 18.1,20 13.9,24.3 15.8,26.2
20,21.9 24.3,26.1 "/>
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
