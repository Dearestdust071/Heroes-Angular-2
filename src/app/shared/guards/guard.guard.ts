import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {

  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;
  if(isPlatformBrowser(platformId)){
    token = localStorage.getItem("token");
  }

  if(!token){
    const router = inject(Router); 
    router.navigateByUrl('/login')
  }
  return localStorage.getItem('token') ?  true : false;
};

