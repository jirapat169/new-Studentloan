import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "../services/app.service";

@Injectable({
  providedIn: "root"
})
export class CommitteeGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.service.localStorage.get("userlogin")) {
      let userlogin: any = this.service.localStorage.get("userlogin");
      if (userlogin.role == "1500") {
        return true;
      }
    }
    this.router.navigate(["/notfound"]);
    return false;
  }

  constructor(private service: AppService, private router: Router) {}
}
