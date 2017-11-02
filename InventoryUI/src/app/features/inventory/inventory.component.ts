import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Item Name', name: 'itemName', sort: 'asc', filtering: { filterString: "", placeholder: 'Filter by quantity' } },
    { title: 'Item description.', name: 'description', filtering: { filterString: "", placeholder: 'Filter by quantity' } },
    { title: 'Quantity', name: 'quantity', sort: 'asc' },
    { title: 'Unit of Measurement', name: 'unitOfMeasurement', sort: 'asc' },
    { title: 'Location', name: 'location', sort: 'asc' },
    { title: 'Status', name: 'status', sort: 'asc' },
    ];
  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    columnActions: {title: 'Actions'},
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered'],
    api: { onEdit: this.onEdit.bind(this),
          onDelete: this.onDelete.bind(this)
        }
  };
  unitsOfMeasurement = ['Kilogram(kgs)', 'Pounds(lbs)', 'Units', 'Millilitres(mls)'];

  items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
  public length: number = 0;
  public actions:Array<any> = [
   {
     'title': '',
     'type': 'edit',
     'tooltip': 'Edit',
     'classBtn': '',
     'classIcon': 'fa fa-pencil',
   },
   {
     'title': '',
     'type': 'delete',
     'tooltip': 'Delete',
     'classBtn': '',
     'classIcon': 'fa fa-trash',
   }
  ];
  private data: Array<any> = [{
    quantity: '2',
    unitOfMeasurement: 'asd',
    itemName: 'aadada',
    description: 'dadadad',
    location: 'adadada',
    status:'Instock'
  }, {
    quantity: '3',
    unitOfMeasurement: 'eee',
    itemName: 'dddddd',
    description: 'adadadad',
    location: 'weeqeqeeqe',
    status:'Damaged'
  }];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;



  public constructor() {
    this.length = this.data.length;
  }

  public ngOnInit(): void {
    this.onChangeTable(this.config);
  }
  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public onEdit(){
}
  public saveNewInventory(){
    console.log("Saving new inventory.");

  }
  public onDelete(){

  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (column.name != 'action' && item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
  public onActionClick(data: any): any {
   console.log(data);
 }
}
