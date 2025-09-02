import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  imports: [],
  templateUrl: './empty-data.html',
  styleUrl: './empty-data.scss',
})
export class EmptyData {
  img = input<string>();
  title = input<string>('');
  classes = input<string>('');
}
