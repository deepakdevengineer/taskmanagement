import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-delete-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-delete-dialog.component.html',
  styleUrls: ['./task-delete-dialog.component.css']
})
export class TaskDeleteDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() taskTitle: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
