function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export const Category = Object.freeze({
  TENTS: 'tents',
  BACKPACKS: 'backpacks',
  SLEEPING_BAGS: 'sleeping-bags',
  HAMMOCKS: 'hammocks'
});

export const categories = {
  tents: {
      iconUrl: '/images/categories/category-tents.svg',
      title: 'Tents',
      value: Category.TENTS
  },
  backpacks: {
      iconUrl: '/images/categories/category-backpacks.svg',
      title: 'Backpacks',
      value: Category.BACKPACKS
  },
  hammocks: {
      iconUrl: '/images/categories/category-hammocks.svg',
      title: 'Hammocks',
      value: Category.HAMMOCKS
  },
  sleepingBags: {
      iconUrl: '/images/categories/category-sleepingbags.svg',
      title: 'Sleeping Bags',
      value: Category.SLEEPING_BAGS
  },
}
export class ExternalServices {
  constructor(category) {
    this.category = category;
    this.baseUrl = import.meta.env.VITE_SERVER_URL;
  }

  getData() {
    return fetch(`${this.baseUrl}products/search/${this.category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(id) {
    const product = await fetch(`${this.baseUrl}product/${id}`)
    const data = await convertToJson(product);

    return data.Result;
  }

  async checkout(data = {}) {
    const response = await fetch([this.baseUrl, 'checkout'].join(''), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return await convertToJson(response);
  }
}


export default ExternalServices;