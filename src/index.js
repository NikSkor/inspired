import './index.html';
import './index.scss';

import { router } from './modules/utils/router';
import { renderHeader } from './modules/render/renderHeader';
import { renderFooter } from './modules/render/renderFooter';
import { mainPageController } from './modules/controllers/mainPageController';
import { getData } from './modules/getData';
import { API_URL, DATA } from './modules/const';
import { createCssColors } from './modules/createCssColors';
import { createElement } from './modules/utils/createElement';
import { categoryPageController } from './modules/controllers/categoryPageController';
import { searchPageController } from './modules/controllers/searchPageController';

const init = async () => {
  try {
    router.on('*', () => {
      renderHeader();
      renderFooter();
    });

    DATA.navigation = await getData(`${API_URL}/api/categories`, {});
    DATA.colors = await getData(`${API_URL}/api/colors`);

    createCssColors(DATA.colors);

    router.on('/', () => {
      mainPageController();
    });

    router.on('women', () => {
      mainPageController('women');
    });

    router.on('men', () => {
      mainPageController('men');
    });

    router.on('/:gender/:category', categoryPageController);

    router.on('search', searchPageController);

    // setTimeout(() => {
    //   router.navigate('men');
    // }, 3000)

    // setTimeout(() => {
    //   router.navigate('women');
    // }, 6000);

    
  } catch (err) {
    console.warn(err);
    createElement(
      'h2',
      {
        textContent: 'Что-то пошло не так, попробуйте позже...',
      },
      {
        parent: document.querySelector('.main'),
        cb(h2) {
          h2.style.textAlign = 'center';
        }
      }
    );
  } finally {
    router.resolve();
  }
};

init();
