import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { ApiService } from '../../shared/service/api.service';
@Component({
  selector: 'app-crear',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {

  form: FormGroup;
  id: number | undefined;

  generos = [
    { label : "Masculino", value: "M"},
    { label : "Femenino", value: "F"},
    { label : "Otro", value: "O"}
  ]
  categorias = [
    { label : "Tecnologia", value: "tecnologia"},
    { label : "Ciencia", value: "ciencia"},
    { label : "Arte", value: "arte"}
  ]

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service:ApiService ) {

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      genero: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      url: ['', [Validators.required, Validators.minLength(15)]],
      categoria: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.id = params["id"]
    })


  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Personaje guardado', this.form.value);
      // this.service.postItem()
      this.service.postItem("productos", this.form.value, "insert").subscribe((data) =>{
        console.log(data)
      });
    }
  }

  



}
