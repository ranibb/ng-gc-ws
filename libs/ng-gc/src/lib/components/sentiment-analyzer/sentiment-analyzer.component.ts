import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'ng-gc-sentiment-analyzer',
  imports: [CommonModule],
  templateUrl: './sentiment-analyzer.component.html',
  styleUrl: './sentiment-analyzer.component.css',
})
export class SentimentAnalyzerComponent {

  geminiService = inject(GeminiService);
  text = input.required<string>();

  constructor() {
    effect(() => {
      const textVal = this.text().trim();
      if(!textVal) return;
      this.geminiService.analyze(this.text()).then(result => {
        console.log(result)
      })
    })
  }

}
