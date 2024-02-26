import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './classes/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* Const */
  HP_min: number = 110;
  HP_max: number = 204;
  /* Variables */
  pokemon!: Pokemon;
  pokedex!: number;
  total_stat: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/249';
    this.http.get<Pokemon>(url).subscribe((data: Pokemon) => {
      this.pokemon = this.setConfigStats(data);
    });
  }

  /* Base to configure all Pokémon stats */
  setConfigStats(pokemon: Pokemon) {
    /* Rename pokémon stats to default format in-game */
    pokemon = this.renameStats(pokemon);
    /* Calculate value of total stats */
    pokemon = this.getTotalStat(pokemon);
    /* Calculate min HP stat */
    pokemon.stats[0].stat.min_stat = this.getMinHPStat(pokemon.stats[0].base_stat);
    /* Calculate max HP stat */
    pokemon.stats[0].stat.max_stat = this.getMaxHPStat(pokemon.stats[0].base_stat);
    return pokemon;
  }

  /* Rename API stats for default stats */
  renameStats(pokemon: Pokemon) {
    for (let i = 0; i < 6; i++) {
      if (pokemon.stats[i].stat.name == 'hp') {
        pokemon.stats[i].stat.name = 'HP';
      };
      if (pokemon.stats[i].stat.name == 'attack') {
        pokemon.stats[i].stat.name = 'Atk';
      };
      if (pokemon.stats[i].stat.name == 'defense') {
        pokemon.stats[i].stat.name = 'Def';
      };
      if (pokemon.stats[i].stat.name == 'special-attack') {
        pokemon.stats[i].stat.name = 'Sp. Atk';
      };
      if (pokemon.stats[i].stat.name == 'special-defense') {
        pokemon.stats[i].stat.name = 'Sp. Def';
      };
      if (pokemon.stats[i].stat.name == 'speed') {
        pokemon.stats[i].stat.name = 'Spe';
      };
    }
    return pokemon;
  }

  /* Calculate total stats of any Pokémon */
  getTotalStat(pokemon: Pokemon) {
    for (let i = 0; i < 6; i++) {
      this.total_stat = this.total_stat + pokemon.stats[i].base_stat;
    }
    return pokemon;
  }

  /*Calculate min HP stat */
  getMinHPStat(hp: number) {
    return Math.floor(2 * hp + this.HP_min);
  }

  /* Calculate max HP stat */
  getMaxHPStat(hp: number) {
    return Math.floor(2 * hp + this.HP_max);
  }


}
