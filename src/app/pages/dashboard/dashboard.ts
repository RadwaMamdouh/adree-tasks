import { Component } from '@angular/core';
import { EmptyData } from '@app/shared/components/empty-data/empty-data';
import { Icon } from '@app/shared/components/icon/icon';
import { icons } from '@app/shared/components/icon/icon-data';
import { Task } from '@app/shared/models/task';
import { TaskService } from '@app/shared/services/task';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule, Icon, EmptyData],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  icons = icons;

  totalTasks: number = 0;
  tasksPerCategory: any = {};
  tasksPerStatus: any = {};
  taskStatusChartData: any = {};
  taskCategoryChartData: any = {};

  // Chart Options
  taskStatusChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
  };

  taskCategoryChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    borderWidth: 1,
    borderColor: '#1E88E5',
    barThickness: 50,
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTaskStatsFromLocalStorage();
  }

  // Load tasks statistics from TaskService
  loadTaskStats() {
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      if (tasks.length) {
        this.totalTasks = tasks.length;
        this.tasksPerCategory = this.getTasksPerCategory(tasks);
        this.tasksPerStatus = this.getTasksPerStatus(tasks);
        this.updateCharts();
      }
    });
  }

  loadTaskStatsFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks);
      this.totalTasks = tasks.length;
      this.tasksPerCategory = this.getTasksPerCategory(tasks);
      this.tasksPerStatus = this.getTasksPerStatus(tasks);
      this.updateCharts();
    }
  }

  // Group tasks by category
  getTasksPerCategory(tasks: Task[]) {
    return tasks.reduce((acc: any, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});
  }

  // Group tasks by status
  getTasksPerStatus(tasks: Task[]) {
    return tasks.reduce((acc: any, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
  }

  // Update charts data based on tasks statistics
  updateCharts() {
    // data for the status chart (Pie chart)
    const statusColors: { [key: string]: string } = {
      New: '#faaf5f',
      Active: '#10d069',
      Closed: '#4587a3',
    };

    // Dynamically create an array of background colors based on the statuses in tasks
    const statusBackgroundColors = Object.keys(this.tasksPerStatus).map(
      (status) => statusColors[status] || '#000000' // Default to black if no color found
    );

    this.taskStatusChartData = {
      labels: Object.keys(this.tasksPerStatus),
      datasets: [
        {
          data: Object.values(this.tasksPerStatus),
          backgroundColor: statusBackgroundColors,
        },
      ],
    };

    // data for the category chart (Bar chart)
    this.taskCategoryChartData = {
      labels: Object.keys(this.tasksPerCategory),
      datasets: [
        {
          label: 'Tasks per Category',
          data: Object.values(this.tasksPerCategory),
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
      ],
    };
  }

  getStatusLength() {
    return (
      this.taskStatusChartData &&
      this.taskStatusChartData.datasets &&
      this.taskStatusChartData.datasets[0].data.length > 0
    );
  }

  getCatLength() {
    return (
      this.taskCategoryChartData &&
      this.taskCategoryChartData.datasets &&
      this.taskCategoryChartData.datasets[0].data.length > 0
    );
  }
}
