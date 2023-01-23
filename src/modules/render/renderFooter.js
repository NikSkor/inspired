import { API_URL, DATA } from "../const";
import { createElement } from "../createElement";
import { getData } from "../getData";

const container = createElement(
  'div',
  {
    className: 'container',
  }
);

const footerContainer = createElement(
  'div',
  {
    className: 'footer__container',
  },
  {
    parent: container,
  }
);

export const renderFooter = async () => {
  const footer = document.querySelector('.footer');

  footer.textContent = '';

  DATA.categories = await getData(`${API_URL}/api/categories`);

  const genders = Object.keys(DATA.categories);

  // console.log('DATA.categories: ', DATA.categories);

  footer.append(container);


  const footerCategory = createElement(
    'div',
    {
      className: 'footer__item footer__item_category footer-category',
    },
    {
      parent: footerContainer,
      append: createElement('h2', {
        className: 'footer__title footer-category__title',
        textContent: 'Каталог',
      }),
    }
  );

  const sublistGenerator = (gender) => {
    const elems = DATA.categories[gender].list.map((item) =>
      createElement(
        'li',
        {
          className: 'footer-category__subitem',
        },
        {
          append: createElement('a', {
            className: 'footer__link footer-category__link',
            textContent: item.title,
            href: `#/categories/${item.slug}`,
          }),
        }
      )
    );
    return elems;
  }

  const footerCategoryList = createElement(
    'ul',
    {
      className: 'footer-category__list',
    },
    {
      parent: footerCategory,
      appends: genders.map((gender) =>
        createElement(
          'li',
          {
            className: 'footer-category__item',
          },
          {
            appends: [
              createElement(
                'h3',
                {
                  className: 'footer-category__subtitle',
                },
                {
                  append: createElement('a', {
                    className: 'footer__link',
                    textContent: `${DATA.categories[gender].title}`,
                    href: `#/${gender}`,
                  }),
                }
              ),
              createElement(
                'ul',
                {
                  className: 'footer-category__sublist',
                },
                {
                  appends: sublistGenerator(gender),
                }
              ),
            ],
          }
        )
      ),
    }
  );

  const footerSocial = createElement(
    'div',
    {
      className: 'footer__item footer__item_social footer-social',
    },
    {
      parent: footerContainer,
      appends: [
        createElement('h2', {
          className: 'footer__title footer-social__title',
          textContent: 'Связаться с нами',
        }),
        createElement('p', {
          className: 'footer-social__subtitle',
          textContent: 'Контакты и адреса магазинов:',
        }),
      ],
    }
  )

  createElement(
    'ul',
    {
      className: 'footer-social__list',
    },
    {
      parent: footerSocial,
      appends: [
        createElement(
          'li',
          {
            className: 'footer-social__item',
          },
          {
            append: createElement('a', {
              className:
                'footer-social__link footer__link footer-social__link_vk',
              href: '#',
              innerHTML: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 0C5.37281 0 0 5.37256 0 12C0 18.6274 5.37281 24 12 24C18.6272 24 24 18.6274 24 12C24 5.37256 18.6272 0 12 0ZM18.087 13.2978C18.6463 13.8441 19.2381 14.3583 19.7402 14.961C19.9626 15.2277 20.1723 15.5034 20.3319 15.8135C20.5597 16.2557 20.354 16.7406 19.9582 16.7669L17.4997 16.7664C16.8648 16.8189 16.3595 16.5628 15.9335 16.1287C15.5935 15.7828 15.278 15.4133 14.9505 15.0556C14.8167 14.9087 14.6757 14.7705 14.5078 14.6617C14.1726 14.4437 13.8815 14.5105 13.6895 14.8606C13.4938 15.2169 13.4491 15.6117 13.4304 16.0082C13.4037 16.5879 13.2288 16.7394 12.6472 16.7666C11.4044 16.8248 10.2251 16.6362 9.12908 16.0097C8.16221 15.457 7.41385 14.677 6.76174 13.7938C5.49189 12.0722 4.51937 10.1826 3.64554 8.23881C3.44888 7.80104 3.59276 7.56681 4.0757 7.55773C4.87808 7.54226 5.68045 7.54423 6.48282 7.55699C6.80937 7.56215 7.02543 7.74899 7.1509 8.05713C7.58449 9.12393 8.11605 10.1389 8.78216 11.0803C8.95967 11.3309 9.14087 11.5809 9.39892 11.7579C9.68372 11.9534 9.90077 11.8888 10.0351 11.5708C10.121 11.3688 10.1581 11.1527 10.1767 10.9361C10.2406 10.1944 10.2482 9.45293 10.1377 8.71415C10.069 8.25183 9.80894 7.95327 9.34809 7.86586C9.11337 7.82142 9.14774 7.73451 9.26191 7.60045C9.46005 7.36868 9.64567 7.22529 10.0167 7.22529L12.7943 7.2248C13.232 7.31073 13.3303 7.50715 13.3897 7.94811L13.3921 11.0348C13.387 11.2055 13.4778 11.7113 13.7842 11.823C14.0297 11.904 14.1918 11.7071 14.3386 11.5517C15.0047 10.8448 15.4793 10.0105 15.9043 9.14701C16.0919 8.7662 16.2537 8.37213 16.4108 7.97733C16.5277 7.6854 16.7094 7.54177 17.0389 7.54668L19.7136 7.54987C19.7924 7.54987 19.8725 7.55061 19.9506 7.56411C20.4014 7.64121 20.5248 7.83517 20.3854 8.27491C20.1659 8.96581 19.7394 9.54132 19.3225 10.1183C18.8757 10.736 18.3991 11.3322 17.9567 11.9526C17.5501 12.5198 17.5822 12.8053 18.087 13.2978Z"/>
                </svg>
              `,
            }),
          }
        ),
        createElement(
          'li',
          {
            className: 'footer-social__item',
          },
          {
            append: createElement('a', {
              className:
                'footer-social__link footer__link footer-social__link_tg',
              href: '#',
              innerHTML: `
                <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.1818 3.24675C20.921 3.26573 20.665 3.32692 20.4238 3.42794H20.4205C20.1889 3.51975 19.088 3.98288 17.4143 4.68488L11.4164 7.21094C7.11257 9.02282 2.88188 10.8071 2.88188 10.8071L2.93226 10.7876C2.93226 10.7876 2.64057 10.8834 2.33588 11.0923C2.14765 11.212 1.98567 11.3688 1.85976 11.5529C1.71026 11.7723 1.59001 12.1079 1.63469 12.4548C1.70782 13.0414 2.08807 13.3933 2.36107 13.5874C2.63732 13.7841 2.90057 13.8759 2.90057 13.8759H2.90707L6.87451 15.2124C7.05244 15.7836 8.0835 19.1734 8.33132 19.9542C8.47757 20.4206 8.61975 20.7123 8.79769 20.9349C8.88382 21.0486 8.98457 21.1437 9.10563 21.2201C9.16857 21.2567 9.23567 21.2856 9.3055 21.3062L9.26488 21.2964C9.27707 21.2997 9.28682 21.3094 9.29575 21.3127C9.32825 21.3216 9.35019 21.3249 9.39163 21.3314C10.0197 21.5215 10.5243 21.1315 10.5243 21.1315L10.5527 21.1088L12.8951 18.9759L16.8211 21.9879L16.9105 22.0261C17.7287 22.3852 18.5574 22.1853 18.9954 21.8327C19.4366 21.4776 19.608 21.0234 19.608 21.0234L19.6364 20.9503L22.6703 5.408C22.7564 5.0245 22.7784 4.66538 22.6833 4.31682C22.5853 3.96405 22.3589 3.66065 22.0488 3.46613C21.7883 3.30779 21.4862 3.23136 21.1818 3.24675ZM21.0998 4.91238C21.0965 4.96357 21.1063 4.95788 21.0835 5.05619V5.06513L18.0781 20.4458C18.0651 20.4677 18.0431 20.5156 17.983 20.5636C17.9196 20.6139 17.8693 20.6456 17.6052 20.5408L12.8033 16.8594L9.90269 19.5033L10.5121 15.6114L18.3576 8.29888C18.6809 7.99825 18.5729 7.93488 18.5729 7.93488C18.5956 7.566 18.0846 7.82682 18.0846 7.82682L8.19157 13.9555L8.18832 13.9393L3.44657 12.3427V12.3394L3.43438 12.337C3.44269 12.3342 3.45083 12.331 3.45876 12.3273L3.48476 12.3143L3.50994 12.3053C3.50994 12.3053 7.74388 10.5211 12.0477 8.70919C14.2024 7.80163 16.3734 6.88757 18.0431 6.18232C19.7128 5.48113 20.947 4.96682 21.0169 4.93919C21.0835 4.91319 21.0518 4.91319 21.0998 4.91319V4.91238Z"/>
                </svg>
              `,
            }),
          }
        ),
      ],
    }
  );

  createElement('div', {
    className: 'footer__item footer__item_contacts footer-contacts',
  },{
    parent: footerContainer,
    appends: [
      createElement('a', {
        className: 'footer__link',
        href: 'maito:Inspired@gmail.com',
        textContent: 'Inspired@gmail.com',
      }),
      createElement('a', {
        className: 'footer__link',
        href: 'tel:89304902620',
        textContent: '8 930 490 26 20',
      }),
    ]
  });

  createElement(
    'div',
    {
      className: 'footer__item footer__item_copyright footer-copyright',
    },
    {
      parent: footerContainer,
      append: createElement('p', {
        textContent: '© INSPIRED, 2023',
      }),
    }
  );

  const footerDevelopment = createElement(
    'div',
    {
      className: 'footer__item footer__item_development footer-development',
    },
    {
      parent: footerContainer,
    }
  );

createElement(
  'ul',
  {
    className: 'footer-development__list',
  },
  {
    parent: footerDevelopment,
    appends: [
      createElement(
        'li',
        {
          className: 'footer-development__item',
        },
        {
          append: createElement('a', {
            className: 'footer__link',
            href: 'https://t.me/Mrshmallowww',
            textContent: 'Designer: Anastasia Ilina',
          }),
        }
      ),
      createElement(
        'li',
        {
          className: 'footer-development__item',
        },
        {
          append: createElement('a', {
            className: 'footer__link',
            href: 'https://t.me/Floriel',
            textContent: 'Developer: Nikita Skorodumov',
          }),
        }
      ),
    ],
  }
)
//   `
//   <div class="container">
//       <div class="footer__container">
//         <div class="footer__item footer__item_category footer-category">
//           <h2 class="footer__title footer-category__title">Каталог</h2>
//           <ul class="footer-category__list">
//             <li class="footer-category__item">
//               <h3 class="footer-category__subtitle">
//                 <a href="#" class="footer__link">Женщины</a></h3>
//               <ul class="footer-category__sublist">
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Бюстгальтеры</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Трусы</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Носки</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Халаты</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Термобелье</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Пижамы</a></li>
//               </ul>
//             </li>
//             <li class="footer-category__item">
//               <h3 class="footer-category__subtitle">
//                 <a href="#" class="footer__link">Мужчины</a></h3>
//               <ul class="footer-category__sublist">
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Трусы</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Носки</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Халаты</a></li>
//                 <li class="footer-category__subitem"><a href="#" class="footer__link footer-category__link">Термобелье</a></li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//         <div class="footer__item footer__item_social footer-social">
//           <h2 class="footer__title footer-social__title">Связаться с нами</h2>
//           <p class="footer-social__subtitle">Контакты и адреса магазинов</p>
//           <ul class="footer-social__list">
//             <li class="footer-social__item"><a href="#" class="footer-social__link footer__link footer-social__link_vk">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M12 0C5.37281 0 0 5.37256 0 12C0 18.6274 5.37281 24 12 24C18.6272 24 24 18.6274 24 12C24 5.37256 18.6272 0 12 0ZM18.087 13.2978C18.6463 13.8441 19.2381 14.3583 19.7402 14.961C19.9626 15.2277 20.1723 15.5034 20.3319 15.8135C20.5597 16.2557 20.354 16.7406 19.9582 16.7669L17.4997 16.7664C16.8648 16.8189 16.3595 16.5628 15.9335 16.1287C15.5935 15.7828 15.278 15.4133 14.9505 15.0556C14.8167 14.9087 14.6757 14.7705 14.5078 14.6617C14.1726 14.4437 13.8815 14.5105 13.6895 14.8606C13.4938 15.2169 13.4491 15.6117 13.4304 16.0082C13.4037 16.5879 13.2288 16.7394 12.6472 16.7666C11.4044 16.8248 10.2251 16.6362 9.12908 16.0097C8.16221 15.457 7.41385 14.677 6.76174 13.7938C5.49189 12.0722 4.51937 10.1826 3.64554 8.23881C3.44888 7.80104 3.59276 7.56681 4.0757 7.55773C4.87808 7.54226 5.68045 7.54423 6.48282 7.55699C6.80937 7.56215 7.02543 7.74899 7.1509 8.05713C7.58449 9.12393 8.11605 10.1389 8.78216 11.0803C8.95967 11.3309 9.14087 11.5809 9.39892 11.7579C9.68372 11.9534 9.90077 11.8888 10.0351 11.5708C10.121 11.3688 10.1581 11.1527 10.1767 10.9361C10.2406 10.1944 10.2482 9.45293 10.1377 8.71415C10.069 8.25183 9.80894 7.95327 9.34809 7.86586C9.11337 7.82142 9.14774 7.73451 9.26191 7.60045C9.46005 7.36868 9.64567 7.22529 10.0167 7.22529L12.7943 7.2248C13.232 7.31073 13.3303 7.50715 13.3897 7.94811L13.3921 11.0348C13.387 11.2055 13.4778 11.7113 13.7842 11.823C14.0297 11.904 14.1918 11.7071 14.3386 11.5517C15.0047 10.8448 15.4793 10.0105 15.9043 9.14701C16.0919 8.7662 16.2537 8.37213 16.4108 7.97733C16.5277 7.6854 16.7094 7.54177 17.0389 7.54668L19.7136 7.54987C19.7924 7.54987 19.8725 7.55061 19.9506 7.56411C20.4014 7.64121 20.5248 7.83517 20.3854 8.27491C20.1659 8.96581 19.7394 9.54132 19.3225 10.1183C18.8757 10.736 18.3991 11.3322 17.9567 11.9526C17.5501 12.5198 17.5822 12.8053 18.087 13.2978Z"/>
//               </svg>
//             </a></li>
//             <li class="footer-social__item"><a href="#" class="footer-social__link footer__link footer-social__link_tg">
//               <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M21.1818 3.24675C20.921 3.26573 20.665 3.32692 20.4238 3.42794H20.4205C20.1889 3.51975 19.088 3.98288 17.4143 4.68488L11.4164 7.21094C7.11257 9.02282 2.88188 10.8071 2.88188 10.8071L2.93226 10.7876C2.93226 10.7876 2.64057 10.8834 2.33588 11.0923C2.14765 11.212 1.98567 11.3688 1.85976 11.5529C1.71026 11.7723 1.59001 12.1079 1.63469 12.4548C1.70782 13.0414 2.08807 13.3933 2.36107 13.5874C2.63732 13.7841 2.90057 13.8759 2.90057 13.8759H2.90707L6.87451 15.2124C7.05244 15.7836 8.0835 19.1734 8.33132 19.9542C8.47757 20.4206 8.61975 20.7123 8.79769 20.9349C8.88382 21.0486 8.98457 21.1437 9.10563 21.2201C9.16857 21.2567 9.23567 21.2856 9.3055 21.3062L9.26488 21.2964C9.27707 21.2997 9.28682 21.3094 9.29575 21.3127C9.32825 21.3216 9.35019 21.3249 9.39163 21.3314C10.0197 21.5215 10.5243 21.1315 10.5243 21.1315L10.5527 21.1088L12.8951 18.9759L16.8211 21.9879L16.9105 22.0261C17.7287 22.3852 18.5574 22.1853 18.9954 21.8327C19.4366 21.4776 19.608 21.0234 19.608 21.0234L19.6364 20.9503L22.6703 5.408C22.7564 5.0245 22.7784 4.66538 22.6833 4.31682C22.5853 3.96405 22.3589 3.66065 22.0488 3.46613C21.7883 3.30779 21.4862 3.23136 21.1818 3.24675ZM21.0998 4.91238C21.0965 4.96357 21.1063 4.95788 21.0835 5.05619V5.06513L18.0781 20.4458C18.0651 20.4677 18.0431 20.5156 17.983 20.5636C17.9196 20.6139 17.8693 20.6456 17.6052 20.5408L12.8033 16.8594L9.90269 19.5033L10.5121 15.6114L18.3576 8.29888C18.6809 7.99825 18.5729 7.93488 18.5729 7.93488C18.5956 7.566 18.0846 7.82682 18.0846 7.82682L8.19157 13.9555L8.18832 13.9393L3.44657 12.3427V12.3394L3.43438 12.337C3.44269 12.3342 3.45083 12.331 3.45876 12.3273L3.48476 12.3143L3.50994 12.3053C3.50994 12.3053 7.74388 10.5211 12.0477 8.70919C14.2024 7.80163 16.3734 6.88757 18.0431 6.18232C19.7128 5.48113 20.947 4.96682 21.0169 4.93919C21.0835 4.91319 21.0518 4.91319 21.0998 4.91319V4.91238Z"/>
//               </svg>
//             </a></li>
//           </ul>
//         </div>
//         <div class="footer__item footer__item_contacts footer-contacts">
//           <a href="maito:Inspired@gmail.com" class="footer__link">Inspired@gmail.com</a>
//           <a href="tel:89304902620" class="footer__link">8 930 490 26 20</a>
//         </div>
//         <div class="footer__item footer__item_copyright footer-copyright">
//           <p>© INSPIRED, 2023</p>
//         </div>
//         <div class="footer__item footer__item_development footer-development">
//           <ul class="footer-development__list">
//             <li class="footer-development__item">
//               <a href="https://t.me/Mrshmallowww" class="footer__link">Designer: Anastasia Ilina</a></li>
//             <li class="footer-development__item">
//               <a href="https://t.me/Floriel" class="footer__link">Developer: Nikita Skorodumov</a></li>
//           </ul>
//         </div>
//       </div>
//       <!-- /.footer__container -->
//     </div>
// `;
}