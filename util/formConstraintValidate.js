// exports.validateConstraint = (question, value) => {
//     constraints = Object.keys(question.constraint);
//     constraints.forEach(constraintKey => {
//         switch (constraintKey) {
//             case "isRequired":
//                 if (question.constraint[constraintKey] == true) {
//                     if (!value) {
//                         return new Error(`question ${question.title} is required`)
//                     }
//                     break;
//                 }
//             case "type":
//                 let pass, err = validateType(question.constraint[constraintKey], value)
//                 if (!pass) {
//                     return err
//                 }
//                 break;
//             case "range":
//                 let range = question.constraint[constraintKey]
//                 if (typeof(value) != "number" || value < range[0] || value > range[0]) {
//                     return new Error(`question ${question.title} must is out of range`)
//                 }
//                 break;
//             case "in":
//                 if (!Array.isArray(value)) {
//                     return new Error(`question ${question.title} must is an array`)
//                 }
//                 if (!Array.isArray(question.constraint[constraintKey])) {
//                     return new Error(`contraint must be an array`)
//                 }
//                 value.forEach(item => {
//                     if (!question.constraint[constraintKey].includes(item)) {
//                         return new Error(`question ${question.title} does not accept answer ${item}`)
//                     }
//                 })
//                 break;
//             case "numberOfAnswers":
//                 const pass1, err1 = checkNumberOfAnswers(value, question.constraint[constraintKey])
//                 if (!pass1) {
//                     return err1
//                 }
//                 break;
//             default:
//                 return null
//         }
//     });
// }

// const validateType = (want, value) => {
//     gotType = typeof(value)
//     switch (gotType) {
//         case "number":
//             if (want != number) {
//                 return false, new Error(`question ${question.title} require answer is number`)
//             } else {
//                 return true, null
//             }
//         case "object":
//             if (gotType == want) {
//                 return true, null
//             } else if (Array.isArray(value)) {
//                 return true, nil
//             } else {
//                 return false, new Error(`question ${question.title} require answer is an object or array`)
//             }
//         case "boolean":
//             if (gotType != want) {
//                 return false, new Error(`question ${question.title} require answer is boolean`)
//             } else {
//                 return true, nil
//             }
//         case "string":
//             if (gotType != want) {
//                 return false, new Error(`question ${question.title} require answer is text`)
//             } else {
//                 return truem, null
//             }
//         default:
//             return false, new Error(`question ${question.title} unsupport type`)
//     }
// }

// const checkNumberOfAnswers = (arr, number) => {
//     if (!Array.isArray(arr)) {
//         return false, new Error("checkNumberOfAnswers: input 1 must be an array")
//     }
//     if (arr.length != 2) {
//         return false, new Error("checkNumberOfAnswers: input 1 must be an array with length is 2")
//     }
//     if (typeof(number) != "number") {
//         return false, new Error("checkNumberOfAnswers: input 2 must be an number")
//     }
//     if (arr[0] == null && arr[1] != null) {
//         if (number > arr[1]) {
//             return false, new Error(`checkNumberOfAnswers: number of answers must less than ${arr[1]}`)
//         }
//     }
//     if (arr[1] == null && arr[0] != null) {
//         if (number < arr[0]) {
//             return false, new Error(`checkNumberOfAnswers: number of answers must greater than ${arr[0]}`)
//         }
//     }
//     if (arr[0] < arr[1]) {
//         if (number < arr[0] || number > arr[1]) {
//             return false, new Error(`checkNumberOfAnswers: number of answers out of range`)
//         }
//     } else {
//         if (number > arr[0] || number < arr[1]) {
//             return false, new Error(`checkNumberOfAnswers: number of answers out of range`)
//         }
//     }
// }