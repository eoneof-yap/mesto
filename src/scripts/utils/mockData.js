// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
import image_1 from '../../images/pyatigorks.jpeg';
import image_2 from '../../images/elbrus.jpeg';
import image_3 from '../../images/dombay-mountains.jpeg';
import image_4 from '../../images/dombay-yak.jpeg';
import image_5 from '../../images/gora-mashuk.jpeg';
import image_6 from '../../images/kabardino-balkariya.jpeg';

export const user = {
  name: 'Jacques Cousteau',
  about: 'Sailor, researcher',
  avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
  _id: '1234',
  cohort: 'cohort-41',
};

export const initialCards = [
  {
    likes: [
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1234',
        cohort: 'cohort-41',
      },
      {
        name: 'Танос',
        about: 'Профессиональный поисковик контекстов',
        avatar:
          'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1cGVyJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        _id: 'ba5461e5c9bdc77d58f9a499',
        cohort: 'cohort-41',
      },
    ],
    _id: '987',
    name: 'Суздаль',
    link: 'https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/61397732-44e3-11e9-9c70-02b782d69cda.800x600.jpg',
    owner: {
      name: 'Пук',
      about: 'Среньк',
      avatar:
        'https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/61397732-44e3-11e9-9c70-02b782d69cda.800x600.jpg',
      _id: 'c12d0cf84adf7asfv77a4ee414a7',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T13:45:31.813Z',
  },
  {
    likes: [],
    _id: '654',
    name: 'Джомолунгма',
    link: 'https://chydesa-mira.ru/wp-content/uploads/2015/10/dzomolungma.jpg',
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '01e158d30eb6505ccset0ba1ba3',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
  {
    likes: [
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1234',
        cohort: 'cohort-41',
      },
    ],
    _id: '654',
    name: 'Джомолунгма',
    link: 'https://chydesa-mira.ru/wp-content/uploads/2015/10/dzomolungma.jpg',
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '01e158d30eb6505ccset0ba1ba3',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
  {
    likes: [],
    _id: '321',
    name: 'Пятигорск',
    link: image_1,
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '321321321321321321',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
  {
    likes: [
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1234',
        cohort: 'cohort-41',
      },
      {
        name: 'Танос',
        about: 'Профессиональный поисковик контекстов',
        avatar:
          'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1cGVyJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        _id: 'ba5461e5c9bdc77d58f9a499',
        cohort: 'cohort-41',
      },
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1cfeff16d693eb907dcbf8c0',
        cohort: 'cohort-41',
      },
      {
        name: 'Танос',
        about: 'Профессиональный поисковик контекстов',
        avatar:
          'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1cGVyJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        _id: 'ba5461e5c9bdc77d58f9a499',
        cohort: 'cohort-41',
      },
    ],
    _id: '159',
    name: 'Гора Эльбрус',
    link: image_2,
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '1234',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
  {
    likes: [],
    _id: '357',
    name: 'Домбай',
    link: image_3,
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '01e158d30eb6505cc0ba1ba3',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
  {
    likes: [
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '321321321321321321',
        cohort: 'cohort-41',
      },
      {
        name: 'Танос',
        about: 'Профессиональный поисковик контекстов',
        avatar:
          'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1cGVyJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        _id: 'ba5461e5c9bdc77d58f9a499',
        cohort: 'cohort-41',
      },
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1cfeff16d693eb907dcbf8c0',
        cohort: 'cohort-41',
      },
      {
        name: 'Танос',
        about: 'Профессиональный поисковик контекстов',
        avatar:
          'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1cGVyJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        _id: 'ba5461e5c9bdc77d58f9a499',
        cohort: 'cohort-41',
      },
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1cfeff16d693eb907dcbf8c0',
        cohort: 'cohort-41',
      },
      {
        name: 'Танос',
        about: 'Профессиональный поисковик контекстов',
        avatar:
          'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1cGVyJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        _id: 'ba5461e5c9bdc77d58f9a499',
        cohort: 'cohort-41',
      },
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1cfeff16d693eb907dcbf8c0',
        cohort: 'cohort-41',
      },
      {
        name: 'Танос',
        about: 'Профессиональный поисковик контекстов',
        avatar:
          'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1cGVyJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        _id: 'ba5461e5c9bdc77d58f9a499',
        cohort: 'cohort-41',
      },
    ],
    _id: '147',
    name: 'Домбай',
    link: image_4,
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '1234',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
  {
    likes: [],
    _id: '258',
    name: 'Гора Машук',
    link: image_5,
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '01e158d30eb6505asfcc0ba1ba3',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
  {
    likes: [
      {
        name: 'phill',
        about: 'wizardius',
        avatar:
          'https://images.unsplash.com/photo-1648288706765-7d7c689a8e2c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500',
        _id: '1cfeff16d693eb907dcbf8c0',
        cohort: 'cohort-41',
      },
    ],
    _id: '369',
    name: 'Кабардино-Балкария',
    link: image_6,
    owner: {
      name: 'Jacques Cousteau',
      about: 'Sailor, researcher',
      avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
      _id: '1234',
      cohort: 'cohort-41',
    },
    createdAt: '2022-05-22T15:29:21.802Z',
  },
];
