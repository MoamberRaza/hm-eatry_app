import database from '@react-native-firebase/database';

export const createUser = async (user) => {
  try {
    let token = await user.getIdToken();
    let data = await database().ref('/users').push({
      isActive: true,
      user: token,
      email: user.email,
    });
    return data;
  } catch (e) {
    return e;
  }
};

export const createFood = async () => {
  const foods = [
    {
      name: 'Rice',
      imageUrl:
        'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
      color: '#4e3d53',
    },
    {
      name: 'Chinese',
      imageUrl:
        'https://images.unsplash.com/photo-1529690678884-189e81f34ef6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
      color: '#b34180',
    },
    {
      name: 'Vegetable',
      imageUrl:
        'https://images.unsplash.com/photo-1547562643-02eb29504a73?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2850&q=80',
      color: '#8ac4d0',
    },
    {
      name: 'Fast Food',
      imageUrl:
        'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2850&q=80',
      color: '#f0a500',
    },
    {
      name: 'Chicken Special',
      imageUrl:
        'https://images.unsplash.com/photo-1579065497397-2824d41272ce?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
      color: '#fb743e',
    },
    {
      name: 'Desi Foods',
      imageUrl:
        'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
      color: '#e08f62',
    },
    {
      name: 'Poke Bowl',
      imageUrl:
        'https://images.unsplash.com/photo-1556040220-704dadc2b747?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      color: '#c70039',
    },
  ];
  let a = await database().ref('/food').set(foods);
  return a;
};
export const createRes = async () => {
  const restaurants = [
    {
      id: '',
      name: 'Maximum Foods Proivders',
      location: 'Kowait - Hardly',
      ImageUrl:
        'https://cdn.pixabay.com/photo/2021/02/21/18/15/biriyani-6037375_1280.jpg',
      available: [
        {
          name: 'Rice',
          price: 20,
          ImageUrl:
            'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        },
        {
          name: 'Vegetable',
          price: 8,
          ImageUrl:
            'https://images.unsplash.com/photo-1547562643-02eb29504a73?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2850&q=80',
        },
        {
          name: 'Desi Foods',
          price: 23,
          ImageUrl:
            'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
        },
        {
          name: 'Chicken Special',
          price: 12,
          ImageUrl:
            'https://images.unsplash.com/photo-1579065497397-2824d41272ce?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
        },
      ],
      contact: ['+99211111111'],
    },
    {
      id: '',
      name: 'Restaurant-1',
      location: 'ABC',
      ImageUrl:
        'https://cdn.pixabay.com/photo/2017/12/16/17/46/fried-rice-3023040_1280.jpg',
      available: [
        {
          name: 'Rice',
          price: 20,
          ImageUrl:
            'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        },
        {
          name: 'Vegetable',
          price: 8,
          ImageUrl:
            'https://images.unsplash.com/photo-1547562643-02eb29504a73?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2850&q=80',
        },
      ],
      contact: ['+996212345678'],
    },
    {
      id: '',
      name: 'Restaurant-2',
      location: 'DEF',
      ImageUrl:
        'https://cdn.pixabay.com/photo/2017/04/04/03/20/food-2200139_1280.jpg',
      available: [],
      contact: ['+996212345678'],
    },
    {
      id: '',
      name: 'Restaurant-3',
      location: 'GHI',
      ImageUrl:
        'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
      available: [
        {
          name: 'Fast Food',
          price: 20,
          ImageUrl:
            'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2850&q=80',
        },
        {
          name: 'Rice',
          price: 20,
          ImageUrl:
            'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        },
      ],
      contact: ['+996212345678'],
    },
    {
      id: '',
      name: 'Restaurant-4',
      location: 'MNO',
      ImageUrl:
        'https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg',
      available: [
        {
          name: 'Chicken Special',
          price: 12,
          ImageUrl:
            'https://images.unsplash.com/photo-1579065497397-2824d41272ce?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
        },
      ],
      contact: ['+996212345678'],
    },
    {
      id: '',
      name: 'Restaurant-5',
      location: 'XYZ',
      ImageUrl:
        'https://cdn.pixabay.com/photo/2019/03/04/12/59/pad-thai-4034040_1280.jpg',
      available: [
        {
          name: 'Chinese',
          price: 10,
          ImageUrl:
            'https://images.unsplash.com/photo-1529690678884-189e81f34ef6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
        },
        {
          name: 'Poke Bowl',
          price: 7,
          ImageUrl:
            'https://images.unsplash.com/photo-1556040220-704dadc2b747?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        },
      ],
      contact: ['+996212345678'],
    },
  ];
  let a = await database().ref('/restaurant').set(restaurants);
  return a;
};

export const getData = async (collectionName, orderBy, equalTo) => {
  let data = await database()
    .ref(collectionName)
    .orderByChild(orderBy)
    .equalTo(equalTo)
    .once('value');

    console.log("GET DATA : ");
    console.log(data);
  return data;
};
