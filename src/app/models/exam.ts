import { Question } from "./question";

export class Exam{
    id:number;
    name: string;
    available: boolean;
    createDate: Date;
    durationInMinutes: number;
    totalPoints: number;

    questions!: Question[];

    constructor({id = 0, name = '', available = true, createDate = new Date("2025-05-21T12:00:00"), durationInMinutes = 0, totalPoints = 0, questions = []} : Partial<Exam>)  {
        this.id = id;
        this.name = name;
        this.available = available;
        this.createDate = createDate;
        this.durationInMinutes = durationInMinutes;
        this.totalPoints = totalPoints;
        this.questions = questions;
    }


    static fromJson(data:any) : Exam{
        return new Exam({
            id: data['id'],
            name: data['name'],
            available: data['available'],
            createDate: data['createDate'],
            durationInMinutes: data['durationInMinutes'],
            totalPoints: data['totalPoints'],
            
            questions: data['examQuestions'],
        });
    }

}