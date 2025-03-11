import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent , IonButton} from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, IonButton],
})
export class HomePage {

  public data = inject(DataService);
  private router = inject(Router);
  constructor() { }
  showList() {
    this.router.navigate(['/question-list'])
  }
}