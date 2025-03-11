import { Injectable } from "@angular/core";
import { Quiz } from "./quiz";

@Injectable({
  providedIn: "root",
})
export class DataService {
  public currentQuiz: Quiz = { id: "", quizName: "newQuiz", questions: [] };

  constructor() {
    this.currentQuiz.questions.push({
      id: 1,
      title: "Was ist die Hauptstad Frankreichs",
      a1: "Paris",
      a2: "NewYork",
      a3: "Wien",
      a4: "Moskau",
      corret: 1,
    });
  }
}
