import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  ngOnInit() {
    const buttons = document.querySelectorAll('.faq-toggle');

    buttons.forEach((button) => {
      button.addEventListener('click', () =>
        button.parentElement.classList.toggle('active')
      );
    });
  }
}
