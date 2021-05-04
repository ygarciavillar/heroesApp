import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  heroe: string =  ''
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.route.params.subscribe( ({id}) => this.heroe = id)
  // this.route.paramMap.subscribe((param) => console.log(param.get('id')) )
  //  this.heroe = this.route.snapshot.params.id
  }

}
