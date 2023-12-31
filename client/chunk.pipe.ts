import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk',
  standalone: true,
})
export class ChunkPipe implements PipeTransform {
  transform(input: any[], chunkSize: number): any[] {
    const result = [];
    for (let i = 0; i < input.length; i += chunkSize) {
      result.push(input.slice(i, i + chunkSize));
    }
    return result;
  }
}
