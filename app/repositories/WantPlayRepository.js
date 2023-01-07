export default class WantPlayRepository {
  static getAll() {
    if (typeof localStorage === "undefined") {
      return [];
    }
    let games = localStorage.getItem('wantPlay')
    if (!games) {
      return [];
    }
    return JSON.parse(games)
  }
  static add(game) {
    if (typeof localStorage === "undefined") {
      return;
    }
    let games = localStorage.getItem('wantPlay')
    if (!games) {
      games = '[]';
    }
    games = JSON.parse(games)
    if (games.find(x => x.url === game.url)) {
      return;
    }
    games.push(game)
    localStorage.setItem('wantPlay',  JSON.stringify(games))
  }
  static remove(game) {
    if (typeof localStorage === "undefined") {
      return;
    }
    let games = localStorage.getItem('wantPlay')
    if (!games) {
      games = '[]';
    }
    games = JSON.parse(games)
    if (!games.find(x => x.url === game.url)) {
      return;
    }
    let index = games.indexOf(games.find(x => x.url === game.url))
    games.splice(index, 1)
    localStorage.setItem('wantPlay', JSON.stringify(games))
  }
}
