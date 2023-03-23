import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxCarouselModule } from "ngx-carousel";
import "hammerjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BannerComponent } from "./components/banner/banner.component";
import { TeamComponent } from "./components/team/team.component";
import { HomeComponent } from "./components/home/home.component";
import { SignupComponent } from "./components/signup/signup.component";
import { TitlesComponent } from "./components/titles/titles.component";
import { LoginComponent } from "./components/login/login.component";
import { AllNursesComponent } from "./components/all-nurses/all-nurses.component";
import { NurseProfileComponent } from "./components/nurse-profile/nurse-profile.component";
import { ClientPostComponent } from "./components/client-post/client-post.component";
import { ShowClientPostsComponent } from "./components/show-client-posts/show-client-posts.component";
import { PostInfoComponent } from "./components/post-info/post-info.component";
import { DashboardClientComponent } from "./components/dashboard-client/dashboard-client.component";
import { EditProfilComponent } from "./components/edit-profil/edit-profil.component";
import { DashboardNurseComponent } from "./components/dashboard-nurse/dashboard-nurse.component";
import { SearchNurseComponent } from "./components/search-nurse/search-nurse.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { PostsTableComponent } from "./components/posts-table/posts-table.component";
import { CarousselComponent } from "./components/caroussel/caroussel.component";
import { RequestsTableComponent } from "./components/requests-table/requests-table.component";
import { SafePipe } from "./pipes/safe.pipe";
import { ChartComponent } from "./components/chart/chart.component";
import { JwPaginationModule } from "jw-angular-pagination";
import { CommonModule } from "@angular/common";
import { MyFilterPipe } from './pipes/my-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    TeamComponent,
    HomeComponent,
    SignupComponent,
    TitlesComponent,
    LoginComponent,
    AllNursesComponent,
    NurseProfileComponent,
    ClientPostComponent,
    ShowClientPostsComponent,
    PostInfoComponent,
    DashboardClientComponent,
    EditProfilComponent,
    DashboardNurseComponent,
    SearchNurseComponent,
    AdminDashboardComponent,
    UsersTableComponent,
    PostsTableComponent,
    CarousselComponent,
    RequestsTableComponent,
    SafePipe,
    ChartComponent,
    MyFilterPipe,
  ],
  imports: [
    CommonModule,
    NgxCarouselModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
