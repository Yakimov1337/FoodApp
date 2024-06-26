import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './subscribe.component.html',
})
export class SubscribeComponent {
  @ViewChild('stats') statsSection!: ElementRef<HTMLDivElement>;
  @ViewChild('happyClientsCounter') happyClientsCounter!: ElementRef;
  @ViewChild('ordersDeliveredCounter') ordersDeliveredCounter!: ElementRef;
  @ViewChild('timeSavedCounter') timeSavedCounter!: ElementRef;
  email: string = '';

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  constructor(private toastr: ToastrService) {}

  private animateCount(element: HTMLElement, end: number): void {
    const duration = 5000; // Duration in milliseconds

    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);
    const counterIncrement = end / totalFrames;

    let currentFrame = 0;

    const countToNumber = () => {
      currentFrame++;
      const currentValue = Math.round(counterIncrement * currentFrame);
      element.innerText = currentValue.toLocaleString();

      if (currentFrame < totalFrames) {
        requestAnimationFrame(countToNumber);
      } else {
        element.innerText = end.toLocaleString() + '+';
      }
    };

    countToNumber();
  }

  private setupObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCount(this.happyClientsCounter.nativeElement, 10000);
            this.animateCount(this.ordersDeliveredCounter.nativeElement, 40000);
            this.animateCount(this.timeSavedCounter.nativeElement, 500);
            // Optionally, stop observing after animation starts
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(this.statsSection.nativeElement);
  }
  onSubmit(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      this.toastr.error('Please enter a valid email address.');
      return;
    }

    this.toastr.success('Thank you for subscribing!');
    // Reset the email field after successful subscription
    this.email = '';
    // Here, you would typically send `this.email` to your backend
  }
}
