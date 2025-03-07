import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ImportsModule } from './imports';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../../shared/model/product';
import { ProductService } from '../../shared/service/productservice';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FileUpload } from 'primeng/fileupload';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { InputNumber } from 'primeng/inputnumber';
import { Table } from 'primeng/table';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
    selector: 'app-home',
    imports: [ImportsModule],
    providers: [MessageService, ConfirmationService, ProductService],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'], // corregido
  })


export class HomeComponent {

  productDialog: boolean = false;

//   products!: Product[];
products: Product[] = [];


  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
      private productService: ProductService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cd: ChangeDetectorRef
  ) {}

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  exportCSV() {
    if (this.dt) {
        this.dt.exportCSV();
    }
  }

  loadDemoData() {
      this.productService.getProducts().then((data: any) => {
            console.log(`Aqui vala ifnormacio de laoddemodata${data}`);
            
          this.products = data;
          this.cd.markForCheck();
          console.log(this.product);
          
      });

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
          { field: 'name', header: 'Name' },
          { field: 'image', header: 'Image' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }


  ngOnInit(){
    this.loadDemoData();
    console.log(this.products);
    
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
              this.selectedProducts = null;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Products Deleted',
                  life: 3000
              });
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => val.id !== product.id);
              this.product = {};
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Deleted',
                  life: 3000
              });
          }
      });
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warn';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
            return 'danger';
      }
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name?.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Updated',
                  life: 3000
              });
          } else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Created',
                  life: 3000
              });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }
}
