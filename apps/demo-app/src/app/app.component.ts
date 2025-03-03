import { Component, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgGCSupportedModels, SentimentAnalyzerComponent } from '@codewithrani/ng-gc';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';


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
    model: [NgGCSupportedModels[1].name, Validators.required],
  });
  models = NgGCSupportedModels;
  sentimentConfig = toSignal(
    this.form.controls.model.valueChanges.pipe(map(val => ({
      model: val,
    }))
    ), {
    initialValue: {
      model: NgGCSupportedModels[0].name
    }
  })
  inputTextValDebounced: Signal<string> = toSignal(
    this.form.controls.inputTextVal.valueChanges.pipe(debounceTime(1000)),
    { initialValue: '' }
  )
}
