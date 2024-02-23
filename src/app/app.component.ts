import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './classes/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pokemon!: Pokemon;
  pokedex!: number;
  total_stat: number = 0;
  max_stat: number = 0;

  constructor(private http: HttpClient) {
    this.pokedex = this.getRandomNumber(1, 1025);
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/63';
    this.http.get<Pokemon>(url).subscribe((data: Pokemon) => {
      this.pokemon = data;
      // Capitalize Pokemon name
      this.pokemon.name = this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
      for (let i = 0; i < 6; i++) {
        if (this.pokemon.stats[i].stat.name == 'hp') {
          this.pokemon.stats[i].stat.name = 'HP';
        };
        if (this.pokemon.stats[i].stat.name == 'attack') {
          this.pokemon.stats[i].stat.name = 'Atk';
        };
        if (this.pokemon.stats[i].stat.name == 'defense') {
          this.pokemon.stats[i].stat.name = 'Def';
        };
        if (this.pokemon.stats[i].stat.name == 'special-attack') {
          this.pokemon.stats[i].stat.name = 'Sp. Atk';
        };
        if (this.pokemon.stats[i].stat.name == 'special-defense') {
          this.pokemon.stats[i].stat.name = 'Sp. Def';
        };
        if (this.pokemon.stats[i].stat.name == 'speed') {
          this.pokemon.stats[i].stat.name = 'Spe';
        };
        this.total_stat = this.total_stat + this.pokemon.stats[i].base_stat;
        this.max_stat = Math.floor( 2 * this.pokemon.stats[0].base_stat + 204 );
      }
    });
  }

  getRandomNumber(min: number, max: number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
