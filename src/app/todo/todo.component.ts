import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  myForm: any;
  userData: any;
  task: any = '';
  // categories:any=[0];

  constructor(private fb:FormBuilder ,  private ser1:DatashareService) { }

  ngOnInit(): void {
    //create form using form builder also applied validator
    this.myForm = this.fb.group({
      task: ['', [Validators.required]]
    })
    this.getAllTask();//refresh task list on page load

    // this.category = this.categories[0]
  }

  /**
   * Used to fetch all tasks.
   */
  getAllTask() {
    this.userData = this.ser1.getAllTask();
  }

  /**
   * Used to add new task.
   */
  onAddTask() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      return;
    } else {
      let requestObject = {
        task: this.myForm.value.task,
        status: false
      }
      this.ser1.addTask(requestObject);
      this.getAllTask();//refresh task list
      this.resetForm();//reset form on submit
      alert("Task Added.");
    }
  }

  /**
   * Used to update status of task as done.
   */
  onDone(data: any) {
    this.ser1.markTaskAsDone(data);
    this.getAllTask();//refresh task list
    alert("Marked as Done.");
  }

  /**
   * Used to remove task.
   */
  onRemove(data: any) {
    this.ser1.removeTask(data);
    this.getAllTask();//refresh task list
    alert("Removed Successfully.");
  }

  /**
   * Used to reset form on submit.
   */
  resetForm() {
    this.myForm.reset();
  }
  get t() {
    return this.myForm.controls;
  }

//   this.categories = [
//     {
//         help :1,
//         name :"wee"
//     },
//     {
//         help :2,
//         name :"bee"
//     }
// ]
// }



