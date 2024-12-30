import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
class AuthorizationService {
  constructor(private http: HttpClient) {}

  public authorization(username:string, password:string) {
    return this.http.post("auth/login", {
      username,
      password,
    }, {withCredentials:true}).subscribe()
  }
}

export default AuthorizationService;
