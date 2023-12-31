import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../../../chunk.pipe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, ChunkPipe],
})
export class SidebarComponent {
  @Input() products: any[] = [];

  removeDuplicates(productTags: string[]): string[] {
    return Array.from(new Set(productTags));
  }

  chunkTags(tags: string[], chunkSize: number): string[][] {
    const result: string[][] = [];
    for (let i = 0; i < tags.length; i += chunkSize) {
      result.push(tags.slice(i, i + chunkSize));
    }
    return result;
  }
}
