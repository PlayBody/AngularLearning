import { Component, AfterViewInit, OnInit, OnChanges, SimpleChanges, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from 'src/app/_model/data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges {

  theader: any[] = [];
  tsub_name: any[] = [];
  tValue: any[] = [];
  filterByValue: string = '';
  dataSource: MatTableDataSource<any>;

  @Input() scoreData : Array<Data> = [];
  @Input() filterByDateFrom : string = "";
  @Input() filterByDateTo : string = "";
  @Input() filterBySubject : string = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    // set the header of table
    this.theader.push('name');
    this.scoreData[0].test!.map(t => {
      this.tsub_name.push(t.subName)
      this.theader.push(t.subName)
    });
    this.theader.push('average')
    // console.log("headers of table", this.theader)

    // set the body of table
    this.scoreData.forEach(data => {
      const row: any = { name: data.username };
      const scoreArray: number[] = [];
      data.test!.forEach((test, i) => {
        row[test.subName!] = test.score;
        scoreArray.push(test.score!)
      })
      row['average'] = this.calcAverage(scoreArray)
      this.tValue.push(row);
    })
    
    this.dataSource = new MatTableDataSource(this.tValue)
  }

  // the code snippet that filter by input value
  ngOnChanges(changes: SimpleChanges): void {
    const filterByDateFrom = changes['filterByDateFrom']?.currentValue || '';
    const filterByDateTo = changes['filterByDateTo']?.currentValue || '';
    const filterBySubject = changes['filterBySubject']?.currentValue || '';

    // Combine the filter values into an array
    const filters = [filterByDateFrom, filterByDateTo, filterBySubject];

    console.log("step1: ", filters)

    // Apply the filters to the dataSource
    this.dataSource.filter = filters
      .map(filter => filter.trim().toLowerCase())
      .join(' ');

    console.log("step2: ", this.dataSource.filter)
        
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  calcAverage(scores: any): number {
    // const value = Object.values(scores).filter(value => typeof value === 'number')

    const len = scores.length;
    if(len === 0)  return 0;

    const sum = scores.reduce((total: any, score: any) => total + score, 0);
    const average = Number((sum / len).toFixed(1));
    return average;
  }
}


