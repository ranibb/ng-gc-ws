import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SentimentAnalyzerComponent } from '@codewithrani/ng-gc';

@Component({
  imports: [RouterModule, SentimentAnalyzerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-app';
  constructor() {
    console.log(process.env.NG_GC_GEMINI_API_KEY)
   }
}
