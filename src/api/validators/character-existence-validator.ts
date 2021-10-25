import { ValidationError } from '../errors';

export class CharacterExistenceValidator {
  static validate(character: string) {
    const formatedString = character.replace(/[\s]/gimu, '');
    if (formatedString.length < 1)
      throw new ValidationError('InvalidCharacterFormat');
  }
}
