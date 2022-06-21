import { api } from './index';

export function getUserInfoHandler() {
  return api.getUser();
}
