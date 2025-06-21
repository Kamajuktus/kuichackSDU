# Dockerfile
FROM nvidia/cuda:12.1.0-cudnn8-runtime-ubuntu22.04

# Install Python and dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip

# Install vLLM with Transformers support
RUN pip install "vllm[transformers]"

# Default model, can override with ENV or CMD
ENV MODEL_NAME=mistralai/Mistral-7B-Instruct-v0.2

CMD ["python3", "-m", "vllm.entrypoints.openai.api_server", "--model", "mistralai/Mistral-7B-Instruct-v0.2", "--port", "8001"]
