import { Component, computed, effect, inject, Injector, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {Task} from './../../models/task.model'; //importamos la interfas

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([ ]);
    
    /*Creamos lista de estrings ,Task le pasamos los datos de la interfas lo comentado se quita para realizar cambios para que funcione la persistencia
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,
    },

    {
      id: Date.now(),
      title: 'Crear componente',
      completed: false,
    }
  ]*/
   

  //calcular los nuevos estados //
  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
   const filter = this.filter();
   const tasks = this.tasks();
   if (filter === 'pending') {
    return tasks.filter(task => !task.completed);
   }
   if (filter === 'completed'){
    return tasks.filter(task => task.completed);
   }
   return tasks;
  })

  //para que no acepte valores que no corresponden en el imput de agrega las tareas
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  injector = inject(Injector);

  constructor(){
    
  }
  //antes de inicializar la aplicacion para ver q hay en localStorage al incializarse se ejecuta el metodo tackTasks que gaurdara en localstorage 
  ngOnInit(){
    const Storage = localStorage.getItem('tasks');
    if (Storage){
      const tasks = JSON.parse(Storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks(){
    effect( ()=> {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log(tasks);
    }, { injector: this.injector});
  }

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim(); //trim quita los espacios vacios al inicio y al final del string
      if(value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string){
    const newTasks ={
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTasks]);
  }
  

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((tasks, position) => position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if(position === index){
          return{
            ...tasks,
            completed: !tasks.completed,
          }
        }
        return tasks;
      })
    })
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
           ...task,
           editing: true
        }
      }
      return {
        ...task,
        editing: false
      }
    })
  });
 }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }

}

