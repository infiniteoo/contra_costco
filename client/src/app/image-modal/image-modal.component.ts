import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css',
})
export class ImageModalComponent {
  @Input() isImageModalOpen: boolean = true;
  @Input() isImageModalOpenChange = new EventEmitter<boolean>();
  @Input() imageToShow: string = '';
  @Input() closeImageModal: any;

  constructor(private el: ElementRef, private cdRef: ChangeDetectorRef) {}

  closeModal() {
    console.log('closeModal');
    this.isImageModalOpen = false;
    this.cdRef.detectChanges(); // Manually trigger change detection
    this.closeImageModal();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeModal();
  }

  @HostListener('document:mousedown', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    this.closeModal();
  }
}
