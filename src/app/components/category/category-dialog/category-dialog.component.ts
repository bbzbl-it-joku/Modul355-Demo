import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { OverlayEventDetail } from '@ionic/core';
import { Category } from 'src/app/data/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonLabel, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonModal, FormsModule]
})
export class CategoryDialogComponent implements OnInit, AfterViewInit {
  @Input() trigger!: string;
  @Input() type!: string;
  @Input() category?: Category;
  @ViewChild(IonModal) modal!: IonModal;
  categoryName = "";

  constructor(private toastController: ToastController, private categoryService: CategoryService) { }

  ngOnInit() {
    if (this.category) {
      this.categoryName = this.category.name!;
    }
  }

  ngAfterViewInit() {
    const triggerElement = document.querySelector(this.trigger);
    if (triggerElement) {
      triggerElement.addEventListener('click', () => {
        this.modal.present();
      });
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.categoryName === "") {
      this.toastController.create({
        message: 'Category name cannot be empty',
        duration: 5000,
        color: 'danger',
        position: 'bottom'
      }).then(toast => {
        toast.present();
      });
      return;
    } else if (this.categoryName === this.category?.name) {
      this.toastController.create({
        message: 'Category name cannot be the same',
        duration: 5000,
        color: 'danger',
        position: 'bottom'
      }).then(toast => {
        toast.present();
      });
      return;
    }
    this.saveCategory();
    this.informParent();

    this.modal.dismiss(this.categoryName, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.toastController.create({
        message: 'Category ' + this.categoryName + ' has been ' + (this.type === 'edit' ? 'edited' : 'added'),
        duration: 5000,
        color: 'success',
        position: 'bottom'
      }).then(toast => {
        toast.present();
      });
    }
  }

  getModalTitle() {
    return this.type === 'edit' ? 'Edit Category' : 'Add Category';
  }

  private informParent() {
    const event = new CustomEvent('categorySaved', {
      detail: { categoryName: this.categoryName, type: this.type }
    });
    window.dispatchEvent(event);
  }

  private saveCategory() {
    if (this.type === 'edit') {
      this.category!.name = this.categoryName;
      this.categoryService.updateCategory(this.category!);
    } else {
      this.categoryService.createCategory(this.categoryName);
    }

    this.categoryName = "";
  }
}
