import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { add, close, create, createOutline, refresh, trash, trashOutline } from 'ionicons/icons';
import { Category } from '../../../data/category';
import { CategoryService } from '../../../services/category.service';
import { CategoryDialogComponent } from "../category-dialog/category-dialog.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonGrid, IonSpinner, NgFor, NgIf, IonContent, IonButton, IonIcon, CategoryDialogComponent]
})
export class CategoryListComponent implements OnInit {
  isLoading = false;
  categories: Category[] = [];
  constructor(private categoryService: CategoryService, public toastController: ToastController, private cdr: ChangeDetectorRef) {
    addIcons({ createOutline, trashOutline, refresh, add, close, create, trash, });
  }

  ngOnInit() {
    this.reloadCategories();
    window.addEventListener('categorySaved', () => {
      this.reloadCategories();
    });
  }

  async reloadCategories() {
    this.isLoading = true;
    this.categories = [];
    this.categoryService.getCategories().then((categories) => {
      this.categories = categories;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  async deleteCategory(category: Category) {
    if (await this.areYouSure(category)) {
      this.categoryService.deleteCategory(category).then(() => {
        this.toastController.create({
          message: 'Category ' + category.name + ' deleted',
          duration: 5000,
          color: 'success',
          position: 'bottom'
        }).then(toast => {
          toast.present();
        });
        this.reloadCategories();
      });
    }
  }

  async areYouSure(category: Category): Promise<Boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.toastController.create({
        header: 'Confirm',
        message: 'Are you sure you want to delete the category \"' + category.name + '\"?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => { resolve(false); }
          },
          {
            text: 'Delete',
            handler: () => { resolve(true); }
          }
        ]
      });
      await alert.present();
    });
  }
}
