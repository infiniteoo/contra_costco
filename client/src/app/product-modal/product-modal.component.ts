import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  constructor() {}
  @Input() product: any = null;
  @Input() isModalOpen: boolean = false;
  @Output() isModalOpenChange = new EventEmitter<boolean>();

  closeModal() {
    this.isModalOpen = false;
    this.isModalOpenChange.emit(this.isModalOpen); // Emit the value back to the parent
  }
}
