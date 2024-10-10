# modelo ollama
import ollama

# sudo systemctl stop ollama
# sudo systemctl disable ollama
# sudo rm /etc/systemd/system/ollama.service

def query():

    prompt: str = "dime los meses del año"
    modelo: str = "llama3.2"

    response = ollama.chat(
        model=modelo,
        messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ]
    )

    return response['message']['content']
    
print(query())