import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  productForm!: FormGroup;
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      rating: this.fb.group({
        rate: ['', [Validators.required, Validators.min(0)]],
        count: ['', [Validators.required, Validators.min(0)]],
      }),
    });
  }

  addProd() {
    this.adminService.addProduct(this.productForm.value).subscribe((x) => {
      this.productForm.reset();
      alert('Product Added!');
    });
  }
}
