import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './class/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pokemon!: Pokemon;
  pokedex!: number;

  constructor(private http: HttpClient) {
    this.pokedex = this.getRandomNumber(1, 1025);
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + this.pokedex;
    this.http.get<Pokemon>(url).subscribe((data: Pokemon) => {
      this.pokemon = data;
      // Capitalize Pokemon name
      this.pokemon.name = this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
      for (let i = 0; i < 6; i++) {
        this.pokemon.stats[i].stat.name = this.pokemon.stats[i].stat.name.charAt(0).toUpperCase() + this.pokemon.stats[i].stat.name.slice(1);
      }  
    });
  }

  getRandomNumber(min: number, max: number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
