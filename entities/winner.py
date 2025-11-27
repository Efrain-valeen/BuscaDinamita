from persistence.db import get_db_connection
class Winner:
    def __init__(self,id, name, email, phrase):
        self.id = id
        self.name = name
        self.email = email
        self.phrase = phrase

    def save(self):
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            query = "INSERT INTO winners (name, email, phrase) VALUES (%s, %s, %s)"
            cursor.execute(query, (self.name, self.email, self.phrase))
            connection.commit()

            self.id = cursor.lastrowid
            return self.id
        except Exception as ex:
            print("Error al guardar el registro:", ex)
            return 0
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def get_all(cls):
        winners = []
        try:
            connection = get_db_connection()
            cursor = connection.cursor()

            query = "SELECT id, name, email, phrase FROM winners"
            cursor.execute(query)
            results = cursor.fetchall()

            for row in results:
                winner = cls(id=row[0], name=row[1], email=row[2], phrase=row[3])
                winners.append(winner)
            return winners
        except Exception as ex:
            print("Error al obtener los registros:", ex)
            return []
        finally:
            cursor.close()
            connection.close()
        