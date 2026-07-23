import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task, PaginatedResponse } from '../../models/task.model';
import { TaskDeleteDialogComponent } from '../task-delete-dialog/task-delete-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TaskDeleteDialogComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskService = inject(TaskService);
  
  tasks: Task[] = [];
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  
  searchTerm = '';
  searchSubject = new Subject<string>();
  statusFilter = '';
  
  isLoading = false;
  
  // Delete Dialog state
  deleteDialogVisible = false;
  taskToDelete: Task | null = null;

  ngOnInit(): void {
    this.loadTasks();
    
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.loadTasks();
    });
  }

  onSearchChange(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  onStatusChange(event: any): void {
    this.statusFilter = event.target.value;
    this.currentPage = 1;
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks(this.currentPage, this.searchTerm, this.statusFilter).subscribe({
      next: (response: PaginatedResponse<Task>) => {
        this.tasks = response.results;
        this.totalPages = response.total_pages;
        this.totalItems = response.count;
        this.currentPage = response.current_page;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.isLoading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTasks();
    }
  }
  
  openDeleteDialog(task: Task): void {
    this.taskToDelete = task;
    this.deleteDialogVisible = true;
  }
  
  closeDeleteDialog(): void {
    this.deleteDialogVisible = false;
    this.taskToDelete = null;
  }
  
  confirmDelete(): void {
    if (this.taskToDelete && this.taskToDelete.id) {
      this.taskService.deleteTask(this.taskToDelete.id).subscribe({
        next: () => {
          this.closeDeleteDialog();
          this.loadTasks();
        },
        error: (err) => {
          console.error('Failed to delete task', err);
          this.closeDeleteDialog();
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'PENDING': return 'status-pending';
      case 'IN_PROGRESS': return 'status-progress';
      case 'COMPLETED': return 'status-completed';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    return status.replace('_', ' ');
  }
}
