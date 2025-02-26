import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';
import { NGGCSentimentResponse } from '../../types';

@Component({
  selector: 'ng-gc-sentiment-analyzer',
  imports: [CommonModule],
  templateUrl: './sentiment-analyzer.component.html',
  styleUrl: './sentiment-analyzer.component.css',
})
export class SentimentAnalyzerComponent {

  geminiService = inject(GeminiService);
  text = input.required<string>();
  sentiment = signal<NGGCSentimentResponse | null>(null);

  constructor() {
    effect(() => {
      const textVal = this.text().trim();
      if(!textVal) {
        this.sentiment.set(null);
        return;
      };
      this.geminiService.analyze(this.text()).then(result => {
        console.log('result', result);
        this.sentiment.set(result);
      })
    })
  }

}
