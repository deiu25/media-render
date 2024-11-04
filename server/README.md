Crearea unui mediu virtual:

```bash
python -m venv venv
```

Activarea mediului virtual:

```bash
venv\Scripts\activate
```

Pe macOS/Linux:

```bash
source venv/bin/activate
```

Instalare pachete din requirements.txt

```bash
pip install -r requirements.txt
```

După instalarea dependențelor, poți porni serverul FastAPI folosind Uvicorn:

```bash
uvicorn app.main:app --reload
```