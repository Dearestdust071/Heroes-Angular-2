import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { ApiServiceService } from "../shared/service/api-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [DividerModule, ButtonModule, FormsModule, ReactiveFormsModule]
})

export class LoginComponent {
  Formulario: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiServiceService) {
    this.Formulario = this.fb.group({
      email: [undefined, [Validators.email, Validators.required]],
      password: [undefined, [Validators.required]]
    });
  }


  onSubmit() {
    if (this.Formulario.invalid) {
      alert("Formulario es invalido");
      return;
    }
    this.api.postItem('user', this.Formulario.value, 'login').subscribe((response) => {
      console.log(response);
      localStorage.setItem('token', response.access_token);

    }, error => console.log(error));
  }

}


//El profe dice que falta redireccionar pero a mi me falta todo creo
//Hace falta tambine el guard para que nos haga pertenencia en las rutas
//El resto del CRUD en cuestion del modulo
//Lo contendremos en un modelo para que sea un paquetamiento completo que nos podemos llevar creo
