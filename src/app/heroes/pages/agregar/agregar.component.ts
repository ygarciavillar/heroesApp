import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
     img{
      max-width: 100%;
      border-radius: 5px;
      height: 400px;
     }
  `
  ]
})
export class AgregarComponent implements OnInit {

  title= "Agregar Héroe"
  publishers  = Publisher
  heroe: Heroe 
    
  constructor(private route: ActivatedRoute,private router: Router,  private heroesServices: HeroesService) {
    this.heroe = {
      superhero: '',
      publisher: Publisher.DCComics,
      alter_ego: '',
      first_appearance: '',
      characters: '',
      alt_img: ''
    }
  }

  ngOnInit(): void {
    
    if(this.router.url.includes('editar')){
      this.title = "Editar Héroe"
      this.route.paramMap
      .pipe(
        switchMap( (param: ParamMap) => this.heroesServices.getHeroeById(param.get("id")!))
      )
      .subscribe(heroe => this.heroe = heroe)
    }
  }

  guardar(){
   if(this.heroe.superhero.trim().length === 0){
     return;
   }
   if( this.heroe.id ){
      this.updateHeroe()
   }
   else{
     this.agregarHeroe()
   }
}

  updateHeroe(){
    this.heroesServices.actualizarHeroe(this.heroe)
      .subscribe(resp => {
        console.log("respuesta", resp)
      })
}
  agregarHeroe() {
    this.heroesServices.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(["/heroes/editar", heroe.id])
    })
   
}

  
}
