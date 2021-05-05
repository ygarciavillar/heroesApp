import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-confirmar-dialog',
  templateUrl: './confirmar-dialog.component.html',
  styles: [
  ]
})
export class ConfirmarDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmarDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string)  { }

  ngOnInit(): void {
  }

  aceptar(){
    this.dialogRef.close(true)
  }

  cerrar(){
    this.dialogRef.close()
  }

}
