import axios from "axios";


export default class Pda4Repository {
  static async getAllCategories() {
    return cache('getAllCategories', async () => {
      let answer = await axios.get('/site/forum/index.php?showforum=213')
      let el = (new DOMParser()).parseFromString(answer.data, 'text/html').querySelector('#fo_213').querySelectorAll('tr td:nth-child(2) b a')
      let data = [...el].map((x) => {

        return {
          url: x.getAttribute('href').split('=')[1],
          title: x.innerHTML,
          count: parseInt(x.parentElement.parentElement.parentElement.children[2].innerHTML)
        }}
        );
      data.shift()
      return data;
    })
  }
  static async getCategory(id, page = 1) {
    return cache('getCategory_' + id + '_' + page, async () => {
      let answer = await axios.get(`/site/forum/index.php?showforum=${id}&sort_key=last_post&sort_by=Z-A&prune_day=100&topicfilter=all&st=${(page-1)*30}`)
      let dom = (new DOMParser()).parseFromString(answer.data, 'text/html');
      // let count = dom.querySelector('#page-jump-1')
      // count.querySelector('img').remove()
      // count = count.innerHTML.split(' ')[0]
      let postsEls = [...dom.querySelectorAll('td[id|=tid-folder]')].map(x => x.parentElement)
      let posts = postsEls.map(x => {
        let el = x.querySelector('[id|=tid-span] a')
        return {
          images: null,

          subTitle: x.querySelector('.desc span').innerHTML,
          title: el.innerHTML,
          url: el.getAttribute('href').split('=')[1]
        }
      });
      return {
        // pagesCount: count,
        posts
      };
    })
  }
  static async getGame(id) {
    return cache('getGame_' + id, async () => {
      try {
        let answer = await axios.get('/site/forum/index.php?showtopic=' + id)
        var dom = (new DOMParser()).parseFromString(answer.data, 'text/html');
      } catch (e) {
        return {
          images:[]
        }

      }
      // let count = dom.querySelector('#page-jump-1')
      // count.querySelector('img').remove()
      // count = count.innerHTML.split(' ')[0]
      return {
        images: [...dom.querySelectorAll('img[loading="lazy"]'), ...dom.querySelectorAll('.attach-img')].map(x => x.getAttribute('src'))
      }
    })
  }
}











function getCache(key) {
  if (typeof localStorage !== "undefined") {
    let item = localStorage.getItem('cached_' + key);
    if (item) {
      item = JSON.parse(item)
      if (item.time + 3 * 60 * 60 * 1000 > (new Date()).getTime()) {
        return item.data;
      }
    }
  }
  return null;
}
function setCache(key, data) {
  if (typeof localStorage !== "undefined") {
    let item = {
      time: (new Date()).getTime(),
      data: data
    };
    localStorage.setItem('cached_' + key, JSON.stringify(item))
  }
  return data;
}

async function cache(key, func) {
  if (getCache(key)) {
    return getCache(key);
  }
  return setCache(key, await func());
}
