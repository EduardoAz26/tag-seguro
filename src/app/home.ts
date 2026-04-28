import {ChangeDetectionStrategy, Component, signal, inject, effect, OnInit, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private document = inject(DOCUMENT);
  private router = inject(Router);
  
  isDarkMode = signal(false);
  isBuying = signal(false);

  testimonials = [
    {
      text: "Agora consigo ver meu carro em qualquer momento. Dá uma baita tranquilidade.",
      author: "Marcos Silva",
      initial: "M"
    },
    {
      text: "Muito fácil de usar, instalei em poucos minutos. Excelente investimento.",
      author: "Amanda Costa",
      initial: "A"
    },
    {
      text: "Minha moto foi roubada e consegui recuperar graças ao TagSeguro! Recomendo 100%.",
      author: "João Pedro",
      initial: "J"
    },
    {
       text: "Sistema muito intuitivo, o app funciona perfeitamente, vale cada centavo.",
       author: "Roberta Lima",
       initial: "R"
    }
  ];

  activeTestimonial = signal(0);
  private testimonialInterval?: ReturnType<typeof setInterval>;

  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }
    });
  }

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.testimonialInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  stopCarousel() {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  nextTestimonial() {
    this.activeTestimonial.update(n => (n + 1) % this.testimonials.length);
  }

  prevTestimonial() {
    this.activeTestimonial.update(n => (n - 1 + this.testimonials.length) % this.testimonials.length);
  }

  setTestimonial(index: number) {
    this.activeTestimonial.set(index);
    this.stopCarousel();
    this.startCarousel();
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
  }

  async onBuyClick(event: Event) {
    event.preventDefault();
    this.isBuying.set(true);
    
    // Simula um tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isBuying.set(false);
    
    this.router.navigate(['/checkout']);
  }
}
