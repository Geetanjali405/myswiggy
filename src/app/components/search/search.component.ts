import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  menuList: any[];
  filteredProducts: any[];
  subscription: Subscription;
  searchForm: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.subscription = this.userService.getMenuDetails().subscribe(
      (response) => {
        this.menuList = response;
        console.log(response);
      },
      (error) => {
        console.log('Error in fetching menu details', error);
      }
    );
    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });
    this.searchForm.valueChanges.subscribe(() => {
      this.filterProducts();
      console.log(this.searchForm.value);
    });
  }

  filterProducts() {
    let query = this.searchForm.get('searchQuery')?.value;
    console.log(query);
    if (query.length > 1) {
      this.filteredProducts = this.menuList.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
      });
      console.log(this.filteredProducts);
    }
  }
}
