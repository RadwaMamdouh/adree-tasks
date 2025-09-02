import { Component, computed, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  readonly icon = input.required<string>();
  readonly iconColor = input<string>('');
  readonly safePath = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.icon()));
  readonly classes = input<string>('');

  constructor(private sanitizer: DomSanitizer) {}
}
