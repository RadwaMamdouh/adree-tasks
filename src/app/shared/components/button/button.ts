import { Component, input, output } from '@angular/core';
import { ButtonType } from '@app/shared/models/button-type.enum';
import { ButtontypePipe } from '@app/shared/pipes/buttontype-pipe';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-button',
  imports: [ButtonModule, RippleModule, ButtontypePipe],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  styleType = input<ButtonType>('Primary');
  type = input<string>('button');
  label = input<string>('');
  icon = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  classes = input<string>('');
  iconColor = input<string>('');

  onAction = output();

  onEmitAction() {
    this.onAction.emit();
  }
}
