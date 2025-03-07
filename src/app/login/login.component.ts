import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { ApiService } from '../shared/service/api.service';
import { error } from 'console';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule, 
    ReactiveFormsModule,
    ToastModule,
  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService]
})
export class LoginComponent {

  formulario: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private messageService: MessageService, private router: Router){
    this.formulario = this.fb.group(
      {
        email: [undefined, [Validators.email, Validators.required]],
        password: [undefined, [Validators.required]]
      }
    )
  }

  onSubmit(){
    if(this.formulario.invalid){
      alert("su formulario tiene errores")
      return
    }
    this.api.postItem("user", this.formulario.value, "login").subscribe((response) =>
    {
      console.log(response)
      localStorage.setItem("token", response.access_token)
      this.show("Logeo con exito")
      this.router.navigateByUrl("/heroes");
    },error => console.log(error))  


  }



  show(text:string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: text, life: 3000 });
}

}
