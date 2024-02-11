import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  submissionMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      body: ['', Validators.required],
      title: ['', Validators.required],
      publicationDate: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  getBodyError(): string {
    const bodyControl = this.form?.get('body');
    return bodyControl?.hasError('required') && bodyControl.touched ? 'Body é obrigatório.' : '';
  }

  getTitleError(): string {
    const titleControl = this.form?.get('title');
    return titleControl?.hasError('required') && titleControl.touched ? 'Title é obrigatório.' : '';
  }

  getPublicationDateError(): string {
    const publicationDateControl = this.form?.get('publicationDate');
    return publicationDateControl?.hasError('required') && publicationDateControl.touched ? 'Publication Date é obrigatório.' : '';
  }

  getAuthorError(): string {
    const authorControl = this.form?.get('author');
    return authorControl?.hasError('required') && authorControl.touched ? 'Author é obrigatório.' : '';
  }

  onSubmit(): void {
    if(this.form.valid) {
      const formData = this.form.value;

      this.http.post('https://65c550dadae2304e92e430f5.mockapi.io/post', formData)
      .subscribe(response => {
        console.log('Formulário enviado com sucesso: ', response);

        this.form.reset();
      })

      this.submissionMessage = 'Formulário enviado com sucesso!'
    } else {
      console.log('Formulário inválido. Por favor preencha todos os campos.');
      this.submissionMessage = 'Formulário inválido. Por favor preencha todos os campos.'
    }
  }

}
