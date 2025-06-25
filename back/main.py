from typing import List
from fastapi import FastAPI, Request
from pydantic import BaseModel
from functions import generate_question, record_question_answer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


class AnswerSubmission(BaseModel):
    question: str
    user_answer: str
    correct_answer: str
    is_correct: bool

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# Endpoints
@app.get("/api/question")
async def get_question(subject: str = "История Казахстана", difficulty: str = "Вопрос должен быть сложным и требовать глубоких знаний по теме.", repeated: bool = False, memory: List[str] = []):
    question = generate_question(subject, difficulty, repeated, memory)
    print(question)
    return {"question": question[question.find("**Вопрос:**")+12: question.find("A)")],
            "answer1": question[question.find("A)"): question.find("B)")],
            "answer2": question[question.find("B)"): question.find("C)")],
            "answer3": question[question.find("C)"): question.find("D)")],
            "answer4": question[question.find("D)"): question.find("**Подсказки:**")],
            "hint1": question[question.find("*Принцип:*")+10: question.find("2. *Логическое размышление:*")],
            "hint2": question[question.find("*Логическое размышление:*")+25: question.find("3. *Ответ и пояснение:*")],
            "hint3": question[question.find("*Ответ и пояснение:*")+21: question.find("**Ответ:**")],
            "true_answer": question[question.find("**Ответ:**")+14: question.find("**Конец**")]
            }

@app.post("/api/answer")
async def post_answer(payload : AnswerSubmission):
    answer = record_question_answer(
        payload.question, 
        payload.user_answer, 
        payload.correct_answer, 
        payload.is_correct
    )
    return {"answer": answer}



difficulty_hard = "Вопрос должен быть сложным и требовать глубоких знаний по теме."
difficulty_easy = "Вопрос должен проверять общие знания по теме."

subject = "История Казахстана"
subject2 = "Математическая Грамотность"