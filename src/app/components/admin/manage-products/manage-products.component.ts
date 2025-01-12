import { Component } from '@angular/core';
import { Product } from '../../../models/products.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../service/products.service';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-manage-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css',
})
export class ManageProductsComponent {
  productList: Product[] = [];
  productListCopy: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductsService,
    private adminServiec: AdminService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') === 'admin') {
      Promise.resolve().then(() => {
        this.productService.newProductsList().subscribe((cart) => {
          this.productList = cart;
          this.productListCopy = cart;
        });
      });
    }
  }
  filteredProducts(): void {
    this.productList = [...this.productListCopy];
    this.productList = this.productList.filter(
      (x) =>
        x.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        x.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  removeProduct(e: Product) {
    this.adminServiec.removeProduct(e.id).subscribe((x) => {
      this.productList = this.productList.filter(
        (product) => product.id !== e.id
      );
      this.productListCopy = this.productListCopy.filter(
        (product) => product.id !== e.id
      );
    });
  }
}
