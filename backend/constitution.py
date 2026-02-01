import json
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")


class BaseClass:
    def _load_json(self, path):
        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)


class PartsOfConstitution(BaseClass):
    def __init__(self):
        self.parts = self._load_json(os.path.join(DATA_DIR, "parts.json"))

    def get_part(self, part):
        data = self.parts.get(part)
        if data is None:
            return None
        return {"part": part, "title": data["title"],"explanation": data["explanation"]}

    def get_all_parts(self):
        return self.parts


class SchedulesOfConstitution(BaseClass):
    def __init__(self):
        self.schedules = self._load_json(os.path.join(DATA_DIR, "schedules.json"))

    def get_schedules(self, schedule):
        data = self.schedules.get(schedule)
        if not data:
            return None
        return {
            "schedule": schedule,
            "title": data["title"],
            "description": data["description"]
        }

    def get_all_schedules(self):
        return self.schedules


class ArticlesOfConstitution(BaseClass):
    def __init__(self):
        self.articles = self._load_json(
            os.path.join(DATA_DIR, "articles.json")
        )

    def get_article(self, article):
        data = self.articles.get(article)
        if data is None:
            return None
        return {
            "article": article,
            "title": data["title"],
            "part": data["part"]
        }

    def get_all_articles(self):
        return self.articles


class Constitution(
    PartsOfConstitution, SchedulesOfConstitution, ArticlesOfConstitution
):
    def __init__(self):
        PartsOfConstitution.__init__(self)
        SchedulesOfConstitution.__init__(self)
        ArticlesOfConstitution.__init__(self)

        self.preamble = self._load_json(
            os.path.join(DATA_DIR, "preamble.json")
        )

    def get_preamble(self):
        text = self.preamble["preamble"]
        return text.replace("; ", ";\n")

    def get_articles_by_parts(self, part):
        data = []
        for article_number, article_data in self.articles.items():
            if article_data["part"] == part:
                data.append({
                    "Article Number": article_number,
                    "Title": article_data["title"],
                    "Part": article_data["part"]
                })
        return data



