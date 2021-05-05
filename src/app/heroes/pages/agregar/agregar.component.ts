import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarDialogComponent } from '../../components/confirmar-dialog/confirmar-dialog.component';


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

  publishers  = Publisher
  heroe: Heroe 


  constructor(
    private route: ActivatedRoute,
    private router: Router,  
    private heroesServices: HeroesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
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
      this.route.paramMap
      .pipe(
        switchMap( (param: ParamMap) => this.heroesServices.getHeroeById(param.get("id")!))
      )
      .subscribe(heroe => this.heroe = heroe)
    }
  }

  eliminar(){

    const dialogRef = this.dialog.open(ConfirmarDialogComponent, {
      width: '20rem',
      data: this.heroe.superhero
    });

    dialogRef.afterClosed().subscribe(result => {
       if(result && this.heroe.id){
         this.heroesServices.borrarHeroe(this.heroe.id)
           .subscribe( resp => this.router.navigate(["/heroes"]))
       }
    });
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
      .subscribe(resp => this.mostrarSnack('Registro actualizado'))
}
  agregarHeroe() {
    this.heroesServices.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(["/heroes/editar", heroe.id])
        this.mostrarSnack('Registro creado')
    })
   
}

mostrarSnack(msj: string): void{
  this.snackBar.open(msj, 'ok!', {
    duration: 2500
  })
}  
}
