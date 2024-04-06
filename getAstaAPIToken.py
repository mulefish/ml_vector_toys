def get_token_from_file():
    file_path = ".mysecret.txt"  # Is in the .gitignore
    try:
        with open(file_path, 'r') as file:
            token = file.read().strip()
            return token
    except Exception as error:
        print(f"Error reading token from file '{file_path}': {error}")
        return None
