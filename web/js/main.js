import { createOptions } from './createOptions.js';

const optionsWrapper = document.getElementById('options-wrapper');
const body = document.body;
const eye = document.getElementById('eyeSvg');
const defaultIconFontAwesome = 'fa-solid fa-eye';
const defaultIconGoogleMaterial = 'visibility';
const googleMaterialClass = 'material-symbols-outlined';
const defaultIconAsGoogleMaterial = true; //whether the default icon should use google material or font awesome
let currentIcon;

const setMainIcon = function (newIcon = defaultIconAsGoogleMaterial ? defaultIconGoogleMaterial : defaultIconFontAwesome) {
  if (!currentIcon || newIcon !== currentIcon) {
    if (currentIcon) {
      const previousIconData = (currentIcon === defaultIconGoogleMaterial ? googleMaterialClass : currentIcon).split(' ');

      for (let i = 0; i < previousIconData.length; i++) {
        eye.classList.remove(previousIconData[i]);
      }
    }

    const isNewIconGoogleMaterial = newIcon === defaultIconGoogleMaterial;
    const newIconData = (isNewIconGoogleMaterial ? googleMaterialClass : newIcon).split(' ');

    for (let i = 0; i < newIconData.length; i++) {
      eye.classList.add(newIconData[i]);
    }

    eye.textContent = isNewIconGoogleMaterial ? defaultIconGoogleMaterial : '';

    currentIcon = newIcon;
  }
};

const setMainIconColor = function (newIconColor) {
  eye.style.color = eye.style.fill = newIconColor;
};

window.addEventListener('message', (event) => {
  optionsWrapper.innerHTML = '';

  setMainIcon();

  switch (event.data.event) {
    case 'visible': {
      body.style.visibility = event.data.state ? 'visible' : 'hidden';
      return setMainIconColor('black');
    }

    case 'leftTarget': {
      return setMainIconColor('black');
    }

    case 'setTarget': {
      setMainIcon(event.data.mainIcon);
      setMainIconColor(event.data.mainIconColor || '#cfd2da');

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }
    }
  }
});
