import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsModule } from "./projects/projects.module";
import { TopicsModule } from './topics/topics.module';
import { JwtInterceptor } from "./_utils/jwt.interceptor";
import { ErrorInterceptor } from "./_utils/error.interceptor";
import { LoginModule } from "./login/login.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersModule } from "./users/users.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    LoginModule,
    ProjectsModule,
    TopicsModule,
    UsersModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
