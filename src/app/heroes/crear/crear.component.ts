import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../shared/service/api-service.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-crear',
  imports: [
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {

  id: number | undefined;
  Formulario: FormGroup;

  generos= [
    {label: 'Masculino', value: 'M'},
    {label: 'Femenino', value: 'F'},
    {label: 'Otro', value: 'O'}
  ];

  categorias= [
    {label: 'Tecnologia', value: 'tecnologia'},
    {label: 'Ciencias', value: 'ciencias'},
    {label: 'Arte', value: 'arte'}
  ];


  constructor(public fb: FormBuilder, private route: ActivatedRoute, private api:ApiServiceService ) { 
    
    this.Formulario = this.fb.group({
      //Esta dentro de un arreglo por si queremos añadir mas validadores como el ejemplo
      nombre: ['',Validators.required, Validators.minLength(3)],
      genero: ['',Validators.required],
      descripcion: ['', Validators.required, Validators.minLength(5)],
      url: ['', Validators.required, Validators.minLength(15)],
      categoria: ['', Validators.required]
    });

    //Revisa si existe el parametro id
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.Formulario.valid) {
      console.log ("Personaje guardado", this.Formulario.value);
    }
    this.api.postItem('productos',this.Formulario.value).subscribe(
      {
        
        next: x=> console.log(x),
        error: error=> console.log(error),
        complete: () => console.log("Terminamos consulta")
        
      }

    );
  }

  obtenerProducto(){
    
  }
}

