import type { PlayerData, Question } from '$lib/index';

const playerData: PlayerData[] = [];
const TIME_LEFT = 8; // seconds
const sortQuestions = (questions: { points: number; question: string; answer: string; imgSrc?: string; }[]) => questions.sort((a, b) => a.points - b.points).map(q => ({ ...q, answered: false, buzzers: [] as string[] }));
const pastQuestions: Question[] = sortQuestions([
    {
        points: 100,
        question: 'What is the least number of continents that makes up 90% of the world\'s population?',
        answer: '4',
    },
    {
        points: 200,
        question: 'When did the movie Shang-Chi and the Legend of the Ten Rings come out?',
        answer: '2021',
    },
    {
        points: 300,
        question:
            'Who is this basketball player?',
        imgSrc: 'https://www.si.com/.image/t_share/MTY4MDMxNjk2NTU1NjgxMDQx/klay-thompson-warriors-nba-playoffsjpg.jpg',
        answer: 'Klay Thompson',
    },
    {
        points: 400,
        question: 'Who wrote the Spy School book series?',
        answer: 'Stuart Gibbs',
    }
]);

const presentQuestions: Question[] =
    sortQuestions([
        {
            points: 100,
            question:
                'What is my last name?',
            answer: 'Yuan',
        },
        {
            points: 200,
            question:
                'What sport is this?',
            imgSrc: 'https://assets.sportspark.co.uk/f/154676/7952x5304/54e1fa081c/a-squash-match.jpg',
            answer: 'Squash',
        },
        {
            points: 300,
            question: 'What fish is this?',
            imgSrc: 'https://safmc.net/wp-content/uploads/2022/04/yellowtail-snapper.png',
            answer: 'Yellowtail',
        },
        {
            points: 400,
            question:
                'What is the best somewhat nonchalant buzz word for history class?',
            answer: 'Justification',
        }
    ]);
const futureQuestions: Question[] = 
    sortQuestions([
        {
            points: 100,
            question:
                'When is the first day of winter break this year? Please answer MM/DD.',
            answer: '12/19',
        },
        {
            points: 200,
            question:
                'Am I going to take Computer Science Seminar next year?',
            answer: 'Maybe',
        },
        {
            points: 300,
            question:
                'What is the answer to this math problem?',
            imgSrc: '/calculus_problem.png',
            answer: '6',
        },
        {
            points: 400,
            question:
                'What state has both the highest and lowest points in the Lower 48 states of the US?',
            answer: 'California',
        }
    
]);


const categories = [
    {
        title: 'Felix\'s Past',
        questions: pastQuestions
    },
    {
        title: `Felix's Present`,
        questions: presentQuestions
    },
    {
        title: "Felix's Future",
        questions: futureQuestions
    }
];

export const state = {
    playerData,
    categories,
    selectedQuestion: null as Question | null | undefined,
    whoControls: null as string | null,
    timeLeft: TIME_LEFT,
    intervalId: null as NodeJS.Timeout | null,
    whoBuzzed: null as string | null,
};

export interface CheckAnswerPayload {
    answer: string;
    question: Question;
    socketId: string;
}