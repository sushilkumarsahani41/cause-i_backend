import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmpty
} from 'class-validator'

export function IsMutuallyExclusiveWith(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMutuallyExclusiveWith',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]

          if (
            (isEmpty(value) && isEmpty(relatedValue)) ||
            (!isEmpty(value) && !isEmpty(relatedValue))
          ) {
            return false
          }
          return true
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} and ${args.constraints[0]} cannot be both present or both missing.`
        }
      }
    })
  }
}
