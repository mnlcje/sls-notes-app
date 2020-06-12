import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./services/auth-guard/auth-guard.service";
import { NgModule } from "@angular/core";

const appRoutes : Routes = [
{ path: '', component: HomeComponent , canActivate:[AuthGuard] },
{ path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}