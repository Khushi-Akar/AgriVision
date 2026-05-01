import sqlite3

conn = sqlite3.connect("agrivision.db")
cursor = conn.cursor()

# Check tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("Tables:", tables)

# If table exists, fetch data
try:
    cursor.execute("SELECT * FROM scan_records")
    rows = cursor.fetchall()
    print("Data:", rows)
except Exception as e:
    print("Error:", e)

conn.close()