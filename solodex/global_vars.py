import subprocess

ollama_process_object : subprocess.Popen  = None

def update_global_variable(new_value):
    global ollama_process_object
    ollama_process_object = new_value