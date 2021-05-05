import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent} from '@angular/material/autocomplete'
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = ''
  heroes: Heroe[] = []
  heroeSelected: Heroe | undefined

  constructor(private heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
    .subscribe(heroes => this.heroes = heroes)

  }

  heroeSeleccionado(event: MatAutocompleteSelectedEvent){
    if (!event.option.value) {
      this.heroeSelected = undefined
      return;
    }
    this.heroeSelected = event.option.value
    this.termino = this.heroeSelected!.superhero
    this.router.navigate(["/heroes", this.heroeSelected?.id])
    
  }

}
