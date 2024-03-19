import { observable } from 'mobx';
import StoreBase from './StoreBase';


export class Question extends StoreBase {
  public questionText: string;
  public type: 'multiple' | 'boolean';
  public options: string[];
  public correctOption: string;
  public level: 'easy' | 'medium' | 'hard';

  constructor(data: any) {
    super();
    this.questionText = data.questionText;
    this.type = data.type;
    this.options = data.options;
    this.correctOption = data.correctOption;
    this.level = data.level;
  }
}
