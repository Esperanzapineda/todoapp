import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; //para formularos reactivos

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})

//Propiedades o atributos de la clase
export class LabsComponent {
  welcome = 'Hola!';
  tasks = signal([ //Creamos lista de estrings
    'Instalar angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]);
  
//signal para que ya no solo sea un string si no una señal que tenga reactividad 
  name = signal('Esperanza');
  age = 18;
  disabled= true;
  img= 'https://w3schools.com/howto/img_avatar.png'

  person = signal({
    name:'Esperanza',
    age: 20,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });

  nameCtrl = new FormControl('Esperanza', {
    nonNullable: true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  //metodo de la clase
  clickHandler(){
    alert('Hola')
  }
  //metodo para que cambie de forma reactiva el valor 
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return{
        ...prevState,
        age: parseInt(newValue, 10)
      }
    });
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return{
        ...prevState,
        name: newValue
      }
    });
  }
}
