from fastapi import FastAPI
from constitution import Constitution

app = FastAPI(
    title="Indian Constitution API",
    description="API to access Parts, Articles, Schedules and Preamble",
    version="1.0.0",
)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Single shared instance
constitution = Constitution()


# ---------------- Root ----------------
@app.get("/")
def root():
    return {"message": "Indian Constitution API is running"}


# ---------------- Parts ----------------
@app.get("/parts")
def get_parts():
    return constitution.get_all_parts()


@app.get("/parts/{part}")
def get_part(part: str):
    data = constitution.get_part(part)
    if data is None:
        return {"error": "Invalid Part"}
    return data


# ---------------- Articles ----------------
@app.get("/articles")
def get_all_articles():
    return constitution.get_all_articles()


@app.get("/articles/{article}")
def get_article(article: str):
    data = constitution.get_article(article)
    if data is None:
        return {"error": "Invalid Article"}
    return data


@app.get("/articles/by-part/{part}")
def get_articles_by_part(part: str):
    # Empty list is valid, so no None check needed
    return constitution.get_articles_by_parts(part)


# ---------------- Schedules ----------------
@app.get("/schedules")
def get_all_schedules():
    return constitution.get_all_schedules()


@app.get("/schedules/{schedule}")
def get_schedule(schedule: str):
    data = constitution.get_schedules(schedule)
    if data is None:
        return {"error": "Invalid Schedule"}
    return data


# ---------------- Preamble ----------------
@app.get("/preamble")
def get_preamble():
    return {"preamble": constitution.get_preamble()}
