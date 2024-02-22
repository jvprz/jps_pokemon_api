import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApi } from './pokeapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jps_pokemon_api';
  pokemon!: PokeApi;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/7';
    this.http.get<PokeApi>(url).subscribe((data: PokeApi) => {
      this.pokemon = data;
    });
  }

}
