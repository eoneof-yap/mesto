﻿// Имопртируем изображения для корректной сборки вебпаком
import image_1 from '../images/pyatigorks.jpeg';
import image_2 from '../images/elbrus.jpeg';
import image_3 from '../images/dombay-mountains.jpeg';
import image_4 from '../images/dombay-yak.jpeg';
import image_5 from '../images/gora-mashuk.jpeg';
import image_6 from '../images/kabardino-balkariya.jpeg';

export { initialCards, cardSelectors };

// Данные карточек
const initialCards = [
  {
    name: 'Пятигорск',
    link: image_1,
  },
  {
    name: 'Гора Эльбрус',
    link: image_2,
  },
  {
    name: 'Домбай',
    link: image_3,
  },
  {
    name: 'Домбай',
    link: image_4,
  },
  {
    name: 'Гора Машук',
    link: image_5,
  },
  {
    name: 'Кабардино-Балкария',
    link: image_6,
  },
];

const cardSelectors = {
  templateID: '#card-template',
  cardsGrid: '.cards-grid',
  card: '.card',
  image: '.card__image',
  title: '.card__title',
  deleteButton: '.card__delete-button',
  likeButton: '.card__like-button',
  activeLike: 'card__like-button_active',
};
