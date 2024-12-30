import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import config from "./config";

class BaseHTTPHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url:`${config.baseUrl}${req.url}`
    })

    return next.handle(newReq);
  }
}

export default BaseHTTPHttpInterceptor;
