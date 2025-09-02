import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Setup project',
      description: 'Initialize repo and install dependencies',
      assignedTo: 'John',
      dueDate: new Date(),
      estimatedHours: 4,
      category: 'Dev',
      status: 'New',
    },
  ];

  private taskSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.taskSubject.asObservable();

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  getTasks() {
    return this.taskSubject.getValue();
  }

  addTask(task: Task) {
    const update = [...this.getTasks(), { ...task, id: Date.now() }];
    this.taskSubject.next(update);
    this.saveTasksToLocalStorage();
  }

  updateTask(task: Task) {
    const update = this.getTasks().map((t) => (t.id === task.id ? task : t));
    this.taskSubject.next(update);
    this.saveTasksToLocalStorage();
  }

  deleteTask(id: number) {
    const update = this.getTasks().filter((t) => t.id !== id);
    this.taskSubject.next(update);
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    const tasks = this.getTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks);
      this.taskSubject.next(tasks);
    }
  }
}
