import random
from openai import OpenAI
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='secrets.env')

api_key = str(os.getenv("OPENAI_API_KEY"))
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=api_key,
)

# Initialize memory buffer
memory = ConversationBufferMemory()

test_data = []  # List to store question-answer pairs

def get_substring_between(text, start_word, end_word = -1):
    start_index = text.find(start_word)
    if start_index == -1:
        return None

    start_position = start_index + len(start_word)
    if end_word == -1:
        end_index = len(text)  # If no end_word is provided, take the rest of the string
    else:
        end_index = text.find(end_word, start_position)  # Search for end_word after start_word

    return text[start_position:end_index].strip()


def get_conversation_history() -> str:
    """Retrieves the entire conversation history as a string."""
    return memory.load_memory_variables({})['history']


def get_conversation_history_list() -> list:
    """Retrieves the conversation history as a list of messages."""
    buffer = memory.load_memory_variables({})['history']
    turns = buffer.split("\n g")
    history_list = []
    for i, turn in enumerate(turns):
        if i == 0 and turn:
            history_list.append(f"{turn.strip()}")
        elif turn:
            parts = turn.split("\n", 1)
            if len(parts) == 2:
                history_list.append(f"{parts[0].strip()}")
                history_list.append(f"{parts[1].strip()}")
            else:
                history_list.append(f"{parts[0].strip()}") # Handle cases where human response is missing
    return history_list


def record_question_answer(question: str, user_answer: str, correct_answer: str, is_correct: bool) -> None:
    """Records a question, user's answer, and correctness."""
    test_data.append({
        "question": question,
        "user_answer": user_answer,
        "correct_answer": correct_answer,
        "is_correct": is_correct
    })
    # Optionally save to memory for conversational context
    memory.save_context({"input": question}, {"output": f"User answered: {user_answer} (Correct: {is_correct})"})


def generate_question(subject, difficulty, repeated = False, memory = []) -> str:
    if repeated == False:
        completion = client.chat.completions.create(
        extra_body={},
        model="deepseek/deepseek-chat-v3-0324:free",
        messages=[
            {
            "role": "user",
            "content": f"Сгенерируй 1 корректный тестовый вопрос с 4 вариантами ответа по теме {subject}. Только один ответ должен быть правильным. Также дай три вида подсказок. Первая подсказка указывает на принцип, которым можно воспользоваться, чтобы дать ответ на вопрос. Вторая подсказка укажет на логиеское размышление, приводящее к ответу, но без самого ответа. Третья подсказка должна содержать ответ и полное пояснение логического размышления, которое привело к ответу. Вопрос должен быть на русском языке. Вопрос обязательно должно предворять слово 'Вопрос', Подсказки - словом 'Подсказки', Ответ - словом 'Ответ', Ответы - должны быть от буквы A до буквы D и ииметь закрывающую скобку после буквы, и в конце обязательно напиши 'Конец'. {difficulty}"
            }
        ]
        )
    else:
        history_string = memory.load_memory_variables({})['history']
        turns = history_string.strip().split('\n')
        conversation_turns = []
        current_turn = ""

        for line in turns:
            if line.startswith("Human:") or line.startswith("AI:"):
                if current_turn:
                    conversation_turns.append(current_turn.strip())
                current_turn = line
            elif current_turn and line.strip():  # Append continuation of the same turn
                current_turn += "\n" + line

        if current_turn:
            conversation_turns.append(current_turn.strip())

        if conversation_turns:
            random_turn = random.choice(conversation_turns)
        
            completion = client.chat.completions.create(
            extra_body={},
            model="deepseek/deepseek-chat-v3-0324:free",
            messages=[
                {
                "role": "user",
                "content": f"Сгенерируй 1 корректный тестовый вопрос, который будет подобен этому вопросу: '{random_turn}', по теме {subject} с 4 вариантами ответа. Только один ответ должен быть правильным. Также дай три вида подсказок. Первая подсказка указывает на принцип, которым можно воспользоваться, чтобы дать ответ на вопрос. Вторая подсказка укажет на логиеское размышление, приводящее к ответу, но без самого ответа. Третья подсказка должна содержать ответ и полное пояснение логического размышления, которое привело к ответу. Вопрос должен быть на русском языке. Вопрос обязательно должно предворять слово 'Вопрос', Подсказки - словом 'Подсказки', Ответ - словом 'Ответ', и в конце обязательно напиши 'Конец'. {difficulty}"
                }
            ]
        )

    if 'completion' in locals():
        return str(completion.choices[0].message.content)
    else:
        return None