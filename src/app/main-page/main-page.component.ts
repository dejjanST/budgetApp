import { UpdateEvent } from './../budget-item-list/budget-item-list.component';
import { BudgetItem } from './../shared/models/budget-item-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  budgetItems: BudgetItem[] = [];
  totalBudget: number = 0;


  ngOnInit(): void {
    let items = localStorage.getItem('items');
    if(items) {
      this.budgetItems = JSON.parse(items);
    }
    this.budgetItems.forEach(item => this.totalBudget+=item.amount);
  }

  addItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);

    localStorage.setItem('items', JSON.stringify(this.budgetItems));
    this.totalBudget += newItem.amount;
  }

  deleteItem(item: BudgetItem) {
    let index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);

    localStorage.setItem('items', JSON.stringify(this.budgetItems));
    this.totalBudget -= item.amount;
  }

  updateItem(updateEvent: UpdateEvent) {
      // replace the item with updated item from form
      this.budgetItems[this.budgetItems.indexOf(updateEvent.old)] = updateEvent.new;
      localStorage.setItem('items', JSON.stringify(this.budgetItems));

      //update the total budget
      this.totalBudget-=updateEvent.old.amount;
      this.totalBudget+=updateEvent.new.amount;
  }
}
