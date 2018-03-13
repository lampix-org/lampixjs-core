const displayLoader = (): void => {
  // Avoid CSS class name collision
  const id = Math.random().toString(36).substring(2);

  const containerClass = `lx-loader-container-${id}`;
  const loaderClass = `lx-loader-${id}`;

  const loaderCSS = `
  .${containerClass} {
    position: fixed;
    height: 100vh;
    width: 100vw;

    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .${loaderClass} {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;

    animation: spin-${id} 4000ms linear infinite;
  }

  @keyframes spin-${id} {
    0% { -webkit-transform: rotate(0deg); border-top-color: rgb(241, 72, 54); }
    25% { -webkit-transform: rotate(360deg); border-top-color: rgb(121, 202, 46); }
    50% { -webkit-transform: rotate(720deg); border-top-color: rgb(61, 167, 149); }
    75% { -webkit-transform: rotate(1080deg); border-top-color: rgb(241, 187, 27); }
    100% { -webkit-transform: rotate(1440deg); border-top-color: rgb(241, 72, 54); }
  }
`;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = loaderCSS;

  document.head.appendChild(style);

  const container = document.createElement('div');
  container.classList.add(containerClass);

  const loader = document.createElement('div');
  loader.classList.add(loaderClass);

  document.body.appendChild(container);
  container.appendChild(loader);
};

export default displayLoader;
