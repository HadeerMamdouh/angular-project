export class UserAnswer {
  id: number;
  questionId: number;
  selectedChoiceId: number;
  points: number;

  constructor({
    id = 0,
    questionId = 0,
    selectedChoiceId = 0,
    points = 0
  }: Partial<UserAnswer>) {
    this.id = id;
    this.questionId = questionId;
    this.selectedChoiceId = selectedChoiceId;
    this.points = points;
  }

  static fromJson(data: any): UserAnswer {
    return new UserAnswer({
      id: data['id'],
      questionId: data['questionId'],
      selectedChoiceId: data['selectedChoiceId'],
      points: data['points']
    });
  }
}
