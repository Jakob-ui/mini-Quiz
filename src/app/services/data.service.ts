import { Injectable } from "@angular/core";
import { Quiz } from "./quiz";
import { Question } from "./question";

@Injectable({
  providedIn: "root",
})
export class DataService {
  public currentQuiz: Quiz = { id: "", quizName: "newQuiz", questions: [] };

  constructor() {
    this.currentQuiz.questions.push({
      id: "1",
      title: "Was ist die Hauptstad Frankreichs",
      a1: "Paris",
      a2: "NewYork",
      a3: "Wien",
      a4: "Moskau",
      correct: 1,
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
}
