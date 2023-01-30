import { renderGoods } from "../render/renderGoods";
import { renderHero } from "../render/renderHero";
import { renderNavigation } from "../render/renderNavigation";
import { goods } from "../const";


export const getFavorite = () => JSON.parse(localStorage.getItem('favorite') || '[]');

export const addFavorite = (id) => {
  const favoriteList = getFavorite();
  favoriteList.push(id);
  localStorage.setItem('favorite', JSON.stringify(favoriteList));
};

export const removeFavorite = (id) => {
  const favoriteList = getFavorite();
  const index = favoriteList.findIndex(item => item === id);

  if (index === -1) return;

  favoriteList.splice(index, 1);

  localStorage.setItem('favorite', JSON.stringify(favoriteList));
};

goods.addEventListener('click', (e) => {
  const target = e.target;

  if (target.closest('.favorite_active')) {
    removeFavorite(target.dataset.id);
    target.classList.remove('favorite_active');

    return;
  }

  if (target.closest('.favorite')) {
    addFavorite(target.dataset.id);
    target.classList.add('favorite_active');

    return;
  }
})


export const favoriteController = () => {
  console.log(getFavorite());

  renderNavigation('all');
  renderHero(false);
  renderGoods('Избранное', {list: getFavorite()});
};