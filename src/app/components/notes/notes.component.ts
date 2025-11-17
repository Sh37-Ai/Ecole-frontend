import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];
  displayedColumns: string[] = [
    'id_eleve',
    'note_math',
    'note_physique',
    'note_francais',
    'note_svt',
    'note_arabe',
    'commentaire'
  ];

  constructor(private noteSer: NoteService) {}

  ngOnInit() {
    this.noteSer.getAllNote().subscribe({
      next: (data: Note[]) => {
        this.notes = data;
        console.log("Les notes sont : ", data);
      },
      error: (err: any) => console.error("Erreur : ", err)
    });
  }


}
