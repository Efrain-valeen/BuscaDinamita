from persistence.db import get_connection

class Winner:
    def __init__(self,id, name, email, phrase):
        self.id = id
        self.name = name
        self.email = email
        self.phrase = phrase
        self.attempts = attempts       
        self.created_at = created_at

    def save(self):
        try:
            connection = get_connection()
            cursor = connection.cursor()
            
            ##determinar fecha y hora del server
            #consulta parametrizada
            query = "INSERT INTO winners(name, email, phrase, attempts) VALUES (%s,%s,%s,%s)"
            cursor.execute(query, (self.name, self.email, self.phrase, self.attempts))
            connection.commit()

            self.id = cursor.lastrowid
            return self.id
        except Exception as ex:
            print("Error al guardar registros: ", ex)
            return 0
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def get_all(cls):
        winners = []
        try:
            connection = get_connection()
            cursor = connection.cursor()

            query = "SELECT id, name, email, phrase, attempts, created_at FROM winners"
            cursor.execute(query)

            rows = cursor.fetchall()

            for row in rows:
                winner = cls(id = row[0], name = row[1], email=row[2], phrase= row[3], attempts=row[4], created_at=row[5])
                winners.append(winner)

            return winners
        except Exception as ex:
            print("Error al obtener registros: ", ex)
            return []
        finally:
            cursor.close()
            connection.close()



