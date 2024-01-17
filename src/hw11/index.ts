function DeprecatedMethod(reason: string, replacementMethodName: string) {
  return function <T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext
  ) {
    function replacementMethod(this: T, ...args: A): R {
      console.log(
        `${String(
          context.name
        )} is deprecated method because ${reason}. Use ${replacementMethodName} instead`
      );
      return originalMethod.apply(this, args);
    }
    return replacementMethod;
  };
}

class MyClass {
  @DeprecatedMethod("Some reason", "newMethod")
  oldMethod() {
    // Method implementation
  }

  newMethod() {
    // Method implementation
  }
}

function MinLength(min: number) {
  return function <T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
  ) {
    function updatedProperty(this: T, value: string): string {
      if (value.length < min) {
        throw new Error(
          `Legth of property ${String(context.name)} should be more than ${min}`
        );
      }
      return value;
    }
    return updatedProperty;
  };
}

function MaxLength(max: number) {
  return function <T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
  ) {
    function updatedProperty(this: T, value: string): string {
      if (value.length > max) {
        throw new Error(
          `Legth of property ${String(
            context.name
          )} should be more than ${max}}`
        );
      }
      return value;
    }
    return updatedProperty;
  };
}

function Email(domen: string) {
  return function <T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
  ) {
    function updatedProperty(this: T, value: string): string {
      if (!value.endsWith(domen)) {
        throw new Error(
          `Your ${String(context.name)} should use domen ${domen}`
        );
      }
      return value;
    }
    return updatedProperty;
  };
}

class MyClass1 {
  @MinLength(5)
  @MaxLength(10)
  @Email("gmail.com")
  email = "gmail.com";
}
