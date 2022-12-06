import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TaskService } from 'src/app/services/task.service';

declare var window:any;
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  isLoggedIn = false;
  user:any = null;
  todo: any;
  done: any = null;
  doing: any = null;
  formModal:any;
  isModificar : boolean= false;
  idItemTask:any;
  public taskForm = {
    title:'',
    description: '',
    state:'',
    usuario_id: null
  }

  constructor(public login:LoginService, public task: TaskService) { }

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

    this.task.getTask(this.user.id).subscribe(data=>{
      this.todo = data.filter(data=>data.state=='Todo');
      this.done = data.filter(data=>data.state=='Done');
      this.doing = data.filter(data=>data.state=='doing');
    });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModalCenter")
    );
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

  public openModal(){
    this.formModal.show();
  }

  public doSomething(){
    this.formModal.hide();
  }
  formSubmit(){
    console.log(this.isModificar);

    if(!this.isModificar){
      console.log(this.taskForm);
      this.task.guardarTask(
        {
          title: this.taskForm.title,
          description: this.taskForm.description,
          state: this.taskForm.state,
          usuario_id: this.user.id
        }).subscribe(data =>{
          console.log(data);
        })
    }else{
      console.log('gere');
      console.log(this.user.id);

      this.task.actualizarTask({
        title: this.taskForm.title,
        description: this.taskForm.description,
        state: this.taskForm.state,
        usuario_id: this.user.id
      }, this.idItemTask ).subscribe(data=>{
        console.log(data);
      })
      this.isModificar = false;
      this.formModal.hide();
    }
  }
  public clickButton($event:any){
    this.formModal.show();
    this.isModificar = true;
    this.taskForm.title = $event.title;
    this.taskForm.description = $event.description;
    this.taskForm.state = $event.state;
    this.idItemTask = $event.id;
    console.log($event);
  }
}
