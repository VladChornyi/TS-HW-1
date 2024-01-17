// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину, через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
function DeprecatedMethod(reason, replacementMethodName) {
    return function (originalMethod, context) {
        function replacementMethod() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("".concat(String(context.name), " is deprecated method because ").concat(reason, ". Use ").concat(replacementMethodName, " instead"));
            return originalMethod.apply(this, args);
        }
        return replacementMethod;
    };
}
var MyClass = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _oldMethod_decorators;
    return _a = /** @class */ (function () {
            function MyClass() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            MyClass.prototype.oldMethod = function () {
                // Method implementation
            };
            MyClass.prototype.newMethod = function () {
                // Method implementation
            };
            return MyClass;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _oldMethod_decorators = [DeprecatedMethod("Some reason", "newMethod")];
            __esDecorate(_a, null, _oldMethod_decorators, { kind: "method", name: "oldMethod", static: false, private: false, access: { has: function (obj) { return "oldMethod" in obj; }, get: function (obj) { return obj.oldMethod; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
// Створіть декоратори поля MinLength, MaxLength та Email.
function MinLength(min) {
    return function (target, context) {
        function updatedProperty(value) {
            if (value.length < min) {
                throw new Error("Legth of property ".concat(String(context.name), " should be more than ").concat(min));
            }
            return value;
        }
        return updatedProperty;
    };
}
function MaxLength(max) {
    return function (target, context) {
        function updatedProperty(value) {
            if (value.length > max) {
                throw new Error("Legth of property ".concat(String(context.name), " should be more than ").concat(max, "}"));
            }
            return value;
        }
        return updatedProperty;
    };
}
function Email(domen) {
    return function (target, context) {
        function updatedProperty(value) {
            if (!value.endsWith(domen)) {
                throw new Error("Your email should use domen ".concat(domen));
            }
            return value;
        }
        return updatedProperty;
    };
}
var MyClass1 = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    return _a = /** @class */ (function () {
            function MyClass1() {
                this.email = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _email_initializers, "gmail.co"));
            }
            return MyClass1;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [MinLength(5), MaxLength(10), Email("gmail.com")];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
