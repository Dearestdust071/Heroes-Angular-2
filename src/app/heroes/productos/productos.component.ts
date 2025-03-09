import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-productos',
  providers: [
    HttpClient,
  ],
  imports: [
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    ProgressBarModule
  ],

  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosComponent {

  data: any;
  loading:boolean = true;
  constructor(private Http:HttpClient){ 
  }


  ObtenerDatos(params: any){
    this.loading = true
    this.Http.post('http://127.0.0.1:8000/api/productos', params).subscribe((response) =>{
      this.data = response;
      this.loading = false;
    });


  }

  onSubmit(){
    
  }


}
