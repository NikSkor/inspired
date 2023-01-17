import {renderNavigation} from "../render/renderNavigation";
import {renderHero} from "../render/renderHero";
import {renderGoods} from "../render/renderGoods";

export const mainPage = (gender) => {
  console.log('gender: ', gender);
  
  renderNavigation();
  renderHero();
  renderGoods();
};
