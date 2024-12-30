import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import AuthorizationService from "./features/(public)/authorization/authorization.service";
import {catchError, map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import config from "./core/http/config";

const appGuard:CanActivateFn = (next, state)=>{
  const router = inject(Router);
  const http = inject(HttpClient);
  return http.post(`${config.baseUrl}auth/check-token`,{}, {withCredentials:true}).pipe(map(()=>true), catchError(()=>{
    return router.navigate(["/login"])
  }))
}

export default appGuard;
