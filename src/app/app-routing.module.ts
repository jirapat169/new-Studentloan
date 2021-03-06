import { TestComponent } from "./test/test.component";
import { PropertyComponent } from "./components/index/property/property.component";
import { AuthoritiesGuard } from "./guards/authorities.guard";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { StudentGuard } from "./guards/student.guard";
import { TeacherGuard } from "./guards/teacher.guard";
import { CommitteeGuard } from "./guards/committee.guard";
import { AdminGuard } from "./guards/admin.guard";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ContactComponent } from "./components/contact/contact.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./components/index/index.component";
import { BackgroundComponent } from "./components/index/background/background.component";
import { StepComponent } from "./components/index/step/step.component";
import { HomeComponent } from "./components/index/home/home.component";
import { LoginComponent as LoginTest } from "./test/login/login.component";
import { ConfirmComponent } from "./test/confirm/confirm.component";

const routes: Routes = [
  {
    path: "home",
    component: IndexComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "background", component: BackgroundComponent },
      { path: "property", component: PropertyComponent },
      { path: "step", component: StepComponent }
    ]
  },
  { path: "statistics", component: StatisticsComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./components/admin/admin.module").then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: "committee",
    loadChildren: () =>
      import("./components/committee/committee.module").then(
        m => m.CommitteeModule
      ),
    canActivate: [CommitteeGuard]
  },
  {
    path: "teacher",
    loadChildren: () =>
      import("./components/teacher/teacher.module").then(m => m.TeacherModule),
    canActivate: [TeacherGuard]
  },
  {
    path: "student",
    loadChildren: () =>
      import("./components/student/student.module").then(m => m.StudentModule),
    canActivate: [StudentGuard]
  },
  {
    path: "authorities",
    loadChildren: () =>
      import("./components/authorities/authorities.module").then(
        m => m.AuthoritiesModule
      ),
    canActivate: [AuthoritiesGuard]
  },
  {
    path: "test",
    component: TestComponent,
    children: [
      { path: "login", component: LoginTest, data: { test: true } },
      { path: "confirm", component: ConfirmComponent, data: { test: true } },
      { path: "", redirectTo: "/test/login", pathMatch: "full" }
    ]
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "**",
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
