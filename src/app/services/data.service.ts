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

  constructor() {
    this.loadQuiz();
    console.log();
    /*
    this.currentQuiz.questions.push({
      id: "1",
      title: "Was ist die Hauptstad Frankreichs",
      a1: "Paris",
      a2: "NewYork",
      a3: "Wien",
      a4: "Moskau",
      correct: 1,
    });*/
  }
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
      let q = await Preferences.get({
        key: "MeintollesQuiz2025",
      });
      if (q.value) this.currentQuiz = JSON.parse(q.value) as Quiz;
    } catch (e) {
      console.log(e);
    }
  }
  public loadQuizFromJson() {
    this.http.get("assets/data.json").subscribe((data) => {
      if (data) this.currentQuiz = data as Quiz;
      else console.log("och neee", data);
    });
  }

  public saveQuiz() {
    Preferences.set({
      key: "MeintollesQuiz2025",
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
