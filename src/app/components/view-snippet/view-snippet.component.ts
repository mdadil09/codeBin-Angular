import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css',
})
export class ViewSnippetComponent {
  constructor(private route: ActivatedRoute, private dbService: DbService) {}
  codeSnippet = { title: '', code: '' };
  ngOnInit() {
    const urlId = this.route.snapshot.paramMap.get('id');
    this.dbService.getSnippetById(urlId!).then((data: any) => {
      this.codeSnippet = data;
    });
  }
}
