import { Component, effect, HostBinding, inject, input, signal } from '@angular/core';
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
  loading = signal(false);
  @HostBinding('attr.data-sentiment')
  get sentimentAttr() {
    if (this.loading()) return 'loading';
    return this.sentiment()?.category || null;
  }

  constructor() {
    effect(() => {
      const textVal = this.text().trim();
      if (!textVal) {
        this.loading.set(false);
        this.sentiment.set(null);
        return;
      };
      this.loading.set(true);
      this.geminiService.analyze(this.text()).then(result => {
        console.log('result', result);
        this.sentiment.set(result);
        this.loading.set(false);
      })
    })
  }

}
