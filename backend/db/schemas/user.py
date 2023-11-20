def user_schema(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "superuser": user["superuser"]
           }

def list_serial(todos) -> list:
    return[user_schema(user) for user in todos]
