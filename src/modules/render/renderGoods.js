import { API_URL, COUNT__PAGINATION, DATA, goods } from "../const";
import { createElement } from "../utils/createElement";
import { getData } from "../getData";
import { renderPagination } from "./renderPagination";
import { getFavorite } from "../controllers/favoriteController";



export const renderGoods = async (title, params) => {

  goods.textContent = '';

  const data = await getData(`${API_URL}/api/goods`, params);
  console.log('data: ', data);

  const products = Array.isArray(data) ? data: data.goods;

  const container = createElement('div', {
    className: 'container',
  }, {
    parent: goods,
  });
  
  const goodsTitle = createElement(
    'h2',
    {
      className: 'goods__title',
      textContent: title,
    },
    {
      parent: container,
    }
  );

    if (Object.hasOwn(data, 'totalCount')) {
      createElement(
        'sup',
        {
          className: 'goods__title-sup',
          innerHTML: `&nbsp(${data?.totalCount})`,
        },
        {
          parent: goodsTitle,
        }
      );

      if (!data.totalCount) {
        createElement('p', {
          className: 'goods__warning',
          textContent: 'По вашему запросу ничего не найдено.'
        }, {
          parent: container,
        })
        return;
      }
    };

    const favoriteList = getFavorite();
    
  const listCard = products.map((product) => {
    const li = createElement('li', {
      className: 'goods__item',
    });

    const article = createElement('article', {
      className: 'product',
      innerHTML: `
        <a href="#/goods/${product.id}" class="product__link">
          <img
            src="${API_URL}/${product.pic}"
            alt="${product.title}"
            class="product__image"
          />
          <h3 class="product__title">
            ${product.title}
          </h3>
        </a>
        <div class="product__row">
          <p class="product__price">руб ${product.price}</p>
          <button
            class="product__btn-favorite favorite
            ${favoriteList.includes(product.id) ? 'favorite_active' : ''}"
            data-id="${product.id}"
            aria-label="Добавить в избранное"
          ></button>
        </div>
      `,
    }, {
      parent: li,
    })

    const ulColor = createElement(
      'ul',
      {
        className: 'product__color-list',
      },
      {
        parent: article,
        appends: product.colors.map((colorId, i) => {
          const color = DATA.colors.find(item => item.id == colorId);
          return createElement('li', {
            className: `color color_${color.title} ${i ? '' : 'color_check'}`,
          });
        })
      }
    );

    

    return li;
  });

  const list = createElement(
    'ul',
    {
      className: 'goods__list',
    },
    {
      parent: container,
      appends: listCard,
    }
  );

  if (data.pages && data.pages > 1) {
    const pagination = createElement('div', {
      className: 'goods__pagination pagination',
    }, {
      parent: container,
    })

    renderPagination(pagination, data.page, data.pages, COUNT__PAGINATION);
  }

  // goods.innerHTML = `
  //   <div class="container">
  //     <h2 class="goods__title">Новинки</h2>
  //     <ul class="goods__list">
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img
  //               src="img/product01.jpg"
  //               alt="Бюстгальтер-Балконет Wien из Микрофибры"
  //               class="product__image"
  //             />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button
  //               class="product__btn-favorite"
  //               aria-label="Добавить в избранное"
  //             ></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img src="img/product02.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры" class="product__image" />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button class="product__btn-favorite product__btn-favorite_active" aria-label="Добавить в избранное"></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img src="img/product01.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры" class="product__image" />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button class="product__btn-favorite" aria-label="Добавить в избранное"></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img src="img/product02.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры" class="product__image" />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button class="product__btn-favorite" aria-label="Добавить в избранное"></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img src="img/product01.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры" class="product__image" />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button class="product__btn-favorite" aria-label="Добавить в избранное"></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img src="img/product02.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры" class="product__image" />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button class="product__btn-favorite" aria-label="Добавить в избранное"></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img src="img/product01.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры" class="product__image" />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button class="product__btn-favorite" aria-label="Добавить в избранное"></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //       <li class="goods__item">
  //         <article class="product">
  //           <a href="#" class="product__link">
  //             <img src="img/product02.jpg" alt="Бюстгальтер-Балконет Wien из Микрофибры" class="product__image" />
  //             <h3 class="product__title">
  //               Бюстгальтер-Балконет Wien из Микрофибры
  //             </h3>
  //           </a>
  //           <div class="product__row">
  //             <p class="product__price">руб 2999</p>
  //             <button class="product__btn-favorite" aria-label="Добавить в избранное"></button>
  //           </div>
  //           <ul class="product__color-list">
  //             <li class="product__color-item">
  //               <div class="color color_red color_check"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_white"></div>
  //             </li>
  //             <li class="product__color-item">
  //               <div class="color color_black"></div>
  //             </li>
  //           </ul>
  //         </article>
  //       </li>
  //     </ul>
  //   </div>
  // `;
};
