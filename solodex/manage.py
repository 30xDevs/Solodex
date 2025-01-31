#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import subprocess



def start_ollama(model_choice : str = 'llama3.2') -> None:
    """Initializes `ollama` to be ready for user Description input.
    
    Parameters
    ----------
    `model_choice` : `str`
        The model to be used. Default is 'llama3.2'.
    """
    global ollama_process_object

    try:
        ollama_process_object = subprocess.Popen(['ollama', 'run', model_choice], 
                                                stdin=subprocess.PIPE, # creates pipe to the standard input of the process. Allows python to send things to stdin
                                                stdout=subprocess.PIPE, # creates pipe to the standard output of the process. Allows python to read from stdout
                                                stderr=subprocess.PIPE, # creates pipe to the standard error of the process. Allows python to read from stderr
                                                text = True, # allows python to read and write strings (not bytes) to and from the process
                                                )
        print(f"Ollama process started with PID: {ollama_process_object.pid}")
    except Exception as e:
        print(f"Failed to start ollama process: {e}")


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solodex-conf.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Start the ollama process
    start_ollama()

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

