import { Component, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SentimentAnalyzerComponent } from '@codewithrani/ng-gc';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';


@Component({
  imports: [RouterModule, SentimentAnalyzerComponent, ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    inputTextVal: ['', Validators.required],
  });
  inputTextValDebounced: Signal<string> = toSignal(
    this.form.controls.inputTextVal.valueChanges.pipe(debounceTime(1000)),
    { initialValue: '' }
  )
}
