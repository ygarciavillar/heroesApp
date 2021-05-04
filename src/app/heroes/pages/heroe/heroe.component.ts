import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators'
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {
  
  heroe!: Heroe

  constructor(private activatedRoute: ActivatedRoute, private heroeService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap
      .pipe(
        switchMap( (param) => this.heroeService.getHeroeById(param.get("id")!) )
  
      )
      .subscribe( (heroe) => this.heroe = heroe)
      

  }

  onBack(){
    this.router.navigate(["/heroes/listado"])
  }

}
