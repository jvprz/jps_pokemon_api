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
  readonly HP_min: number = 110;
  readonly HP_max: number = 204;
  readonly ST_min: number = 78;
  readonly ST_max: number = 108;
  /* Variables */
  pokemon!: Pokemon;
  pokedex!: number;
  total_stat: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/1';
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
    /* Calculate rest of min stats */
    this.getMinOtherStat(pokemon);
    /* Calculate rest of max stats */
    this.getMaxOtherStat(pokemon);
    /* Calculate percerntages */
    this.getPercentageStat(pokemon);

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

  /* Calculate all min stats */
  getMinOtherStat(pokemon: Pokemon) {
    /* Other Stats = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature */
    for (let i = 1; i < 6; i++) {
      pokemon.stats[i].stat.min_stat = Math.floor((1 * (0.01 * (2 * pokemon.stats[i].base_stat + 0 + 1 * (0.25 * 0)) * 100) + 5) * 0.9);
    }
    return pokemon;
  }

  /* Calculate all max stats */
  getMaxOtherStat(pokemon: Pokemon) {
    /* Other Stats = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature */
    for (let i = 1; i < 6; i++) {
      pokemon.stats[i].stat.max_stat = Math.floor((1 * (0.01 * (2 * pokemon.stats[i].base_stat + 31 + 1 * (0.25 * 252)) * 100) + 5) * 1.1);;
    }
    return pokemon;
  }

  /* Calculate the stat percentage bar */
  getPercentageStat(pokemon: Pokemon) {
    /* Valor actual = (52 + 252 / 4 + 31) * 100 / 100 = 212 */
    for (let i = 0; i < 6; i++) {
      pokemon.stats[i].stat.percentage = Math.floor((pokemon.stats[i].base_stat + 252 / 4 + 31) * 100 / 100);
      pokemon.stats[i].stat.percentage = Math.floor((pokemon.stats[i].stat.percentage / pokemon.stats[0].stat.max_stat) * 100);
    }
    return pokemon;
  }


}
