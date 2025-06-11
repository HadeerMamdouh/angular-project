import { Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/Login/login/login.component';
import { RegisterComponent } from './pages/Register/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminExamDetailsComponent } from './pages/admin-exam-details/admin-exam-details.component';
import { AddExamComponent } from './pages/add-exam/add-exam.component';
import { EditExamComponent } from './pages/edit-exam/edit-exam.component';
import { ExamResultsComponent } from './pages/exam-results/exam-results.component';
import { UserExamResultComponent } from './pages/user-exam-result/user-exam-result.component';
import { BeforeExamStartComponent } from './pages/before-exam-start/before-exam-start.component';
import { ExamStartComponent } from './pages/exam-start/exam-start.component';
import { AvailableExamsComponent } from './pages/available-exams/available-exams.component';
import { TakenExamsComponent } from './pages/taken-exams/taken-exams.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "splash",
        pathMatch: "full",
    },
    {
        path: "splash",
        component: SplashComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: 'examDetails/:examId',
        component: AdminExamDetailsComponent,
    },
    {
        path: 'addExam',
        component: AddExamComponent,
    },
    {
        path: 'editExam/:examId',
        component: EditExamComponent,
    },
    {
        path: 'examResults/:examId',
        component: ExamResultsComponent,
    },
    {
        path: 'userExamResult/:examId',
        component: UserExamResultComponent,
    },
    {
        path: 'EnterExam/:examId',
        component: BeforeExamStartComponent,
    },
    {
        path: 'examStart/:examId',
        component: ExamStartComponent,
    },
    {
        path: 'available-exams',
        component: AvailableExamsComponent,
    },
    {
        path: 'taken-exams',
        component: TakenExamsComponent
    }
];
