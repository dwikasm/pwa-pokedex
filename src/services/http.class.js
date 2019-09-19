import axios from 'axios';

export default class Http {
  constructor(config = {}) {
    this.instance = axios.create({
      timeout: 20000,
      ...config,
    });
    return this.instance;
  }

  get(url, config = {}) {
    return this.instance.get(url, config);
  }

  post(url, body, config = {}) {
    return this.instance.post(url, body, config);
  }
}
