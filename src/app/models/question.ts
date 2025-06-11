export class Question {
    id: number;
    questionText: string;
    points: number;
    examId: number;
    questionType: QuestionType;
    choices: Choice[];

    constructor({ id = 0, questionText = '', points = 0, examId = 0, questionType = QuestionType.TrueFalse, choices = [] }: Partial<Question> = {}) {
        this.id = id;
        this.questionText = questionText;
        this.points = points;
        this.examId = examId;
        this.questionType = questionType;
        this.choices = choices;
    }

    static fromJson(data:any) : Question{
        
        const choices = data['choices'] 
            ? data['choices'].map((choice: Partial<Choice>) => ({
                id: choice.id ?? 0,
                choiceText: choice.choiceText ?? '',
                isCorrect: choice.isCorrect ?? false
            }))
            : [];

        return new Question({
            id: data['id'],
            questionText: data['questionText'],
            points: data['points'],
            examId: data['examId'],
            questionType: data['questionType'],
            choices: choices
        });
    }
}


export enum QuestionType {
    MCQ,
    TrueFalse,
}


export interface Choice {
    id: number;
    choiceText: string;
    isCorrect: boolean;
    questionId: number;
}   