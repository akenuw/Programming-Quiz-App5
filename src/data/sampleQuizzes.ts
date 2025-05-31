import { Quiz } from '../types/quiz';

export const sampleQuizzes: Quiz[] = [
  {
    id: 'javascript-basics',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and data types.',
    category: 'Web Development',
    language: 'JavaScript',
    difficulty: 'easy',
    timeLimit: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: 'js-1',
        question: 'Which of the following is the correct way to declare a variable in JavaScript?',
        options: [
          'var myVariable;',
          'variable myVariable;',
          'v myVariable;',
          'declare myVariable;'
        ],
        correctAnswer: 0,
        explanation: 'In JavaScript, variables are declared using var, let, or const keywords.',
        difficulty: 'easy',
        category: 'Web Development',
        language: 'JavaScript'
      },
      {
        id: 'js-2',
        question: 'What will be the output of the following code?',
        codeSnippet: 'console.log(typeof null);',
        options: [
          'null',
          'undefined',
          'object',
          'boolean'
        ],
        correctAnswer: 2,
        explanation: 'In JavaScript, typeof null returns "object" due to a historical bug in the language.',
        difficulty: 'medium',
        category: 'Web Development',
        language: 'JavaScript'
      },
      {
        id: 'js-3',
        question: 'Which method is used to add an element to the end of an array?',
        options: [
          'push()',
          'pop()',
          'shift()',
          'unshift()'
        ],
        correctAnswer: 0,
        explanation: 'The push() method adds one or more elements to the end of an array.',
        difficulty: 'easy',
        category: 'Web Development',
        language: 'JavaScript'
      }
    ]
  },
  {
    id: 'python-basics',
    title: 'Python Fundamentals',
    description: 'Test your understanding of Python syntax, data structures, and basic concepts.',
    category: 'Programming',
    language: 'Python',
    difficulty: 'easy',
    timeLimit: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: 'py-1',
        question: 'Which of the following is the correct way to create a list in Python?',
        options: [
          'list = (1, 2, 3)',
          'list = [1, 2, 3]',
          'list = {1, 2, 3}',
          'list = <1, 2, 3>'
        ],
        correctAnswer: 1,
        explanation: 'Lists in Python are created using square brackets [].',
        difficulty: 'easy',
        category: 'Programming',
        language: 'Python'
      },
      {
        id: 'py-2',
        question: 'What will be the output of this code?',
        codeSnippet: 'print(len("Hello World"))',
        options: [
          '10',
          '11',
          '12',
          'Error'
        ],
        correctAnswer: 1,
        explanation: 'The string "Hello World" has 11 characters including the space.',
        difficulty: 'easy',
        category: 'Programming',
        language: 'Python'
      }
    ]
  }
];
