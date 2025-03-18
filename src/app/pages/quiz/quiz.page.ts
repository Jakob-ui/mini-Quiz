import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRadio,
  IonRadioGroup,
  IonButton,
  IonLabel,
  IonItem,
  IonButtons,
  IonBackButton,
} from "@ionic/angular/standalone";
import { Question } from "src/app/services/question";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.page.html",
  styleUrls: ["./quiz.page.scss"],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class QuizPage implements OnInit {
  randomQuestion: Question | undefined;
  selectedAnswer: number | undefined;
  isAnswerGiven: boolean | undefined;
  answerFeedback: string | undefined;
  isAnswerCorrect: boolean | undefined;
  correctAnswersCount: number = 0;
  quizCompleted: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadRandomQuestion();
    this.startNewQuiz();
  }

  loadRandomQuestion() {
    const hasMoreQuestions = this.dataService.loadrandomQuiz();
    if (!hasMoreQuestions) {
      this.quizCompleted = true;
      return;
    }
    this.randomQuestion = this.dataService.randomQuestion;
    this.isAnswerGiven = undefined;
    this.answerFeedback = undefined;
  }
  resetQuiz() {
    this.dataService.currentIndex = 0;
    this.correctAnswersCount = 0;
    this.quizCompleted = false;
    this.randomQuestion = undefined;
    this.isAnswerGiven = undefined;
    this.selectedAnswer = undefined;
  }

  startNewQuiz() {
    this.resetQuiz();
    this.loadRandomQuestion();
  }

  home() {
    this.router.navigate(["/home"]);
    this.quizCompleted = false;
  }

  check() {
    if (this.randomQuestion && this.selectedAnswer !== undefined) {
      this.isAnswerGiven = true;
      if (this.selectedAnswer == this.randomQuestion.correct) {
        this.answerFeedback = "Richtig!";
        this.isAnswerCorrect = true;
        this.correctAnswersCount++;
      } else {
        this.answerFeedback = "Falsch!";
        this.isAnswerCorrect = false;
      }
    } else {
      this.answerFeedback = "Bitte wähle eine Antwort aus.";
      this.isAnswerCorrect = undefined;
    }
  }
}
