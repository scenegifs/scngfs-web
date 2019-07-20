import SETTINGS from './Settings'
export function GifID (catalog, index, start, end) {
  function _pad (n) {
    var str = '' + n
    var pad = '0000'
    return pad.substring(0, pad.length - str.length) + str
  }
  return catalog + index + _pad(start) + _pad(end)
}

export function sceneID (scene) {
  var start = typeof scene.nstart === 'undefined' ? scene.n : scene.nstart
  var end = typeof scene.nend === 'undefined' ? scene.n : scene.nend
  return GifID(scene.catalog, scene.index, start, end)
}

export class Fetcher {
  constructor () {
    this._ctrl = new AbortController()
  }

  fetchJSON (url) {
    if (this._ctrl !== undefined) this._ctrl.abort()
    this._ctrl = new AbortController()
    return fetch(url, {headers: {'Authorization': SETTINGS.auth_token}, signal: this._ctrl.signal}).then(res => { return res.json() })
  }
}
