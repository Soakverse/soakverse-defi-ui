import { defineStore } from 'pinia';
import type { AuthType } from '@/types/auth/AuthType';

export const useAuthStore = defineStore('auth', {
  state: (): AuthType => {
    return {
      deviceId: '',
      maxAge: 60, // value should be in seconds. 1 min = 60
      tokenExpiresAt: 0,
      isloggedIn: false,
      isRememberMe: false,
    };
  },
  persist: true,
  actions: {
    async login() {
      this.isloggedIn = true;
      this.tokenExpiresAt = 9999999999999999999;
    },
    async logout() {
      this.isloggedIn = false;
      this.tokenExpiresAt = 0;
    },
  },
});
