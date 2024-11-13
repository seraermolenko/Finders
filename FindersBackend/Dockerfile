# Pull the official base image
FROM python:3.10-slim-buster

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set work directory in the container
WORKDIR /code

# Install system dependencies
RUN apt-get update && \
    apt-get install -y gcc libffi-dev && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies globally
COPY requirements.txt /code/
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /code/

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8181"]