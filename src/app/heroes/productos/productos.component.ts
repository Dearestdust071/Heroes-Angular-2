import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Product } from '../../shared/model/product';
// import { ProductosServiceTsService } from '../../shared/service/productos-service.ts.service';
import { ApiServiceService } from '../../shared/service/api-service.service';
import { JsonPipe } from '@angular/common';

// Referencia para usar httpClient en standalone Components que aparentemente esta mal https://stackoverflow.com/questions/78430636/httpclientmodule-is-deprecated-in-angular-18-whats-the-replacement
// https://www.youtube.com/watch?v=3vQpYKlHmS0

//

@Component({
  selector: 'app-productos',
  providers: [
  ],
  imports: [
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    ProgressBarModule,
    // JsonPipe
  ],

  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosComponent {
  data: any;
  loading: boolean = false;

  ejemploFiltro = {
    "parameters": {
      "first": 0,
      "rows": 10,
      "sortField": "nombre",
      "sortOrder": 1,
      "filters": {},
      "globalFilter": ""
    }
  }

  constructor(private service: ApiServiceService) {
    this.getProductosFiltrado(this.ejemploFiltro);

  }


  getProductosFiltrado(params: any) {
    this.loading = true;
    this.service.postItem("productos", this.ejemploFiltro, "filtered").subscribe((data => {
      this.data = data;
      this.loading = false;
      console.log(`Se trajo la informacion de laravel ${this.data}`)
    }))
  }




}

