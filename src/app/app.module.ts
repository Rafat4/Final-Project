import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule,
        MatCardModule ,
        MatButtonModule ,
        MatToolbarModule,
        MatExpansionModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { MiddleComponent } from './middle/middle.component';
import { PopularComponent } from './popular/popular.component';
import { PopularpostsComponent } from './popularposts/popularposts.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { WebShortcutComponent } from './web-shortcut/web-shortcut.component';
import { PostlistComponent } from './post/postlist/postlist.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MiddleComponent,
    PopularComponent,
    PopularpostsComponent,
    HomeComponent,
    HeaderComponent,
    PostComponent,
    WebShortcutComponent,
    PostlistComponent,
    MainComponent,
    ProfileComponent,
    ChatComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
