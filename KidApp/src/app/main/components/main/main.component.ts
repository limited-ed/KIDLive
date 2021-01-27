import { Component, OnInit } from '@angular/core';
import { MessageBusService, AuthService,  } from 'core';
import { Message } from 'core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isLoading = false;
  isSaving = false;
  error = '';
  userId: number;

  constructor(private messageBus: MessageBusService, private auth: AuthService, private router: Router) {  }

  ngOnInit() {
    this.messageBus.getMessage().subscribe( (msg) => this.onMessage(msg));

  }

  onMessage( msg: Message ) {
    setTimeout( () => {
      if (msg.serviceName === 'isLoading') { this.isLoading = msg.payload; }
      if (msg.serviceName === 'isSaving') { this.isSaving = msg.payload; }
    });

  }

  getRole() {
    return this.auth.getRole();
  }

  getUsername() {
    return this.auth.getUserName();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);

  }
}
