import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Badge } from '@app/shared/components/badge/badge';
import { Button } from '@app/shared/components/button/button';
import { EmptyData } from '@app/shared/components/empty-data/empty-data';
import { Task } from '@app/shared/models/task';
import { TaskService } from '@app/shared/services/task';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tasks',
  imports: [
    Button,
    ToastModule,
    TableModule,
    DatePipe,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    Badge,
    ConfirmPopupModule,
    EmptyData,
  ],
  templateUrl: './tasks.html',
  providers: [MessageService, ConfirmationService],
  styleUrl: './tasks.scss',
})
export class Tasks {
  tasks: Task[] = [];
  taskDialog = false;
  taskDialogTitle = 'New Task';
  taskForm!: FormGroup;
  editingTaskId: number | null = null;

  categories = [
    { label: 'Dev', value: 'Dev' },
    { label: 'Test', value: 'Test' },
    { label: 'UI', value: 'UI' },
    { label: 'Db', value: 'Db' },
  ];

  statuses = [
    { label: 'New', value: 'New' },
    { label: 'Active', value: 'Active' },
    { label: 'Closed', value: 'Closed' },
  ];

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignedTo: ['', Validators.required],
      dueDate: [null, Validators.required],
      estimatedHours: [1, [Validators.required, Validators.min(1)]],
      category: ['Dev', Validators.required],
      status: ['New', Validators.required],
    });

    this.taskService.tasks$.subscribe((tasks) => (this.tasks = tasks));

    this.loadTasksFromLocalStorage();
  }

  openNew() {
    this.taskDialogTitle = 'New Task';
    this.taskDialog = true;
    this.taskForm.reset({ category: 'Dev', status: 'New' });
    this.editingTaskId = null;
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;
    const task: Task = {
      ...formValue,
      id: this.editingTaskId ?? uuidv4(),
    };

    if (this.editingTaskId) {
      this.taskService.updateTask(task);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Task updated' });
    } else {
      this.taskService.addTask(task);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Task added' });
    }

    this.taskDialog = false;

    // Save tasks to localStorage
    this.saveTasksToLocalStorage();
  }

  editTask(task: Task) {
    this.taskDialogTitle = 'Edit Task';
    this.taskDialog = true;
    this.editingTaskId = task.id;

    this.taskForm.patchValue(task);
  }

  deleteTaskHandler(id: number) {
    this.taskService.deleteTask(id);
    this.messageService.add({ severity: 'warn', summary: 'Deleted', detail: 'Task deleted' });
  }

  deleteTask(event: Event, taskId: number) {
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: 'Are you sure you want to delete this task?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.deleteTaskHandler(taskId);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Task Deletion Cancelled',
          detail: 'You have cancelled the deletion.',
        });
      },
    });
  }

  // Load tasks from localStorage on app initialization or page refresh
  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  // Save tasks to localStorage
  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Status Class
  getStatusClass(status: string): string {
    switch (status) {
      case 'New':
        return 'orange'; // Apply this class for New status
      case 'Active':
        return 'green'; // Apply this class for Active status
      case 'Closed':
        return 'dark'; // Apply this class for Closed status
      default:
        return 'dark'; // Default case, if status doesn't match
    }
  }
}
