import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    status: ['PENDING', Validators.required],
    due_date: ['', Validators.required]
  });

  isEditMode = false;
  taskId: number | null = null;
  isLoading = false;
  isSaving = false;
  error = '';

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  loadTask(): void {
    if (!this.taskId) return;
    
    this.isLoading = true;
    this.taskService.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        // Format date to YYYY-MM-DD for input[type="date"]
        let formattedDate = '';
        if (task.due_date) {
          const date = new Date(task.due_date);
          formattedDate = date.toISOString().split('T')[0];
        }
        
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          due_date: formattedDate
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load task details.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.error = '';
    
    const taskData: Task = this.taskForm.value;
    
    // Convert date back to ISO format or format expected by backend if needed
    // Usually YYYY-MM-DD works for most DRF date/datetime fields

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.error = 'Failed to update task. Please try again.';
          this.isSaving = false;
        }
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.error = 'Failed to create task. Please try again.';
          this.isSaving = false;
        }
      });
    }
  }
}
