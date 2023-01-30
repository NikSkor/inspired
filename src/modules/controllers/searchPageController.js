import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';

export const searchPageController = (routerData) => {

  const params = {
    search: routerData.params.value,
    count: 8,
  };

  if (routerData.params?.page) {
    params.page = routerData.params.page;
  }

  renderNavigation('all');
  renderHero(false);
  renderGoods(routerData.params.value, params);
};
