import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { TeamComponent } from './components/team/team.component';
import { DexComponent } from './components/dex/dex.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TeamFormatComponent } from './components/team-format/team-format.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    TeamComponent,
    DexComponent,
    NavbarComponent,
    TeamFormatComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
