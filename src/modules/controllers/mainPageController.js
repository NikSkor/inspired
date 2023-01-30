import {renderNavigation} from "../render/renderNavigation";
import {renderHero} from "../render/renderHero";
import {renderGoods} from "../render/renderGoods";
import { form } from "../render/renderSearch";

export const mainPageController = (gender = 'women') => {
  
  renderNavigation(gender);
  renderHero(gender);
  renderGoods('новинки', {gender});
};
