import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TaskService, Task } from 'src/app/services/task.service';
declare var window:any;

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  @Input() colorBack:string = '#62FFB4';
  @Input() listTask: any;
  @Output() clickButton = new EventEmitter<Task>();
  id:number = 0;
  formModal:any;
  isLoggedIn = false;
  user:any = null;
  public taskForm: Task = {
    id: 0,
    title: '',
    description: '',
    state: '',
    usuario_id: 1,
  }
  ideLocal:any = localStorage.getItem("user");
  constructor(public login: LoginService, public task: TaskService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
    console.log(this.user.id);
    console.log('here', this.ideLocal);
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModalCenter")
    );
  }
  public modificar(item:Task){
    this.clickButton.emit(item);
  }

  public doSomething(){
    this.formModal.hide();
  }

  deleteTask(id: any){
   console.log(id);
   this.task.deleteTask(id).subscribe(data=>{
    console.log(data);
   });
  }
  formSubmit(){
    console.log(this.taskForm);
  }
}
