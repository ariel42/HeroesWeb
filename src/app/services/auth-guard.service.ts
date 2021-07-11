import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppConfigService } from "./config.service";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
    constructor(private config: AppConfigService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const result = !!this.config.configuration!.loggedInUser
        return result;
    }
}
