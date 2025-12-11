import pymysql


def get_connection():
    return pymysql.connect(
        host = '127.0.0.1',
        user='root',
        password='cfe9el6v1',
        database='cheems'

    ) 