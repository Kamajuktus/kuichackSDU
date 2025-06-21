from typing import List
from fastapi import FastAPI, Request
from pydantic import BaseModel
from functions import generate_question, record_question_answer

app = FastAPI()


# Models
class AnswerInput(BaseModel):
    answer: str


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# Endpoints
@app.get("/question")
def get_question(subject: str = "История Казахстана", difficulty: str = "Вопрос должен быть сложным и требовать глубоких знаний по теме.", repeated: bool = False, memory: List[str] = []):
    question = generate_question(subject, difficulty, repeated, memory)
    return {"question": question}

@app.post("/answer")
def post_answer(question: str, user_answer: str, correct_answer: str, is_correct: bool):
    answer = record_question_answer(question, user_answer, correct_answer, is_correct)
    return {"answer": answer}


difficulty_hard = "Вопрос должен быть сложным и требовать глубоких знаний по теме."
difficulty_easy = "Вопрос должен проверять общие знания по теме."

subject = "История Казахстана"
subject2 = "Математическая Грамотность"