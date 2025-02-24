import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent implements OnInit {
  characterForm: FormGroup;

  races: string[] = ['Human', 'Orc', 'Elf'];
  classes: string[] = ['Fighter', 'Thief', 'Mage'];
  constellations: string[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  constructor(private fb: FormBuilder) {
    this.characterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      race: ['', Validators.required],
      class: ['', Validators.required],
      constellation: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  selectRace(race: string): void {
    this.characterForm.patchValue({ race });
  }

  selectClass(characterClass: string): void {
    this.characterForm.patchValue({ class: characterClass });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      console.log('Character created:', this.characterForm.value);
      // Here you can add your logic to save the character
    }
  }
}
