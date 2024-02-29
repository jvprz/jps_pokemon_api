import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/classes/pokemon'; // Ensure Pokemon class is imported

@Component({
  selector: 'app-dex',
  templateUrl: './dex.component.html',
  styleUrls: ['./dex.component.css']
})
export class DexComponent implements OnInit {

  isLoading = false;
  error: string | null = null;
  pokedex: Pokemon[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  async getAllPokemon(): Promise<void> {
    try {
      const response = await this.http.get<any>(
        'https://pokeapi.co/api/v2/pokemon?limit=10'
      ).toPromise();

      // Check if the response has the expected 'results' property
      if (response.results) {
        this.pokedex = response.results;
      } else if (response.pokemon) { // Alternative property name
        this.pokedex = response.pokemon;
      } else {
        throw new Error('Unexpected API response format.');
      }
    } catch (error) {
      this.error = 'Failed to fetch Pokemon data.';
      console.error('Error fetching Pokemon:', error);
    } finally {
      this.isLoading = false; // Ensure loading state updates even on errors
    }
  }
}
