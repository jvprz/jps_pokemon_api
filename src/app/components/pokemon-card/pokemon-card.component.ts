import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './../../classes/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  /* Const */
  readonly HP_min: number = 110;
  readonly HP_max: number = 204;
  readonly FLOOR: number = 1;
  readonly MIN_IV: number = 0;
  readonly MAX_IV: number = 31;
  readonly MIN_EV: number = 0;
  readonly MAX_EV: number = 252;
  readonly LEVEL: number = 100;
  readonly MIN_NATURE: number = 0.9;
  readonly MAX_NATURE: number = 1.1;

  /* Variables */
  pokemon!: Pokemon;
  pokedex!: number;
  total_stat: number = 0;
  number: number = 151;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + this.number;
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
      pokemon.stats[i].stat.min_stat = Math.floor((this.FLOOR * (0.01 * (2 * pokemon.stats[i].base_stat + this.MIN_IV + this.FLOOR * (0.25 * this.MIN_EV)) * this.LEVEL) + 5) * this.MIN_NATURE);
    }
    return pokemon;
  }

  /* Calculate all max stats */
  getMaxOtherStat(pokemon: Pokemon) {
    /* Other Stats = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature */
    for (let i = 1; i < 6; i++) {
      pokemon.stats[i].stat.max_stat = Math.floor((this.FLOOR * (0.01 * (2 * pokemon.stats[i].base_stat + this.MAX_IV + this.FLOOR * (0.25 * this.MAX_EV)) * this.LEVEL) + 5) * this.MAX_NATURE);
    }
    return pokemon;
  }

  /* Calculate the stat percentage bar */
  getPercentageStat(pokemon: Pokemon) {
    /* Valor actual = (52 + 252 / 4 + 31) * 100 / 100 = 212 */
    for (let i = 0; i < 6; i++) {
      pokemon.stats[i].stat.percentage = Math.floor((pokemon.stats[i].base_stat / 200) * 100);
    }
    return pokemon;
  }

  /* Change color of Pokémon bar */
  getProgressBarClass(percentage: number) {
    /* Very low (Less than 40) */
    if (percentage < 15) {
      return "bg-danger";
    }
    /* Low (40 to 65) */
    if (percentage >= 15 && percentage < 25) {
      return "bg-orange";
    }
    /* Average (65 to 80) */
    if (percentage >= 25 && percentage < 50) {
      return "bg-warning"
    }
    /* Decent (80 to 90) */
    if (percentage >= 50 && percentage < 60) {
      return "bg-lime"
    }
    /* Good (90 to 110) */
    if (percentage >= 60 && percentage < 70) {
      return "bg-light-green"
    }
    /* Great (110 to 130) */
    if (percentage >= 70 && percentage < 90) {
      return "bg-success"
    }
    /* Exellent (130 or higher) */
    else {
      return "bg-primary"
    }
  }
}
