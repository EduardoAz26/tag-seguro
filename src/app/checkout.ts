import {ChangeDetectionStrategy, Component, signal, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkout',
  imports: [MatIconModule],
  templateUrl: './checkout.html',
})
export class CheckoutComponent {
  private router = inject(Router);
  
  isProcessing = signal(false);
  isSuccess = signal(false);
  paymentMethod = signal<'pix' | 'card'>('pix');

  setPaymentMethod(method: 'pix' | 'card') {
    this.paymentMethod.set(method);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  async finishCheckout() {
    this.isProcessing.set(true);
    // Simula tempo de rede
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.isProcessing.set(false);
    this.isSuccess.set(true);
    
    // Mostra o sucesso por um tempo antes de voltar para a página inicial
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    this.router.navigate(['/']);
  }
}
