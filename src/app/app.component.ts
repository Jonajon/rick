import { Component, OnInit } from '@angular/core';
import {gql, Apollo} from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  characters: any[] = [];
  loading = true;
  error: any;


  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters{
              info{
                count, 
                pages, 
                next,
                prev
              }, results{
                id,
                name,
                image,
                created,
                status,
                species,
                type,
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result?.data?.characters.results;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
  someFunction(){
    return this.characters;
  }
}
