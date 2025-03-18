import { inject, Injectable } from "@angular/core";
import { Quiz } from "./quiz";
import { Question } from "./question";
import { v4 as uuidv4 } from "uuid";
import { Preferences } from "@capacitor/preferences";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private http: HttpClient = inject(HttpClient);
  public currentQuiz: Quiz = { id: "", quizName: "newQuiz", questions: [] };
  public randomQuestion: Question | undefined;
  public currentIndex: number = 0;

  constructor() {
    /*this.currentQuiz.questions.push({
      id: '1',
      title: 'What is the capital of France?',
      a1: 'Paris',
      a2: 'London',
      a3: 'Berlin',
      a4: 'Madrid',
      correct: 1
    })*/
    this.loadQuiz();
    //this.loadQuizFromMyJson();
    console.log("Hallo3");
  }
  /*
  loadQuizFromJSON() {
    this.http
      .get("https://www.schmiedl.co.at/json_cors/data.json")
      .subscribe((data) => {
        if (data && data.hasOwnProperty("quizName"))
          this.currentQuiz = data as Quiz;
        else console.log("oje: ", data);
      });
  }/*
  /*public loadQuiz() {
    let returnPromise = Preferences.get({
      key: "MeintollesQuiz2025",
    });
    returnPromise
      .then((q) => {
        console.log("then ausgelöst");
        if (q.value) {
          this.currentQuiz = JSON.parse(q.value) as Quiz;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("ohne Promise");
  }*/

  public async loadQuiz() {
    try {
      let q = await Preferences.get({ key: "MeinQuiz" });
      console.log("Hallo1");
      if (q.value) this.currentQuiz = JSON.parse(q.value) as Quiz;
      console.log(q.value);
    } catch (e) {
      console.log(e);
    }
    console.log("Hallo2");
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public loadrandomQuiz(): boolean {
    if (this.currentIndex >= this.currentQuiz.questions.length) {
      return false;
    }

    if (this.currentIndex === 0) {
      this.currentQuiz.questions = this.shuffleArray(
        this.currentQuiz.questions
      );
    }

    this.randomQuestion = this.currentQuiz.questions[this.currentIndex];
    this.currentIndex++;
    return true;
  }

  public loadQuizFromMyJson() {
    this.http.get("assets/data.json").subscribe((data) => {
      if (data) this.currentQuiz = data as Quiz;
      else console.log("och neee", data);
    });
  }

  public saveQuiz() {
    Preferences.set({
      key: "MeinQuiz",
      value: JSON.stringify(this.currentQuiz),
    });
  }
  public getNewQuestion(): Question {
    return {
      id: "0",
      title: "",
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      correct: 1,
    };
  }
  public getQuestion(qid: string): Question | undefined {
    return this.currentQuiz.questions.find((q) => q.id === qid);
  }

  public addQuestion(q: Question) {
    if (q.id === "0") {
      q.id = uuidv4();
    }
    this.currentQuiz.questions.push(q);
    this.saveQuiz();
  }

  public deleteQuestion(q: Question) {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(
      (qq) => qq.id !== q.id
    );
    this.saveQuiz();
  }
}
